'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={`text-sm px-3 py-1 rounded-full transition ${
        active ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  )
}

export default function NavBar() {
  return (
    <header className="border-b border-white/10 sticky top-0 z-40 backdrop-blur bg-[#050509]/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-white grid place-items-center text-xs font-semibold tracking-tight text-black">
            LL
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm">LinkLens</span>
            <span className="text-[11px] text-white/60">Creators. Connections. Collaborations.</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/creators">Explore</NavLink>
          <NavLink href="/auth">Sign in</NavLink>
        </nav>
      </div>
    </header>
  )
}
