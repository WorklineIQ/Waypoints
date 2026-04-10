"use client";

import { useState, useEffect, useRef } from "react";
import { createSession } from "./actions";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SessionTimer({ projectId }: { projectId: string }) {
  const [state, setState] = useState<"idle" | "running" | "ended">("idle");
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleStart() {
    startTimeRef.current = Date.now();
    setElapsed(0);
    setState("running");
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  }

  function handleEnd() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    setState("ended");
  }

  const durationMinutes = Math.max(1, Math.round(elapsed / 60));

  if (state === "idle") {
    return (
      <div>
        <h2 className="mb-4 text-xl font-medium text-zinc-300">
          Drop a Waypoint
        </h2>
        <button
          onClick={handleStart}
          className="rounded-lg bg-white px-5 py-2.5 text-base font-medium text-black transition-colors hover:bg-zinc-200"
        >
          Start Session
        </button>
      </div>
    );
  }

  if (state === "running") {
    return (
      <div>
        <h2 className="mb-4 text-xl font-medium text-zinc-300">
          Session in Progress
        </h2>
        <div className="flex items-center gap-6">
          <span className="font-mono text-4xl font-bold tracking-tight text-zinc-100">
            {formatTime(elapsed)}
          </span>
          <button
            onClick={handleEnd}
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-base font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            End Session
          </button>
        </div>
      </div>
    );
  }

  // state === "ended"
  return (
    <div>
      <h2 className="mb-2 text-xl font-medium text-zinc-300">
        Drop a Waypoint
      </h2>
      <p className="mb-4 text-base text-zinc-400">
        Session: {formatTime(elapsed)} ({durationMinutes} min)
      </p>
      <form
        action={async (formData) => {
          await createSession(formData);
          setState("idle");
          setElapsed(0);
        }}
        className="space-y-4"
      >
        <input type="hidden" name="project_id" value={projectId} />
        <input type="hidden" name="duration_minutes" value={durationMinutes} />
        <div>
          <label
            htmlFor="shipped"
            className="block text-base font-medium text-zinc-400"
          >
            What Did You Ship? *
          </label>
          <textarea
            id="shipped"
            name="shipped"
            required
            rows={2}
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            placeholder="Shipped the auth flow, connected Supabase..."
          />
        </div>
        <div>
          <label
            htmlFor="next"
            className="block text-base font-medium text-zinc-400"
          >
            What&apos;s Next?
          </label>
          <textarea
            id="next"
            name="next"
            rows={2}
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            placeholder="Working on the dashboard next..."
          />
        </div>
        <div>
          <label
            htmlFor="blockers"
            className="block text-base font-medium text-zinc-400"
          >
            Any Blockers?
          </label>
          <textarea
            id="blockers"
            name="blockers"
            rows={2}
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-base text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            placeholder="Waiting on API keys..."
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2.5 text-base font-medium text-black transition-colors hover:bg-zinc-200"
        >
          Ship It
        </button>
      </form>
    </div>
  );
}
