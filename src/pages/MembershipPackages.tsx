import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import PackagePaymentDialog from "../components/PackagePaymentDialog";
import MembershipConfirmationDialog from "../components/MembershipConfirmationDialog";
import PackageCard from "../components/PackageCard";

export interface PackageData {
  id: string;
  title: string;
  pricePerMonth: number;
  details: string;
}

export type MembershipStatus =
  | "For Confirmation"
  | "Pending"
  | "Active"
  | "Expired";

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
      try {
        const q = query(collection(db, "packages"), orderBy("price", "asc"));
        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PackageData, "id">),
        }));

        setPackages(list);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleAvail = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

const handleConfirm = async (
  pkg: PackageData,
  method: string,
  status: MembershipStatus
) => {
  try {
    await addDoc(collection(db, "applications"), {
      packageId: pkg.id,
      packageName: pkg.title,
      price: pkg.pricePerMonth,
      paymentMethod: method,
      status,
      createdAt: serverTimestamp(),
    });

    setShowPayment(false);
    setShowConfirmation(true);
  } catch (err) {
    console.error("Error saving application:", err);
  }
};

  return (
    <div className="text-center text-shrek font-[Inria Sans] mt-8">
      <h2 className="font-bold text-6xl">
        MEMBERSHIP PACKAGES     </h2>
          <p className="text-white text-3xl">
          Choose a plan that fits your lifestyle. </p>


      {loading ? (
        <p className="text-center opacity-60">Loading packages...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl px-6 py-8 mx-auto items-stretch">
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
          packageData={(selectedPackage)}
          onCancel={() => setShowPayment(false)}
          onConfirm={(method, status) => handleConfirm(selectedPackage, method, status)}
        />
      )}

      {showConfirmation && selectedPackage && (
        <MembershipConfirmationDialog
          selectedPackage={selectedPackage}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

