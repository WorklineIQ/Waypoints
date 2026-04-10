"use client";

import { useState } from "react";
import { postProjectToTwitter } from "./actions";

export default function ShareProject({ projectId }: { projectId: string }) {
  const [status, setStatus] = useState<"idle" | "posting" | "posted" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handlePost() {
    setStatus("posting");
    const formData = new FormData();
    formData.set("project_id", projectId);
    const result = await postProjectToTwitter(formData);
    if (result === "success") {
      setStatus("posted");
    } else {
      setErrorMsg(result);
      setStatus("error");
    }
  }

  if (status === "posted") {
    return (
      <span className="text-sm text-green-400">
        Shared to Twitter/X
      </span>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-1">
        <span className="text-sm text-red-400">Failed to Share</span>
        <p className="text-xs text-red-400/60">{errorMsg}</p>
      </div>
    );
  }

  return (
    <button
      onClick={handlePost}
      disabled={status === "posting"}
      className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 disabled:text-zinc-600"
    >
      {status === "posting" ? "Sharing..." : "Share Project to X"}
    </button>
  );
}
