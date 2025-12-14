import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import LevelRing from "../../assets/icons/levelring.svg?react";
import Button from "../../components/Button";
import CS_AddScheduleModal from "../../components/CS_AddScheduleModal";

// Images imported locally
import CoreCrusherImg from "../../assets/images/corecrusher-class.jpg";
import PowerFlowYogaImg from "../../assets/images/powerflowyoga-class.png";
import HIITBlastImg from "../../assets/images/hiitblast-class.png";
import KickboxingCardioImg from "../../assets/images/kickboxingcardio-class.png";
import PilatesImg from "../../assets/images/pilates-class.png";

const CLASS_IMAGES: Record<string, string> = {
  corecrusher: CoreCrusherImg,
  powerflowyoga: PowerFlowYogaImg,
  hiitblast: HIITBlastImg,
  kickboxingcardio: KickboxingCardioImg,
  pilates: PilatesImg,
};

export type ClassItem = {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  level: number;
  pricePerWeek: number;
};

type ClassCardProps = ClassItem & {
  onAddSchedule: (classItem: ClassItem) => void;
};

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  title,
  description,
  imageKey,
  level,
  pricePerWeek,
  onAddSchedule,
}) => {
  return (
    <div className="relative w-[440px] h-[380px] overflow-hidden m-2 group rounded-[50px]">
      <img
        src={CLASS_IMAGES[imageKey]}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className={`absolute top-4 right-4 grid place-items-center ${
          title === "Kickboxing Cardio" || title === "HIIT Blast"
            ? "text-black-35"
            : "text-white"
        }`}
      >
        <LevelRing className="w-14 h-14 col-start-1 row-start-1" />
        <p className="text-3xl font-bold col-start-1 row-start-1">{level}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>

        <p className="text-[16.2px] leading-snug opacity-90 mb-4">
          {description}
        </p>

        <div className="flex justify-center">
          <Button
            className="shrek-btn text-xl font-bold w-60 py-0.5"
            onClick={() =>
              onAddSchedule({
                id,
                title,
                description,
                imageKey,
                level,
                pricePerWeek,
              })
            }
          >
            ADD SCHEDULE
          </Button>
        </div>
      </div>
    </div>
  );
};

const CS_Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const snap = await getDocs(collection(db, "classes"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ClassItem[];

        setClasses(data);
      } catch (error) {
        console.error("Failed to load classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const openAddSchedule = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  return (
    <div className="h-full bg-black-35 text-white">
      <main className="w-full mx-auto px-6 py-8">
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h2 className="text-6xl text-shrek font-bold">OUR CLASSES</h2>
            <p className="text-white text-3xl">
              Choose which classes to teach, when and how you want to.
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-center text-donkey-10 text-xl">
            Loading classes...
          </p>
        )}

        <div className="flex flex-wrap justify-center">
          {!loading &&
            classes.map((c) => (
              <ClassCard key={c.id} {...c} onAddSchedule={openAddSchedule} />
            ))}
        </div>
      </main>

      {/* Modal */}
      {selectedClass && (
        <CS_AddScheduleModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          classTitle={selectedClass.title}
          classID={selectedClass.id} // NEW: passes classID to Firestore
        />
      )}
    </div>
  );
};

export default CS_Classes;
