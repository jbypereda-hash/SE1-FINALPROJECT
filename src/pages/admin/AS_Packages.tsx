import React from "react";
import AS_PackagesDropdown from "../../components/AS_PackagesDropdown";

const AS_Packages: React.FC = () => {
  const samplePackage = {
    id: "starter",
    name: "Starter Package",
    priceLabel: "₱1,300 per month",
    description:
      "Unlimited access to all gym equipment and facilities.\nFree fitness assessment.\nFree basic coaching sessions for 1 month.",
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          <h1 className="text-[26px] font-bold leading-tight">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          <div className="flex justify-between items-center w-full my-1">
            <p className="text-shrek font-bold text-5xl">
              MEMBERSHIP PACKAGES
            </p>
          </div>
        </header>

        {/* LOWER CONTAINER */}
        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto p-8">
          <AS_PackagesDropdown
            pkg={samplePackage}
            onCancel={() => console.log("Cancelled")}
            onSave={(pkg) => console.log("Saved:", pkg)}
          />
        </div>
      </main>
    </div>
  );
};

export default AS_Packages;