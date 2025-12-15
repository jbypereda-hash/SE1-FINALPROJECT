import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { MyClassItem } from "./useMyClasses";

export function useCoachMyClasses(coachUid?: string) {
  const [classes, setClasses] = useState<MyClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coachUid) return;

    setLoading(true);

    const q = query(
      collection(db, "classSchedules"),
      where("coach", "==", coachUid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const results: MyClassItem[] = [];

        for (const schedDoc of snapshot.docs) {
          const schedData = schedDoc.data();

          if (!schedData.classID) continue;

          /* 🔹 Fetch class document */
          const classSnap = await getDoc(
            doc(db, "classes", schedData.classID)
          );

          if (!classSnap.exists()) continue;

          const classData = classSnap.data();

          results.push({
            classScheduleID: schedDoc.id,

            classInfo: {
              name: classData.title ?? "Unnamed Class", // ✅ FIX HERE
              description: classData.description,
              intensity: classData.level, // or intensity, based on schema
            },

            scheduleInfo: {
              days: schedData.days ?? "—",
              time: schedData.time ?? "—",
            },
          });
        }

        setClasses(results);
      } catch (err) {
        console.error("Failed loading coach classes:", err);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [coachUid]);

  return { classes, loading };
}
