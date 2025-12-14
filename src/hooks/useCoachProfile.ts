// src/hooks/useCoachProfile.ts
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface CoachUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  createdAt: any;
  gender: string;
  lastSignInTime: any;
}

export interface CoachProfile {
  id: string;
  title?: string;
  description?: string;
  tagline?: string;
  userId?: string;
}

export function useCoachProfile() {
  const [user, setUser] = useState<CoachUser | null>(null);
  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const authUser = auth.currentUser;

    if (!authUser) {
      setLoading(false);
      return;
    }

    const coachUid = authUser.uid;

    const fetch = async () => {
      try {
        // user document
        const userSnap = await getDoc(doc(db, "user", coachUid));
        if (userSnap.exists()) {
          setUser({ uid: coachUid, ...(userSnap.data() as any) });
        }

        // coach profile
        const q = query(
          collection(db, "coaches"),
          where("userId", "==", coachUid)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const doc0 = snap.docs[0];
          setProfile({ id: doc0.id, ...(doc0.data() as any) });
        }
      } catch (err) {
        console.error("useCoachProfile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { user, profile, loading };
}

