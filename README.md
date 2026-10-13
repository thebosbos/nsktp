# Aeroclim — site + admin dashboard

Next.js (App Router) site backed by MongoDB, with a protected `/admin` dashboard
for managing projects, services, stats, and contact leads.

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Fill in `.env.local` (already created from `.env.example`):
   - `MONGODB_URI`: replace `<db_password>` with your real Atlas password.
   - In MongoDB Atlas → Network Access, allow your IP (or `0.0.0.0/0`, since
     Vercel's serverless functions use dynamic IPs).
   - `SESSION_SECRET`: already generated.
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`: credentials for the first
     admin account — change the password before seeding.
3. Seed the database (safe to re-run; skips collections that already have data):
   ```
   npm run seed
   ```
4. Run the dev server:
   ```
   npm run dev
   ```
   Visit http://localhost:3000 for the public site and
   http://localhost:3000/admin/login to sign in with the seeded admin.

## Deploying to Vercel

1. Push this repo to GitHub (or your git host of choice).
2. In Vercel: **Add New Project** → import the repo. Framework preset
   "Next.js" is auto-detected.
3. Add the same environment variables from `.env.local` in the Vercel
   project's **Settings → Environment Variables**:
   - `MONGODB_URI`
   - `SESSION_SECRET`
   (`SEED_ADMIN_*` vars are only needed locally to run the seed script once —
   no need to add them to Vercel.)
4. Deploy. Since the database was already seeded from your machine against
   the same Atlas cluster, the live site and admin login work immediately.
5. If you add more admins later, use `/admin/users` in the dashboard — no
   need to touch the seed script again.

## Content managed via /admin

- **Projects** — Projets page cards (title, category, image URL, description, results)
- **Services** — the 4 service blocks on Services + homepage
- **Stats** — the numbered stat tiles on the homepage, Projets page, and About page
- **Leads** — contact form submissions, with a status (new/contacted/closed)
- **Users** — additional admin accounts

## Notes

- Project/service images are plain URLs (no file upload in this version).
- The original static template is kept under `legacy-static/` for reference only —
  it's not served by the app.
