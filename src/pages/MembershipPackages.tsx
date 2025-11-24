import React from "react";
<<<<<<< Updated upstream

const MembershipPackages: React.FC = () => {
const packages = [
    {
    title: "Starter Package",
    price: "₱1,300 per month",
    features: [
        "Unlimited access to all gym equipment and facilities.",
        "Free fitness assessment.",
        "Free basic coaching sessions for 1 month.",
    ],
    },
    {
    title: "Flex Package",
    price: "₱1,700 per month",
    features: [
        "Unlimited access to all gym equipment and facilities.",
        "Free fitness assessment.",
        "Free basic coaching sessions for 3 months.",
        "Access to all of our group fitness classes.",
    ],
    },
    {
    title: "Pro Package",
    price: "₱3,000 per month",
    features: [
        "Unlimited access to all gym equipment and facilities.",
        "Free workout plan & nutrition program.",
        "One-on-one personal training sessions with a coach of your choice.",
        "Access to all of our group fitness classes.",
    ],
    },
];

return (
    <div
    className="min-h-screen text-white bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url(/corecrusher-class.jpg)" }}
    >
    <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12 pt-10">
        <h2
            className="text-5xl font-bold mb-3"
            style={{ color: "#D5FF5F" }}
        >
            MEMBERSHIP PACKAGES
        </h2>
        <p className="text-gray-400 text-lg">
            Choose a plan that fits your lifestyle.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
            <div
            key={index}
            className="bg-gray-800 rounded-3xl p-8 flex flex-col shadow-xl hover:shadow-2xl transition-shadow"
            >
            <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#D5FF5F" }}
            >
                {pkg.title}
            </h3>

            <p className="text-white text-xl font-semibold mb-6">
                {pkg.price}
            </p>

            <div className="flex-grow space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                <div key={idx}>
                    <p className="text-gray-300 text-sm leading-relaxed">
                    {feature}
                    </p>

                    {idx < pkg.features.length - 1 && (
                    <div className="h-px bg-gray-700 mt-4"></div>
                    )}
                </div>
                ))}
            </div>

            <button
                onClick={() => console.log(`Selected: ${pkg.title}`)}
                className="w-full py-3 rounded-full font-bold text-gray-900 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#D5FF5F" }}
            >
                AVAIL
            </button>
            </div>
        ))}
        </div>
=======
import { useNavigate, useLocation } from "react-router-dom";

const PACKAGE_DATA: Record<string, any> = {
  starter: {
    name: "Starter Package",
    price: 1300,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free fitness assessment.",
      "Free basic coaching sessions for 1 month."
    ]
  },
  flex: {
    name: "Flex Package",
    price: 1700,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free fitness assessment.",
      "Free basic coaching sessions for 3 months.",
      "Access to all of our group fitness classes."
    ]
  },
  pro: {
    name: "Pro Package",
    price: 2000,
    details: [
      "Unlimited access to all gym equipment and facilities.",
      "Free workout plan & nutrition program.",
      "One-on-one personal training sessions with a coach of your choice.",
      "Access to all of our group fitness classes."
    ]
  }
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
          <p key={i} className="text-center mb-2 text-donkey-10">{d}</p>
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
>>>>>>> Stashed changes
    </div>
    </div>
);
};

export default PackagePaymentDialog;
