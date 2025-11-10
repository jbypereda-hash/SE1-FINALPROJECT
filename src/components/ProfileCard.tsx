interface ProfileCardProps {
  name: string;
  membershipType: string;
  validUntil: string;
  status: string;
  goals: string[];
}

export default function ProfileCard({
  name,
  membershipType,
  validUntil,
  status,
  goals,
}: ProfileCardProps) {
  return (
    <div className="bg-[#2d2d35] rounded-[20px] p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">{name}</h2>
        <span className="bg-[#d5ff5f] text-black text-sm font-bold px-3 py-1 rounded-full">
          {status}
        </span>
      </div>
      <p className="text-gray-300">{membershipType}</p>
      <p className="text-gray-400 text-sm mt-1">
        Valid until <span className="font-semibold">{validUntil}</span>
      </p>

      <h3 className="text-[#d5ff5f] font-bold mt-4 mb-2">Goals</h3>
      <div className="flex flex-wrap gap-2">
        {goals.map((goal, i) => (
          <span
            key={i}
            className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
          >
            {goal}
          </span>
        ))}
      </div>
    </div>
  );
}
