@AGENTS.md

# Waypoints

## What It Is
Waypoints (waypoints.fyi) is a build-in-public journal for indie makers. Start a session timer, log what you shipped, share to Twitter/X with one click. Every post branded "via Waypoints" with a link to the user's public journey page.

## Tech Stack
- Next.js 16 (app router, TypeScript)
- Supabase (auth + database)
- Vercel (hosting)
- Stripe (payments, not yet implemented)
- Twitter/X API (OAuth 2.0 + tweet posting)

## Language Rules
- Always say "shipped" not "built"
- CTA button says "Ship It" not "Submit" or "Post"
- "Drop a waypoint" not "Log a session"
- "via Waypoints" appended to every post
- Title Case on all UI text

## Database Tables (Supabase with RLS)
- profiles: id, username, terms_accepted_at, created_at
- projects: id, user_id, name, description, created_at
- sessions: id, project_id, user_id, shipped, next, blockers, duration_minutes, created_at
- twitter_connections: id, user_id, access_token, refresh_token, twitter_username, expires_at, created_at

## Free Tier Limits
- 1 project (enforced server-side)
- "via Waypoints" badge on all posts
- Twitter/X only

## Paid Tier ($7/month, not yet built)
- Unlimited projects
- Remove badge
- Additional platforms

## Key Files
- src/proxy.ts — session refresh (Next.js 16 proxy, not middleware)
- src/lib/supabase-server.ts — server-side Supabase client
- src/lib/twitter.ts — Twitter OAuth + posting helpers
- src/app/auth/ — auth actions, callback, Twitter OAuth routes
- src/app/dashboard/ — main dashboard, project pages, session timer
- src/app/[username]/ — public journey page

## Design
- Dark theme with emerald green (#34d399 to #16a34a) accents
- W logo icon in emerald gradient
- Cards with bg-zinc-900/50 depth
- Emerald gradient buttons and focus rings

## Reference
- Pricing page style: humanpost.app bottom section
