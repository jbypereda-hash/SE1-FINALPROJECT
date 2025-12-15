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
  title: string;
  tagline: string;
  description: string;
}

export default function CoachRegistrationDialog({
  isOpen,
  onClose,
  onComplete,
}: Props) {
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  const [form, setForm] = useState<FormState>({
    title: "",
    tagline: "",
    description: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  /* OPEN animation */
  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const t = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  /* CLOSE animation */
  useEffect(() => {
    if (!showContent && !isOpen) {
      const t = setTimeout(() => setRenderModal(false), 400);
      return () => clearTimeout(t);
    }
  }, [showContent, isOpen]);

  /* RESET state */
  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", tagline: "", description: "" });
      setErrors({});
      setLoading(false);
      setSuccess(false);
      setSaveError(null);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSaveError(null);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) newErrors.title = "Please enter your coach title.";
    if (!form.tagline.trim())
      newErrors.tagline = "Please enter a short tagline.";
    if (!form.description.trim())
      newErrors.description = "Please describe yourself as a coach.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* SAVE coach profile */
  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSaveError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found.");

      const coachDoc = {
        userId: user.uid,
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        isProfileComplete: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "coaches", user.uid), coachDoc);

      setSuccess(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
        onClose();
        onComplete?.();
        window.location.assign("/CS-CoachProfile");
      }, 900);
    } catch (err) {
      const msg =
        (err as Error)?.message ||
        (err as FirestoreError)?.message ||
        "Failed to save coach profile.";

      console.error("Save coach profile error:", err);
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
        className={`bg-black-35 px-12 py-6 rounded-2xl w-[520px] text-center text-white relative transform transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
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
        <p className="mb-4 text-2xl">Set up your coach profile</p>

        <form onSubmit={handleSave} className="text-left space-y-4 mt-2">
          <div>
            <label className="text-sm text-gray-300">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Strength & Conditioning Coach"
              className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
            {errors.title && (
              <p className="text-red-400 text-xs italic mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300">Tagline</label>
            <input
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="Short motivating tagline"
              className="w-full px-4 py-2 rounded-full bg-gray-300 text-black mt-1"
            />
            {errors.tagline && (
              <p className="text-red-400 text-xs italic mt-1">
                {errors.tagline}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-2xl bg-gray-300 text-black mt-1 resize-none"
            />
            {errors.description && (
              <p className="text-red-400 text-xs italic mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="shrek-btn font-bold py-2 mt-2 w-56"
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
