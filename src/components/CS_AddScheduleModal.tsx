import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { authTransition } from "../hooks/authTransition";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  classID: string; // <-- Added
  classTitle: string;
}

const DAYS_OPTIONS = ["MWF", "TThS"];

const TIME_OPTIONS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
];

const CS_AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  isOpen,
  onClose,
  classID,
  classTitle,
}) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lock UI on open
  useEffect(() => {
    if (isOpen) authTransition.setLocked(true);
  }, [isOpen]);

  // Fade-In Animation
  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Fade-Out + remove from DOM
  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => {
        setRenderModal(false);
        authTransition.setLocked(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedDay("");
      setSelectedTime("");
    }
  }, [isOpen]);

  // ---------------------------
  // SAVE SCHEDULE TO FIRESTORE
  // ---------------------------
  const handleSubmit = async () => {
  if (!selectedDay || !selectedTime) return;

  setLoading(true);

  try {
    const scheduleRef = await addDoc(collection(db, "classSchedules"), {
      classID,            // <--- from props
      title: classTitle,  // <--- from props
      days: selectedDay,
      time: selectedTime,
      coach: auth.currentUser?.displayName || auth.currentUser?.uid || "Unknown",
      createdAt: serverTimestamp(),
    });

    console.log("Added schedule with ID:", scheduleRef.id);

    setShowContent(false);
    setTimeout(() => {
      onClose();
      authTransition.setLocked(false);
    }, 200);
  } catch (err) {
    console.error("Error adding schedule:", err);
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => onClose(), 200);
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-16 py-7 rounded-2xl w-[500px] text-center text-white relative transform transition-all duration-300 ease-out ${
          showContent
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-6"
        }`}
      >
        {/* Back Button */}
        <Button
          onClick={handleClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-10 h-10" />
        </Button>

        {/* Loading spinner */}
        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="mb-6 text-2xl">Add a new class schedule</p>

        <p className="text-xl mb-6">
          Class: <span className="font-bold">{classTitle}</span>
        </p>

        {/* DAYS DROPDOWN */}
        <div className="text-left mb-4">
          <p>Days:</p>
          <div className="relative w-full">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
            >
              <option value="" disabled hidden>
                Select days
              </option>
              {DAYS_OPTIONS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black-34">
              ▼
            </div>
          </div>
        </div>

        {/* TIME DROPDOWN */}
        <div className="text-left mb-6">
          <p>Time:</p>
          <div className="relative w-full">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
            >
              <option value="" disabled hidden>
                Select time
              </option>
              {TIME_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black-34">
              ▼
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex">
          <Button
            onClick={handleSubmit}
            className="shrek-btn font-bold py-1 border-3 hover:border-3 mt-4 mx-auto w-60"
          >
            ADD SCHEDULE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CS_AddScheduleModal;
