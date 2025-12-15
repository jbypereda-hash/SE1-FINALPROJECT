import { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { authTransition } from "../hooks/authTransition";

interface Props {
  packageData: {
    id: string;
    title: string;
    pricePerMonth: number;
    description: string;
  };
  onClose: () => void;
  onConfirm: (method: string) => Promise<string | null>;
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
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    authTransition.setLocked(true);
    setRenderModal(true);
    setTimeout(() => setShowContent(true), 10);
  }, []);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleClose = () => {
    if (isProcessing) return;

    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      onClose();
    }, 200);
  };

  const handleConfirm = async () => {
    if (isProcessing) return;

    if (!paymentMethod || !agree) {
      setError("Please select a payment method and agree to the terms.");
      return;
    }

    setError("");
    setIsProcessing(true);

    const result = await onConfirm(paymentMethod);

    if (result) {
      setError(result);
      setIsProcessing(false);
      return;
    }

    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
    }, 300);
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-12 pt-4 pb-7 rounded-2xl w-[500px] text-white transition-all duration-300 ${
          showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <Button onClick={handleClose} className="absolute top-5 left-5">
          <BackButton className="w-12 h-12" />
        </Button>

        {isProcessing && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold text-center">CORE LAB</h2>
        <p className="text-center text-xl mb-6">Complete your membership.</p>

        {/* PACKAGE SUMMARY */}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold mb-1 italic">Package Summary</p>
          <div className="w-full bg-black-34 rounded-2xl py-4 my-3">
            <p className="text-shrek text-xl font-bold">{packageData.title}</p>

            <p className="text-white font-semibold mb-4">
              ₱{packageData.pricePerMonth.toLocaleString()} per month
            </p>

            <div className="space-y-3 text-sm opacity-90 mb-6 px-6">
              {packageData.description
                .split(".")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((item, i) => (
                  <p key={i}>{item}.</p>
                ))}
            </div>
          </div>

          <p className="text-sm">
            <span className="font-bold">Start Date:</span>{" "}
            {formatDate(startDate)} |{" "}
            <span className="font-bold">End Date:</span> {formatDate(endDate)}
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
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <p>I agree to the Terms & Conditions</p>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <div className="flex justify-center gap-8 mt-6">
          <Button onClick={handleClose} className="nobg-btn">
            CANCEL
          </Button>
          <Button onClick={handleConfirm} className="shrek-btn font-bold px-8">
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
}
