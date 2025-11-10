export default function Calendar() {
  return (
    <div className="bg-[#2d2d35] rounded-[20px] p-6 shadow-md flex flex-col">
      <h3 className="text-[#d5ff5f] text-xl font-bold mb-4">September 2025</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <p key={day} className="text-gray-400 text-sm">
            {day}
          </p>
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-700 text-white rounded-md py-4 hover:bg-gray-600 cursor-pointer"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
