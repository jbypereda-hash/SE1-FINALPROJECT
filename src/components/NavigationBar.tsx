import Button from "./Button";

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between bg-black text-white px-8 py-4">
      
      {/* Left Side - CORELAB LOGO */}
      <div className="font-bold text-lime-400 text-xl">
        <Button>CORE LAB</Button>
      </div>
      <div>
        <Button>HOME</Button>
        <Button>MEMBERSHIPS</Button>
        <Button>CLASSES</Button>
        <Button>COACHES</Button>
      </div>
      <div>
        <Button>MY PROFILE</Button>
        <Button>GET STARTED</Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
