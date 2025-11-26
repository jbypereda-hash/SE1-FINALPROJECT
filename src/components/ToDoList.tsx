import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddTodoModal from "./AddTodoModal";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Button from "./Button";

export interface TodoItem {
  id: string;
  title: string;
  completed?: boolean;
  assignedBy?: string;
  assignedTo?: string;
  assignedAt?: any;
}

interface Props {
  todos: TodoItem[];
  onRefresh?: () => void;
}

export default function ToDoList({ todos = [], onRefresh }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const toggle = async (id: string, completed: boolean) => {
    if (!user) return;

    const ref = doc(db, "members", user.uid, "todos", id);

    try {
      if (!completed) {
        await updateDoc(ref, { completed: true });
        setDeleting(id);
        setTimeout(async () => {
          await deleteDoc(ref);
          if (onRefresh) onRefresh();
          setDeleting(null);
        }, 280);
      } else {
        await updateDoc(ref, { completed: false });
      }
    } catch (err) {
      console.error("toggle todo error:", err);
    }
  };

  return (
    <>
      <div className="bg-[#1c1c22] rounded-[24px] p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#d5ff5f] text-xl font-bold">TO DO</h3>

          <Button
            onClick={() => setShowAdd(true)}
            className="shrek-btn px-3 text-xs font-semibold mb-2 mt-1"
          >
            + ADD
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {todos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-gray-400 text-sm"
              >
                No tasks assigned yet.
              </motion.div>
            ) : (
              todos.map((t) => (
                <motion.button
                  key={t.id}
                  layout
                  onClick={() => toggle(t.id, !!t.completed)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: t.id === deleting ? 0 : 1,
                    scale: t.id === deleting ? 0.9 : 1,
                    y: t.id === deleting ? -10 : 0,
                    transition: { duration: 0.25 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
                    ${
                      t.completed ? "bg-[#d9d9d9] opacity-90" : "bg-[#111216]"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all
                      ${
                        t.completed
                          ? "bg-shrek"
                          : "border-2 border-shrek bg-transparent hover:bg-shrek hover:border-transparent"
                      }`}
                  >
                    {t.completed && (
                      <svg
                        className="w-3 h-3 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12.5L9.5 17L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div
                      className={`text-sm font-semibold ${
                        t.completed
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {t.title}
                    </div>

                    {t.assignedBy === t.assignedTo && (
                      <p className="text-xs text-donkey-30 italic mt-1">
                        Assigned by you
                      </p>
                    )}

                    {t.assignedBy !== t.assignedTo && t.assignedBy && (
                      <p className="text-xs text-donkey-30 italic mt-1">
                        Assigned by coach
                      </p>
                    )}
                  </div>
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {showAdd && (
        <AddTodoModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onAdded={() => {
            setShowAdd(false);
            if (onRefresh) onRefresh();
          }}
        />
      )}
    </>
  );
}
