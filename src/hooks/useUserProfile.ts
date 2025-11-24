import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "user", user.uid);
      const snap = await getDoc(ref);

    if (snap.exists()) {
        const data = snap.data();
        setUserProfile({
            uid: user.uid,
            ...data,
            fullName: `${data.firstName} ${data.lastName}`,
        });
    }


      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { userProfile, loading };
}
