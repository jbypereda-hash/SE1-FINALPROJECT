// ProfileCard.tsx
interface Props {
  name: string;
  membershipType: string;
  validUntil?: string;
  status?: string;
  goals: string[];
}

export default function ProfileCard({
  name,
  membershipType,
  validUntil,
  status,
  goals,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-[#d5ff5f] text-sm font-semibold bg-[#1c1c22] px-2 py-1 rounded-md">
              {status}
            </span>
            <div>
              <p className="text-xs text-gray-400">
                {membershipType}{" "}
                <span className="text-gray-500 ml-2">
                  valid until {validUntil || "—"}
                </span>
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#d5ff5f] leading-tight">
                {name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-sm text-gray-400 uppercase tracking-wide">Goals</h4>
        <div className="flex flex-wrap gap-2 mt-3">
          {goals.length ? (
            goals.map((g, idx) => (
              <span
                key={idx}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {g}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No goals set</span>
          )}
        </div>
      </div>
    </div>
  );
}
