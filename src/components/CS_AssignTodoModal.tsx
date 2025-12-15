import { useState } from "react";
import Button from "./Button";

export default function CS_AssignTodoModal({
  clientName,
  onAssign,
  onClose,
}: {
  clientName: string;
  onAssign: (title: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-black-34 p-6 rounded-2xl w-[420px]">
        <h3 className="text-xl font-bold text-shrek mb-2">ASSIGN TASK</h3>

        <p className="text-sm text-gray-400 mb-4">
          Assigned to <b>{clientName}</b>
        </p>

        <textarea
          className="w-full bg-black-35 rounded-lg p-3 text-white resize-none"
          rows={4}
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <Button onClick={onClose} className="px-3 text-xs">
            CANCEL
          </Button>

          <Button
            disabled={!title.trim()}
            onClick={() => onAssign(title)}
            className="shrek-btn px-4 text-xs"
          >
            ASSIGN
          </Button>
        </div>
      </div>
    </div>
  );
}
