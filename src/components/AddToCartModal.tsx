import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { authTransition } from "../hooks/authTransition";

interface Schedule {
  id: string;
  days: string;
  time: string;
  coach: string;
  coachName: string;
}

interface EnrolledSchedule {
  id: string;
  days: string;
  time: string;
}

interface AddToCartModalProps {
  classId: string;
  classTitle: string;
  pricePerWeek: number;
  onClose: () => void;
  onAddToCart: (item: any) => void;
  cartItems: { id: string }[];
  enrolledSchedules: EnrolledSchedule[];
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  classId,
  classTitle,
  pricePerWeek,
  onClose,
  onAddToCart,
  cartItems,
  enrolledSchedules,
}) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [weeks, setWeeks] = useState(1);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [scheduleError, setScheduleError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const hasScheduleConflict = (schedule: Schedule) => {
    return enrolledSchedules.some((enrolled) => {
      return enrolled.days === schedule.days && enrolled.time === schedule.time;
    });
  };

  // Lock UI
  useEffect(() => {
    authTransition.setLocked(true);
  }, []);

  // Fetch schedules + coach names
  useEffect(() => {
    const load = async () => {
      try {
        const q = query(
          collection(db, "classSchedules"),
          where("classID", "==", classId)
        );
        const snap = await getDocs(q);

        const enriched = await Promise.all(
          snap.docs.map(async (d) => {
            const data = d.data();
            let coachName = "Unknown Coach";

            try {
              const coachSnap = await getDoc(doc(db, "user", data.coach));
              if (coachSnap.exists()) {
                const c = coachSnap.data();
                coachName = `${c.firstName} ${c.lastName}`;
              }
            } catch {}

            return {
              id: d.id,
              days: data.days,
              time: data.time,
              coach: data.coach,
              coachName,
            };
          })
        );

        setSchedules(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [classId]);

  // Mount animation
  useEffect(() => {
    setRenderModal(true);
    const t = setTimeout(() => setShowContent(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      onClose();
    }, 200);
  };

  const handleSubmit = () => {
    setScheduleError("");

    if (!selectedSchedule) {
      setScheduleError("Please select a class schedule.");
      return;
    }

    const alreadyInCart =
      Array.isArray(cartItems) &&
      cartItems.some((item) => item.id === selectedSchedule);

    if (alreadyInCart) {
      setScheduleError("This class schedule is already in your cart.");
      return;
    }

    const schedule = schedules.find((s) => s.id === selectedSchedule);
    if (!schedule) return;

    if (hasScheduleConflict(schedule)) {
      setScheduleError(
        "This class conflicts with another class you are already enrolled in."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccessMessage("Added to cart!");

      onAddToCart({
        id: schedule.id, // schedule ID
        name: classTitle,
        schedule: `${schedule.days} – ${schedule.time}`,
        coachName: schedule.coachName,
        price: pricePerWeek,
        weeks,
      });

      setTimeout(() => {
        setShowContent(false);
        setTimeout(() => {
          authTransition.setLocked(false);
          onClose();
        }, 300);
      }, 800);
    }, 400);
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-14 py-7 rounded-2xl w-[500px] text-white text-center relative transform transition-all duration-300 ${
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
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="text-2xl mb-6">Select your preferred schedule</p>

        <p className="text-xl mb-6">
          Class: <span className="font-bold italic">{classTitle}</span>
        </p>

        {fetching ? (
          <p className="text-donkey-10">Loading schedules...</p>
        ) : (
          <>
            <div className="text-left mb-2">
              <p>Available Schedules:</p>
              <select
                className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35"
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select a schedule
                </option>
                {schedules.map((s) => {
                  const alreadyEnrolled = enrolledSchedules.some(
                    (e) => e.id === s.id
                  );
                  const hasConflict = hasScheduleConflict(s);

                  return (
                    <option
                      key={s.id}
                      value={s.id}
                      disabled={alreadyEnrolled || hasConflict}
                    >
                      {s.days} – {s.time} | Coach: {s.coachName}
                      {alreadyEnrolled && " (Already Enrolled)"}
                      {hasConflict &&
                        !alreadyEnrolled &&
                        " (Schedule Conflict)"}
                    </option>
                  );
                })}
              </select>

              {scheduleError && (
                <p className="text-red-400 text-sm mt-1">{scheduleError}</p>
              )}
            </div>

            <div className="text-left mb-8">
              <p>Number of Weeks:</p>
              <input
                type="number"
                min={1}
                max={8}
                className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35"
                value={weeks}
                onChange={(e) => setWeeks(Math.max(1, +e.target.value))}
              />
            </div>

            {successMessage && (
              <p className="text-green-400 font-semibold mb-2">
                {successMessage}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              className="shrek-btn font-bold py-1 mt-4 mx-auto w-60"
            >
              ADD TO CART
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;
