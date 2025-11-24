import React, { useEffect, useState } from "react";
import Button from "./Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm: () => void;
}

const AS_DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  userName,
  onConfirm,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      setTimeout(() => setShowContent(true), 10);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => setRenderModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

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
        className={`bg-black-35 flex flex-col justify-between text-white py-6 rounded-2xl w-[400px] h-[260px] text-center transform transition-all duration-300 ease-in-out ${
          showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold">Delete User</h2>
          <p className="mb-6 text-donkey-20">
            Are you sure you want to delete <b>{userName}</b>?
          </p>
        </div>

        <div className="flex justify-center gap-7">
          <Button onClick={onClose} className="nobg-btn p-0">
            CANCEL
          </Button>
          <Button onClick={onConfirm} className="shrek-btn font-bold m-0">
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AS_DeleteConfirmModal;
