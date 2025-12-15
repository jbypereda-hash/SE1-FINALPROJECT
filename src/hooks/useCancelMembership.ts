// src/hooks/useCancelMembership.ts
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export function useCancelMembership() {
  const auth = getAuth();

  const cancelMembership = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    // 1️⃣ Set application to cancelled
    const appQuery = query(
      collection(db, "applications"),
      where("userID", "==", uid),
      where("status", "==", "active")
    );

    const snap = await getDocs(appQuery);

    for (const d of snap.docs) {
      await updateDoc(d.ref, {
        status: "cancelled",
        cancelledAt: new Date(),
      });
    }

    // 2️⃣ Update member document
    await updateDoc(doc(db, "members", uid), {
      status: "Inactive",
      membershipType: "",
      validUntil: "",
    });
  };

  return { cancelMembership };
}
