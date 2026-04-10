# Waypoints — Build Progress

## What is Waypoints
A build-in-public journal for indie makers. Users start a session timer, log what they shipped, and share updates to multiple social platforms at once with one click. Every post is branded "via Waypoints" to drive viral growth.

**Domain:** waypoints.fyi (purchased on Namecheap, $6.98/yr flat)
**Stack:** Next.js (app router, TypeScript), Supabase, Vercel, GitHub
**Repo:** github.com/WaypointsFYI/Waypoints (private)

---

## Completed Tonight (Apr 9, 2026)

### Infrastructure
- [x] Domain purchased — waypoints.fyi
- [x] GitHub repo created — WaypointsFYI/Waypoints
- [x] Next.js project set up with TypeScript and app router
- [x] Deployed to Vercel
- [x] Custom domain connected — waypoints.fyi live with SSL
- [x] Supabase project created (WaypointsFYI org)
- [x] Supabase connected to Next.js via .env.local

### Auth
- [x] Sign up page at /signup
- [x] Sign in page at /signin
- [x] Email confirmation flow working
- [x] Auth callback at /auth/callback
- [x] Redirect to /dashboard after sign in
- [x] Protected routes via middleware

### Database Tables (all in Supabase with RLS enabled)
- [x] profiles — id, username (unique), created_at
- [x] projects — id, user_id, name, description, created_at
- [x] sessions — id, project_id, user_id, shipped, next, blockers, created_at

### Features Built
- [x] Homepage — "Waypoints / Drop a waypoint. Share your journey. / Coming soon"
- [x] Dashboard — shows user's projects, create new project form
- [x] Project page at /dashboard/[id] — "Drop a waypoint" form with 3 fields
- [x] Session form fields: "What did you ship?" / "What's next?" / "Any blockers?"
- [x] "Ship it" button (per language rules)
- [x] Sessions list showing below form after logging
- [x] Username setup page at /setup
- [x] Public journey page at /[username] — shows all projects and sessions
- [x] "Built with Waypoints — waypoints.fyi" footer on public pages
- [x] Session timer — Start session / End session with duration tracking
- [x] Duration saved to sessions table and shown on public journey page

---

## Phase 1 Remaining
- [ ] Twitter/X OAuth connection
- [ ] One-click post to Twitter with "via Waypoints" appended
- [ ] Post format: "⏱ Xh Xm today\nShipped: X\nNext: X\n\n— via Waypoints"

## Phase 2 (after Phase 1 has users)
- [ ] Additional platforms — LinkedIn, Threads, Bluesky, Facebook
- [ ] Stats on public page — total hours, sessions this week, streak
- [ ] Stripe payments — $7/month to remove badge, unlock unlimited platforms
- [ ] Resend for transactional emails (replace Supabase default emails)

## Phase 3 (after people pay)
- [ ] Session post vs Project post format
- [ ] Multiple projects per user
- [ ] Analytics

---

## Pricing
- Free: connect 2 platforms, "via Waypoints" badge always on
- Paid ($7/month): unlimited platforms, remove badge

---

## Language Rules (always follow these)
- "What did you ship?" not "What did you build?"
- "Ship it" as the submit button
- "Drop a waypoint" not "Log a session"
- "via Waypoints" appended to every post
- "Waypoints" not "waypoints" in UI text

---

## Environment Variables needed in .env.local
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL (http://localhost:3000 locally, https://waypoints.fyi in prod)

## Environment Variables needed in Vercel
- Same as above but with production values

---

## Accounts & Services
- GitHub: WaypointsFYI account
- Vercel: existing account (same as WorklineIQ)
- Supabase: WaypointsFYI org (separate from WorklineIQ)
- Domain: Namecheap — waypoints.fyi
- Email: WaypointsFYI@yahoo.com

---

## Next Session — Start Here
1. Finish the session timer if not complete
2. Build Twitter/X OAuth connection
3. Build one-click post to Twitter
4. Test full flow: start timer → ship → post to Twitter
5. Push to GitHub and deploy to Vercel
6. Add Supabase env vars to Vercel dashboard
7. Test on live waypoints.fyi domain
