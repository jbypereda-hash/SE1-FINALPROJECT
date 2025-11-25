// src/pages/EditProfile.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useMemberProfile } from "../hooks/useMemberProfile";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useUserProfile } from "../hooks/useUserProfile";
import Button from "../components/Button";

const PRESET_GOALS = [
  "Build Muscle",
  "Improve Endurance",
  "Lose Weight",
  "Increase Flexibility",
  "General Fitness",
  "Tone Body",
  "Weight Gain",
  "Increase Strength",
  "Stress Relief",
];

// Split full name entered as:  "LastName, FirstName MiddleName"
function splitName(full: string) {
  if (!full.includes(",")) {
    return {
      lastName: "",
      firstName: full.trim(),
    };
  }

  const [last, rest] = full.split(",").map((x) => x.trim());

  return {
    lastName: last,
    firstName: rest, // already includes middle name if any
  };
}

function calculateAgeFromString(dob: string) {
  if (!dob) return 0;
  const safe = dob.replace(/-/g, "/");
  const birth = new Date(safe);
  if (isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  const d = today.getDate() - birth.getDate();
  if (m < 0 || (m === 0 && d < 0)) age--;
  return age;
}

function calculateBMI(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm) return { bmiValue: 0, bmiCategory: "N/A" };
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  const value = Number(bmi.toFixed(1));
  let category = "Obese";
  if (value === 0) category = "N/A";
  else if (value < 18.5) category = "Underweight";
  else if (value < 25) category = "Normal";
  else if (value < 30) category = "Overweight";
  return { bmiValue: value, bmiCategory: category };
}

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { member, loading } = useMemberProfile();
  const { userProfile } = useUserProfile();

  // form state
  const [name, setName] = useState(""); // <-- this is "LastName, FirstName"
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [startingWeight, setStartingWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [medical, setMedical] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // populate form
  useEffect(() => {
    if (!member || !userProfile) return;

    // Reconstruct name into "Last, First"
    const combined =
      userProfile.lastName && userProfile.firstName
        ? `${userProfile.lastName}, ${userProfile.firstName}`
        : userProfile.fullName || "";

    setName(combined);
    setDob(member.dob || "");
    setGoals(Array.isArray(member.goals) ? member.goals : []);
    setHeight(member.health?.height ? String(member.health.height) : "");
    setStartingWeight(
      member.health?.startingWeight ? String(member.health.startingWeight) : ""
    );
    setCurrentWeight(
      member.health?.currentWeight ? String(member.health.currentWeight) : ""
    );
    setGoalWeight(
      member.health?.goalWeight ? String(member.health.goalWeight) : ""
    );
    setMedical(member.health?.medicalConditions || "");
  }, [member, userProfile]);

  const toggleGoal = (g: string) => {
    setGoals((prev) => {
      const exists = prev.includes(g);
      if (exists) return prev.filter((x) => x !== g);
      if (prev.length < 3) return [...prev, g];
      const [, ...rest] = prev;
      return [...rest, g];
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!name.includes(",")) newErrors.name = 'Format must be: "Last, First"';

    if (!dob.trim()) newErrors.dob = "Please enter date of birth.";
    if (!currentWeight.trim())
      newErrors.currentWeight = "Please enter current weight.";
    if (!goalWeight.trim()) newErrors.goalWeight = "Please enter goal weight.";
    if (!startingWeight.trim())
      newErrors.startingWeight = "Please enter starting weight.";
    if (!height.trim()) newErrors.height = "Please enter height.";
    if (goals.length === 0) newErrors.goals = "Please choose at least 1 goal.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCancel = () => {
    navigate("/profile");
  };

  const onSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      // Split name
      const { firstName, lastName } = splitName(name);

      // numeric inputs
      const starting = Number(startingWeight) || 0;
      const current = Number(currentWeight) || starting;
      const goal = Number(goalWeight) || starting;
      const h = Number(height) || 0;

      // computed
      const age = calculateAgeFromString(dob);
      const { bmiValue, bmiCategory } = calculateBMI(current, h);

      // update MEMBER document (NO NAME STORED HERE)
      const memberRef = doc(db, "members", user.uid);
      await updateDoc(memberRef, {
        dob,
        goals,
        updatedAt: serverTimestamp(),
        health: {
          ...(member.health ?? {}),
          startingWeight: starting,
          currentWeight: current,
          goalWeight: goal,
          height: h,
          age,
          bmiValue,
          bmiCategory,
          medicalConditions: medical || "N/A",
        },
      });

      // update USER document (THIS IS WHERE NAME IS STORED)
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        updatedAt: serverTimestamp(),
      });

      setSaving(false);
      navigate("/profile");
    } catch (err: any) {
      console.error("Save profile error:", err);
      setSaveError(err.message || "Failed to save profile.");
      setSaving(false);
    }
  };

  const previewAge = useMemo(
    () => (dob ? calculateAgeFromString(dob) : "-"),
    [dob]
  );
  const previewBMI = useMemo(() => {
    const cw = Number(currentWeight || 0);
    const h = Number(height || 0);
    return cw && h ? calculateBMI(cw, h).bmiValue : "-";
  }, [currentWeight, height]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }

  if (!member || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No profile found.
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f13] h-full px-6 md:px-10 py-10 text-white">
      <h2 className="text-center text-shrek text-3xl md:text-4xl font-bold mb-10">
        EDIT PROFILE
      </h2>

      <form
        onSubmit={onSave}
        className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8"
      >
        {/* LEFT CARD — Name + Goals */}
        <div className="flex-1 bg-[#1c1c22] rounded-[20px] p-6">
          <label className="text-shrek text-2xl font-bold block mb-2">
            Name (Format: Last Name, First Name)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-full bg-gray-300 text-black mb-4"
            placeholder="e.g. Estrera, Yen Rose"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <hr className="border-gray-700 my-4" />

          <h3 className="text-gray-300 font-semibold mb-2">Goals</h3>
          <p className="text-xs text-gray-400 mb-3">
            Fitness Goals (Choose up to 3)
          </p>

          <div className="flex flex-wrap gap-3">
            {PRESET_GOALS.map((g) => {
              const selected = goals.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGoal(g)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selected ? "bg-shrek text-black" : "bg-donkey-10 text-black"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>

          {errors.goals && (
            <p className="text-red-400 text-sm mt-3">{errors.goals}</p>
          )}
        </div>

        {/* RIGHT CARD — Health */}
        <div className="flex-1 bg-[#1c1c22] rounded-[20px] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-300 text-sm">Starting Weight</label>
              <input
                value={startingWeight}
                onChange={(e) => setStartingWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.startingWeight && (
                <p className="text-red-400 text-xs">{errors.startingWeight}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Current Weight</label>
              <input
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.currentWeight && (
                <p className="text-red-400 text-xs">{errors.currentWeight}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Goal Weight</label>
              <input
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                placeholder="kg"
                className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.goalWeight && (
                <p className="text-red-400 text-xs">{errors.goalWeight}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-gray-300 text-sm">Height</label>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="cm"
                className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.height && (
                <p className="text-red-400 text-xs">{errors.height}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.dob && (
                <p className="text-red-400 text-xs">{errors.dob}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-300 text-sm">
              Medical Conditions (N/A if none)
            </label>
            <input
              value={medical}
              onChange={(e) => setMedical(e.target.value)}
              placeholder="e.g. Asthma, N/A"
              className="w-full px-3 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
            <div>
              Preview age: <span className="text-white ml-2">{previewAge}</span>
            </div>
            <div>
              BMI (preview):{" "}
              <span className="text-white ml-2">{previewBMI}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-2 rounded-full border-2 border-shrek text-[#d5ff5f] hover:bg-[#d5ff5f]/10"
            >
              CANCEL
            </button>

            <Button type="submit" className="shrek-btn font-bold px-8">
              {saving ? "Saving..." : "SAVE"}
            </Button>
          </div>

          {saveError && (
            <p className="text-red-400 text-center mt-3">{saveError}</p>
          )}
        </div>
      </form>
    </div>
  );
}
