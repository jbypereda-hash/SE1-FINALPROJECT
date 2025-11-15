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
    </div>
    </div>
);
};

export default MembershipPackages;
