import Image from "next/image";
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";
import Title from "../components/Title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Title title="Homepage" />

      <Header />
      <div class="relative overflow-hidden bg-gray-100/50 dark:bg-slate-900">
        <section class="relative mx-auto max-w-7xl overflow-hidden px-8 py-30 text-center">
          <h1 class="mb-6 text-5xl font-bold tracking-tight text-lime-500 md:text-7xl dark:text-emerald-500">
            Zero Hassle, <br />
            <span class="text-slate-500 dark:text-slate-400">100% Free.</span>
          </h1>
          <p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Quarta is the free, super simple money tracker. Log an expense in
            two seconds, see your balance, and get on with your day.
          </p>
          <button class="z-10 w-full cursor-pointer rounded-xl bg-lime-500 px-8 py-4 font-bold text-white shadow-md transition hover:bg-lime-400 md:w-auto dark:bg-emerald-500">
            Watch Demo
          </button>
          <div class="relative mx-auto mt-20 max-w-4xl">
            <div class="absolute inset-x-0 top-20 h-64 rounded-full bg-lime-300/30 blur-[120px]"></div>
            <div class="glass relative z-10 rounded-2xl border border-white/10 p-4 shadow-2xl/10">
              <div class="flex h-[400px] items-center justify-center rounded-xl bg-gray-100 text-slate-700">
                <p>[ Dashboard Visualization Placeholder ]</p>
              </div>
            </div>
          </div>
          <div class="absolute right-[25%] bottom-10 h-150 w-[50%] rounded-full bg-lime-300/10 blur-[100px] dark:bg-emerald-500/30" />
        </section>
      </div>

      <div class="bg-white dark:bg-slate-900">
        <section class="mx-auto max-w-7xl px-2 py-24 text-center">
          <div class="grid gap-10 md:grid-cols-3">
            <div className="rounded-lg bg-gray-100/50 p-10 text-white dark:bg-slate-800 dark:text-slate-300">
              <div class="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500/20">
                <svg
                  class="h-6 w-6 text-lime-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-bold text-lime-500">
                Lightning Fast Logging
              </h3>
              <p class="leading-relaxed text-slate-400">
                Log every coffee or rent payment in under 2 seconds. Quarta is
                built for speed, not data entry.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100/50 p-10 text-white dark:bg-slate-800 dark:text-slate-300">
              <div class="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500/20">
                <svg
                  class="h-6 w-6 text-lime-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-bold text-lime-500">
                Bucket-Based Privacy
              </h3>
              <p class="leading-relaxed text-slate-400">
                Quarta uses lightweight monthly "buckets" to keep your history
                organized and your privacy protected.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100/50 p-10 text-white dark:bg-slate-800 dark:text-slate-300">
              <div class="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-lime-500/20 dark:bg-emerald-500/20">
                <svg
                  class="h-6 w-6 text-lime-500 dark:text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 class="mb-3 text-xl font-bold text-lime-500 dark:text-emerald-500">
                Visual Clarity
              </h3>
              <p class="leading-relaxed text-slate-400">
                Beautiful, high-contrast chart that tell you exactly where your
                money went—without the math.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="relative overflow-hidden bg-gray-100/50 dark:bg-slate-600">
        {/* <div class="absolute right-[40%] -bottom-20 h-100 w-100 rounded-full bg-lime-300/10 blur-[80px]"></div> */}
        <div class="mx-auto max-w-7xl px-8 py-24">
          <div class="glass relative overflow-hidden rounded-3xl p-12 text-center">
            <h2 class="mb-6 text-6xl font-bold text-lime-500 dark:text-emerald-500">
              Stop wondering where it went.
            </h2>
            <p class="mb-8 text-slate-400">
              Join 10,000+ others mastering their money with Quarta.
            </p>

            <Link
              href="/login"
              class="rounded-xl bg-lime-500 px-10 py-4 text-2xl font-bold text-white transition hover:bg-lime-400 dark:bg-emerald-500"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full bg-white py-10 text-center dark:bg-slate-900 dark:text-slate-300">
        <p class="text-xs tracking-widest text-slate-500 uppercase">
          © 2024 Quarta Finance.
        </p>
      </footer>
    </>
  );
}
