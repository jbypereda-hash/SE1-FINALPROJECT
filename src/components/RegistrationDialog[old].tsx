import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const GOALS = [
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

interface RegistrationDialogProps {
  uid: string;
  onClose: () => void;
}

export default function RegistrationDialog({
  uid,
  onClose,
}: RegistrationDialogProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dob, setDob] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [medical, setMedical] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSave = async () => {
    if (
      !height ||
      !weight ||
      !dob ||
      !currentWeight ||
      !goalWeight ||
      selectedGoals.length !== 3
    ) {
      alert("Please complete all fields and select exactly 3 fitness goals.");
      return;
    }

    await setDoc(
      doc(db, "members", uid),
      {
        height: Number(height),
        startingWeight: Number(weight),
        dateOfBirth: dob,
        currentWeight: Number(currentWeight),
        goalWeight: Number(goalWeight),
        medicalConditions: medical || "N/A",
        goals: selectedGoals,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1b1b1f] text-white w-full max-w-lg rounded-2xl p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-[#d5ff5f] mb-2">
          CORE LAB
        </h1>
        <p className="text-center text-lg mb-6">Set up your fitness profile!</p>

        {/* Weight + Height */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Weight:</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-300 rounded-full text-black"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label>Height:</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-300 rounded-full text-black"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        {/* DOB */}
        <div className="mt-4">
          <label>Date of Birth:</label>
          <input
            type="date"
            className="w-full p-2 bg-gray-300 rounded-full text-black"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Goals */}
        <div className="mt-4">
          <label>Fitness Goals (Choose Three):</label>

          <div className="flex flex-wrap gap-2 mt-2">
            {GOALS.map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-4 py-2 rounded-full border text-sm transition 
                ${
                  selectedGoals.includes(goal)
                    ? "bg-[#d5ff5f] text-black"
                    : "bg-gray-300 text-black"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Current + Goal Weight */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Current Weight:</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-300 rounded-full text-black"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
          </div>

          <div>
            <label>Goal Weight:</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-300 rounded-full text-black"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
            />
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="mt-4">
          <label>Medical Conditions (N/A if none):</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-300 rounded-full text-black"
            value={medical}
            onChange={(e) => setMedical(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-[#d5ff5f] text-black font-bold py-3 rounded-full mt-6 text-lg"
          onClick={handleSave}
        >
          SAVE & CONTINUE
        </button>
      </div>
    </div>
  );
}
