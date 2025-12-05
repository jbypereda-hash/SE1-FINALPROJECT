import React, { useEffect, useState } from "react";
import AS_Dropdown, { type GymClass } from "../../components/AS_Dropdown";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AS_Classes: React.FC = () => {
  const [classes, setClasses] = useState<GymClass[]>([]);

  useEffect(() => {
    const classesRef = collection(db, "classes");

    const unsubscribe = onSnapshot(classesRef, (snapshot) => {
      const data: GymClass[] = snapshot.docs.map((doc) => {
        const raw = doc.data() as any;

        return {
          id: doc.id,
          name: raw.title ?? "",
          intensity:
            raw.level !== undefined ? `Level ${raw.level}` : "Not specified",
          priceLabel:
            raw.pricePerWeek !== undefined
              ? `₱${raw.pricePerWeek.toLocaleString()} per week`
              : "",
          description: raw.description ?? "",
        };
      });

      setClasses(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full w-full bg-black-35 text-white">
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          <h1 className="text-[26px] font-bold leading-tight">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          <div className="flex justify-between items-center w-full my-1">
            <p className="text-shrek font-bold text-5xl">CLASSES</p>
          </div>
        </header>

        {/* LOWER CONTAINER */}
        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto p-8">
          {classes.map((cls) => (
            <div key={cls.id} className="mb-4">
              <AS_Dropdown
                mode="class"
                item={cls}
                onCancel={() => console.log("Cancelled")}
                onSave={(savedClass) =>
                  console.log("Saved class:", savedClass)
                }
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AS_Classes;