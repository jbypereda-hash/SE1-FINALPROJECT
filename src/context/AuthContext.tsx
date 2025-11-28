import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextValue {
  user: User | null;
  role: "member" | "coach" | "admin" | null;
  isLoggedIn: boolean;
  loading: boolean;
  forceRefreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"member" | "coach" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch role from Firestore
  const loadUserRole = async (uid: string) => {
    const ref = doc(db, "user", uid);
    const snap = await getDoc(ref);
    setRole(snap.exists() ? snap.data().role : "member");
  };

  // Normal Firebase auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setRole("member");
        setLoading(false);
        return;
      }

      setUser(u);
      await loadUserRole(u.uid);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Function for navbar freeze → re-fetch AFTER modal closes
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

export const useAuth = () => useContext(AuthContext)!;

// 👇 This is what your NAVBAR needs
export const useAuthState = () => useContext(AuthContext)!;
