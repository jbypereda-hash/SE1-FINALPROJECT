import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode; //ang text sa button(?)
  className?: string; //optional styling class
  to?: string; // optional internal navigation 
  href?: string; // optional external link
  onClick?: () => void; // optional function
  type?: "button" | "submit" | "reset"; //new line added by yen | for the dialog boxes
  variant?: "ghost" | "primary" | "secondary"; //new line added by yen | for the dropdown arrow
}

const Button = ({ children, className = "", to, href, onClick, type }: Props) => {
  const baseClasses = className || "nobg-btn"; // default

  if (to) {
    // If "to" exists, render as Link (navigation)
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    // If "href" exists, render as External Link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  // Otherwise, render as button (action)
  return (
    <button
      type={type || "button"}   // <-- FIXED: Prevents form submit reload
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

export default Button;
