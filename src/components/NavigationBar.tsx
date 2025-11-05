import Button from "./Button";

const NavigationBar = () => {
  return (
    <nav className="relative mx-auto flex justify-between items-center px-20 py-[13px] bg-black-34">
      {/* Left Side: CORELAB LOGO - Home Button*/}
      <div>
        <Button className="font-bold text-shrek text-5xl" to="/">
          CORE LAB
        </Button>
      </div>

      {/* Middle: Nav Links*/}
      <div className="absolute left-1/2 transform -translate-x-1/2 space-x-3">
        <Button to="/">HOME</Button>
        <Button to="/memberships">MEMBERSHIPS</Button>
        <Button>CLASSES</Button>
        <Button to="/coaches">COACHES</Button>
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
