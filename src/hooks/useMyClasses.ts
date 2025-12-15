import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export type MyClassItem = {
  enrollmentId?: string;   // ✅ optional
  userID?: string;         // ✅ optional
  classScheduleID: string;

  classInfo?: {
    name?: string;
    description?: string;
    intensity?: number;
  } | null;

  scheduleInfo?: {
    days?: string;
    time?: string;
  } | null;
};


export function useMyClasses() {
  const [myClasses, setMyClasses] = useState<MyClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setMyClasses([]);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);

      const q = query(
        collection(db, "enrollments"),
        where("userID", "==", user.uid)
      );

      const snap = await getDocs(q);
      const arr: MyClassItem[] = [];

      for (const d of snap.docs) {
        const enrollment = d.data();
        const classScheduleID = enrollment.classScheduleID;

        // Get schedule
        const scheduleSnap = await getDoc(
          doc(db, "classSchedules", classScheduleID)
        );
        if (!scheduleSnap.exists()) continue;

        const scheduleData = scheduleSnap.data();
        const classID = scheduleData.classID;

        // Get class
        const classSnap = await getDoc(doc(db, "classes", classID));

        arr.push({
          enrollmentId: d.id,
          userID: enrollment.userID,
          classScheduleID,
          scheduleInfo: scheduleData,
          classInfo: classSnap.exists() ? classSnap.data() : null,
        });
      }

      setMyClasses(arr);
      setLoading(false);
    }

    load();
  }, [user]);

  // 🔥 UNENROLL
  const unenroll = async (enrollmentId: string) => {
  try {
    await deleteDoc(doc(db, "enrollments", enrollmentId));

    // Instant UI update
    setMyClasses((prev) =>
      prev.filter((c) => c.enrollmentId !== enrollmentId)
    );
  } catch (error) {
    console.error("Failed to unenroll:", error);
    alert("Failed to unenroll. Please try again.");
  }
  };


  return { myClasses, loading, unenroll };
}
