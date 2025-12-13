import type { PackageData } from "../pages/MembershipPackages";

interface ConfirmationProps {
  selectedPackage: PackageData | null;
  onClose: () => void;
}

export default function MembershipConfirmationDialog({
  selectedPackage,
  onClose,
}: ConfirmationProps) {
  
  if (!selectedPackage) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-[Inria Sans]">
      <div className="bg-[var(--color-donkey-30)] text-white p-8 rounded-2xl w-[420px] shadow-xl text-center">

        <h1 className="text-shrek text-3xl mb-2">CORE LAB</h1>
        <h2 className="text-xl mb-4">Congratulations!</h2>

        <p className="opacity-80 mb-6">
          Your application for the{" "}
          <span className="font-bold">{selectedPackage.name}</span> package has been
          successfully submitted.
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-shrek text-black-34 px-6 py-2 rounded-xl font-semibold"
        >
          Close
        </button>

      </div>
    </div>
  );
}