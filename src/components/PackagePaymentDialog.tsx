import { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { authTransition } from "../hooks/authTransition";

interface Props {
  packageData: {
    title: string;
    pricePerMonth: number;
    description: string;
  };
  onClose: () => void;
  onConfirm: (method: string) => void;
}

export default function PackagePaymentDialog({
  packageData,
  onClose,
  onConfirm,
}: Props) {
  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authTransition.setLocked(true);
    setRenderModal(true);
    setTimeout(() => setShowContent(true), 10);
  }, []);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      onClose();
    }, 200);
  };

  const handleConfirm = () => {
    if (!paymentMethod || !agree) {
      setError("Please select a payment method and agree to terms.");
      return;
    }

    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      onConfirm(paymentMethod);
    }, 300);
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-12 pt-4 pb-7 rounded-2xl w-[500px] text-white transition-all duration-300 ${
          showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <Button onClick={handleClose} className="absolute top-5 left-5">
          <BackButton className="w-12 h-12" />
        </Button>

        <h2 className="text-shrek text-6xl font-bold text-center">CORE LAB</h2>
        <p className="text-center text-xl mb-6">Complete your membership.</p>

        <div className="bg-black/20 rounded-xl p-4">
          <p className="font-bold">{packageData.title}</p>
          <p className="text-sm">{packageData.description}</p>
          <p className="text-xl font-bold mt-2">
            ₱{packageData.pricePerMonth}
          </p>
        </div>

        <select
          className="w-full mt-4 px-3 py-2 rounded-4xl bg-donkey-10 text-black-35"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="" disabled hidden>
            Select payment method
          </option>
          <option value="cash">Cash</option>
          <option value="gcash">GCash</option>
          <option value="card">Credit / Debit Card</option>
        </select>

        <div className="flex items-center justify-center gap-2 mt-3 text-sm">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
          <p>I agree to the terms and conditions</p>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <div className="flex justify-center gap-8 mt-6">
          <Button onClick={handleClose} className="nobg-btn">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="shrek-btn font-bold px-8">
            CONFIRM & PAY
          </Button>
        </div>
      </div>
    </div>
  );
}
