import Button from "../components/Button";

const Home = () => {
  return (
    <div className="text-white">
      <h1 className="">Welcome to CORE LAB</h1>
      <p className="text-shrek">SHREK</p>
      <p className="text-black-35">BLACK-35</p>
      <p className="text-black-34">BLACK-34</p>
      <p className="text-donkey-30">DONKEY-30</p>
      <p className="text-donkey-20">DONKEY-20</p>
      <p className="text-donkey-10">DONKEY-10</p>
      <p className="text-white">WHITE</p>
      <nav className=" bg-black-34">
      {/* Left Side: CORELAB LOGO - Home Button*/}
      <div>
        <Button className="font-bold text-shrek text-2xl" to="/">
          CORE LAB
        </Button>
      </div>

      {/* Middle: Nav Links*/}
      <div>
        <button>HOME</button>
        <button>MEMBERSHIPS</button>
        <Button>CLASSES</Button>
        <Button>COACHES</Button>
      </div>

      {/* Right: Profile + GET STARTED / LOGIN / LOGOUT */}
      <div>
        <Button>MY PROFILE</Button>
        <Button className="shrek-btn">GET STARTED</Button>
      </div>
    </nav>
    </div>
  );
};

export default Home;