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
import type { MyClassItem } from "../components/MyClasses";

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

          if (!schedData.classID) {
            console.warn("Missing classID in schedule:", schedDoc.id);
            continue;
          }

          const classId = schedData.classID;
          
          // Fetch class document
          const classSnap = await getDoc(doc(db, "classes", classId));

          const classData = classSnap.exists() ? classSnap.data() : {};

          // Parse "12:00 PM - 1:00 PM"
          let startTime = "";
          let endTime = "";

          if (schedData.time?.includes("-")) {
            const parts = schedData.time.split("-");
            startTime = parts[0].trim();
            endTime = parts[1].trim();
          }

          results.push({
            id: schedDoc.id,
            classId,
            scheduleId: schedDoc.id,

            classInfo: {
              name: classData.title,
              description: classData.description,
              intensity: classData.level, // map level → intensity
            },

            scheduleInfo: {
              day: schedData.days,
              startTime,
              endTime,
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
