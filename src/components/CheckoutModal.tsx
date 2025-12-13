import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { authTransition } from "../hooks/authTransition";

interface Booking {
  id: string; // schedule ID
  name: string;
  schedule: string;
  coachName: string;
  price: number;
  weeks: number;
}

interface CheckoutModalProps {
  cartItems: Booking[];
  onClose: () => void;
  onSuccess: () => void;
  clearCart: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cartItems,
  onClose,
  onSuccess,
  clearCart,
}) => {
  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.weeks,
    0
  );

  // Lock UI
  useEffect(() => {
    authTransition.setLocked(true);
  }, []);

  // Mount animation
  useEffect(() => {
    setRenderModal(true);
    const t = setTimeout(() => setShowContent(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => {
      authTransition.setLocked(false);
      onClose();
    }, 200);
  };

  const handleConfirm = async () => {
    setError("");

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      const enrollmentsRef = collection(db, "enrollments");

      for (const item of cartItems) {
        await addDoc(enrollmentsRef, {
          userID: user.uid,
          classScheduleID: item.id,
          weeksEnrolled: item.weeks,
          enrolledAt: serverTimestamp(),
          methodOfPayment: paymentMethod, // ✅ REQUIRED
        });
      }

      setShowContent(false);

      setTimeout(() => {
        authTransition.setLocked(false);
        clearCart(); // ✅ EMPTY CART
        onSuccess(); // ✅ OPEN SUCCESS MODAL
      }, 300);
    } catch (err) {
      console.error(err);
      setError("Failed to complete enrollment. Please try again.");
      setLoading(false);
    }
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
        className={`bg-black-35 px-12 pt-4 pb-7 rounded-2xl w-[500px] text-white relative transform transition-all duration-300 ${
          showContent
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 translate-y-6"
        }`}
      >
        <Button
          onClick={handleClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12" />
        </Button>

        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        <h2 className="text-shrek text-6xl font-bold text-center">
          CORE LAB
        </h2>
        <p className="text-center text-xl mb-6">
          Complete your enrollment.
        </p>


        {/* Cart Summary */}
        <div className="mt-6 max-h-[260px] overflow-y-auto bg-black/20 rounded-xl p-4 text-left">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4 border-b border-white/10 pb-2">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-donkey-10">{item.schedule}</p>
              <p className="text-sm">
                Coach: <span className="italic">{item.coachName}</span>
              </p>
              <p className="text-sm">
                {item.weeks} week(s) × ₱{item.price}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <p className="text-xl font-bold mt-7 text-center">Total: ₱{total}</p>

        {/* Payment */}
        <div className="mt-3">
          <select
            className="w-full px-3 py-2 rounded-4xl bg-donkey-10 text-black-35"
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
        </div>

        {/* Terms */}
        <div className="flex items-center justify-center gap-2 mt-3 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <p>I agree to the terms and conditions</p>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-8 ml-5 mt-6">
          <Button onClick={handleClose} className="nobg-btn p-0">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="shrek-btn font-bold px-8 py-1"
          >
            CONFIRM & PAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
