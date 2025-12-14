import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

import ShoppingCart from "../assets/icons/shoppingcart.svg?react";
import LevelRing from "../assets/icons/levelring.svg?react";
import Button from "../components/Button";

// Images
import CoreCrusherImg from "../assets/images/corecrusher-class.jpg";
import PowerFlowYogaImg from "../assets/images/powerflowyoga-class.png";
import HIITBlastImg from "../assets/images/hiitblast-class.png";
import KickboxingCardioImg from "../assets/images/kickboxingcardio-class.png";
import PilatesImg from "../assets/images/pilates-class.png";

// Modals
import AddToCartModal from "../components/AddToCartModal";
import ViewCartModal from "../components/ViewCartModal";
import CheckoutModal from "../components/CheckoutModal";
import SuccessModal from "../components/SuccessModal";

// Map image keys
const CLASS_IMAGES: Record<string, string> = {
  corecrusher: CoreCrusherImg,
  powerflowyoga: PowerFlowYogaImg,
  hiitblast: HIITBlastImg,
  kickboxingcardio: KickboxingCardioImg,
  pilates: PilatesImg,
};

// -----------------------------
// Types
// -----------------------------
export type ClassItem = {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  level: number;
  pricePerWeek: number;
};

export type Booking = {
  id: string; // schedule ID
  name: string; // class name
  schedule: string; // days + time
  coachName: string; // 👈 REQUIRED
  price: number;
  weeks: number;
};

// -----------------------------
// Card Component
// -----------------------------
interface ClassCardProps extends ClassItem {
  onAddToCart: (item: ClassItem) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  title,
  description,
  imageKey,
  level,
  pricePerWeek,
  onAddToCart,
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
          <p className="text-shrek font-bold text-lg">₱{pricePerWeek} / Week</p>
        </div>

        <p className="text-[16.2px] leading-snug opacity-90 mb-4">
          {description}
        </p>
        <div className="flex justify-center">
          <Button
            className="shrek-btn text-xl font-bold w-60 py-0.5"
            onClick={() =>
              onAddToCart({
                id,
                title,
                description,
                imageKey,
                level,
                pricePerWeek,
              })
            }
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// Main Component
// -----------------------------
const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [cartItems, setCartItems] = useState<Booking[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [enrolledClasses, setEnrolledClasses] = useState<
    { name: string; schedule: string }[]
  >([]);

  type EnrolledSchedule = {
    id: string;
    days: string;
    time: string;
  };
  const [enrolledSchedules, setEnrolledSchedules] = useState<
    EnrolledSchedule[]
  >([]);

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const loadEnrollments = async () => {
      const q = query(
        collection(db, "enrollments"),
        where("userID", "==", auth.currentUser!.uid)
      );

      const snap = await getDocs(q);

      const schedules: EnrolledSchedule[] = [];

      for (const d of snap.docs) {
        const scheduleId = d.data().classScheduleID;
        const scheduleSnap = await getDoc(
          doc(db, "classSchedules", scheduleId)
        );

        if (scheduleSnap.exists()) {
          const s = scheduleSnap.data();
          schedules.push({
            id: scheduleId,
            days: s.days,
            time: s.time,
          });
        }
      }

      setEnrolledSchedules(schedules);
    };

    loadEnrollments();
  }, []);

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const snap = await getDocs(collection(db, "classes"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ClassItem[];
        setClasses(data);
      } catch (err) {
        console.error("Failed to load classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Add to cart
  const handleAddToCart = (item: Booking) => {
    setCartItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  // Update weeks
  const updateWeeks = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, weeks: Math.max(1, item.weeks + delta) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="h-full bg-black-35 text-white">
      <main className="w-full mx-auto px-6 py-8">
        <div className="flex justify-center mb-12 relative">
          <div className="text-center">
            <h2 className="text-6xl text-shrek font-bold">OUR CLASSES</h2>
            <p className="text-white text-3xl">
              Find the perfect workout to match your goals.
            </p>
          </div>

          <div className="absolute top-5 right-15">
            <Button onClick={() => setShowCartModal(true)}>
              <div className="flex items-center text-3xl">
                <ShoppingCart className="w-9 h-9 mr-3" />
                View Cart
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-0 -right-4 bg-shrek text-black-35 text-xl w-7 h-7 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-donkey-10 text-xl">
            Loading classes...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {classes.map((c) => (
              <ClassCard
                key={c.id}
                {...c}
                onAddToCart={(cls) => {
                  setSelectedClass(cls);
                  setShowAddToCartModal(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {selectedClass && showAddToCartModal && (
        <AddToCartModal
          classId={selectedClass.id}
          classTitle={selectedClass.title}
          pricePerWeek={selectedClass.pricePerWeek}
          cartItems={cartItems}
          enrolledSchedules={enrolledSchedules}
          onClose={() => setShowAddToCartModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCartModal && (
        <ViewCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          updateWeeks={updateWeeks}
          removeItem={removeItem}
          proceedToCheckout={() => {
            setShowCartModal(false);
            setShowCheckoutModal(true);
          }}
        />
      )}

      {showCheckoutModal && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={() => setShowCheckoutModal(false)}
          onSuccess={() => {
            setEnrolledClasses(
              cartItems.map((item) => ({
                name: item.name,
                schedule: item.schedule,
              }))
            );
            setShowCheckoutModal(false);
            setShowSuccessModal(true);
          }}
          clearCart={clearCart}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          enrolledClasses={enrolledClasses}
          onViewProfile={() => {
            setShowSuccessModal(false);
            // navigate("/profile")
          }}
        />
      )}
    </div>
  );
};

export default Classes;
