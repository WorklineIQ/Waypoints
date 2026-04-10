import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { setupUsername } from "./actions";

export default async function SetupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Already has a profile — skip setup
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-xl font-bold text-white shadow-lg shadow-emerald-500/20">
            W
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Choose a Username</h1>
          <p className="mt-3 text-base text-zinc-400">
            This Will Be Your Public Journey Page at waypoints.fyi/username
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-base text-red-400">
            {error}
          </div>
        )}

        <form action={setupUsername} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-base font-medium text-zinc-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-z0-9-]+"
              title="Lowercase letters, numbers, and hyphens only"
              className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              placeholder="your-username"
            />
            <p className="mt-1.5 text-sm text-zinc-500">
              Lowercase letters, numbers, and hyphens only
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-4 py-2.5 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
          >
            Claim Username
          </button>
        </form>
      </div>
    </div>
  );
}
