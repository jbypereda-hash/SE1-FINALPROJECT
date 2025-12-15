interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmCancelMembershipModal({
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1c1c22] rounded-2xl w-full max-w-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Cancel Membership</h3>

        <p className="text-sm text-gray-300 mb-6">
          Are you sure you want to cancel your membership? This will immediately
          unenroll you from all classes.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-shrek text-black-35 hover:bg-donkey-10 text-sm"
          >
            Keep Membership
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Cancel Membership
          </button>
        </div>
      </div>
    </div>
  );
}
