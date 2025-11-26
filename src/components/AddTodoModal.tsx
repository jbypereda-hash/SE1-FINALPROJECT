import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void;
}

export default function AddTodoModal({ isOpen, onClose, onAdded }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (isOpen) {
      setTitle("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const createTask = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user) return alert("Not authenticated");
    if (!title.trim()) return;

    setLoading(true);
    try {
      const todosColl = collection(db, "members", user.uid, "todos");
      await addDoc(todosColl, {
        title: title.trim(),
        completed: false,
        assignedBy: user.uid, // ALWAYS user
        assignedTo: user.uid, // ALWAYS user
        assignedAt: serverTimestamp(),
      });

      setLoading(false);
      if (onAdded) onAdded();
    } catch (err) {
      console.error("create todo error:", err);
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >
      <motion.form
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="bg-black-35 rounded-2xl p-6 w-[420px] text-white"
        onSubmit={createTask}
      >
        <h3 className="text-shrek text-2xl font-bold mb-2 justify-center flex">
          Create a task
        </h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 20 min stretch"
          className="w-full px-3 py-2 rounded-full bg-donkey-10 text-black mt-2 mb-3"
        />

        <div className="flex justify-center gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full border text-lg mb-3 mt-2 border-donkey-10 text-donkey-10 hover:bg-donkey-10 hover:text-black transition"
          >
            Cancel
          </Button>

          <Button type="submit" className="shrek-btn px-6 mb-3 mt-2">
            {loading ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
