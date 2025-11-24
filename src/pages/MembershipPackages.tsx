import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PACKAGE_DATA: Record<string, any> = {
  starter: {
    name: "Starter Package",
    price: 1300,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free fitness assessment.",
      "Free basic coaching sessions for 1 month.",
    ],
  },
  flex: {
    name: "Flex Package",
    price: 1700,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free fitness assessment.",
      "Free basic coaching sessions for 3 months.",
      "Access to all of our group fitness classes.",
    ],
  },
  pro: {
    name: "Pro Package",
    price: 2000,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free workout plan & nutrition program.",
      "One-on-one personal training sessions with a coach of your choice.",
      "Access to all of our group fitness classes.",
    ],
  },
};

const PackagePaymentDialog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const plan = params.get("plan") || "starter";
  const pkg = PACKAGE_DATA[plan];

  const handleConfirm = () => {
    navigate(`/membershipconfirmation?plan=${plan}`);
  };

  return (
    <div className="min-h-screen bg-black-35 text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-shrek text-4xl mb-6 text-center">CORE LAB</h1>
      <p className="text-xl mb-6 text-center">Complete your membership.</p>

      <div className="bg-black-34 p-6 rounded-xl max-w-lg w-full shadow-lg">
        <h2 className="text-shrek text-2xl mb-4 text-center">{pkg.name}</h2>

        <p className="text-center text-lg font-bold mb-4">
          ₱{pkg.price.toLocaleString()} per month
        </p>

        {pkg.details.map((d: string, i: number) => (
          <p key={i} className="text-center mb-2 text-donkey-10">
            {d}
          </p>
        ))}

        <div className="mt-8 flex justify-between">
          <button
            className="px-6 py-2 rounded-xl bg-gray-600"
            onClick={() => navigate(-1)}
          >
            CANCEL
          </button>
          <button
            className="px-6 py-2 rounded-xl bg-shrek text-black"
            onClick={handleConfirm}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagePaymentDialog;
