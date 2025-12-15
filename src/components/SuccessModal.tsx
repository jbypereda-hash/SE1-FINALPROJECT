import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { authTransition } from "../hooks/authTransition";
import { useNavigate } from "react-router-dom";

interface EnrolledClass {
  name: string;
  schedule: string;
}

interface SuccessModalProps {
  enrolledClasses: EnrolledClass[];
  onViewProfile: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ enrolledClasses }) => {
  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    close(() => {
      navigate("/profile");
    });
  };
  // Lock UI
  useEffect(() => {
    authTransition.setLocked(true);
    setRenderModal(true);
    const t = setTimeout(() => setShowContent(true), 10);
    return () => clearTimeout(t);
  }, []);

  const close = (cb?: () => void) => {
    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      cb?.();
    }, 200);
  };

  const handleExplore = () => {
    close(() => {
      navigate("/classes");
      window.location.reload(); // hard refresh as requested
    });
  };

  if (!renderModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-12 py-8 rounded-2xl w-[600px] text-white relative transform transition-all duration-300 ${
          showContent
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 translate-y-6"
        }`}
      >
        {/* Back / Close */}
        <Button
          onClick={() => close()}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-10 h-10" />
        </Button>

        <h2 className="text-shrek text-5xl font-bold text-center mb-4">
          Congratulations!
        </h2>

        <p className="text-lg text-center mb-6">
          You are successfully enrolled in the following classes:
        </p>

        {/* Enrolled Classes List */}
        <div className="max-h-[220px] overflow-y-auto bg-black/20 rounded-xl p-4 mb-6 text-left">
          {enrolledClasses.map((cls, idx) => (
            <div
              key={idx}
              className="border-b border-white/10 pb-3 mb-3 last:border-none last:mb-0"
            >
              <p className="font-bold">{cls.name}</p>
              <p className="text-sm text-donkey-10">{cls.schedule}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-6">
          <Button
            onClick={handleExplore}
            className="shrek-btn font-bold px-8 py-1"
          >
            EXPLORE MORE CLASSES
          </Button>
          <Button
            onClick={handleViewProfile}
            className="shrek-btn font-bold px-8 py-1"
          >
            VIEW MY PROFILE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
