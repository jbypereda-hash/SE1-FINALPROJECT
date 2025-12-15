// components/RegistrationDialog.tsx
import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { FirestoreError } from "firebase/firestore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

interface FormState {
  height: string;
  dob: string;
  goals: string[];
  currentWeight: string;
  goalWeight: string;
  medical: string;
}

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

export default function RegistrationDialog({
  isOpen,
  onClose,
  onComplete,
}: Props) {
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  const [form, setForm] = useState<FormState>({
    height: "",
    dob: "",
    goals: [],
    currentWeight: "",
    goalWeight: "",
    medical: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // open animation
  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const t = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // close animation
  useEffect(() => {
    if (!showContent && !isOpen) {
      const t = setTimeout(() => setRenderModal(false), 400);
      return () => clearTimeout(t);
    }
  }, [showContent, isOpen]);

  // reset state every open
  useEffect(() => {
    if (isOpen) {
      setForm({
        height: "",
        dob: "",
        goals: [],
        currentWeight: "",
        goalWeight: "",
        medical: "",
      });
      setErrors({});
      setLoading(false);
      setSuccess(false);
      setSaveError(null);
    }
  }, [isOpen]);

  const toggleGoal = (goal: string) => {
    setForm((prev) => {
      const exists = prev.goals.includes(goal);
      if (exists)
        return { ...prev, goals: prev.goals.filter((g) => g !== goal) };
      if (prev.goals.length >= 3) return prev;
      return { ...prev, goals: [...prev.goals, goal] };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSaveError(null);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.height.trim()) newErrors.height = "Please enter your height.";
    if (!form.dob.trim()) newErrors.dob = "Please enter date of birth.";
    if (form.goals.length === 0)
      newErrors.goals = "Please choose at least one fitness goal.";
    if (!form.currentWeight.trim())
      newErrors.currentWeight = "Please enter current weight.";
    if (!form.goalWeight.trim())
      newErrors.goalWeight = "Please enter your goal weight.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save to Firestore
  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSaveError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found.");

      const starting = Number(form.currentWeight) || 0;
      const current = starting;
      const goal = Number(form.goalWeight) || starting;
      const height = Number(form.height) || 0;

      const bmiValue =
        height > 0 ? +(current / (height / 100) ** 2).toFixed(1) : 0;

      const bmiCategory =
        bmiValue === 0
          ? "N/A"
          : bmiValue < 18.5
          ? "Underweight"
          : bmiValue < 25
          ? "Normal"
          : bmiValue < 30
          ? "Overweight"
          : "Obese";

      const memberDoc = {
        uid: user.uid,
        name: user.displayName || "",
        membershipType: "Member",
        validUntil: "",
        goals: form.goals,
        dob: form.dob,
        createdAt: serverTimestamp(),

        health: {
          startingWeight: starting,
          currentWeight: current,
          goalWeight: goal,
          height,
          bmiValue,
          bmiCategory,
          age: 0,
          medicalConditions: form.medical || "N/A",
        },
      };

      await setDoc(doc(db, "members", user.uid), memberDoc);

      setSuccess(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
        onClose();
        onComplete?.();
        window.location.assign("/profile");
      }, 900);
    } catch (err) {
      const msg =
        (err as Error)?.message ||
        (err as FirestoreError)?.message ||
        "Failed to save profile. Try again.";

      console.error("Save member profile error:", err);
      setSaveError(msg);
      setLoading(false);
    }
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-600 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        className={`bg-black-35 px-12 py-6 rounded-2xl w-[560px] text-center text-white relative transform transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${
            showContent
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-6"
          }
        `}
      >
        <Button
          onClick={onClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12" />
        </Button>

        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        <h2 className="text-shrek text-5xl font-bold">CORE LAB</h2>
        <p className="mb-4 text-2xl">Set up your fitness profile!</p>

        <form onSubmit={handleSave} className="text-left space-y-4 mt-2">
          {/* Height — now takes full width */}
          <div>
            <label className="text-sm text-gray-300">Height (cm):</label>
            <input
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="cm"
              className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
            {errors.height && (
              <p className="text-red-400 text-xs italic mt-1">
                {errors.height}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm text-gray-300">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
            {errors.dob && (
              <p className="text-red-400 text-xs italic mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Goals */}
          <div>
            <label className="text-sm text-gray-300">
              Fitness Goals (Choose Three):
            </label>

            <div className="flex flex-wrap gap-2 mt-2">
              {PRESET_GOALS.map((g) => {
                const selected = form.goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      selected
                        ? "bg-[#d5ff5f] text-black"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            {errors.goals && (
              <p className="text-red-400 text-xs italic mt-1">{errors.goals}</p>
            )}

            <p className="text-xs text-gray-400 mt-2">
              Selected: {form.goals.length}/3
            </p>
          </div>

          {/* Current & Goal Weight */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-300">Current Weight:</label>
              <input
                name="currentWeight"
                value={form.currentWeight}
                onChange={handleChange}
                placeholder="kg"
                className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.currentWeight && (
                <p className="text-red-400 text-xs italic mt-1">
                  {errors.currentWeight}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-300">Goal Weight:</label>
              <input
                name="goalWeight"
                value={form.goalWeight}
                onChange={handleChange}
                placeholder="kg"
                className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
              />
              {errors.goalWeight && (
                <p className="text-red-400 text-xs italic mt-1">
                  {errors.goalWeight}
                </p>
              )}
            </div>
          </div>

          {/* Medical */}
          <div>
            <label className="text-sm text-gray-300">
              Medical Conditions (N/A if none):
            </label>
            <input
              name="medical"
              value={form.medical}
              onChange={handleChange}
              placeholder="e.g. Asthma, N/A"
              className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="shrek-btn font-bold py-2 mt-2 w-60"
            >
              {loading ? "Saving..." : success ? "Saved" : "SAVE & CONTINUE"}
            </Button>
          </div>

          {saveError && (
            <p className="text-red-400 text-sm text-center mt-2">{saveError}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center mt-2">
              Profile saved — redirecting...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
