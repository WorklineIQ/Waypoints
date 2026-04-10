import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "email" | "recovery" | null;

  const supabase = await createClient();

  // Handle token_hash flow (email confirmation opened on different device)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      return NextResponse.redirect(
        `${origin}/signin?error=${encodeURIComponent(error.message)}`
      );
    }

    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // Handle code exchange flow (same device, PKCE)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/signin?error=${encodeURIComponent(error.message)}`
      );
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
