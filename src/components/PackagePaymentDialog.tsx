import { useState } from "react";
import type { PackageData } from "../pages/MembershipPackages";
import type { MembershipStatus } from "../pages/MembershipPackages";
interface PaymentProps {
  packageData: PackageData;
  onCancel: () => void;
  onConfirm: (method: string, status: MembershipStatus) => void;
}

export default function PackagePaymentDialog({
  packageData,
  onCancel,
  onConfirm,
}: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agree, setAgree] = useState(false);

  return (
  
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-black-34 text-white p-6 rounded-2xl w-[380px] shadow-xl">

        <h1 className="text-center text-shrek text-2xl font-bold mb-2">
          CORE LAB
        </h1>

        <div className="bg-black-35 p-4 rounded-xl mb-4">
          <h2 className="text-lg font-semibold">{packageData.title}</h2>

          <div className="text-sm text-gray-300">
            <p>{packageData.details}</p>
          </div>

          <p className="text-xl mt-2 font-bold text-shrek">
            ₱{packageData.pricePerMonth}
          </p>
        </div>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 rounded-lg bg-black-34 border border-gray-600 mb-4"
        >
          <option value="">Choose payment method</option>
          <option value="gcash">GCash</option>
          <option value="paymaya">PayMaya</option>
          <option value="card">Credit / Debit</option>
          <option value="cash">Cash</option>
        </select>

        <label className="flex items-center gap-2 text-sm mb-4">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          I agree to the terms and conditions.
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-4xl bg-black-34 hover:bg-black-34
            border-2 border-transparent transition-colors duration-300
            hover:text-white hover:border-shrek"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(paymentMethod, "For Confirmation")}
            disabled={!paymentMethod || !agree}
            className="shrek-btn font-bold"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}

