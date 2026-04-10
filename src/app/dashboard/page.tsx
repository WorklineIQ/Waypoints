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

  // Fetch all sessions for stats
  const { data: allSessions } = await supabase
    .from("sessions")
    .select("created_at, duration_minutes")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalWaypoints = allSessions?.length ?? 0;
  const totalMinutes = allSessions?.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0) ?? 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  // Calculate streak (consecutive days with at least one session)
  let streak = 0;
  if (allSessions && allSessions.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sessionDates = new Set(
      allSessions.map((s) => {
        const d = new Date(s.created_at);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );
    const checkDate = new Date(today);
    // Check if there's a session today or yesterday to start the streak
    if (!sessionDates.has(checkDate.getTime())) {
      checkDate.setDate(checkDate.getDate() - 1);
    }
    while (sessionDates.has(checkDate.getTime())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // Time since last waypoint
  const lastSession = allSessions?.[0];
  let timeSinceLastStr = "";
  if (lastSession) {
    const diff = Date.now() - new Date(lastSession.created_at).getTime();
    const diffMins = Math.floor(diff / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) {
      timeSinceLastStr = `Last waypoint ${diffDays}d ago`;
    } else if (diffHours > 0) {
      timeSinceLastStr = `Last waypoint ${diffHours}h ago`;
    } else {
      timeSinceLastStr = `Last waypoint ${diffMins}m ago`;
    }
  }

  const displayName = profile.username;

  return (
    <div className="flex flex-1 justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
              W
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="mt-0.5 text-sm text-zinc-400">
                {timeSinceLastStr || "Ready to drop your first waypoint"}
              </p>
            </div>
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
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-base text-emerald-400">
            {message}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">{totalWaypoints}</p>
            <p className="text-sm text-zinc-400">Waypoints</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${remainingMins}m`}
            </p>
            <p className="text-sm text-zinc-400">Shipped</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {streak > 0 ? `${streak}d` : "0d"}
            </p>
            <p className="text-sm text-zinc-400">Streak</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/30 px-4 py-3">
          <p className="text-sm text-zinc-400">Your Public Journey Page</p>
          <a
            href={`/${profile.username}`}
            target="_blank"
            className="text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            waypoints.fyi/{profile.username}
          </a>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-medium text-zinc-300">Projects</h2>
          {(!projects || projects.length === 0) ? (
            <form action={createProject} className="space-y-3">
              <div className="flex gap-3">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Project name"
                  className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-5 py-2.5 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
                >
                  Create
                </button>
              </div>
              <input
                name="description"
                type="text"
                placeholder="Description (optional)"
                className="block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
            </form>
          ) : null}

          {projects && projects.length > 0 ? (
            <>
              <ul className="mt-4 space-y-3">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/dashboard/${project.id}`}
                      className="block rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-4 transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-emerald-500/5"
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
              <div className="mt-4 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/30 px-5 py-5 text-center">
                <p className="text-base font-medium text-zinc-300">
                  Want to Track More Projects?
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Upgrade to Pro for unlimited projects, more platforms, and remove the Waypoints badge.
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-400">
                  $7/month — Coming Soon
                </p>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/30 px-5 py-8 text-center">
              <p className="text-lg font-medium text-zinc-300">
                Every Journey Starts With a Single Waypoint
              </p>
              <p className="mt-2 text-base text-zinc-500">
                Create your first project above to start shipping.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-medium text-zinc-300">Connected Platforms</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-4">
              {twitterConnection ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-zinc-100" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <div>
                      <p className="text-base font-medium text-zinc-100">Twitter/X</p>
                      <p className="mt-0.5 text-sm text-zinc-400">
                        @{twitterConnection.twitter_username}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                    Connected
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-zinc-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    <div>
                      <p className="text-base font-medium text-zinc-100">Twitter/X</p>
                      <p className="mt-0.5 text-sm text-zinc-400">Connect to Share Your Waypoints</p>
                    </div>
                  </div>
                  <a
                    href="/auth/twitter"
                    className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-5 py-2 text-base font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110"
                  >
                    Connect
                  </a>
                </div>
              )}
            </div>

            {[
              { name: "LinkedIn", icon: <svg className="h-5 w-5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { name: "Threads", icon: <svg className="h-5 w-5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.017 4.07-.531 5.554-1.548.834-.572 1.09-.884 1.09-.884l1.27 1.607s-.384.466-1.455 1.193C17.08 23.28 14.85 23.975 12.186 24zm5.396-8.802c-.292-1.964-1.404-3.503-3.233-4.354-.988-.463-2.148-.696-3.349-.696h-.013c-.888.003-1.716.132-2.453.375v-.02a3.348 3.348 0 013.348-3.348h.013c2.545.02 4.456 1.091 5.687 3.186v4.857z"/></svg> },
              { name: "Bluesky", icon: <svg className="h-5 w-5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.584 3.493 6.173 3.158-.375-.012-.734-.05-1.078-.112-2.209-.405-4.122 1.073-2.597 3.068 1.378 1.802 4.053 2.907 5.878 2.907s2.77-.623 3-1.061c.23.438 1.175 1.061 3 1.061s4.5-1.105 5.878-2.907c1.525-1.995-.388-3.473-2.597-3.068a8.14 8.14 0 01-1.078.112c2.589.335 5.388-.531 6.173-3.158C23.622 9.418 24 4.458 24 3.768c0-.689-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z"/></svg> },
              { name: "Facebook", icon: <svg className="h-5 w-5 text-zinc-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
            ].map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-900/30 px-5 py-4 opacity-50"
              >
                <div className="flex items-center gap-3">
                  {platform.icon}
                  <p className="text-base text-zinc-400">{platform.name}</p>
                </div>
                <span className="text-sm text-zinc-600">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
