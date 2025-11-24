import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

/* ----------------------------------
   Interfaces
---------------------------------- */

export interface HealthData {
  startingWeight: number;
  currentWeight: number;
  goalWeight: number;
  bmiCategory: string;
  bmiValue: number;
  height: number;
  age: number;
  medicalConditions: string;
}

export interface ClassData {
  id: string;
  title: string;
  schedule: string;
}

export interface TodoData {
  id: string;
  text: string;
  done: boolean;
}

export interface MemberData {
  name: string;
  status: string;
  membershipType: string;
  dob: string;
  validUntil: string;
  goals: string[];
  health: HealthData;
  classes: ClassData[];
  todos: TodoData[];
}

/* ----------------------------------
   Helpers
---------------------------------- */

function calculateAge(dateInput: string | Timestamp): number {
  if (!dateInput) return 0;

  let dateString = "";

  if (dateInput instanceof Timestamp) {
    dateString = dateInput.toDate().toISOString().split("T")[0];
  } else {
    dateString = dateInput;
  }

  const safeDateString = dateString.replace(/-/g, "/");

  const today = new Date();
  const birthDate = new Date(safeDateString);

  if (isNaN(birthDate.getTime())) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const d = today.getDate() - birthDate.getDate();

  if (m < 0 || (m === 0 && d < 0)) age--;

  return age;
}

function calculateBMI(weight: number, heightCM: number) {
  if (!weight || !heightCM) {
    return { bmiValue: 0, bmiCategory: "N/A" };
  }

  const h = heightCM / 100;
  const bmi = weight / (h * h);
  const v = Number(bmi.toFixed(1));

  let category = "Obese";
  if (v === 0) category = "N/A";
  else if (v < 18.5) category = "Underweight";
  else if (v < 25) category = "Normal";
  else if (v < 30) category = "Overweight";

  return { bmiValue: v, bmiCategory: category };
}

/* ----------------------------------
   Main Hook
---------------------------------- */

export function useMemberProfile() {
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "members", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const raw = snap.data();

        /* SAFELY BUILD FULL MEMBER OBJECT */
        const safeMember: MemberData = {
          name: raw.name ?? "",
          status: raw.status ?? "",
          membershipType: raw.membershipType ?? "",
          dob: raw.dob ?? "",
          validUntil: raw.validUntil ?? "",
          goals: Array.isArray(raw.goals) ? raw.goals : [],

          /* ⛑ SAFE HEALTH FALLBACK */
          health: {
            startingWeight: raw.health?.startingWeight ?? 0,
            currentWeight: raw.health?.currentWeight ?? 0,
            goalWeight: raw.health?.goalWeight ?? 0,
            height: raw.health?.height ?? 0,
            age: raw.health?.age ?? 0,
            bmiValue: raw.health?.bmiValue ?? 0,
            bmiCategory: raw.health?.bmiCategory ?? "N/A",
            medicalConditions: raw.health?.medicalConditions ?? "",
          },

          classes: Array.isArray(raw.classes) ? raw.classes : [],
          todos: Array.isArray(raw.todos) ? raw.todos : [],
        };

        /* AGE AUTO */
        if (safeMember.dob) {
          safeMember.health.age = calculateAge(safeMember.dob);
        }

        /* BMI AUTO */
        const { bmiValue, bmiCategory } = calculateBMI(
          safeMember.health.currentWeight,
          safeMember.health.height
        );
        safeMember.health.bmiValue = bmiValue;
        safeMember.health.bmiCategory = bmiCategory;

        setMember(safeMember);
      }

      setLoading(false);
    };

    fetchMember();
  }, []);

  return { member, loading };
}
