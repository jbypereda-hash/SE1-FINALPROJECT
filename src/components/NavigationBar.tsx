import Button from "./Button";

const NavigationBar = () => {
  return (
    <nav className="relative mx-auto flex justify-between items-center px-[40px] py-[5px] bg-black-34">
      {/* Left Side: CORELAB LOGO - Home Button*/}
      <div>
        <Button className="font-bold text-shrek text-2xl" to="/">
          CORE LAB
        </Button>
      </div>

      {/* Middle: Nav Links*/}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Button to="/">HOME</Button>
        <Button to="/memberships">MEMBERSHIPS</Button>
        <Button>CLASSES</Button>
        <Button>COACHES</Button>
      </div>

      {/* Right: Profile + GET STARTED / LOGIN / LOGOUT */}
      <div>
        <Button>MY PROFILE</Button>
        <Button className="shrek-btn">GET STARTED</Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
