import { useState } from "react";
import type { MyClassItem } from "../hooks/useMyClasses";

export default function MyClasses({
  classes = [],
  onUnenroll,
}: {
  classes: MyClassItem[];
  onUnenroll?: (enrollmentId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="bg-black-34 rounded-[24px] p-6 w-full h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-black-34 pb-3 z-10">
        <h3 className="text-[#d5ff5f] text-lg font-bold">MY CLASSES</h3>
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <p className="text-gray-400 text-sm">No classes enrolled.</p>
      )}

      {/* Classes */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
        {classes.map((cls) => (
          <div
            key={cls.enrollmentId ?? cls.classScheduleID}
            className="bg-[#111216] p-4 rounded-xl border border-gray-700/30"
          >
            <h4 className="text-white font-semibold text-base">
              {cls.classInfo?.name ??
                cls.scheduleInfo?.title ??
                "Unnamed Class"}
            </h4>

            <div className="mt-2 text-xs text-gray-400">
              <p>Days: {cls.scheduleInfo?.days ?? "—"}</p>
              <p>Time: {cls.scheduleInfo?.time ?? "—"}</p>
            </div>

            {/* 🔥 UNENROLL (ONLY FOR MEMBERS) */}
            {cls.enrollmentId && onUnenroll && (
              <button
                onClick={() => {
                  setSelectedId(cls.enrollmentId);
                  setOpen(true);
                }}
                className="mt-3 text-xs text-shrek hover:text-donkey-10 underline"
              >
                Unenroll
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 🔴 CONFIRM UNENROLL MODAL */}
      {open && selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#111216] rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white text-lg font-bold mb-2">
              Unenroll from class?
            </h3>

            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  setSelectedId(null);
                }}
                className="text-gray-300 text-sm hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!onUnenroll) return; // ✅ SAFETY GUARD

                  onUnenroll(selectedId);
                  setOpen(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 text-sm font-semibold bg-shrek text-black-35 hover:bg-donkey-10 rounded-lg"
              >
                Unenroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
