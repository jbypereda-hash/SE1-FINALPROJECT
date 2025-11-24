// src/App.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthModals from "./context/AuthModals";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./context/ProtectedRoute";

// User Pages
import Home from "./pages/Home";
import { CoachesPage } from "./pages/CoachesPage";
import ProfilePage from "./pages/Profile";
import Classes from "./pages/Classes";
import EditProfilePage from "./pages/EditProfile";
import MembershipPackages from "./pages/MembershipPackages";

// Admin Pages
import AS_PendingMemberships from "./pages/admin/AS_PendingMemberships";
import AS_AdminDirectory from "./pages/admin/AS_AdminDirectory";
import AS_MemberDirectory from "./pages/admin/AS_MemberDirectory";
import AS_CoachDirectory from "./pages/admin/AS_CoachDirectory";
import AS_AddCoach from "./pages/admin/AS_AddCoach";
import AS_EditCoach from "./pages/admin/AS_EditCoach";

import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Redirect admin to admin home
  useEffect(() => {
    if (!loading && user) {
      if (role === "admin" && !window.location.pathname.startsWith("/AS_")) {
        window.location.replace("/AS_AdminDirectory");
      }
    }
  }, [user, role, loading]);

  /* ---------------------------------------------
      EVENT LISTENER → Open Registration Modal
  --------------------------------------------- */
  useEffect(() => {
    const checkMemberExists = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "members", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        console.log("🟡 No Member Record Found → Opening Registration Dialog");
        window.dispatchEvent(new Event("open-registration"));
      }
    };

    const listener = () => checkMemberExists();
    window.addEventListener("check-member-registration", listener);

    return () =>
      window.removeEventListener("check-member-registration", listener);
  }, []);

  // While loading Firebase auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <AuthModals />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ---------- USER ROUTES ---------- */}
          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />

          <Route
            path="/memberships"
            element={
              <UserLayout>
                <MembershipPackages />
              </UserLayout>
            }
          />

          <Route
            path="/classes"
            element={
              <UserLayout>
                <Classes />
              </UserLayout>
            }
          />

          <Route
            path="/coaches"
            element={
              <UserLayout>
                <CoachesPage />
              </UserLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="member">
                <UserLayout>
                  <ProfilePage />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute requiredRole="member">
                <UserLayout>
                  <EditProfilePage />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route
            path="/AS_AdminDirectory"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_AdminDirectory />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/AS_MemberDirectory"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_MemberDirectory />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/AS_CoachDirectory"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_CoachDirectory />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/AS_PendingMemberships"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_PendingMemberships />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/AS_AddCoach"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_AddCoach />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/AS_EditCoach"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AS_EditCoach />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
