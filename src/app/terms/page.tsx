import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-zinc-500">Last updated: April 10, 2026</p>

          <div className="space-y-6 text-base text-zinc-400 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">1. Acceptance</h2>
              <p>By creating an account or using Waypoints (waypoints.fyi), you agree to these terms. If you do not agree, do not use the service.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">2. What Waypoints Is</h2>
              <p>Waypoints is a build-in-public journaling tool. You can log what you shipped, track your time, and share updates to connected social platforms. Your session logs, project names, and stats are displayed publicly on your journey page at waypoints.fyi/username.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">3. Your Account</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>You must provide a valid email address to create an account</li>
                <li>You are responsible for keeping your password secure</li>
                <li>You must be at least 13 years old to use Waypoints</li>
                <li>One account per person. Do not create multiple accounts</li>
                <li>You are responsible for all activity on your account</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">4. Your Content</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>You own the content you create on Waypoints (session logs, project descriptions)</li>
                <li>By using Waypoints, you grant us permission to display your content publicly on your journey page and in tweets posted on your behalf</li>
                <li>Do not post content that is illegal, harmful, abusive, or violates the rights of others</li>
                <li>We reserve the right to remove content that violates these terms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">5. Free and Paid Plans</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Waypoints offers a free plan with limited features (1 project, 2 platforms, "via Waypoints" badge on posts)</li>
                <li>A paid Pro plan ($7/month) will be available in the future with unlimited projects, additional platforms, and the option to remove the Waypoints badge</li>
                <li>We reserve the right to change pricing with 30 days notice to existing subscribers</li>
                <li>Free plan features may change as the product evolves</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">6. Payments and Billing</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Paid subscriptions are billed monthly through Stripe</li>
                <li>Payments are non-refundable except where required by law</li>
                <li>You can cancel your subscription at any time. Your Pro features will remain active until the end of the billing period</li>
                <li>If payment fails, your account will revert to the free plan after a grace period</li>
                <li>All prices are in USD</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">7. Third-Party Services</h2>
              <p>Waypoints connects to third-party platforms (Twitter/X and others in the future). When you connect a platform:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You authorize Waypoints to post on your behalf</li>
                <li>You are responsible for the content posted to your accounts</li>
                <li>Waypoints is not responsible for changes to third-party platform policies, API limits, or service interruptions</li>
                <li>You can disconnect any platform at any time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">8. Availability</h2>
              <p>Waypoints is provided "as is." We do our best to keep the service running, but we do not guarantee 100% uptime. We are not liable for any data loss, downtime, or service interruptions.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">9. Termination</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>You can delete your account at any time by contacting us</li>
                <li>We may suspend or terminate accounts that violate these terms</li>
                <li>On termination, your data will be deleted unless required by law to retain it</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">10. Limitation of Liability</h2>
              <p>Waypoints is a small indie product. To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability is limited to the amount you have paid us in the past 12 months.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">11. Changes</h2>
              <p>We may update these terms from time to time. If we make significant changes, we will notify users through the app. Continued use of Waypoints after changes constitutes acceptance.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-zinc-200">12. Contact</h2>
              <p>Questions about these terms? Email us at <a href="mailto:WaypointsFYI@yahoo.com" className="text-emerald-400 hover:text-emerald-300">WaypointsFYI@yahoo.com</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
