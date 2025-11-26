import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  assignedBy?: string;
  assignedTo?: string;
  assignedAt?: any;
}

export function useMemberTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      setTodos([]);
      return;
    }

    const q = query(
      collection(db, "members", user.uid, "todos"),
      orderBy("assignedAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr: TodoItem[] = [];
        snap.forEach((d) => {
          const data = d.data() as any;
          arr.push({
            id: d.id,
            title: data.title || "",
            completed: !!data.completed,
            assignedBy: data.assignedBy || null,
            assignedTo: data.assignedTo || null,
            assignedAt: data.assignedAt || null,
          });
        });
        setTodos(arr);
        setLoading(false);
      },
      (err) => {
        console.error("todos onSnapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { todos, loading };
}
