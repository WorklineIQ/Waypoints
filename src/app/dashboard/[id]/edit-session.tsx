"use client";

import { useState } from "react";
import { updateSession } from "./actions";

interface Session {
  id: string;
  shipped: string;
  next: string | null;
  blockers: string | null;
}

export default function EditSession({
  session,
  projectId,
}: {
  session: Session;
  projectId: string;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        Edit
      </button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await updateSession(formData);
        setEditing(false);
      }}
      className="mt-3 space-y-3 border-t border-zinc-800 pt-3"
    >
      <input type="hidden" name="session_id" value={session.id} />
      <input type="hidden" name="project_id" value={projectId} />
      <div>
        <label className="block text-sm text-zinc-400">Shipped</label>
        <textarea
          name="shipped"
          required
          rows={2}
          defaultValue={session.shipped}
          className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400">Next</label>
        <textarea
          name="next"
          rows={2}
          defaultValue={session.next ?? ""}
          className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400">Blockers</label>
        <textarea
          name="blockers"
          rows={2}
          defaultValue={session.blockers ?? ""}
          className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-4 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-lg border border-zinc-800 px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
