import Button from "../components/Button";
import Toni from "../assets/images/toni-fowler.jpg";
import CoreCrusher from "../assets/images/corecrusher-class.jpg";
import PowerFlowYoga from "../assets/images/powerflowyoga-class.png";
import HIITBlast from "../assets/images/hiitblast-class.png";
import KickboxingCardio from "../assets/images/kickboxingcardio-class.png";
import Pilates from "../assets/images/pilates-class.png";
import Ben from "../assets/images/ben-coach.png";
import Gab from "../assets/images/gab-coach.png";
import Precious from "../assets/images/precious-coach.png";
import TiktokIcon from "../assets/icons/tiktok.svg?react";
import InstagramIcon from "../assets/icons/instagram.svg?react";
import FacebookIcon from "../assets/icons/facebook.svg?react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white flex flex-col">
      {/* WELCOME TO CORE LAB */}
      <div className="bg-black-35 text-white min-h-screen flex flex-col items-center py-17 px-25">
        {/* PICTURE AND TEXT */}
        <section className="flex flex-row justify-between items-center gap-10 w-full pb-12">
          <div className="w-1/2 h-160">
            <img
              src={Toni}
              alt="Main Image"
              className="w-full object-cover h-full rounded-[55px]"
            />
          </div>

          <div className="w-1/2 text-center">
            <h1 className="text-8xl transition-transform duration-400 hover:scale-110">
              CORE LAB
            </h1>
            <p className="text-3xl leading-snug mb-10 p-5">
              At Core Lab, we believe that fitness is a personal journey, and
              we're here to guide you every step of the way. Our gym is more
              than just a place to work out; it's a community dedicated to
              helping you achieve your health and wellness goals in a supportive
              and motivating environment.
            </p>

            {isLoggedIn ? (
              <Button className="shrek-btn text-4xl px-8 py-4" to="/profile">
                MANAGE HEALTH INFO
              </Button>
            ) : (
              <Button
                onClick={() => window.dispatchEvent(new Event("open-signup"))}
                className="shrek-btn text-4xl px-8 py-4"
              >
                GET STARTED
              </Button>
            )}
          </div>
        </section>

        {/* INFO */}
        <section className="bg-black-34 text-center rounded-[55px] flex flex-row justify-between items-center gap-10 w-full px-17 py-7">
          <div>
            <p className="text-shrek text-2xl">300+</p>
            <p className="text-white">Active Members</p>
          </div>

          <div>
            <p className="text-shrek text-2xl">20+</p>
            <p className="text-white">Weekly Classes</p>
          </div>

          <div>
            <p className="text-shrek text-2xl">100%</p>
            <p className="text-white">Client Satisfaction</p>
          </div>

          <div className="border-l-2 border-black-35 h-20" />

          <div>
            <p className="text-shrek text-2xl">Our Location</p>
            <p className="text-white">
              Cor. Rosal Street, J.P. Laurel Avenue, <br /> Cagayan de Oro City,
              9000 Misamis Oriental
            </p>
          </div>

          <div>
            <p className="text-shrek text-2xl">Opening Hours</p>
            <p className="text-white">
              Mon–Fri: 6:00 AM – 10:00 PM <br />
              Sat–Sun: 8:00 AM – 8:00 PM
            </p>
          </div>
        </section>
      </div>

      {/* MEMBERSHIP PACKAGES */}
      <div className="bg-black-34 text-white flex flex-col items-center text-center py-8 px-25">
        <h1>MEMBERSHIP PACKAGES</h1>
        <p className="text-white text-xl">
          Choose a plan that fits your lifestyle.
        </p>

        {/* PACKAGES */}
        <section className="bg-donkey-10 text-black-35 rounded-[55px] flex items-stretch m-12">
          {/* STARTER PACKAGE */}
          <div className="flex-1 flex flex-col justify-between space-y-12 py-8">
            <div>
              <p className="text-black-35 font-bold text-3xl">
                Starter Package
              </p>
              <p className="text-black-35 font-semibold text-xl">
                ₱ 1,300 per month
              </p>
            </div>

            <p className="text-xl leading-snug px-5">
              Includes unlimited access to our full range of gym equipment and
              facilities. Perfect for those who prefer to work out on their own
              schedule.
            </p>
            <Button className="shrek-btn hover:scale-110 hover:bg-shrek hover:text-black-35 transition-transform">
              Learn More
            </Button>
          </div>

          <div className="border-l-2 border-black-35 h-105" />

          {/* FLEX PACKAGE */}
          <div className="flex-1 flex flex-col justify-between space-y-12 py-8">
            <div>
              <p className="text-black-35 font-bold text-3xl">Flex Package</p>
              <p className="text-black-35 font-semibold text-xl">
                ₱ 1,700 per month
              </p>
            </div>

            <p className="text-xl leading-snug px-5">
              Includes everything in the Starter Package plus access to all of
              our group fitness classes. A great option for those who thrive in
              a class environment.
            </p>
            <Button className="shrek-btn hover:scale-110 hover:bg-shrek hover:text-black-35 transition-transform">
              Learn More
            </Button>
          </div>

          <div className="border-l-2 border-black-35 h-105" />

          {/* PRO PACKAGE */}
          <div className="flex-1 flex flex-col justify-between space-y-12 py-8">
            <div>
              <p className="text-black-35 font-bold text-3xl">Pro Package</p>

              <p className="text-black-35 font-semibold text-xl">
                ₱ 2,000 per month
              </p>
            </div>

            <p className="text-xl leading-snug px-5">
              Including everything in the Flex Package plus one-on-one personal
              training sessions with a coach of your choice. Ideal for anyone
              looking for personalized attention and accelerated results.
            </p>
            <Button className="shrek-btn hover:scale-110 hover:bg-shrek hover:text-black-35 transition-transform">
              Learn More
            </Button>
          </div>
        </section>
      </div>

      {/* OUR CLASSES */}
      <div className="bg-black-35 text-white flex flex-col items-center pt-10 pb-14 px-25">
        <h1>OUR CLASSES</h1>
        <p className="text-white text-xl">
          Find the perfect workout to match your goals.
        </p>

        <section className="flex flex-wrap justify-center">
          {/* CORE CRUSHER */}
          <div className="relative w-[340px] h-[220px] overflow-hidden m-5 group">
            <img
              src={CoreCrusher}
              alt="Core Crusher"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>
            <div className="absolute bottom-0 left-0 text-white p-3">
              <h2 className="text-4xl font-bold leading-none">Core Crusher</h2>
              <Button className="nobg-btn text-xl p-0 underline">
                Learn More
              </Button>
            </div>
          </div>

          {/* POWER FLOW YOGA */}
          <div className="relative w-[340px] h-[220px] overflow-hidden m-5 group">
            <img
              src={PowerFlowYoga}
              alt="Power Flow Yoga"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>
            <div className="absolute bottom-0 left-0 text-white p-3">
              <h2 className="text-4xl font-bold leading-none">
                Power Flow Yoga
              </h2>
              <Button className="nobg-btn text-xl p-0 underline">
                Learn More
              </Button>
            </div>
          </div>

          {/* HIIT BLAST */}
          <div className="relative w-[340px] h-[220px] overflow-hidden m-5 group">
            <img
              src={HIITBlast}
              alt="HIIT Blast"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>
            <div className="absolute bottom-0 left-0 text-white p-3">
              <h2 className="text-4xl font-bold leading-none">HIIT Blast</h2>
              <Button className="nobg-btn text-xl p-0 underline">
                Learn More
              </Button>
            </div>
          </div>

          {/* KICKBOXING CARDIO */}
          <div className="relative w-[340px] h-[220px] overflow-hidden m-5 group">
            <img
              src={KickboxingCardio}
              alt="Kickboxing Cardio"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>
            <div className="absolute bottom-0 left-0 text-white p-3">
              <h2 className="text-4xl font-bold leading-none">
                Kickboxing Cardio
              </h2>
              <Button className="nobg-btn text-xl p-0 underline">
                Learn More
              </Button>
            </div>
          </div>

          {/* PILATES */}
          <div className="relative w-[340px] h-[220px] overflow-hidden m-5 group">
            <img
              src={Pilates}
              alt="Pilates"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-34 to-transparent"></div>
            <div className="absolute bottom-0 left-0 text-white p-3">
              <h2 className="text-4xl font-bold leading-none">Pilates</h2>
              <Button className="nobg-btn text-xl p-0 underline">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* MEET OUR COACHES */}
      <div className="bg-black-34 text-white flex flex-col items-center pt-10 pb-14 px-25">
        <h1>MEET OUR COACHES</h1>
        <p className="text-white text-xl">
          Experts who guide your fitness journey.
        </p>

        <section className="flex flex-wrap justify-center text-center pt-8">
          {/* GAB */}
          <div>
            <Button className="plain-btn" to="/coaches">
              <div className="relative w-60 h-60 rounded-full ring-20 ring-donkey-10 bg-white overflow-hidden my-8 mx-12">
                <img
                  src={Gab}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </Button>
            <h1 className="text-3xl">Toni Fowler</h1>
          </div>

          {/* BEN */}
          <div>
            <Button className="plain-btn" to="/coaches">
              <div className="relative w-60 h-60 rounded-full ring-20 ring-donkey-10 bg-white overflow-hidden my-8 mx-12">
                <img
                  src={Ben}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </Button>
            <h1 className="text-3xl">Ash Trevino</h1>
          </div>

          {/* PRECIOUS */}
          <div>
            <Button className="plain-btn" to="/coaches">
              <div className="relative w-60 h-60 rounded-full ring-20 ring-donkey-10 bg-white overflow-hidden my-8 mx-12">
                <img
                  src={Precious}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </Button>
            <h1 className="text-3xl">Amberlynn Reid</h1>
          </div>
        </section>
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
