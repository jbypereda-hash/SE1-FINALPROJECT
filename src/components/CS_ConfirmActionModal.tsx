import React, { useEffect, useState } from "react";
import Button from "./Button";
import { authTransition } from "../hooks/authTransition";

interface ConfirmActionModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

const CS_ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}) => {
  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔒 Lock UI on mount (same as SuccessModal)
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
      onClose();
    }, 200);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    close();
  };

  if (!renderModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-opacity duration-300 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => close()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 rounded-2xl w-[420px] h-[250px] py-6 px-8 flex flex-col justify-between text-center transform transition-all duration-300 ${
          showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-donkey-20">{description}</p>
        </div>

        <div className="flex justify-center gap-7">
          <Button onClick={() => close()} className="nobg-btn">
            CANCEL
          </Button>
          <Button
            onClick={handleConfirm}
            className="shrek-btn font-bold"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CS_ConfirmActionModal;
