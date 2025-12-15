// src/hooks/useMemberProfile.ts
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

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
  status: string;
  membershipType: string;
  dob: string | Timestamp;
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

  const date =
    dateInput instanceof Timestamp
      ? dateInput.toDate()
      : new Date(dateInput);

  if (isNaN(date.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();

  if (
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() &&
      today.getDate() < date.getDate())
  ) {
    age--;
  }

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
  if (v < 18.5) category = "Underweight";
  else if (v < 25) category = "Normal";
  else if (v < 30) category = "Overweight";

  return { bmiValue: v, bmiCategory: category };
}

/* ----------------------------------
   Hook
---------------------------------- */

export function useMemberProfile(memberUid?: string) {
  const auth = getAuth();
  const uid = memberUid ?? auth.currentUser?.uid;

  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchMember = async () => {
      try {
        const snap = await getDoc(doc(db, "members", uid));

        if (!snap.exists()) {
          setMember(null);
          return;
        }

        const raw = snap.data();

        const health = {
          startingWeight: raw.health?.startingWeight ?? 0,
          currentWeight: raw.health?.currentWeight ?? 0,
          goalWeight: raw.health?.goalWeight ?? 0,
          height: raw.health?.height ?? 0,
          age: 0,
          bmiValue: 0,
          bmiCategory: "N/A",
          medicalConditions: raw.health?.medicalConditions ?? "",
        };

        health.age = calculateAge(raw.dob);
        const bmi = calculateBMI(health.currentWeight, health.height);
        health.bmiValue = bmi.bmiValue;
        health.bmiCategory = bmi.bmiCategory;

        setMember({
          status: raw.status ?? "",
          membershipType: raw.membershipType ?? "",
          dob: raw.dob ?? "",
          validUntil: raw.validUntil ?? "",
          goals: Array.isArray(raw.goals) ? raw.goals : [],
          health,
          classes: Array.isArray(raw.classes) ? raw.classes : [],
          todos: Array.isArray(raw.todos) ? raw.todos : [],
        });
      } catch (err) {
        console.error("useMemberProfile error:", err);
        setMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [uid]);

  return { member, loading };
}
