interface Health {
  startingWeight?: number;
  currentWeight?: number;
  goalWeight?: number;
  bmiValue?: number;
  bmiCategory?: string;
  height?: number;
  age?: number;
  medicalConditions?: string;
}

export default function HealthInfoCard({ health }: { health: Health }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between border-b border-gray-700 py-2">
          <span className="text-gray-400">Starting Weight</span>
          <span className="font-semibold">
            {health.startingWeight ?? "—"} kg
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-700 py-2">
          <span className="text-gray-400">Current Weight</span>
          <span className="font-semibold">
            {health.currentWeight ?? "—"} kg
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-700 py-2">
          <span className="text-gray-400">Goal Weight</span>
          <span className="font-semibold">{health.goalWeight ?? "—"} kg</span>
        </div>

        <div className="flex justify-between border-b border-gray-700 py-2">
          <span className="text-gray-400">Body Mass Index</span>
          <span className="font-semibold">
            {health.bmiValue ?? "—"}{" "}
            {health.bmiCategory ? (
              <span className="text-sm text-gray-400 ml-2">
                {health.bmiCategory}
              </span>
            ) : null}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-gray-700 rounded px-3 py-2 text-center">
            <p className="text-xs text-gray-400">Height</p>
            <p className="font-semibold">{health.height ?? "—"} cm</p>
          </div>
          <div className="bg-gray-700 rounded px-3 py-2 text-center">
            <p className="text-xs text-gray-400">Age</p>
            <p className="font-semibold">{health.age ?? "—"}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-400">Medical Conditions</p>
          <div className="bg-gray-700 rounded px-3 py-2 mt-1">
            <p className="text-sm">{health.medicalConditions || "None"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
