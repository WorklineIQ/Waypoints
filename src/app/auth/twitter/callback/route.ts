import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { exchangeCodeForToken, getTwitterUsername } from "@/lib/twitter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const cookieStore = await cookies();
  const storedVerifier = cookieStore.get("twitter_code_verifier")?.value;
  const storedState = cookieStore.get("twitter_oauth_state")?.value;

  // Clean up cookies
  cookieStore.delete("twitter_code_verifier");
  cookieStore.delete("twitter_oauth_state");

  if (!code || !storedVerifier || !state || state !== storedState) {
    return NextResponse.redirect(
      `${origin}/dashboard?error=${encodeURIComponent("Twitter authorization failed")}`
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/signin`);
  }

  try {
    const tokens = await exchangeCodeForToken(code, storedVerifier);
    const twitterUsername = await getTwitterUsername(tokens.access_token);

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    // Upsert — update if connection already exists
    const { error } = await supabase.from("twitter_connections").upsert(
      {
        user_id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        twitter_username: twitterUsername,
        expires_at: expiresAt,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      return NextResponse.redirect(
        `${origin}/dashboard?error=${encodeURIComponent(error.message)}`
      );
    }

    return NextResponse.redirect(
      `${origin}/dashboard?message=${encodeURIComponent("Twitter/X connected successfully")}`
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.redirect(
      `${origin}/dashboard?error=${encodeURIComponent(message)}`
    );
  }
}
