import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AuthModals from "./context/AuthModals";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ProtectedRoute from "./context/ProtectedRoute";

// User Pages
import Home from "./pages/Home";
import Memberships from "./pages/Memberships";
import { CoachesPage } from "./pages/CoachesPage";
import { ProfilePage } from "./pages/Profile";

// Admin Pages
import AS_PendingMemberships from "./pages/admin/AS_PendingMemberships";
import AS_AdminDirectory from "./pages/admin/AS_AdminDirectory";
import AS_MemberDirectory from "./pages/admin/AS_MemberDirectory";
import AS_CoachDirectory from "./pages/admin/AS_CoachDirectory";
import AS_AddCoach from "./pages/admin/AS_AddCoach";
import AS_EditCoach from "./pages/admin/AS_EditCoach";

const App = () => {
  const { loading } = useAuth();

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
      <Routes>
        {/* ---------- PUBLIC / USER ROUTES ---------- */}
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
              <Memberships />
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

        {/* ---------- CATCH ALL ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
