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
  name: string;
  price: number;
  details: string; // 👈 now a string instead of string[]
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

  const handleConfirm = async (pkg: PackageData, method?: string) => {
    try {
      await addDoc(collection(db, "applications"), {
        packageId: pkg.id,
        packageName: pkg.name,
        price: pkg.price,
        paymentMethod: method || null,
        createdAt: serverTimestamp(),
      });

      setShowPayment(false);
      setShowConfirmation(true);
    } catch (err) {
      console.error("Error saving application:", err);
    }
  };

  return (
    <div className="text-shrek font-[Inria Sans]">
      <h2 className="text-center text-6xl font-bold mb-8">
        Membership Packages
      </h2>

      <p className="text-white text-3xl">
          Choose a plan that fits your lifestyle. </p>

      {loading ? (
        <p className="text-center opacity-60">Loading packages...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
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
          onCancel={() => setShowPayment(false)}
          onConfirm={(method) => handleConfirm(selectedPackage, method)}
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

