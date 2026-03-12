import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Header from "./Header";
import Loading from "../components/Loading";

export default function DashLayout({ children }) {
  const ctx = useContext(Context);
  const {  loggedIn, uid } = ctx;

  const authReady = typeof uid !== "undefined";

  useEffect(() => {
    if (!authReady) return;

    if (loggedIn === false) {
      Router.push("/login");
    }
  }, [authReady, loggedIn]);

  if (!authReady) {
    return <Loading />;
  }

  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <main className="p-2 max-w-screen-lg mx-auto mb-24 md:p-4">
            {children}
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
