import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import SessionTimer from "./session-timer";
import PostToTwitter from "./post-to-twitter";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  // Check Twitter connection
  const { data: twitterConnection } = await supabase
    .from("twitter_connections")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const hasTwitter = !!twitterConnection;

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-1 justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <div>
          <Link
            href="/dashboard"
            className="text-base text-zinc-400 transition-colors hover:text-zinc-300"
          >
            &larr; Back to Projects
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {project.name}
          </h1>
          {project.description && (
            <p className="mt-1.5 text-base text-zinc-400">{project.description}</p>
          )}
        </div>

        <SessionTimer projectId={id} />

        <div>
          <h2 className="mb-4 text-xl font-medium text-zinc-300">
            Waypoints
            {sessions && sessions.length > 0 && (
              <span className="ml-2 text-base font-normal text-zinc-400">
                ({sessions.length})
              </span>
            )}
          </h2>
          {sessions && sessions.length > 0 ? (
            <ul className="space-y-4">
              {sessions.map((session) => (
                <li
                  key={session.id}
                  className="rounded-lg border border-zinc-800 px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-base font-medium text-zinc-100">
                      <span className="text-zinc-300">Shipped:</span>{" "}
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
                  {hasTwitter && (
                    <div className="mt-3 border-t border-zinc-800 pt-3">
                      <PostToTwitter sessionId={session.id} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-base text-zinc-400">
              No Waypoints Dropped Yet. Ship Something and Log It Above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
