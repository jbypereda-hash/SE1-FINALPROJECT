import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";
import Button from "../../components/Button";
import { useCoachProfile } from "../../hooks/useCoachProfile";

export default function CS_CoachEditProfile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  const { user, profile, loading } = useCoachProfile();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !profile) return;

    setEmail(user.email ?? "");
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPhoneNumber(user.phoneNumber ?? "");

    setTitle(profile.title ?? "");
    setDescription(profile.description ?? "");
    setTagline(profile.tagline ?? "");
  }, [user, profile]);

  const onCancel = () => navigate(-1);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;

    setSaving(true);
    setError(null);

    try {
      // update user collection
      await updateDoc(doc(db, "user", uid), {
        email,
        firstName,
        lastName,
        phoneNumber,
        updatedAt: serverTimestamp(),
      });

      // update coaches collection
      const q = query(collection(db, "coaches"), where("userId", "==", uid));
      const snap = await getDocs(q);

      if (!snap.empty) {
        await updateDoc(doc(db, "coaches", snap.docs[0].id), {
          title,
          description,
          tagline,
          updatedAt: serverTimestamp(),
        });
      }

      navigate("/CS-CoachProfile");
    } catch (err: any) {
      console.error(err);
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No profile found.
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f13] h-full px-6 md:px-10 py-10 text-white">
      <h2 className="text-center text-shrek text-3xl md:text-4xl font-bold mb-10">
        EDIT COACH PROFILE
      </h2>

      <form
        onSubmit={onSave}
        className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8"
      >
        {/* LEFT PANEL — USER INFO */}
        <div className="flex-1 bg-[#1c1c22] rounded-[20px] p-6">
          <h3 className="text-shrek text-2xl font-bold mb-6">
            Account Information
          </h3>

          <label className="text-gray-300 text-sm">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black mb-4"
          />

          <label className="text-gray-300 text-sm">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black mb-4"
          />

          <label className="text-gray-300 text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black mb-4"
          />

          <label className="text-gray-300 text-sm">Contact Number</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black"
          />
        </div>

        {/* RIGHT PANEL — COACH INFO */}
        <div className="flex-1 bg-[#1c1c22] rounded-[20px] p-6">
          <h3 className="text-shrek text-2xl font-bold mb-6">Coach Profile</h3>

          <label className="text-gray-300 text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Strength & Conditioning Coach"
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black mb-4"
          />

          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-[20px] bg-gray-300 text-black mb-4 resize-none"
          />

          <label className="text-gray-300 text-sm">Tagline</label>
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tagline"
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black"
          />

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-2 rounded-full border-2 border-shrek text-[#d5ff5f] text-xl font-bold hover:bg-[#d5ff5f]/10"
            >
              CANCEL
            </button>

            <Button type="submit" className="shrek-btn font-bold px-8 py-1">
              {saving ? "Saving..." : "SAVE"}
            </Button>
          </div>

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
}
