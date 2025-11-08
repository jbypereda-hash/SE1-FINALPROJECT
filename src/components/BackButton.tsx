import Button from "./Button";
import arrowLeft from "../assets/icons/arrow-left.svg";

interface BackButtonProps {
  to?: string; // optional: fixed route (e.g. "/")
  className?: string; // optional extra styling
}

const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const handleBack = () => {
    if (!to) window.history.back();
  };

  return (
    <Button
      to={to}
      onClick={!to ? handleBack : undefined}
      className={`p-2 rounded-full hover:bg-[#2a2a31] transition ${className}`}
    >
      <img src={arrowLeft} alt="Back" className="w-6 h-6" />
    </Button>
  );
};

export default BackButton;
