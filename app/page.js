import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="pt-8">
      <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Platform • Creator marketplace</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            A home for photographers, videographers & models to get booked worldwide.
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/70 max-w-xl">
            LinkLens is a global platform where creators build real profiles, share their work,
            set travel plans and get booked without drowning in DMs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              🌍 Global — not tied to one city
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              📸 Photographers • 🎥 Videographers • 🧍‍♀️ Models
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              ✉️ Built for real bookings, not clout
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link
              href="/creators"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Explore creators
            </Link>
            <Link
              href="/auth"
              className="text-sm text-white/70 hover:text-white/100 underline-offset-4 hover:underline"
            >
              I&apos;m a creator — claim my profile
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="text-lg font-medium">What you&apos;ll be able to do</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Sign up with email and create a LinkLens profile</li>
            <li>• Choose your role: photographer, videographer or model</li>
            <li>• Add your bio, location, Instagram & portfolio link</li>
            <li>• Show up in the global creator search (by role & location)</li>
          </ul>
          <p className="mt-4 text-xs text-white/50">
            Auth & database are wired to Supabase. This starter gives you the foundation for a real platform MVP.
          </p>
        </div>
      </section>
    </div>
  )
}
