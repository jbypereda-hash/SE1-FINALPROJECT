import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

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

export interface MemberData {
  name: string;
  status: string;
  membershipType: string;
  validUntil: string;
  goals: string[];
  health: HealthData;
}

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
      if (snap.exists()) setMember(snap.data() as MemberData);
      setLoading(false);
    };
    fetchMember();
  }, []);

  return { member, loading };
}