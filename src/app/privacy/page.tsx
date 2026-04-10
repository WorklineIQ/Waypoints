import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800/50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 text-sm font-bold text-white">
            W
          </div>
          <span className="text-lg font-semibold text-zinc-100">Waypoints</span>
        </Link>
      </nav>

      <div className="flex flex-1 justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-zinc-500">Last updated: April 10, 2026</p>

          <div className="space-y-6 text-base text-zinc-400 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">1. What We Collect</h2>
              <p>When you create a Waypoints account, we collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-zinc-300">Email address</strong> — used for account authentication and login</li>
                <li><strong className="text-zinc-300">Username</strong> — chosen by you, used for your public journey page</li>
                <li><strong className="text-zinc-300">Session data</strong> — what you shipped, what is next, blockers, and session duration. This is content you create and choose to log</li>
                <li><strong className="text-zinc-300">Project data</strong> — project names and descriptions you create</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">2. Third-Party Services</h2>
              <p>Waypoints uses the following third-party services to operate:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong className="text-zinc-300">Supabase</strong> — authentication and database hosting. Your email, password (hashed), and all app data are stored securely on Supabase infrastructure. See <a href="https://supabase.com/privacy" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a></li>
                <li><strong className="text-zinc-300">Vercel</strong> — application hosting and analytics. We use Vercel Web Analytics to collect anonymous page view data (no cookies, no personal data). See <a href="https://vercel.com/legal/privacy-policy" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
                <li><strong className="text-zinc-300">Twitter/X</strong> — if you connect your Twitter/X account, we store an OAuth access token and refresh token to post on your behalf. We store your Twitter username. We do not access your DMs, followers, or any other Twitter data. You can disconnect at any time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">3. How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and maintain the Waypoints service</li>
                <li>To authenticate you and keep your account secure</li>
                <li>To display your public journey page at waypoints.fyi/username</li>
                <li>To post to Twitter/X on your behalf when you click "Post to X"</li>
                <li>To calculate and display your stats (waypoints, time shipped, streak)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">4. Public Data</h2>
              <p>The following data is publicly visible by design:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your username</li>
                <li>Your project names and descriptions</li>
                <li>Your session logs (what you shipped, next steps, blockers, duration)</li>
                <li>Your stats (total waypoints, time shipped, streak)</li>
              </ul>
              <p>This is the core feature of Waypoints — building in public. If you do not want this data to be public, do not log it in Waypoints.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">5. What We Do Not Do</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>We do not sell your data to anyone</li>
                <li>We do not use your data for advertising</li>
                <li>We do not share your email with third parties</li>
                <li>We do not track you across other websites</li>
                <li>We do not use cookies for tracking (Vercel Analytics is cookie-free)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">6. Data Retention</h2>
              <p>Your data is stored for as long as you have an active Waypoints account. If you want your data deleted, contact us and we will remove your account and all associated data.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">7. Security</h2>
              <p>Passwords are hashed and never stored in plain text. All data is transmitted over HTTPS. OAuth tokens for Twitter/X are stored securely in our database with row-level security ensuring only you can access your own tokens.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">8. Children</h2>
              <p>Waypoints is not intended for use by anyone under the age of 13. We do not knowingly collect data from children.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">9. Changes</h2>
              <p>We may update this privacy policy from time to time. If we make significant changes, we will notify users through the app. Continued use of Waypoints after changes constitutes acceptance.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">10. Contact</h2>
              <p>If you have questions about this privacy policy or want to request data deletion, email us at <a href="mailto:WaypointsFYI@yahoo.com" className="text-emerald-400 hover:text-emerald-300">WaypointsFYI@yahoo.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
