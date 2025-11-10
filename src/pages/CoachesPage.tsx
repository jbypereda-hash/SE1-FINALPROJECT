import { CoachCard } from "../components/CoachCard";
import BackButton from "../components/BackButton";
import { useCoaches } from "../hooks/useCoaches";
import type { JSX } from "react";

export const CoachesPage = (): JSX.Element => {
  const { coaches, loading } = useCoaches();

  return (
    <div className="min-h-screen bg-black-35 text-white px-8 py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl flex items-center mb-10">
        <BackButton />
        <div className="flex-1 text-center">
          <h1 className="text-shrek text-5xl font-extrabold">
            MEET OUR COACHES
          </h1>
          <p className="text-donkey-10 text-lg">
            Experts who guide your journey.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {loading ? (
          <p className="text-donkey-10 text-center">Loading coaches...</p>
        ) : coaches.length > 0 ? (
          coaches.map((coach) => <CoachCard key={coach.id} {...coach} />)
        ) : (
          <p className="text-donkey-10 text-center">No coaches found.</p>
        )}
      </div>
    </div>
  );
};
