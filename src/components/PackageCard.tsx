interface PackageCardProps {
  data: {
    name: string;
    price: number;
    details: string[];
  };
  onClick: () => void;
}

export default function PackageCard({ data, onClick }: PackageCardProps) {
  return (
    <div className="rounded-2xl shadow-lg bg-gray-800 p-8 text-center">
      <h2 className="text-shrek-400 text-2xl font-semibold mb-4">
        {data.name}
      </h2>

      <p className="text-xl font-bold mb-6">₱{data.price} per month</p>

      {data.details.map((d, i) => (
        <p key={i} className="mb-2 text-sm text-gray-300">
          {d}
        </p>
      ))}

      <button
        onClick={onClick}
        className="mt-6 px-6 py-2 rounded-lg bg-shrek-600 hover:bg-shrek-500 transition"
      >
        AVAIL
      </button>
    </div>
  );
}
