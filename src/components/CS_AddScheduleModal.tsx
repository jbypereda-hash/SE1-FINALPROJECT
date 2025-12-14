import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import {
  serverTimestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { authTransition } from "../hooks/authTransition";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  classID: string;
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

  const [dayError, setDayError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [conflictError, setConflictError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) authTransition.setLocked(true);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => {
        setRenderModal(false);
        authTransition.setLocked(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedDay("");
      setSelectedTime("");
      setDayError("");
      setTimeError("");
      setConflictError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    let hasError = false;

    setDayError("");
    setTimeError("");
    setConflictError("");

    if (!selectedDay) {
      setDayError("Please select a day.");
      hasError = true;
    }

    if (!selectedTime) {
      setTimeError("Please select a time.");
      hasError = true;
    }

    if (hasError) return;

    const coachID = auth.currentUser?.uid;
    if (!coachID) return;

    setLoading(true);

    try {
      const q = query(
        collection(db, "classSchedules"),
        where("coach", "==", coachID),
        where("days", "==", selectedDay),
        where("time", "==", selectedTime)
      );

      const existing = await getDocs(q);

      if (!existing.empty) {
        setConflictError("You already have a class at this time.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "classSchedules"), {
        classID,
        title: classTitle,
        days: selectedDay,
        time: selectedTime,
        coach: coachID,
        createdAt: serverTimestamp(),
      });
      setSuccessMessage("Schedule successfully added!");
      setTimeout(() => {
        setShowContent(false);

        // After fade-out animation
        setTimeout(() => {
          onClose();
          authTransition.setLocked(false);
        }, 300);
      }, 1000); // <--- change this value to any delay you want
    } catch (err) {
      console.error("Error adding schedule:", err);
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
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 translate-y-6"
        }`}
      >
        <Button
          onClick={handleClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-10 h-10" />
        </Button>

        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="mb-6 text-2xl">Add a new class schedule</p>

        <p className="text-xl mb-6">
          Class: <span className="font-bold italic">{classTitle}</span>
        </p>

        {/* DAYS */}
        <div className="text-left mb-2">
          <p>Days:</p>
          <select
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setDayError("");
            }}
            className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
          >
            <option value="" disabled hidden>
              Select days
            </option>
            {DAYS_OPTIONS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {dayError && <p className="text-red-400 text-sm mt-1">{dayError}</p>}
        </div>

        {/* TIME */}
        <div className="text-left mb-8">
          <p>Time:</p>
          <select
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(e.target.value);
              setTimeError("");
            }}
            className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
          >
            <option value="" disabled hidden>
              Select time
            </option>
            {TIME_OPTIONS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          {timeError && (
            <p className="text-red-400 text-sm mt-1">{timeError}</p>
          )}
        </div>

        {/* CONFLICT ERROR */}
        {conflictError && (
          <p className="text-red-400 text-md font-semibold">{conflictError}</p>
        )}

        {successMessage && (
          <p className="text-green-400 font-semibold mt-2">{successMessage}</p>
        )}

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
