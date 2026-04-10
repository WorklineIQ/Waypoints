import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { generateCodeVerifier, getTwitterAuthUrl } from "@/lib/twitter";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/signin", process.env.NEXT_PUBLIC_SITE_URL));
  }

  const codeVerifier = generateCodeVerifier();
  const state = crypto.randomUUID();
  const authUrl = await getTwitterAuthUrl(codeVerifier, state);

  const cookieStore = await cookies();
  cookieStore.set("twitter_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 600, // 10 minutes
    path: "/",
  });
  cookieStore.set("twitter_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  });

  return NextResponse.redirect(authUrl);
}
