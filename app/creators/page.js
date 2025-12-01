const sampleCreators = [
  {
    id: 1,
    name: 'Ava Chen',
    role: 'Photographer',
    location: 'Los Angeles, USA',
    niches: ['Lifestyle', 'Portraits', 'Brand'],
    travel: 'Open to US & Europe',
    instagram: 'avashoots',
  },
  {
    id: 2,
    name: 'Leo Martínez',
    role: 'Videographer',
    location: 'Barcelona, Spain',
    niches: ['Music videos', 'Fashion', 'Reels'],
    travel: 'Available worldwide',
    instagram: 'leomotion',
  },
  {
    id: 3,
    name: 'Jade Rivers',
    role: 'Model',
    location: 'Sydney, Australia',
    niches: ['Editorial', 'Swim', 'Commercial'],
    travel: 'Frequently in Bali & Tokyo',
    instagram: 'jade.rivs',
  },
]

export default function CreatorsPage() {
  return (
    <div className="pt-8">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Explore creators</h1>
          <p className="mt-2 text-sm text-white/70 max-w-xl">
            This page will eventually read from your Supabase database. For now, these cards are sample data so
            you can feel how the marketplace will look.
          </p>
        </div>
        <div className="text-xs text-white/60">
          Roles:{' '}
          <span className="font-medium text-white/90">
            Photographers • Videographers • Models
          </span>
        </div>
      </header>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {sampleCreators.map((c) => (
          <article
            key={c.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs uppercase text-white/50">{c.role}</div>
                <h2 className="text-base font-semibold">{c.name}</h2>
                <div className="text-xs text-white/60 mt-1">{c.location}</div>
              </div>
              <div className="px-2 py-1 rounded-full text-[11px] bg-white/10 text-white/80">
                {c.travel}
              </div>
            </div>
            <div className="mt-3 text-xs text-white/60">
              Niches:{' '}
              <span className="text-white/85">
                {c.niches.join(' • ')}
              </span>
            </div>
            <div className="mt-3 text-xs text-white/60">
              Instagram:{' '}
              <a
                href={`https://instagram.com/${c.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="text-white underline underline-offset-2 decoration-white/40"
              >
                @{c.instagram}
              </a>
            </div>
          </article>
        ))}
      </section>
      <p className="mt-6 text-xs text-white/50">
        When we connect Supabase, this page will show real profiles created from the onboarding flow.
      </p>
    </div>
  )
}
