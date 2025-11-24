// ToDoCard.tsx
import { useState } from "react";

export default function ToDoCard({
  todos,
}: {
  todos: { id: string; text: string; done: boolean }[];
}) {
  const [items, setItems] = useState(todos);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
    // optionally save back to Firestore here
  };

  if (!items.length) return <p className="text-gray-400">No tasks.</p>;

  return (
    <div className="space-y-2">
      {items.map((t) => (
        <div key={t.id} className="flex items-center gap-3">
          <button
            onClick={() => toggle(t.id)}
            className={`w-4 h-4 rounded-full border ${
              t.done ? "bg-[#d5ff5f] border-[#d5ff5f]" : "border-gray-400"
            }`}
            aria-label="toggle"
          />
          <div
            className={`flex-1 px-3 py-2 rounded bg-gray-700 text-sm ${
              t.done ? "opacity-60 line-through" : ""
            }`}
          >
            {t.text}
          </div>
        </div>
      ))}
    </div>
  );
}
