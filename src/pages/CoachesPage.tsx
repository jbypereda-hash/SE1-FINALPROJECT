import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/arrow-left.svg";
import { CoachCard } from "../components/CoachCard";
import type { JSX } from "react";

interface Coach {
  id: number;
  name: string;
  title: string;
  description: string;
  tagline: string;
  image: string;
}

export const CoachesPage = (): JSX.Element => {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    // Example static data — later replace with API fetch
    setCoaches([
      {
        id: 1,
        name: "TONI FOWLER",
        title: "Strength & Conditioning Coach",
        description:
          "Specializing in strength and conditioning, Mommy Oni has a knack for pushing members past their perceived limits with safe and effective techniques.",
        tagline: "Top Rated Coach in 1998!",
        image: "/images/coach1.png",
      },
      {
        id: 2,
        name: "ASH TREVINO",
        title: "Yoga & Core Strength Coach",
        description:
          "A yoga and mindfulness expert, Ash helps members connect their mind and body, focusing on flexibility, balance, and core strength.",
        tagline: "Most popular yoga instructor!",
        image: "/images/coach2.png",
      },
      {
        id: 3,
        name: "AMBERLYN REID",
        title: "HIIT Instructor & Dance Fitness Coach",
        description:
          "With a background in competitive dance sports and choreo-griffy, Amber offers high-intensity interval training (HIIT) classes and one-on-one sessions that are both challenging and fun.",
        tagline: "Most booked trainer this month!",
        image: "/images/coach3.png",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c22] text-white px-8 py-10 flex flex-col items-center">
      {/* Header + Back Arrow */}
      <div className="w-full max-w-5xl flex items-center mb-10">
        <Link to="/" className="mr-4 hover:opacity-80 transition">
          <img src={arrowLeft} alt="Back" className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-[#d5ff5f] text-4xl font-extrabold">
            MEET OUR COACHES
          </h1>
          <p className="text-gray-300 text-lg">
            Experts who guide your journey.
          </p>
        </div>
      </div>

      {/* Coach Cards */}
      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {coaches.map((coach) => (
          <CoachCard key={coach.id} {...coach} />
        ))}
      </div>
    </div>
  );
};
