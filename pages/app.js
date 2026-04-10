import { useEffect } from "react";
import Router from "next/router";

export default function AppRoute() {
  useEffect(() => {
    Router.replace("/dash");
  }, []);

  return null;
}
