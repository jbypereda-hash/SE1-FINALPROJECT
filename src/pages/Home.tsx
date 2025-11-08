import Button from "../components/Button";
import Toni from "../assets/images/toni-fowler.jpg"
import TiktokIcon from "../assets/icons/tiktok.svg?react";
import InstagramIcon from "../assets/icons/instagram.svg?react";
import FacebookIcon from "../assets/icons/facebook.svg?react";

const Home = () => {
  return (
    <div className="text-white flex-col">
      {/* WELCOME TO CORE LAB */}
      <div className="bg-black-35">
        
        <img
        src={Toni}
        alt="Logo"
        className="w-40 h-auto rounded-xl shadow-md hover:scale-105 transition-transform"
      />

        <h1>CORE LAB</h1>
        <p>
          At Core Lab, we believe that fitness is a personal journey, and we're
          here to guide you every step of the way. Our gym is more than just a
          place to work out; it's a community dedicated to helping you achieve
          your health and wellness goals in a supportive and motivating
          environment.
        </p>
      </div>

      {/* MEMBERSHIP PACKAGES */}
      <div className="bg-black-34">
        <h1>MEMBERSHIP PACKAGES</h1>
      </div>

      {/* OUR CLASSES */}
      <div className="bg-black-35">
        <h1>OUR CLASSES</h1>
      </div>

      {/* MEET OUR COACHES */}
      <div className="bg-black-34">
        <h1>MEET OUR COACHES</h1>
      </div>

      {/* FOOTER */}
      <footer className="bg-shrek text-black-35 flex justify-between items-center px-10 py-[10px]">
        <p className="font-bold text-[20px]">© 2025 CoreLab</p>
        <div className="flex space-x-2">
          <Button
            href="https://www.instagram.com/reel/DPsn6UTEeTj/?igsh=MW1jcXQ3bDFyMjk0ZA=="
            className="blackicon-btn"
          >
            <TiktokIcon className="w-6 h-6" />
          </Button>
          <Button
            href="https://www.instagram.com/reel/DPsn6UTEeTj/?igsh=MW1jcXQ3bDFyMjk0ZA=="
            className="blackicon-btn"
          >
            <InstagramIcon className="w-6 h-6" />
          </Button>
          <Button
            href="https://www.instagram.com/reel/DPsn6UTEeTj/?igsh=MW1jcXQ3bDFyMjk0ZA=="
            className="blackicon-btn"
          >
            <FacebookIcon className="w-6 h-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
