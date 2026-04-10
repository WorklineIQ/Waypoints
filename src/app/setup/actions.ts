"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function setupUsername(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const username = (formData.get("username") as string).toLowerCase().trim();

  if (!/^[a-z0-9-]+$/.test(username) || username.length < 3 || username.length > 30) {
    redirect("/setup?error=Username must be 3-30 characters, lowercase letters, numbers, and hyphens only");
  }

  // Check uniqueness
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (existing) {
    redirect("/setup?error=That username is already taken");
  }

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    username,
  });

  if (error) {
    redirect(`/setup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}
