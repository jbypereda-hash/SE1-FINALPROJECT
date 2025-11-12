import React, { useEffect, useState } from "react";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Remove from DOM after fade-out
  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => setRenderModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  if (!renderModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-300 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 flex flex-col justify-between text-white py-6 rounded-2xl w-[400px] h-[230px] text-center transform transition-all duration-300 ease-in-out ${
          showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold">Confirm Logout</h2>
          <p className="mb-6 text-donkey-20">
            Are you sure you want to log out?
          </p>
        </div>

        <div className="flex justify-center gap-7 pl-4 mb-0.5">
          <Button onClick={onClose} className="nobg-btn p-0">
            CANCEL
          </Button>
          <Button onClick={handleLogout} className="shrek-btn font-bold m-0">
            LOG OUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
