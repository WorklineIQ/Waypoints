import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-6xl font-bold tracking-tight">Waypoints</h1>
        <p className="text-xl text-zinc-400">
          Drop a Waypoint. Share Your Journey.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/signin"
            className="rounded-lg bg-white px-6 py-2.5 text-base font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-zinc-700 px-6 py-2.5 text-base font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
