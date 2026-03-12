import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Router from "next/router";
import Title from "../components/Title";
import Logo from "../components/Header/Logo";
import Link from "next/link";

const Login = () => {
  const ctx = useContext(Context);
  const { loggedIn } = ctx;
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (loggedIn) Router.push("/dash");
  }, [loggedIn]);

  const handleGoogleSignIn = async () => {
    setLoading("Connecting to Google...");

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      // 1. Authenticate with Google
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // 2. Reference the Firestore user document
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let userData;

      if (!userSnap.exists()) {
        // 3. New User Logic: Prepare default data
        userData = {
          name: user.displayName || "",
          email: user.email,
          currency: "$",
          createdAt: serverTimestamp(),
          categories: [
            {
              icon: "view_agenda",
              id: generateID(),
              method: 0,
              name: "Others",
            },
            { icon: "bolt", id: generateID(), method: 0, name: "Bills" },
            { icon: "restaurant", id: generateID(), method: 0, name: "Food" },
            {
              icon: "account_balance_wallet",
              id: generateID(),
              method: 1,
              name: "Salary",
            },
          ],
        };

        // Save the new user to Firestore
        await setDoc(userRef, userData);
      } else {
        // 4. Existing User Logic: Fetch their data
        userData = userSnap.data();
        console.log(userData);
      }

      // Update Global State with the new user data

      ctx.notify("success", "Welcome to Quarta!");
      setLoading(null);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setLoading(null);
      if (error.code !== "auth/popup-closed-by-user") {
        ctx.notify("error", "Failed to sign in with Google.");
      }
    }
  };

  return (
    <>
      <Title title="Login" />

      <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
        <div className="flex w-full max-w-sm flex-col items-center space-y-3 rounded-xl bg-white p-10 shadow-md dark:bg-slate-800 dark:text-slate-300">
          {/* <h1 className="text-2xl font-bold text-slate-500">
            Welcome to Quarta
          </h1> */}
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Sign in to access your wallet dashboard.
          </p>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-gray-100 px-6 py-4 font-bold text-slate-700 transition-all hover:border-gray-300 hover:bg-gray-200 active:scale-95 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            {loading ? (
              <span>{loading}</span>
            ) : (
              <>
                {/* Google G Logo SVG */}
                <svg className="h-6 w-6" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>
          <p className="text-[.7rem] text-gray-400">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
