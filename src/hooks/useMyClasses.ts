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

/* ----------------------------------
   Types
---------------------------------- */

export type MyClassItem = {
  enrollmentId?: string;
  userID?: string;
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

/* ----------------------------------
   Hook
---------------------------------- */

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

      /* 1️⃣ CHECK MEMBER STATUS */
      const memberSnap = await getDoc(doc(db, "members", user.uid));
      const status = memberSnap.exists()
        ? memberSnap.data().status
        : "Inactive";

      /* 2️⃣ FETCH ENROLLMENTS */
      const enrollQuery = query(
        collection(db, "enrollments"),
        where("userID", "==", user.uid)
      );

      const enrollSnap = await getDocs(enrollQuery);

      /* 3️⃣ AUTO-UNENROLL IF NOT ACTIVE */
      if (status !== "Active") {
        await Promise.all(
          enrollSnap.docs.map((d) => deleteDoc(d.ref))
        );

        setMyClasses([]);
        setLoading(false);
        return;
      }

      /* 4️⃣ LOAD CLASSES (ACTIVE ONLY) */
      const arr: MyClassItem[] = [];

      for (const d of enrollSnap.docs) {
        const enrollment = d.data();
        const classScheduleID = enrollment.classScheduleID;

        const scheduleSnap = await getDoc(
          doc(db, "classSchedules", classScheduleID)
        );
        if (!scheduleSnap.exists()) continue;

        const scheduleData = scheduleSnap.data();
        const classID = scheduleData.classID;

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

  /* ----------------------------------
     MANUAL UNENROLL (STILL WORKS)
  ---------------------------------- */

  const unenroll = async (enrollmentId: string) => {
    try {
      await deleteDoc(doc(db, "enrollments", enrollmentId));

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
