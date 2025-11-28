import { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

export interface MyClassItem {
  id: string;
  classId: string;
  scheduleId: string;
  classInfo?: any;
  scheduleInfo?: any;
}

export function useMyClasses() {
  const [myClasses, setMyClasses] = useState<MyClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setMyClasses([]);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);

      const q = query(
        collection(db, "enrollments"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const arr: MyClassItem[] = [];

      for (const d of snap.docs) {
        const data = d.data();
        const classId = data.classId;
        const scheduleId = data.scheduleId;

        const classSnap = await getDoc(doc(db, "classes", data.classId));
        
        const schedRef = doc( db, "classes", classId, "classesDetails", scheduleId );
        const schedSnap = await getDoc(schedRef);


        arr.push({
          id: d.id,
          classId: data.classId,
          scheduleId: data.scheduleId,
          classInfo: classSnap.data(),
          scheduleInfo: schedSnap.data(),
        });
      }

      setMyClasses(arr);
      setLoading(false);
    }

    load();
  }, []);

  return { myClasses, loading };
}
