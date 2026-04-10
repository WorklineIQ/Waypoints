import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-8 text-center px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-xl font-bold text-white shadow-lg shadow-emerald-500/20">
            W
          </div>
          <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
            Waypoints
          </h1>
        </div>
        <p className="text-xl text-zinc-400">
          Drop a Waypoint. Share Your Journey.
        </p>
        <div className="max-w-md space-y-3">
          <p className="text-base text-zinc-400">
            The build-in-public journal for indie makers. Start a session,
            log what you shipped, and share it to Twitter with one click.
          </p>
          <p className="text-sm text-zinc-500">
            Every update stacks into your public journey page.
            Every post links back to you.
          </p>
        </div>
        <div className="mt-2 flex gap-4">
          <Link
            href="/signin"
            className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-6 py-2.5 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-zinc-700 px-6 py-2.5 text-base font-medium text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-zinc-100"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
