'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

const CREATOR_ROLES = [
  'Photographer',
  'Videographer',
  'Model',
  'Content Creator'
]

export default function OnboardingPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // who they are
  const [type, setType] = useState('creator')

  // creator fields
  const [name, setName] = useState('')
  const [roles, setRoles] = useState([])
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [instagram, setInstagram] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [bio, setBio] = useState('')
  const [packages, setPackages] = useState('')
  const [travel, setTravel] = useState(false)
  const [travelNotes, setTravelNotes] = useState('')

  const toggleRole = (role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role))
    } else {
      setRoles([...roles, role])
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
      setLoading(false)
    }
    fetchUser()
  }, [])

  const saveCreator = async () => {
    if (!user) return alert('Not logged in')

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name,
      role: roles.join(','),
      location: `${city}, ${country}`,
      instagram,
      portfolio_url: portfolio,
      bio,
      availability: travel ? 'Traveling' : 'Local only',
      packages,
      travel_notes: travelNotes
    })

    if (error) {
      console.log(error)
      alert('Something went wrong')
    } else {
      alert('🎉 Profile saved!')
    }
  }

  if (loading) return <p className="text-white p-6">Loading...</p>
  if (!user) return <p className="text-white p-6">Please login first.</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        
        <h1 className="text-3xl font-bold">Tell us who you are</h1>

        {/* CREATOR OR HIRING */}
        <div className="flex gap-4">
          <button
            className={`${type === 'creator'
              ? 'bg-white text-black'
              : 'bg-neutral-800 text-white border border-neutral-600'} px-4 py-2 rounded-md`}
            onClick={() => setType('creator')}
          >
            I’m a Creator
          </button>

          <button
            className={`${type === 'client'
              ? 'bg-white text-black'
              : 'bg-neutral-800 text-white border border-neutral-600'} px-4 py-2 rounded-md`}
            onClick={() => setType('client')}
          >
            I’m Hiring
          </button>
        </div>

        {type === 'creator' && (
          <form className="space-y-5">
            
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
            />

            {/* ROLES */}
            <div>
              <label className="block mb-1 font-medium">Roles</label>
              <div className="flex flex-wrap gap-2">
                {CREATOR_ROLES.map(role => (
                  <button
                    type="button"
                    key={role}
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1 rounded-full border ${
                      roles.includes(role)
                        ? 'bg-white text-black border-white'
                        : 'bg-neutral-800 text-white border-neutral-600'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex gap-4">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-1/2 rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
              />
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-1/2 rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
              />
            </div>

            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram @"
              className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
            />

            <input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="Portfolio / Website Link"
              className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full h-28 rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
            />

            <textarea
              value={packages}
              onChange={(e) => setPackages(e.target.value)}
              placeholder="Describe your rates or packages"
              className="w-full h-24 rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={travel}
                onChange={() => setTravel(!travel)}
              />
              <span>I travel</span>
            </div>

            {travel && (
              <textarea
                value={travelNotes}
                onChange={(e) => setTravelNotes(e.target.value)}
                placeholder="Travel availability, dates, or notes"
                className="w-full h-20 rounded-md px-3 py-2 bg-neutral-800 border border-neutral-700 placeholder-neutral-500"
              />
            )}

            <button
              type="button"
              onClick={saveCreator}
              className="px-6 py-3 text-black bg-white rounded-md font-semibold"
            >
              Save Creator Profile
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
