import React from "react";
import ShoppingCart from "../assets/icons/shoppingcart.svg";
//import LevelIcon from "../assets/icons/level.svg";

//import CoreCrusherImg from "../assets/images/corecrusher-class.jpg";
//import PowerFlowYogaImg from "../assets/images/powerflowyoga-class.png";
//import KickboxingCardioImg from "../assets/images/kickboxingcardio-class.png";
//import PilatesImg from "../assets/images/pilates-class.png";
//import HIITBlastImg from "../assets/images/hiitblast-class.png";

export type ClassItem = {
  title: string;
  price: number;
  description: string;
  imagePath: string;
  level: string;
};

const ClassCard: React.FC<ClassItem> = ({
  title,
  price,
  description,
  imagePath,
  level,
}) => {
  return (
    <div className="relative bg-black-34 rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300">
      {/* Level Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="175.93 43.98"
              transform="rotate(135 32 32)"
              opacity="0.9"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{level}</span>
          </div>

          <div className="absolute top-0 left-0 -translate-x-1 -translate-y-1">
            <span className="text-white text-xs font-bold tracking-tight">
              LEVEL
            </span>
          </div>
        </div>
      </div>

      <div className="aspect-video bg-gradient-to-br from-black-34 to-black-35 relative overflow-hidden">
        <img
          src={imagePath}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-shrek font-bold whitespace-nowrap ml-4">
            ₱ {Number(price).toLocaleString()} / week
          </span>
        </div>

        <p className="text-donkey-10 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <button className="w-full bg-shrek hover:bg-opacity-90 text-black-35 font-bold py-3 rounded-full transition-all duration-200 uppercase text-sm tracking-wide">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Classes: React.FC = () => {
  const cartItems: unknown[] = [];

  const classes: ClassItem[] = [
    {
      title: "Core Crusher",
      price: 500,
      description:
        "This abs-blasting class targets your abdominal, obliques, and lower back.",
      imagePath: "/assets/core-crusher.jpg",
      level: "3",
    },
    {
      title: "Power Flow Yoga",
      price: 1000,
      description:
        "A dynamic yoga flow linking breath with movement for flexibility & focus.",
      imagePath: "/assets/power-flow-yoga.jpg",
      level: "1",
    },
    {
      title: "Kickboxing Cardio",
      price: 500,
      description:
        "Kickboxing fundamentals mixed with cardio for coordination and stamina.",
      imagePath: "/assets/kickboxing-cardio.jpg",
      level: "3",
    },
    {
      title: "Pilates",
      price: 1100,
      description:
        "Low-impact movements to strengthen your core and improve stability.",
      imagePath: "/assets/pilates.jpg",
      level: "2",
    },
    {
      title: "HIIT Blast",
      price: 300,
      description:
        "A fast-paced workout combining intense bursts with short recoveries.",
      imagePath: "/assets/hiit-blast.jpg",
      level: "2",
    },
  ];

  return (
    <div
      className="min-h-screen bg-black-35 text-white"
      style={{ fontFamily: "Inria Sans, sans-serif" }}
    >
      <style>{`
        :root {
        --color-shrek: #D5FF5F;
        --color-black-35: #14151A;
        --color-black-34: #2D2D35;
        --color-donkey-10: #B5B5B5;
        }
        .bg-black-35 { background-color: var(--color-black-35); }
        .bg-black-34 { background-color: var(--color-black-34); }
        .text-donkey-10 { color: var(--color-donkey-10); }
        .bg-shrek { background-color: var(--color-shrek); }
        .text-shrek { color: var(--color-shrek); }
    `}</style>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 items-center mb-12">
          <div></div>

          <div className="text-center">
            <h2 className="text-5xl text-shrek font-bold">OUR CLASSES</h2>
            <p className="text-donkey-10">
              Find the perfect workout to match your goals.
            </p>
          </div>

          <div className="flex justify-end relative">
            <button
              onClick={() => console.log("Cart clicked!")}
              className="relative p-2 rounded-full hover:bg-black-34 transition-colors"
            >
              <img src={ShoppingCart} alt="ViewCart" className="w-7 h-7" />

              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-shrek text-black-35 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c, index) => (
            <ClassCard key={index} {...c} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Classes;
