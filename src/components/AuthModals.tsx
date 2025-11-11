// src/components/AuthModals.tsx
import { useEffect, useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const AuthModals = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Listen for custom events from anywhere in the app
  useEffect(() => {
    const handleOpenSignup = () => setShowSignup(true);
    const handleOpenLogin = () => setShowLogin(true);

    window.addEventListener("open-signup", handleOpenSignup);
    window.addEventListener("open-login", handleOpenLogin);

    return () => {
      window.removeEventListener("open-signup", handleOpenSignup);
      window.removeEventListener("open-login", handleOpenLogin);
    };
  }, []);

  return (
    <>
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setTimeout(() => setShowLogin(true), 150);
        }}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setTimeout(() => setShowSignup(true), 150);
        }}
      />
    </>
  );
};

export default AuthModals;
