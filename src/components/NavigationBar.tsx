import { useEffect, useState } from "react";
import Button from "./Button";
import { useAuthState } from "../context/AuthContext";

const NavigationBar = () => {
  const { isLoggedIn, role, forceRefreshAuth } = useAuthState();

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [freeze, setFreeze] = useState(false);

  // Freeze when modal opens
  useEffect(() => {
    const lock = () => setFreeze(true);

    const unlock = () => {
      setFreeze(false);
      forceRefreshAuth(); // refresh AFTER unlocking
    };

    window.addEventListener("auth-transition-start", lock);
    window.addEventListener("auth-transition-complete", unlock);

    return () => {
      window.removeEventListener("auth-transition-start", lock);
      window.removeEventListener("auth-transition-complete", unlock);
    };
  }, [forceRefreshAuth]);

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      if (freeze) return;
      if (window.scrollY > lastScrollY && window.scrollY > 100) setHidden(true);
      else setHidden(false);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, freeze]);

  // Default buttons = member navbar even logged out
  const safeRole = isLoggedIn ? role : "member";

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-20 py-[13px] bg-black-34 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* LOGO */}
      <Button
        className="font-bold text-shrek text-5xl hover:scale-110 transition-transform"
        to="/"
      >
        CORE LAB
      </Button>

      {/* NAV LINKS */}
      <div className="absolute left-1/2 -translate-x-1/2 space-x-3">
        <Button to="/">HOME</Button>

        {safeRole === "member" && (
          <>
            <Button to="/memberships">MEMBERSHIPS</Button>
            <Button to="/classes">CLASSES</Button>
            <Button to="/coaches">COACHES</Button>
          </>
        )}

        {safeRole === "coach" && (
          <>
            <Button to="/CS-Classes">CLASSES</Button>
            <Button to="/CS-Client">CLIENTS</Button>
          </>
        )}
      </div>

      {/* RIGHT — LOGIN / LOGOUT */}
      <div className="space-x-2">
        {(safeRole === "member" || safeRole === null) && (
          <Button to="/profile">MY PROFILE</Button>
        )}
        {safeRole === "coach" && (
          <Button to="/CS-CoachProfile">MY PROFILE</Button>
        )}
        {!freeze &&
          (isLoggedIn ? (
            <Button
              className="shrek-btn w-35"
              onClick={() =>
                window.dispatchEvent(new Event("open-logout-confirm"))
              }
            >
              LOG OUT
            </Button>
          ) : (
            <Button
              className="shrek-btn w-35"
              onClick={() => window.dispatchEvent(new Event("open-login"))}
            >
              LOG IN
            </Button>
          ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
