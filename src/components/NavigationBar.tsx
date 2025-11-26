import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Button from "./Button";

const NavigationBar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auth/UI state
  const [role, setRole] = useState<"member" | "coach" | "admin">("member");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ──────────────────────────────────────────
  // AUTH LISTENER
  // ──────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Block UI updates during auth transitions
      if (window.authTransition.locked) return;

      if (user) {
        setIsLoggedIn(true);
        const ref = doc(db, "user", user.uid);
        const snap = await getDoc(ref);
        setRole(snap.exists() ? snap.data().role : "member");
      } else {
        setIsLoggedIn(false);
        setRole("member"); // default navbar for logged-out users
      }
    });

    return () => unsubscribe();
  }, []);

  // When modal says "auth finished", re-evaluate currentUser
  useEffect(() => {
    const onComplete = async () => {
      const user = auth.currentUser;

      if (user) {
        setIsLoggedIn(true);
        const ref = doc(db, "user", user.uid);
        const snap = await getDoc(ref);
        setRole(snap.exists() ? snap.data().role : "member");
      } else {
        setIsLoggedIn(false);
        setRole("member");
      }
    };

    window.addEventListener("auth-transition-complete", onComplete);
    return () =>
      window.removeEventListener("auth-transition-complete", onComplete);
  }, []);

  // ──────────────────────────────────────────
  // NAVBAR HIDE/SHOW ON SCROLL
  // ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (window.authTransition.locked) {
        setHidden(false);
        return;
      }

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-20 py-[13px] bg-black-34 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* LEFT — LOGO */}
      <Button
        className="font-bold text-shrek text-5xl hover:scale-110 transition-transform"
        to="/"
      >
        CORE LAB
      </Button>

      {/* CENTER LINKS */}
      <div className="absolute left-1/2 -translate-x-1/2 space-x-3">
        <Button to="/">HOME</Button>

        {/* MEMBER LINKS — always shown, even when logged out */}
        {role === "member" && (
          <>
            <Button to="/memberships">MEMBERSHIPS</Button>
            <Button to="/classes">CLASSES</Button>
            <Button to="/coaches">COACHES</Button>
          </>
        )}

        {/* COACH LINKS */}
        {role === "coach" && (
          <>
            <Button to="/CS-Classes">CLASSES</Button>
            <Button to="/CS-Client">CLIENTS</Button>
          </>
        )}
      </div>

      {/* RIGHT — PROFILE + LOGIN/LOGOUT */}
      <div className="space-x-2">
        <Button to="/profile">MY PROFILE</Button>

        {isLoggedIn ? (
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
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
