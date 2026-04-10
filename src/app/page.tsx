import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 text-sm font-bold text-white">
            W
          </div>
          <span className="text-lg font-semibold text-zinc-100">Waypoints</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="hidden sm:block px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-3 sm:px-4 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110 whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8 px-6 text-center">
        <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-2xl sm:text-6xl font-bold tracking-tight text-transparent">
          <span className="sm:hidden">Drop a Waypoint. Share Your Journey.</span>
          <span className="hidden sm:inline">Drop a Waypoint.<br />Share Your Journey.</span>
        </h1>
        <p className="max-w-sm sm:max-w-lg text-sm sm:text-lg text-zinc-400">
          The build-in-public journal for indie makers. Start a session,
          log what you shipped, and share it to Twitter with one click.
        </p>
        <div className="mt-2 flex gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
          >
            Start Shipping
          </Link>
        </div>
        <p className="text-sm text-zinc-600">
          Free to use. No credit card required.
        </p>
      </main>
    </div>
  );
}
