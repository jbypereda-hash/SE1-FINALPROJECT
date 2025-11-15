import React from "react";

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
      {/* Navigation */}
    <nav className="max-w-7xl mx-auto mb-12 flex items-center justify-between p-6">
        <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold" style={{ color: "#D5FF5F" }}>
            CORE LAB
        </h1>
        <div className="hidden md:flex gap-6 text-gray-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">
            HOME
            </a>
            <a href="#" className="hover:text-white transition-colors">
            MEMBERSHIPS
            </a>
            <a href="#" className="hover:text-white transition-colors">
            CLASSES
            </a>
            <a href="#" className="hover:text-white transition-colors">
            COACHES
            </a>
            <a href="#" className="hover:text-white transition-colors">
            MY PROFILE
            </a>
        </div>
        </div>

        <button
        className="px-6 py-2 rounded-full font-semibold text-gray-900 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#D5FF5F" }}
        >
        GET STARTED
        </button>
    </nav>

    <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
        aria-label="Go back"
        className="mb-8 text-white hover:opacity-75 transition-opacity"
        >
        <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
            />
        </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Package Cards */}
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
    </div>
    </div>
);
};

export default MembershipPackages;
