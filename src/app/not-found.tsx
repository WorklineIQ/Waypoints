import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-3xl font-bold text-white shadow-lg shadow-emerald-500/20">
          W
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Lost Your Way?</h1>
        <p className="text-base text-zinc-400">
          This waypoint doesn&apos;t exist. Maybe it was never dropped.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-6 py-2.5 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
