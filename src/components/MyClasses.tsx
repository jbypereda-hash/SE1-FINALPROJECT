type ClassInfo = {
  name?: string;
  description?: string;
  intensity?: number;
};

type ScheduleInfo = {
  day: string;
  startTime: string;
  endTime: string;
};

export type MyClassItem = {
  id: string;
  classId: string;
  scheduleId: string;
  classInfo?: ClassInfo;
  scheduleInfo?: ScheduleInfo;
};

export default function MyClasses({
  classes = [],
}: {
  classes: MyClassItem[];
}) {
  return (
    <div className="bg-black-34 rounded-[24px] p-6 w-full h-full flex flex-col">
      {/* Sticky Header */}  {/* yen changed bg-[#1c1c22] to bg-black-34 (lines 27 & 28) */}
      <div className="sticky top-0 bg-black-34 pb-3 z-10">
        <h3 className="text-[#d5ff5f] text-lg font-bold">MY CLASSES</h3>
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <p className="text-gray-400 text-sm">No classes enrolled.</p>
      )}

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-[#111216] p-4 rounded-xl border border-gray-700/30 
                       cursor-pointer transition-colors
                       hover:bg-[#2a2b33] hover:border-donkey-10/40"
          >
            <h4 className="text-white font-semibold text-base">
              {cls.classInfo?.name}
            </h4>

            <div className="mt-3 text-xs text-gray-400">
              <p>Schedule: {cls.scheduleInfo?.day}</p>
              <p>
                {cls.scheduleInfo?.startTime} – {cls.scheduleInfo?.endTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
