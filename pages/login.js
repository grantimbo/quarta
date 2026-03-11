import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";
import { formatAuthCode } from "../support/formatErrorCodes";

const Login = () => {
  const ctx = useContext(Context);
  const { loggedIn } = ctx;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loggedIn && Router.push("/dash");
  }, [loggedIn]);

  const handleLogIn = () => {
    if (!email || !password) {
      ctx.notify("error", "Please enter an email and password");
      return;
    }
    setLoading("Loggin In...");
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        ctx.notify("success", "Sign in successfully");
        setLoading(null);
      })
      .catch((error) => {
        setLoading(null);
        ctx.notify("error", formatAuthCode(error.code));
      });
  };

  return (
    <>
      <Title title="Login" />

      <div className="flex items-center justify-center min-h-screen">
        <div className=" grid gap-2 p-10 w-full max-w-xs bg-white rounded-xl shadow-md">
          <h1 className="text-3xl font-medium mb-8 text-center">Login</h1>
          <Input type={`email`} setValue={setEmail} placeholder="Email" />
          <Input
            type={`password`}
            setValue={setPassword}
            placeholder="Password"
          />
          <Button
            onClick={() => handleLogIn()}
            text="Login"
            icon="lock"
            loading={loading}
          />

          <p className="text-center py-2 text-gray-500">or</p>

          <ButtonLink href={`/signup`} text="Create Account" color="gray" />
          <ButtonLink href={`/recovery`} text="Reset my Password" color="gray" />
        </div>
      </div>
    </>
  );
};

export default Login;
