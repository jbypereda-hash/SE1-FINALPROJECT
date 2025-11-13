// src/components/AuthModals.tsx
import { useEffect, useState } from "react";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import LogoutConfirmModal from "../components/LogoutConfirmModal";

const AuthModals = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [signupRole, setSignupRole] = useState<"member" | "admin">("member");

  // Listen for custom events from anywhere in the app
  useEffect(() => {
    const handleOpenLogoutConfirm = () => setShowLogoutConfirm(true);
    const handleOpenLogin = () => setShowLogin(true);
    const handleOpenSignup = () => {
      setSignupRole("member"); // normal signup
      setShowSignup(true);
    };

    const handleOpenAdminSignup = () => {
      setSignupRole("admin"); // admin signup
      setShowSignup(true);
    };

    window.addEventListener("open-signup", handleOpenSignup);
    window.addEventListener("open-signup-admin", handleOpenAdminSignup);
    window.addEventListener("open-login", handleOpenLogin);
    window.addEventListener("open-logout-confirm", handleOpenLogoutConfirm);

    return () => {
      window.removeEventListener("open-signup", handleOpenSignup);
      window.removeEventListener("open-signup-admin", handleOpenAdminSignup);
      window.removeEventListener("open-login", handleOpenLogin);
      window.removeEventListener(
        "open-logout-confirm",
        handleOpenLogoutConfirm
      );
    };
  }, []);

  return (
    <>
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setTimeout(() => setShowLogin(true), 200);
        }}
        defaultRole={signupRole}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setTimeout(() => setShowSignup(true), 200);
        }}
      />

      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      />
    </>
  );
};

export default AuthModals;
