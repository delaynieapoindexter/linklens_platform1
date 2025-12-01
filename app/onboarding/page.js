'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

const roles = ['Photographer', 'Videographer', 'Model']

export default function OnboardingPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('Photographer')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [instagram, setInstagram] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        setStatus('You need to log in via email first.')
        setLoading(false)
        return
      }
      setUser(data.user)
      setLoading(false)
    }
    loadUser()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) {
      setStatus('No user session. Please sign in again.')
      return
    }
    setStatus('Saving profile...')
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name,
        role,
        location,
        bio,
        instagram,
        portfolio_url: portfolio,
      })
      if (error) {
        setStatus('Error: ' + error.message)
      } else {
        setStatus('Profile saved! 🎉')
      }
    } catch (err) {
      setStatus('Unexpected error: ' + err.message)
    }
  }

  if (loading) {
    return <div className="pt-8 text-sm text-white/70">Checking your session...</div>
  }

  return (
    <div className="pt-8 max-w-xl">
      <h1 className="text-2xl font-semibold">Create your creator profile</h1>
      <p className="mt-3 text-sm text-white/70">
        This info will be used to show you in the LinkLens creator search once you hook the front-end up to
        your Supabase database.
      </p>
      {!user && (
        <p className="mt-3 text-sm text-red-300">
          No active session found. Go back to the Sign in page and request a magic link.
        </p>
      )}
      {user && (
        <form onSubmit={handleSave} className="mt-6 space-y-4 text-sm">
          <div>
            <label className="block mb-1 text-white/80">Display name</label>
            <input
              className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or handle"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-white/80">Role</label>
            <select
              className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white/80">Location</label>
            <input
              className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="block mb-1 text-white/80">Short bio</label>
            <textarea
              className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="What do you shoot, what do you love working on?"
            />
          </div>
          <div>
            <label className="block mb-1 text-white/80">Instagram handle</label>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">@</span>
              <input
                className="flex-1 p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="your.handle"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-white/80">Portfolio URL</label>
            <input
              className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 outline-none focus:ring-2 focus:ring-white/40"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="Link to your site, drive, notion, etc."
            />
          </div>
          <button
            type="submit"
            className="w-full p-2.5 rounded-md bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Save profile
          </button>
        </form>
      )}
      <div className="mt-3 text-xs text-white/70 min-h-[1.25rem]">{status}</div>
      <p className="mt-4 text-xs text-white/50">
        For this to work end-to-end, make sure you have a <code>profiles</code> table in Supabase with an <code>id</code> column
        that matches <code>auth.users.id</code>, plus the other fields used here. See README_SUPABASE_STEP_BY_STEP.md.
      </p>
    </div>
  )
}
