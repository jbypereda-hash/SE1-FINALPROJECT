import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface Coach {
  id: string;
  name: string;
  title: string;
  description: string;
  tagline: string;
}

export function useCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const coachSnap = await getDocs(collection(db, "coaches"));

        const merged = await Promise.all(
          coachSnap.docs.map(async (coachDoc) => {
            const coachData = coachDoc.data();

            let name = "Unnamed Coach";

            // ✅ MATCH USING coaches.userId → user.uid
            if (coachData.userId) {
              const userQuery = query(
                collection(db, "user"),
                where("uid", "==", coachData.userId)
              );

              const userSnap = await getDocs(userQuery);

              if (!userSnap.empty) {
                const user = userSnap.docs[0].data();
                name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
              }
            }

            return {
              id: coachDoc.id,
              name,
              title: coachData.title ?? "",
              description: coachData.description ?? "",
              tagline: coachData.tagline ?? "",
            };
          })
        );

        setCoaches(merged);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  return { coaches, loading };
}
