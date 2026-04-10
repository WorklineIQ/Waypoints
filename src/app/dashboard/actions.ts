"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Enforce 1 project limit on free tier
  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (count && count >= 1) {
    throw new Error("Free tier is limited to 1 project. Upgrade to Pro for unlimited projects.");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name,
    description: description || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}
