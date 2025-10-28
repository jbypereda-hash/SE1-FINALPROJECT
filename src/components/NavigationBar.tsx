import Button from "./Button";

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between bg-black-34 text-white px-8 py-4">
      
      {/* Left Side - CORELAB LOGO - Home Button*/}
      <div className="font-sans font-bold text-shrekz">
        <Button to="/">CORELAB</Button>
      </div>
      <div>
        <Button to="/">HOME</Button>
        <Button to="/memberships">MEMBERSHIPS</Button>
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
