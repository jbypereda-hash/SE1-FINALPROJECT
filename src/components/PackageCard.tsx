import type { JSX } from "react";

interface PackageCardProps {
data: {
    name: string;
    price: number;
    details: string;
};
onClick: () => void;
}

export default function PackageCard({ data, onClick }: PackageCardProps): JSX.Element {
return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black-34 ">
    <div className="relative p-8 text-center text-white">
        <h2 className="text-shrek text-2xl font-semibold mb-4">{data.name}</h2>
        <p className="text-xl font-bold mb-6">₱{data.price} per month</p>

        <p className="mb-3 text-sm opacity-90">{data.details}</p>

        <button
        onClick={onClick}
        className="text-xl font-bold px-6 rounded-3xl shrek-btn mx-auto py-1 mt-6">
        AVAIL
        </button>
    </div>
    </div>
);
}