# SUPER BASIC: Wire this to Supabase (Step by Step)

1. Create a Supabase project.
2. Create a `profiles` table that matches the fields used in `app/onboarding/page.js`.
3. Turn on Email auth in Supabase.
4. Copy your Supabase URL and anon key into:
   - `.env.local` (for local dev)
   - Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Deploy to Vercel.

Then:

- Go to `/auth`, enter your email, and use the magic link.
- You will land on `/onboarding` and can save your profile.
- Profiles are written to the `profiles` table in Supabase.
