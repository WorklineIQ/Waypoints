import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { signOut } from "@/app/auth/actions";
import { createProject } from "./actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Redirect to setup if no username
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/setup");
  }

  // Check Twitter connection
  const { data: twitterConnection } = await supabase
    .from("twitter_connections")
    .select("twitter_username")
    .eq("user_id", user.id)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-1 justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Your Projects</h1>
            <p className="mt-1.5 text-base text-zinc-400">{user.email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-zinc-800 px-5 py-2 text-base text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              Sign Out
            </button>
          </form>
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

        <div className="rounded-lg border border-zinc-800 px-5 py-4">
          {twitterConnection ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-zinc-100">Twitter/X Connected</p>
                <p className="mt-0.5 text-sm text-zinc-400">
                  @{twitterConnection.twitter_username}
                </p>
              </div>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                Connected
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-zinc-100">Twitter/X</p>
                <p className="mt-0.5 text-sm text-zinc-400">
                  Connect to Share Your Waypoints
                </p>
              </div>
              <a
                href="/auth/twitter"
                className="rounded-lg bg-white px-5 py-2 text-base font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Connect
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {["LinkedIn", "Threads", "Bluesky", "Facebook"].map((platform) => (
            <div
              key={platform}
              className="flex items-center justify-between rounded-lg border border-zinc-800/50 px-4 py-3 opacity-50"
            >
              <p className="text-base text-zinc-400">{platform}</p>
              <span className="text-sm text-zinc-600">Coming Soon</span>
            </div>
          ))}
        </div>

        <form action={createProject} className="space-y-3">
          <div className="flex gap-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Project name"
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-2.5 text-base font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Create
            </button>
          </div>
          <input
            name="description"
            type="text"
            placeholder="Description (optional)"
            className="block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </form>

        {projects && projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/dashboard/${project.id}`}
                  className="block rounded-lg border border-zinc-800 px-5 py-4 transition-colors hover:border-zinc-600"
                >
                  <h2 className="text-lg font-medium text-zinc-100">{project.name}</h2>
                  {project.description && (
                    <p className="mt-1 text-base text-zinc-400">
                      {project.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-base text-zinc-400">
            No Projects Yet. Create One to Start Dropping Waypoints.
          </p>
        )}
      </div>
    </div>
  );
}
