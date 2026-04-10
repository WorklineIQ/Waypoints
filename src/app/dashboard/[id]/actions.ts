"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { postTweet, refreshAccessToken } from "@/lib/twitter";

export async function createSession(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const projectId = formData.get("project_id") as string;
  const shipped = formData.get("shipped") as string;
  const next = formData.get("next") as string;
  const blockers = formData.get("blockers") as string;
  const durationStr = formData.get("duration_minutes") as string;
  const durationMinutes = durationStr ? parseInt(durationStr, 10) : null;

  const { error } = await supabase.from("sessions").insert({
    project_id: projectId,
    user_id: user.id,
    shipped,
    next: next || null,
    blockers: blockers || null,
    duration_minutes: durationMinutes,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/${projectId}`);
}

export async function postSessionToTwitter(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return "Not authenticated";
  }

  const sessionId = formData.get("session_id") as string;

  // Get session data
  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (!session) {
    return "Session not found";
  }

  // Get Twitter connection
  const { data: connection } = await supabase
    .from("twitter_connections")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!connection) {
    return "Twitter not connected";
  }

  // Get username for journey page link
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  // Format the tweet
  let tweet = "";
  if (session.duration_minutes) {
    const hours = Math.floor(session.duration_minutes / 60);
    const mins = session.duration_minutes % 60;
    tweet += hours > 0 ? `⏱ ${hours}h ${mins}m today\n\n` : `⏱ ${mins}m today\n\n`;
  }
  tweet += `✅ ${session.shipped}`;
  if (session.next) {
    tweet += `\n👉 ${session.next}`;
  }
  if (session.blockers) {
    tweet += `\n🚧 ${session.blockers}`;
  }
  const journeyUrl = profile ? `https://waypoints.fyi/${profile.username}` : "https://waypoints.fyi";
  tweet += `\n\n📍 via Waypoints\n${journeyUrl}`;

  return await postTweetWithRefresh(supabase, user.id, connection, tweet);
}

export async function postProjectToTwitter(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return "Not authenticated";

  const projectId = formData.get("project_id") as string;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (!project) return "Project not found";

  const { data: connection } = await supabase
    .from("twitter_connections")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!connection) return "Twitter not connected";

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("project_id", projectId);

  const totalSessions = sessions?.length ?? 0;
  const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0) ?? 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;
  const timeStr = totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${remainingMins}m`;

  let tweet = `📍 ${project.name}\n\n`;
  tweet += `✅ ${totalSessions} waypoint${totalSessions !== 1 ? "s" : ""} dropped\n`;
  tweet += `⏱ ${timeStr} shipped\n`;
  tweet += `\nFollow my journey 👇\n`;
  const journeyUrl = profile ? `https://waypoints.fyi/${profile.username}` : "https://waypoints.fyi";
  tweet += `${journeyUrl}\n\n📍 via Waypoints`;

  return await postTweetWithRefresh(supabase, user.id, connection, tweet);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function postTweetWithRefresh(supabase: any, userId: string, connection: any, tweet: string): Promise<string> {
  let accessToken = connection.access_token;
  try {
    await postTweet(accessToken, tweet);
    return "success";
  } catch (firstErr) {
    const firstMsg = firstErr instanceof Error ? firstErr.message : "Unknown error";

    try {
      const refreshed = await refreshAccessToken(connection.refresh_token);
      accessToken = refreshed.access_token;

      await supabase
        .from("twitter_connections")
        .update({
          access_token: refreshed.access_token,
          refresh_token: refreshed.refresh_token,
          expires_at: new Date(Date.now() + refreshed.expires_in * 1000).toISOString(),
        })
        .eq("user_id", userId);

      await postTweet(accessToken, tweet);
      return "success";
    } catch (refreshErr) {
      const refreshMsg = refreshErr instanceof Error ? refreshErr.message : "";
      return refreshMsg || firstMsg;
    }
  }
}
