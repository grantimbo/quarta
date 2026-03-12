import { signOut } from "firebase/auth";
import Router from "next/router";
import { useContext } from "react";
import { Context } from "../../support/globalState";
import { auth } from "../../support/firebase";

const LogOut = () => {
  const ctx = useContext(Context);
  const handleSignOut = () => {
    if (!auth) return;
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        ctx.notify("success", "Sign out successfully");
        Router.push(`/login`);
      })
      .catch((error) => {
        // An error happened.
        ctx.notify("error", error.message);
      });
  };

  return (
    <button
      onClick={() => handleSignOut()}
      className="px-4 cursor-pointer py-2 flex items-center space-x-2"
    >
      <span className="material-icons-round text-[1.1rem]">lock_open</span>
      <span>Logout</span>
    </button>
  );
};

export default LogOut;
