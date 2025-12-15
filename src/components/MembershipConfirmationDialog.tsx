import Button from "./Button";

export default function MembershipConfirmationDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black-35 p-10 rounded-2xl w-[480px] text-center text-white">
        <h1 className="text-shrek text-5xl font-bold">CORE LAB</h1>
        <p className="text-xl mb-8">Congratulations!</p>

        <p className="text-shrek text-2xl font-bold mb-2">
          Your application is under review.
        </p>

        <p className="opacity-80 mb-6">
          Your membership status will be reflected on your profile.
        </p>

        <p className="text-sm opacity-70 mb-8">
          Charges will be automatically applied once your application is
          approved.
        </p>

        <div className="flex justify-center gap-6">
          <Button to="/" className="shrek-btn text-xl font-bold px-4 py-1">
            BACK TO HOME
          </Button>
          <Button
            onClick={onClose}
            to="/profile"
            className="shrek-btn text-xl font-bold px-4 py-1"
          >
            VIEW MY PROFILE
          </Button>
        </div>
      </div>
    </div>
  );
}
