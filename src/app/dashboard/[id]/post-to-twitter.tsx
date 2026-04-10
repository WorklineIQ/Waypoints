"use client";

import { useState } from "react";
import { postSessionToTwitter } from "./actions";

export default function PostToTwitter({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<"idle" | "posting" | "posted" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handlePost() {
    setStatus("posting");
    const formData = new FormData();
    formData.set("session_id", sessionId);
    const result = await postSessionToTwitter(formData);
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
        Posted to Twitter/X
      </span>
    );
  }

  if (status === "error") {
    return (
      <span className="text-sm text-red-400" title={errorMsg}>
        Failed to Post
      </span>
    );
  }

  return (
    <button
      onClick={handlePost}
      disabled={status === "posting"}
      className="text-sm text-zinc-400 transition-colors hover:text-zinc-200 disabled:text-zinc-600"
    >
      {status === "posting" ? "Posting..." : "Post to X"}
    </button>
  );
}
