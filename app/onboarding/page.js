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
  const [type, setType] = useState('creator')
  const [status, setStatus] = useState('')

  // creator fields
  const [name, setName] = useState('')
  const [roles, setRoles] = useState([])
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [instagram, setInstagram] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [bio, setBio] = useState('')

  const [rateHour, setRateHour] = useState('')
  const [rateDay, setRateDay] = useState('')
  const [packages, setPackages] = useState('')

  const [travelEnabled, setTravelEnabled] = useState(false)
  const [travelNotes, setTravelNotes] = useState('')
  const [availability, setAvailability] = useState('')

  // client fields
  const [clientName, setClientName] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [clientCity, setClientCity] = useState('')
  const [clientCountry, setClientCountry] = useState('')
  const [clientRoles, setClientRoles] = useState([])
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) setUser(data.user)
      setLoading(false)
    }
    getUser()
  }, [])

  const toggleRole = (role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role))
    } else {
      setRoles([...roles, role])
    }
  }

  const toggleClientRole = (role) => {
    if (clientRoles.includes(role)) {
      setClientRoles(clientRoles.filter(r => r !== role))
    } else {
      setClientRoles([...clientRoles, role])
    }
  }

  const saveCreator = async () => {
    setStatus('Saving creator…')

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name,
      roles,
      location_city: city,
      location_country: country,
      instagram,
      portfolio_url: portfolio,
      bio,
      rate_hour: rateHour ? Number(rateHour) : null,
      rate_day: rateDay ? Number(rateDay) : null,
      packages,
      travel_enabled: travelEnabled,
      travel_notes: travelNotes,
      availability
    })

    if (error) setStatus(error.message)
    else setStatus('Creator profile saved ✔️')
  }

  const saveClient = async () => {
    setStatus('Saving client…')

    const { error } = await supabase.from('clients').upsert({
      id: user.id,
      name: clientName,
      is_company: isCompany,
      company_name: isCompany ? companyName : null,
      location_city: clientCity,
      location_country: clientCountry,
      looking_for_roles: clientRoles,
      budget_min: budgetMin ? Number(budgetMin) : null,
      budget_max: budgetMax ? Number(budgetMax) : null,
      project_description: projectDescription,
      contact_email: contactEmail
    })

    if (error) setStatus(error.message)
    else setStatus('Client profile saved ✔️')
  }

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <div>Please login first</div>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Tell us who you are</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${type === 'creator' ? 'bg-white text-black' : 'bg-gray-800'}`}
          onClick={() => setType('creator')}
        >
          I’m a Creator
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${type === 'client' ? 'bg-white text-black' : 'bg-gray-800'}`}
          onClick={() => setType('client')}
        >
          I’m Hiring
        </button>
      </div>

      {type === 'creator' && (
        <form className="space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="input" />
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="input" />
          <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" className="input" />
          <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Instagram @username" className="input" />
          <input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="Portfolio link" className="input" />

          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="input" />

          <div>
            <p className="text-sm mb-2">Roles</p>
            <div className="flex gap-2 flex-wrap">
              {CREATOR_ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1 rounded-full border ${roles.includes(role) ? 'bg-white text-black' : 'border-gray-500'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <input type="number" value={rateHour} onChange={e => setRateHour(e.target.value)} placeholder="Hourly Rate $" className="input" />
          <input type="number" value={rateDay} onChange={e => setRateDay(e.target.value)} placeholder="Day Rate $" className="input" />
          <textarea value={packages} onChange={e => setPackages(e.target.value)} placeholder="Packages" className="input" />

          <div className="flex items-center gap-3">
            <input type="checkbox" checked={travelEnabled} onChange={() => setTravelEnabled(!travelEnabled)} />
            <label>I travel</label>
          </div>

          {travelEnabled && (
            <input value={travelNotes} onChange={e => setTravelNotes(e.target.value)} placeholder="Travel notes" className="input" />
          )}

          <input value={availability} onChange={e => setAvailability(e.target.value)} placeholder="Availability" className="input" />

          <button type="button" onClick={saveCreator} className="bg-white text-black px-4 py-2 rounded-lg">
            Save Creator Profile
          </button>
        </form>
      )}

      {type === 'client' && (
        <form className="space-y-4">
          <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Your name" className="input" />

          <div className="flex gap-3">
            <input type="checkbox" checked={isCompany} onChange={() => setIsCompany(!isCompany)} />
            <label>I am a company</label>
          </div>

          {isCompany && (
            <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company name" className="input" />
          )}

          <input value={clientCity} onChange={e => setClientCity(e.target.value)} placeholder="City" className="input" />
          <input value={clientCountry} onChange={e => setClientCountry(e.target.value)} placeholder="Country" className="input" />

          <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)} placeholder="Project details" className="input" />

          <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="Contact email" className="input" />

          <button type="button" onClick={saveClient} className="bg-white text-black px-4 py-2 rounded-lg">
            Save Client Profile
          </button>
        </form>
      )}

      <p className="mt-4 text-sm">{status}</p>
    </div>
  )
}

