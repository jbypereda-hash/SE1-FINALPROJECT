import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode; //ang text sa button(?)
  className?: string; //optional styling class
  to?: string; // optional navigation path
  onClick?: () => void; // optional function
}

const Button = ({ children, className = "", to, onClick }: Props) => {
  const baseClasses = className || "nobg-btn"; // default

  if (to) {
    // If "to" exists, render as Link (navigation)
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as button (action)
  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};

export default Button;
