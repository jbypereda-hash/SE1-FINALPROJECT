import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  role: "admin" | "coach" | "member" | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "coach" | "member" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // IMPORTANT: your collection must contain a role field
          const userRef = doc(db, "user", currentUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();

            // VALIDATE role
            if (data.role === "admin") setRole("admin");
            else if (data.role === "coach") setRole("coach");
            else setRole("member"); // fallback
          } else {
            // No document → assume member
            setRole("member");
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole("member");
        }
      } else {
        // logged out
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
