"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // FORM FIELDS
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [portfolio_url, setPortfolioUrl] = useState("");
  const [availability, setAvailability] = useState("");
  const [travel, setTravel] = useState(false);
  const [packages, setPackages] = useState("");
  const [travel_notes, setTravelNotes] = useState("");

  //--------------------------------------------------------------
  // GET LOGGED IN USER
  //--------------------------------------------------------------
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return;
      setUser(data.user);
    }
    loadUser();
  }, []);

  if (!user) return <div className="p-8 text-white">Please log in first.</div>;

  //--------------------------------------------------------------
  // SAVE PROFILE TO SUPABASE
  //--------------------------------------------------------------
  async function saveCreatorProfile() {
    setLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        name,
        role,
        location,
        bio,
        instagram,
        portfolio_url,
        availability,
        travel,
        packages,
        travel_notes,
      };

      const { data, error } = await supabase
        .from("profiles")
        .insert(profileData)
        .onConflict("user_id") // 🔥 THIS IS THE FIX
        .merge();

      if (error) {
        console.error("Supabase Error:", error);
        alert("❌ Something went wrong saving your profile.");
      } else {
        alert("✅ Profile saved successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  //--------------------------------------------------------------
  // UI
  //--------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tell us who you are
        </h1>

        <input
          className="input w-full"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="Role (Photographer, Model, etc)"
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="Location (City, Country)"
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="input w-full"
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="@instagram"
          onChange={(e) => setInstagram(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="Portfolio Link"
          onChange={(e) => setPortfolioUrl(e.target.value)}
        />

        <input
          className="input w-full"
          placeholder="Availability (Weekends, Full time, etc)"
          onChange={(e) => setAvailability(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={travel}
            onChange={(e) => setTravel(e.target.checked)}
          />
          <span>I travel</span>
        </div>

        <textarea
          className="input w-full"
          placeholder="Travel notes (cities, flexible, etc)"
          onChange={(e) => setTravelNotes(e.target.value)}
        />

        <textarea
          className="input w-full"
          placeholder="Packages / Pricing"
          onChange={(e) => setPackages(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={saveCreatorProfile}
          className="bg-white text-black w-full py-3 rounded-md font-semibold mt-4"
        >
          {loading ? "Saving..." : "Save Creator Profile"}
        </button>
      </div>
    </div>
  );
}

/* ---- Reusable input styling ---- */
const inputStyles = `
input.input, textarea.input {
  background: #121212;
  border: 1px solid #333;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
}
input.input:focus, textarea.input:focus {
  border: 1px solid #888;
}
`;

