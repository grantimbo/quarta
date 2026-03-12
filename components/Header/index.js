import { useState, useContext, useEffect } from "react";
import { Context } from "../../support/globalState";
import ButtonLink from "../ButtonLink";
import LogOut from "./Logout";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "./Logo";
import { colors, style } from "../Button";

const Header = () => {
  const ctx = useContext(Context);
  const [dropdown, showDropdown] = useState(false);
  const [theme, setTheme] = useState("system");
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const THEME_KEY = "smt-theme";

  const applyTheme = (value) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    if (value === "light") {
      root.classList.remove("dark");
    } else if (value === "dark") {
      root.classList.add("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(THEME_KEY);
    const initial =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";

    setTheme(initial);
    applyTheme(initial);
  }, []);

  return (
    <header className="shadow-sm">
      <nav className="relative z-10 flex h-16 flex-wrap items-center justify-between bg-white px-4 shadow-sm dark:bg-slate-900">
        <Link href={ctx?.loggedIn ? "/dash" : "/"} title="Quarta Dashboard">
          <Logo />
        </Link>

        {/* Theme toggle button */}
        <button
          type="button"
          aria-label="Toggle theme"
          className="hover:border-emeral-500 dark:hover:border-emeral-400 ml-2 flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 text-gray-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50"
          onClick={() => {
            const next = theme === "dark" ? "light" : "dark";
            if (typeof window !== "undefined") {
              window.localStorage.setItem(THEME_KEY, next);
            }
            applyTheme(next);
            setTheme(next);
          }}
        >
          {theme === "dark" ? (
            <span className="material-icons-round" title="Switch to light mode">
              light_mode
            </span>
          ) : (
            <span className="material-icons-round" title="Switch to dark mode">
              dark_mode
            </span>
          )}
        </button>

        {ctx?.loggedIn ? (
          <div className="flex items-center space-x-4">
            {/* Show 'Dashboard' link only if we are on the Marketing/Home page */}
            {isHomePage ? (
              <Link
                href="/dash"
                className={`${style} ${colors.green} rounded-full! px-5 py-1 md:py-2`}
              >
                <div>Dashboard</div>
                <span className="material-icons-round text-3xl">settings</span>
              </Link>
            ) : (
              <div
                className={`${style} ${colors.green} rounded-full! px-5 py-1 md:py-2`}
                onClick={() => showDropdown(!dropdown)}
              >
                {ctx?.profile?.name ? (
                  <>
                    <span className="hidden md:block">
                      Hello, {ctx?.profile?.name}
                    </span>
                    <span className="block md:hidden">Account</span>
                  </>
                ) : (
                  <span>Account</span>
                )}
                <span className="material-icons-round text-3xl">
                  account_circle
                </span>
              </div>
            )}
          </div>
        ) : (
          <ButtonLink href="/login" color="green" text="Login" icon="lock" />
        )}
      </nav>

      {dropdown && (
        <>
          <div className="fade-in fixed top-[54px] right-6 z-50 grid rounded-lg border border-slate-300 bg-white text-sm shadow-xl md:text-lg dark:border-slate-700 dark:bg-slate-800">
            <Link
              href="/dash/settings"
              className="flex items-center space-x-2 border-b border-slate-300 px-4 py-2 dark:border-slate-700"
            >
              <span className="material-icons-round text-[1.1rem]">
                settings
              </span>
              <span>Settings</span>
            </Link>

            <LogOut />
          </div>
          <div
            className="fixed top-0 bottom-0 z-40 w-full bg-white/10 dark:bg-slate-900/10"
            onClick={() => showDropdown(false)}
          />
        </>
      )}
    </header>
  );
};

export default Header;
