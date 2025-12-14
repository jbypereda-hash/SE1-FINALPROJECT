import React, { useEffect, useState } from "react";
import AS_Dropdown from "../../components/AS_Dropdown";
import type { MembershipPackage } from "../../components/AS_Dropdown";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AS_Packages: React.FC = () => {
  const [packages, setPackages] = useState<MembershipPackage[]>([]);

  useEffect(() => {
    const packagesRef = collection(db, "packages");

    const unsubscribe = onSnapshot(packagesRef, (snapshot) => {
      const data: MembershipPackage[] = snapshot.docs.map((doc) => {
        const raw = doc.data() as any;

        return {
          id: doc.id,
          title: raw.title ?? "",
          pricePerMonth: raw.pricePerMonth ?? 0,
          description: raw.description ?? "",
        };
      });

      setPackages(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full w-full bg-black-35 text-white">
      <main className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          <h1 className="text-[26px] font-bold">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          <p className="text-shrek font-bold text-5xl">
            MEMBERSHIP PACKAGES
          </p>
        </header>

        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto p-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="mb-4">
              <AS_Dropdown mode="package" item={pkg} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AS_Packages;
