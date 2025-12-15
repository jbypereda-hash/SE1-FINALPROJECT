import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";

import PackagePaymentDialog from "../components/PackagePaymentDialog";
import MembershipConfirmationDialog from "../components/MembershipConfirmationDialog";
import PackageCard from "../components/PackageCard";

export interface PackageData {
  id: string;
  title: string;
  pricePerMonth: number;
  description: string;
}

export default function MembershipPackages() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null
  );
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      const q = query(
        collection(db, "packages"),
        orderBy("pricePerMonth", "asc")
      );

      const snap = await getDocs(q);

      setPackages(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PackageData, "id">),
        }))
      );

      setLoading(false);
    };

    fetchPackages();
  }, []);

  const handleAvail = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handleConfirm = async (method: string): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user || !selectedPackage) return "User not authenticated.";

    try {
      const q = query(
        collection(db, "applications"),
        where("userID", "==", user.uid),
        where("status", "in", ["pending", "active"])
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        return "You already have an active or pending membership application.";
      }

      await addDoc(collection(db, "applications"), {
        userID: user.uid,
        packageID: selectedPackage.id,
        appliedAt: serverTimestamp(),
        methodOfPayment: method,
        status: "pending",
      });

      setShowPayment(false);
      setShowConfirmation(true);
      return null;
    } catch (err) {
      console.error(err);
      return "Something went wrong. Please try again.";
    }
  };

  return (
    <div className="text-center text-shrek mt-8">
      <h2 className="font-bold text-6xl">MEMBERSHIP PACKAGES</h2>
      <p className="text-white text-3xl">
        Choose a plan that fits your lifestyle.
      </p>

      {loading ? (
        <p className="opacity-60">Loading packages...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl px-6 py-8 mx-auto">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              data={pkg}
              onClick={() => handleAvail(pkg)}
            />
          ))}
        </div>
      )}

      {showPayment && selectedPackage && (
        <PackagePaymentDialog
          packageData={selectedPackage}
          onClose={() => setShowPayment(false)}
          onConfirm={handleConfirm}
        />
      )}

      {showConfirmation && selectedPackage && (
        <MembershipConfirmationDialog
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
