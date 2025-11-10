interface HealthData {
  startingWeight: number;
  currentWeight: number;
  goalWeight: number;
  bmiCategory: string;
  bmiValue: number;
  height: number;
  age: number;
  medicalConditions: string;
}

export default function HealthInfoCard({ health }: { health: HealthData }) {
  return (
    <div className="bg-[#2d2d35] rounded-[20px] p-6 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[#d5ff5f] text-lg font-bold">Health Information</h3>
        <button className="bg-gray-700 px-3 py-1 text-sm rounded hover:bg-gray-600">
          ✏️ Edit Profile
        </button>
      </div>

      <div className="mt-3">
        <p className="font-bold text-white mb-1">Weight</p>
        <div className="grid grid-cols-3 gap-2 text-center text-gray-200">
          <div>
            <p className="text-sm text-gray-400">Starting</p>
            <p className="font-semibold">{health.startingWeight} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Current</p>
            <p className="font-semibold">{health.currentWeight} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Goal</p>
            <p className="font-semibold">{health.goalWeight} kg</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-bold text-white mb-1">Body Mass Index</p>
        <div className="flex justify-between bg-gray-700 rounded px-3 py-1">
          <span>{health.bmiCategory}</span>
          <span>{health.bmiValue}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="bg-gray-700 rounded py-2">
          <p className="text-sm text-gray-400">Height</p>
          <p className="font-semibold">{health.height} cm</p>
        </div>
        <div className="bg-gray-700 rounded py-2">
          <p className="text-sm text-gray-400">Age</p>
          <p className="font-semibold">{health.age} yrs old</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-bold text-white mb-1">Medical Conditions</p>
        <div className="bg-gray-700 rounded px-3 py-2">
          <p>{health.medicalConditions || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
