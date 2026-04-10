import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-xl font-bold text-white shadow-lg shadow-emerald-500/20">
            W
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Sign In</h1>
          <p className="mt-3 text-base text-zinc-400">
            Welcome Back to Waypoints
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-base text-red-400">
            {error}
          </div>
        )}

        <form action={signIn} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-zinc-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-4 py-2.5 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-base text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
