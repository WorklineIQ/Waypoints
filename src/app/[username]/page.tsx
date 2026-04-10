import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} — Building in Public`,
    description: `Follow ${username}'s build-in-public journey on Waypoints.`,
    openGraph: {
      title: `${username} — Building in Public on Waypoints`,
      description: `Follow ${username}'s build-in-public journey on Waypoints.`,
      url: `https://waypoints.fyi/${username}`,
    },
    twitter: {
      card: "summary",
      title: `${username} — Building in Public on Waypoints`,
      description: `Follow ${username}'s build-in-public journey on Waypoints.`,
    },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  // Look up user by username
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  // Fetch all projects for this user
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  // Fetch all sessions for this user
  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  // Group sessions by project_id
  const sessionsByProject = new Map<string, typeof sessions>();
  for (const session of sessions ?? []) {
    const list = sessionsByProject.get(session.project_id) ?? [];
    list.push(session);
    sessionsByProject.set(session.project_id, list);
  }

  return (
    <div className="flex flex-1 justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {profile.username}
          </h1>
          <p className="mt-1.5 text-base text-zinc-400">
            Building in Public on Waypoints
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="space-y-10">
            {projects.map((project) => {
              const projectSessions = sessionsByProject.get(project.id) ?? [];
              return (
                <div key={project.id}>
                  <h2 className="text-2xl font-semibold text-zinc-100">
                    {project.name}
                  </h2>
                  {project.description && (
                    <p className="mt-1.5 text-base text-zinc-400">
                      {project.description}
                    </p>
                  )}

                  {projectSessions.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {projectSessions.map((session) => (
                        <li
                          key={session.id}
                          className="rounded-lg border border-zinc-800 px-5 py-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-base font-medium text-zinc-100">
                              {session.shipped}
                            </p>
                            <div className="flex shrink-0 items-center gap-3">
                              {session.duration_minutes && (
                                <span className="text-sm text-zinc-400">
                                  {session.duration_minutes} min
                                </span>
                              )}
                              <time className="text-sm text-zinc-500">
                                {new Date(session.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </time>
                            </div>
                          </div>
                          {session.next && (
                            <p className="mt-2 text-base text-zinc-400">
                              <span className="text-zinc-300">Next:</span>{" "}
                              {session.next}
                            </p>
                          )}
                          {session.blockers && (
                            <p className="mt-1 text-base text-zinc-400">
                              <span className="text-zinc-300">Blockers:</span>{" "}
                              {session.blockers}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-base text-zinc-500">
                      No Waypoints Dropped Yet.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-base text-zinc-400">
            No Projects Yet.
          </p>
        )}

        <footer className="border-t border-zinc-800 pt-6 text-center">
          <a
            href="https://waypoints.fyi"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-400"
          >
            Built with Waypoints &mdash; waypoints.fyi
          </a>
        </footer>
      </div>
    </div>
  );
}
