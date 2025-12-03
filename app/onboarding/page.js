'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function OnboardingPage() {
  const router = useRouter()

  // auth
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // profile fields
  const [type, setType] = useState('creator')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [instagram, setInstagram] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [availability, setAvailability] = useState('')
  const [travel, setTravel] = useState(false)
  const [packages, setPackages] = useState('')
  const [travelNotes, setTravelNotes] = useState('')

  // client fields
  const [budget, setBudget] = useState('')
  const [city, setCity] = useState('')
  const [rolesNeeded, setRolesNeeded] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    getUser()
  }, [])

  const saveProfile = async () => {
    if (!user) return alert("Please log in first.")

    const profileData = {
      user_id: user.id,
      name,
      role,
      location,
      bio,
      instagram,
      portfolio_url: portfolio,
      availability,
      travel,
      packages,
      travel_notes: travelNotes,
    }

    // Save or update
    const { error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'user_id' })

    if (error) {
      console.error(error)
      alert("Something went wrong")
      return
    }

    alert("Profile saved!")
    router.push('/home')
  }

  const saveClient = async () => {
    if (!user) return alert("Please log in first.")

    const payload = {
      creator_id: null,
      client_id: user.id,
      client_name: name,
      client_email: user.email,
      requested_roles: rolesNeeded,
      message: bio,
      budget_min: budget,
      location_city: city,
    }

    const { error } = await supabase.from('inquiries').insert(payload)

    if (error) {
      console.error(error)
      alert("Something went wrong")
      return
    }

    alert("Client profile saved!")
    router.push('/home')
  }

  if (loading) return <div className="text-white p-8">Loading...</div>
  if (!user) return <div className="text-white p-8">You must sign in first.</div>

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">

      <h1 className="text-4xl font-bold mb-6">Tell us who you are</h1>

      <div className="flex gap-6 mb-10">
        <button
          className={`px-6 py-2 rounded-lg ${type === 'creator' ? 'bg-white text-black' : 'bg-gray-700'}`}
          onClick={() => setType('creator')}
        >
          I’m a Creator
        </button>

        <button
          className={`px-6 py-2 rounded-lg ${type === 'client' ? 'bg-white text-black' : 'bg-gray-700'}`}
          onClick={() => setType('client')}
        >
          I’m Hiring
        </button>
      </div>

      {/* ───────── CREATOR FORM ───────── */}
      {type === 'creator' && (
        <div className="space-y-4">

          <input className="input" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Primary Role (Photographer, Model…)" onChange={(e) => setRole(e.target.value)} />
          <input className="input" placeholder="City, Country" onChange={(e) => setLocation(e.target.value)} />
          <textarea className="input" placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
          <input className="input" placeholder="Instagram @" onChange={(e) => setInstagram(e.target.value)} />
          <input className="input" placeholder="Portfolio link" onChange={(e) => setPortfolio(e.target.value)} />
          <input className="input" placeholder="Availability" onChange={(e) => setAvailability(e.target.value)} />
          <textarea className="input" placeholder="Packages / Rates" onChange={(e) => setPackages(e.target.value)} />

          <label className="flex gap-2 items-center">
            <input type="checkbox" onChange={(e) => setTravel(e.target.checked)} />
            I travel
          </label>

          <textarea className="input" placeholder="Travel notes" onChange={(e) => setTravelNotes(e.target.value)} />

          <button onClick={saveProfile} className="button-primary">Save Creator Profile</button>
        </div>
      )}

      {/* ───────── CLIENT FORM ───────── */}
      {type === 'client' && (
        <div className="space-y-4">

          <input className="input" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
          <textarea className="input" placeholder="What are you looking for?" onChange={(e) => setRolesNeeded(e.target.value)} />
          <input className="input" placeholder="City" onChange={(e) => setCity(e.target.value)} />
          <input className="input" placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
          <textarea className="input" placeholder="Project description" onChange={(e) => setBio(e.target.value)} />

          <button onClick={saveClient} className="button-primary">Save Client Profile</button>
        </div>
      )}
    </div>
  )
}
