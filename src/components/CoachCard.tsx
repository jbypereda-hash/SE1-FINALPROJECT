import type { JSX } from "react";

interface CoachCardProps {
  name: string;
  title: string;
  description: string;
  tagline: string;
}

export const CoachCard = ({
  name,
  title,
  description,
  tagline,
}: CoachCardProps): JSX.Element => {
  return (
    <div className="flex flex-col bg-donkey-20 rounded-[30px] p-6 md:p-8 shadow-md">
      {/* Coach Info */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black-35 uppercase">
              {name}
            </h2>
            <p className="text-black-35 text-lg">{title}</p>
          </div>
          <p className="italic text-black-34 text-sm md:text-base mt-2 md:mt-0">
            {tagline}
          </p>
        </div>

        <hr className="border-t border-black-35 my-3" />

        <p className="text-black-35 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
