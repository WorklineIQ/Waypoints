export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Waypoints</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Drop a waypoint. Share your journey.
        </p>
        <span className="mt-4 rounded-full border border-zinc-200 px-4 py-1.5 text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          Coming soon
        </span>
      </main>
    </div>
  );
}
