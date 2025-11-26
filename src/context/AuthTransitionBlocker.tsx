import { useEffect, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("auth-transition-complete", callback);
  window.addEventListener("auth-transition-lock", callback);
  return () => {
    window.removeEventListener("auth-transition-complete", callback);
    window.removeEventListener("auth-transition-lock", callback);
  };
};

const getSnapshot = () => window.authTransition?.locked ?? false;

export default function AuthTransitionBlocker({ children }) {
  const locked = useSyncExternalStore(subscribe, getSnapshot);

  if (locked) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40]"></div>
    );
  }

  return children;
}
