"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [packages, setPackages] = useState("");
  const [travel, setTravel] = useState(false);
  const [travelNotes, setTravelNotes] = useState("");

  // Load logged in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  if (!user) return <div className="p-6 text-white">Please login first</div>;

  const saveCreator = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          name: name,
          role: role,
          location: location,
          instagram: instagram,
          portfolio_url: portfolio,
          bio: bio,
          availability: availability,
          packages: packages,
          travel: travel,
          travel_notes: travelNotes,
        });

      if (error) {
        console.error(error);
        alert("Error saving profile: " + error.message);
        return;
      }

      alert("🎉 Profile saved successfully!");
      router.push("/explore");
    } catch (err) {
      alert("Unexpected error: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>

      <input
        placeholder="Your name"
        className="input mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Your role (Photographer / Creator / Model)"
        className="input mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        placeholder="Location (City, State, Country)"
        className="input mb-3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="Instagram @username"
        className="input mb-3"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <input
        placeholder="Portfolio URL"
        className="input mb-3"
        value={portfolio}
        onChange={(e) => setPortfolio(e.target.value)}
      />

      <textarea
        placeholder="Short bio"
        className="input mb-3"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <textarea
        placeholder="Availability"
        className="input mb-3"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />

      <textarea
        placeholder="Packages (pricing, deliverables, details)"
        className="input mb-3"
        value={packages}
        onChange={(e) => setPackages(e.target.value)}
      />

      <div className="flex gap-2 items-center mb-3">
        <input
          type="checkbox"
          checked={travel}
          onChange={() => setTravel(!travel)}
        />
        <span>I travel</span>
      </div>

      <textarea
        placeholder="Travel notes / Where you travel"
        className="input mb-6"
        value={travelNotes}
        onChange={(e) => setTravelNotes(e.target.value)}
      />

      <button
        onClick={saveCreator}
        className="bg-white text-black px-4 py-3 rounded-lg w-full"
      >
        Save Creator Profile
      </button>
    </div>
  );
}
