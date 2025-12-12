import { useState } from "react";
import type { PackageData } from "../pages/MembershipPackages";

interface PaymentProps {
  packageData: PackageData;
  onCancel: () => void;
  onConfirm: (method: string) => void;
}

export default function PackagePaymentDialog({
  packageData,
  onCancel,
  onConfirm,
}: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex items-center justify-center z-50">
      <div className="min-h-screen bg-black-34 text-white p-6 rounded-2xl w-[380px] shadow-xl">
        <h1 className="text-center text-shrek-400 text-2xl font-bold mb-2">
          CORE LAB
        </h1>

        <div className="bg-gray-700 p-4 rounded-xl mb-4">
          <h2 className="text-lg font-semibold">{packageData.name}</h2>

          <div className="text-sm text-gray-300">
            {packageData.details.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>

          <p className="text-xl mt-2 font-bold text-green-400">
            ₱{packageData.price}
          </p>
        </div>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 mb-4"
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
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-600">
            Cancel
          </button>

          <button
            onClick={() => onConfirm(paymentMethod)}
            disabled={!paymentMethod || !agree}
            className="px-4 py-2 rounded bg-green-600 disabled:opacity-40"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
