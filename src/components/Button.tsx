import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  to?: string; // optional navigation path
  onClick?: () => void; // optional function
}

const Button = ({ children, to, onClick }: Props) => {
  // If there's a "to" prop, render a <Link> (for navigation)
  if (to) {
    return (
      <Link
        to={to}
        className="px-4 py-2 text-white hover:text-shrek transition-colors"
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render a normal button
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-white hover:text-shrek transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;