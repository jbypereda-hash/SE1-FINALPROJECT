// src/hooks/useMemberProfile.ts
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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
  status: "Active" | "Inactive" | "Expired";
  membershipType?: string; // ✅ optional
  dob: string | Timestamp;
  validUntil?: string; // ✅ optional
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

    const load = async () => {
      try {
        /* 1️⃣ FETCH MEMBER */
        const memberRef = doc(db, "members", uid);
        const memberSnap = await getDoc(memberRef);

        if (!memberSnap.exists()) {
          setMember(null);
          return;
        }

        const raw = memberSnap.data();

        /* 2️⃣ HEALTH */
        const health: HealthData = {
          startingWeight: raw.health?.startingWeight ?? 0,
          currentWeight: raw.health?.currentWeight ?? 0,
          goalWeight: raw.health?.goalWeight ?? 0,
          height: raw.health?.height ?? 0,
          age: calculateAge(raw.dob),
          ...calculateBMI(
            raw.health?.currentWeight ?? 0,
            raw.health?.height ?? 0
          ),
          medicalConditions: raw.health?.medicalConditions ?? "",
        };

        /* 3️⃣ APPLICATION = SOURCE OF TRUTH */
        const appQuery = query(
          collection(db, "applications"),
          where("userID", "==", uid),
          where("status", "==", "active")
        );

        const appSnap = await getDocs(appQuery);

        let status: MemberData["status"] = "Inactive";
        let membershipType: string | undefined;
        let validUntil: string | undefined;

        if (!appSnap.empty) {
          const appDoc = appSnap.docs[0];
          const app = appDoc.data();

          const appliedAt =
            app.appliedAt instanceof Timestamp
              ? app.appliedAt.toDate()
              : null;

          if (appliedAt) {
            const expiry = new Date(appliedAt);
            expiry.setDate(expiry.getDate() + 30);

            const now = new Date();
            const isActive = now <= expiry;

            if (isActive) {
              status = "Active";
              validUntil = expiry.toISOString().split("T")[0];

              membershipType =
                app.packageID === "starter-package"
                  ? "Starter Package"
                  : app.packageID === "pro-package"
                  ? "Pro Package"
                  : app.packageID;
            } else {
              // 🔥 AUTO EXPIRE APPLICATION
              status = "Expired";

              await updateDoc(appDoc.ref, {
                status: "expired",
              });
            }
          }
        }

        /* 4️⃣ CACHE CLEAN STATE */
        await updateDoc(memberRef, {
          status,
          membershipType: membershipType ?? null,
          validUntil: validUntil ?? null,
        });

        /* 5️⃣ FINAL MEMBER OBJECT */
        setMember({
          status,
          membershipType,
          validUntil,
          dob: raw.dob ?? "",
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

    load();
  }, [uid]);

  return { member, loading };
}
