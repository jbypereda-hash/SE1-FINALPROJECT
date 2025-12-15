import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "ghost" | "primary" | "secondary";
  disabled?: boolean; // ✅ ADD THIS
}

const Button = ({
  children,
  className = "",
  to,
  href,
  onClick,
  type,
  disabled = false,
}: Props) => {
  const baseClasses = className || "nobg-btn";

  /* ----------------------------------
     LINK BUTTON
  ---------------------------------- */
  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {children}
      </Link>
    );
  }

  /* ----------------------------------
     EXTERNAL LINK
  ---------------------------------- */
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {children}
      </a>
    );
  }

  /* ----------------------------------
     ACTION BUTTON
  ---------------------------------- */
  return (
    <button
      type={type || "button"}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
