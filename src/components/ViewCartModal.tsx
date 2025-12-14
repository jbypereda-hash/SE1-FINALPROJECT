import React, { useEffect, useState } from "react";
import Minus from "../assets/icons/minus.svg?react";
import Plus from "../assets/icons/plus.svg?react";
import X from "../assets/icons/x.svg?react";
import BackButton from "../assets/icons/arrow-left.svg?react";
import Button from "./Button";
import { authTransition } from "../hooks/authTransition";

interface Booking {
  id: string;
  name: string;
  schedule: string;
  coachName: string;
  price: number;
  weeks: number;
}

interface ViewCartModalProps {
  cartItems: Booking[];
  onClose: () => void;
  updateWeeks: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  proceedToCheckout: () => void;
}

const ViewCartModal: React.FC<ViewCartModalProps> = ({
  cartItems,
  onClose,
  updateWeeks,
  removeItem,
  proceedToCheckout,
}) => {
  const [renderModal, setRenderModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    authTransition.setLocked(true);
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

  const handleProceed = () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setError("");
    proceedToCheckout();
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.weeks, 0);

  if (!renderModal) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 rounded-[40px] w-full max-w-6xl px-10 pt-3 pb-8 text-white relative transform transition-all duration-300 ${
          showContent
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 translate-y-6"
        } max-h-[90vh] flex flex-col`}
      >
        <Button
          onClick={handleClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12" />
        </Button>

        <h2 className="text-center text-6xl font-bold text-shrek mb-2">
          MY CART
        </h2>
        <p className="text-center text-xl mb-6">
          Finalize your schedule and proceed to payment.
        </p>

        {/* CONTENT */}
        <div className="bg-donkey-10 text-black-35 rounded-[40px] flex flex-col flex-1 overflow-hidden mb-7 transform transition-all">
          {cartItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-2xl italic font-semibold text-black-30 my-25">
              No items in your cart.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-12 px-4 py-2 font-bold text-center text-2xl border-b border-black-34">
                <div className="col-span-2">CLASS:</div>
                <div className="col-span-3">SCHEDULE:</div>
                <div className="col-span-2">COACH:</div>
                <div className="col-span-2">PRICE:</div>
                <div className="col-span-2">WEEKS:</div>
                <div className="col-span-1"></div>
              </div>

              <div className="h-full overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center text-center px-4 py-5 border-b border-black-30 text-lg"
                  >
                    <div className="col-span-2 font-bold text-2xl truncate">{item.name}</div>
                    <div className="col-span-3 truncate">{item.schedule}</div>
                    <div className="col-span-2 text-xl">
                      {item.coachName}
                    </div>
                    <div className="col-span-2 font-bold truncate">
                      ₱ {item.price.toLocaleString()} / week
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center gap-4 bg-[#E7E7E7] px-4 py-1 rounded-full">
                        <button onClick={() => updateWeeks(item.id, -1)}>
                          <Minus className="w-4 h-4 hover:scale-120 transition-transform" />
                        </button>
                        <span className="font-bold">{item.weeks}</span>
                        <button onClick={() => updateWeeks(item.id, 1)}>
                          <Plus className="w-4 h-4 hover:scale-120 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="group w-10 h-10 bg-[#E7E7E7] rounded-full flex items-center justify-center"
                      >
                        <X className="w-5 h-5 group-hover:scale-120 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-10 py-4 text-right text-3xl font-bold">
                TOTAL: ₱ {total.toLocaleString()}
              </div>
            </>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-center font-semibold mb-2">{error}</p>
        )}

        <div className="flex justify-center gap-8">
          <Button onClick={handleClose} className="shrek-btn font-bold">
            EXPLORE CLASSES
          </Button>
          <Button onClick={handleProceed} className="shrek-btn font-bold">
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCartModal;
