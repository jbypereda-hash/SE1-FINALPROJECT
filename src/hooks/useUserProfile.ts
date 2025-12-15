// src/hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export interface UserProfile {
  uid: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

export function useUserProfile(uid?: string) {
  const auth = getAuth();
  const userId = uid ?? auth.currentUser?.uid;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const snap = await getDoc(doc(db, "user", userId));

        if (snap.exists()) {
          const u = snap.data();

          setUserProfile({
            uid: userId,
            ...u,
            fullName: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
          });
        } else {
          setUserProfile(null);
        }
      } catch (err) {
        console.error("useUserProfile error:", err);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userProfile, loading };
}
