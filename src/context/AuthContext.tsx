// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { authTransition } from "../hooks/authTransition";

type Role = "member" | "coach" | "admin" | null;

interface AuthContextType {
  user: User | null;
  role: Role;
  isLoggedIn: boolean;
  loading: boolean;
  forceRefreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("member");
  const [loading, setLoading] = useState<boolean>(true);

  // helper to read role from firestore (document path 'user' as you use)
  const loadUserRole = async (uid: string) => {
    try {
      const ref = doc(db, "user", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole((data?.role as Role) ?? "member");
      } else {
        setRole("member");
      }
    } catch (err) {
      console.error("loadUserRole error:", err);
      setRole("member");
    }
  };

  useEffect(() => {
    // keep the initial loading visible until the first auth state is resolved
    setLoading(true);

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole("member");
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      await loadUserRole(firebaseUser.uid);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Allow components (e.g. navbar) to trigger an immediate refresh after UI unlock
  const forceRefreshAuth = async () => {
    const u = auth.currentUser;
    if (!u) {
      setUser(null);
      setRole("member");
      return;
    }
    setUser(u);
    await loadUserRole(u.uid);
  };

  // Optional: keep window.authTransition.locked in sync if something reads it
  useEffect(() => {
    // whenever authTransition changes it updates window.authTransition
    const unsubscribe = authTransition.subscribe((locked) => {
      window.authTransition = { locked };
    });
    // ensure initial sync
    window.authTransition = { locked: authTransition.locked };
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn: !!user,
        loading,
        forceRefreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// keep your old useAuthState alias if other files import it
export const useAuthState = useAuth;
