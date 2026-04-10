import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Sign Up</h1>
          <p className="mt-3 text-base text-zinc-400">
            Start Dropping Waypoints
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-base text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-base text-green-400">
            {message}
          </div>
        )}

        <form action={signUp} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
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
              minLength={6}
              className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-2.5 text-base font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-base text-zinc-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-zinc-300 hover:text-white">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
