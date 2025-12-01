'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setStatus('Sending magic link...')
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/onboarding` : undefined,
        },
      })
      if (error) {
        setStatus('Error: ' + error.message)
      } else {
        setStatus('Check your email for a magic link.')
      }
    } catch (err) {
      setStatus('Unexpected error: ' + err.message)
    }
  }

  return (
    <div className="pt-8 max-w-md">
      <h1 className="text-2xl font-semibold">Sign in to LinkLens</h1>
      <p className="mt-3 text-sm text-white/70">
        Use your email to get a one-time magic link. After you click it, we&apos;ll send you to onboarding
        to create your profile.
      </p>
      <form onSubmit={handleLogin} className="mt-6 space-y-3">
        <input
          className="w-full p-2.5 rounded-md bg-black/30 border border-white/15 text-sm outline-none focus:ring-2 focus:ring-white/40"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2.5 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition"
        >
          Send magic link
        </button>
      </form>
      <div className="mt-3 text-xs text-white/70 min-h-[1.25rem]">{status}</div>
      <p className="mt-4 text-xs text-white/50">
        Supabase handles auth and sessions. Make sure you configured your Supabase URL and anon key in environment
        variables for this to work.
      </p>
    </div>
  )
}
