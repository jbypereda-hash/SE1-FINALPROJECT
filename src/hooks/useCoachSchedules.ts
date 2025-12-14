// src/hooks/useCoachSchedules.ts
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  getDoc,
  doc as docRef,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface ClassInfo {
  id: string;
  title: string;
  description?: string;
  imageKey?: string;
  level?: number;
  pricePerWeek?: number;
}

export interface ScheduleInfo {
  id: string;
  classId: string;
  day: string; // e.g. "MWF"
  time: string; // e.g. "12:00 PM - 1:00 PM"
  startTime?: string; // parsed
  endTime?: string; // parsed
  createdAt?: any;
}

export interface MyClassItem {
  id: string; // schedule id
  classId: string;
  scheduleId: string;
  classInfo: ClassInfo;
  scheduleInfo: ScheduleInfo;
}

export function useCoachSchedules(coachUid?: string) {
  const [classes, setClasses] = useState<MyClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coachUid) {
      setClasses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "classSchedules"),
      where("coach", "==", coachUid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      async (snap) => {
        try {
          const items: MyClassItem[] = [];
          // We'll build items and for each schedule fetch the class doc.
          for (const d of snap.docs) {
            const sdata = d.data() as any;
            const classId: string = sdata.classId;
            // fetch class doc
            let classInfo = {
              id: classId,
              title: "",
              description: "",
              imageKey: "",
              level: 0,
              pricePerWeek: 0,
            } as ClassInfo;

            try {
              const classDoc = await getDoc(docRef(db, "classes", classId));
              if (classDoc.exists()) {
                classInfo = { id: classDoc.id, ...(classDoc.data() as any) } as ClassInfo;
              }
            } catch (err) {
              console.error("get class doc error:", err);
            }

            // parse time range into start/end
            const timeRaw: string = sdata.time || "";
            let startTime = "";
            let endTime = "";
            if (typeof timeRaw === "string" && timeRaw.includes(" - ")) {
              const parts = timeRaw.split(" - ").map((p) => p.trim());
              startTime = parts[0] || "";
              endTime = parts[1] || "";
            }

            const sched: ScheduleInfo = {
              id: d.id,
              classId,
              day: sdata.days || sdata.day || "",
              time: timeRaw || "",
              startTime,
              endTime,
              createdAt: sdata.createdAt ?? null,
            };

            items.push({
              id: d.id,
              classId,
              scheduleId: d.id,
              classInfo,
              scheduleInfo: sched,
            });
          }

          setClasses(items);
        } catch (err) {
          console.error("useCoachSchedules onSnapshot handler error:", err);
          setClasses([]);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("useCoachSchedules onSnapshot error:", err);
        setLoading(false);
        setClasses([]);
      }
    );

    return () => unsub();
  }, [coachUid]);

  return { classes, loading };
}
