import { useEffect, useState } from "react";
import Button from "./Button";

const NavigationBar = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // scrolling down → hide navbar
        setHidden(true);
      } else {
        // scrolling up → show navbar
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 mx-auto flex justify-between items-center px-20 py-[13px] bg-black-34 z-50 transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Left Side: CORELAB LOGO - Home Button*/}
      <div>
        <Button
          className="inline-block font-bold text-shrek text-5xl transition-transform duration-400 hover:scale-110"
          to="/"
        >
          CORE LAB
        </Button>
      </div>

      {/* Middle: Nav Links*/}
      <div className="absolute left-1/2 transform -translate-x-1/2 space-x-3">
        <Button to="/">HOME</Button>
        <Button to="/memberships">MEMBERSHIPS</Button>
        <Button>CLASSES</Button>
        <Button to="/coaches">COACHES</Button>
        <Button to="/AS_AdminDirectory">ADMIN</Button>
      </div>

      {/* Right: Profile + GET STARTED / LOGIN / LOGOUT */}
      <div className="space-x-2">
        <Button>MY PROFILE</Button>
        <Button className="shrek-btn">GET STARTED</Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
