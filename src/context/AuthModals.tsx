// src/components/AuthModals.tsx
import { useEffect, useState } from "react";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import RegistrationDialog from "../components/RegistrationDialog";

const AuthModals = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const [signupRole, setSignupRole] = useState<"member" | "admin">("member");

  // Listen for custom events from anywhere in the app
  useEffect(() => {
    const handleOpenLogoutConfirm = () => setShowLogoutConfirm(true);
    const handleOpenLogin = () => setShowLogin(true);
    const handleOpenRegistration = () => setShowRegistration(true);

    const handleOpenSignup = () => {
      setSignupRole("member");
      setShowSignup(true);
    };

    const handleOpenAdminSignup = () => {
      setSignupRole("admin");
      setShowSignup(true);
    };

    window.addEventListener("open-signup", handleOpenSignup);
    window.addEventListener("open-signup-admin", handleOpenAdminSignup);
    window.addEventListener("open-login", handleOpenLogin);
    window.addEventListener("open-logout-confirm", handleOpenLogoutConfirm);
    window.addEventListener("open-registration", handleOpenRegistration);

    return () => {
      window.removeEventListener("open-signup", handleOpenSignup);
      window.removeEventListener("open-signup-admin", handleOpenAdminSignup);
      window.removeEventListener("open-login", handleOpenLogin);
      window.removeEventListener("open-registration", handleOpenRegistration);

      window.removeEventListener(
        "open-logout-confirm",
        handleOpenLogoutConfirm
      );
    };
  }, []);

  const isAnyOpen =
    showSignup || showLogin || showLogoutConfirm || showRegistration;

  if (!isAnyOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="pointer-events-auto">
        {showSignup && (
          <SignupModal
            isOpen={showSignup}
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setTimeout(() => setShowLogin(true), 200);
            }}
            defaultRole={signupRole}
          />
        )}

        {showLogin && (
          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setTimeout(() => setShowSignup(true), 200);
            }}
          />
        )}

        {showLogoutConfirm && (
          <LogoutConfirmModal
            isOpen={showLogoutConfirm}
            onClose={() => setShowLogoutConfirm(false)}
          />
        )}

        {showRegistration && (
          <RegistrationDialog
            isOpen={showRegistration}
            onClose={() => setShowRegistration(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModals;
