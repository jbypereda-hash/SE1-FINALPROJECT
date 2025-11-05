import type { JSX } from "react";

interface CoachCardProps {
  name: string;
  title: string;
  description: string;
  tagline: string;
  image: string;
}

export const CoachCard = ({
  name,
  title,
  description,
  tagline,
  image,
}: CoachCardProps): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-[#2d2d35] rounded-[30px] p-6 md:p-8 shadow-md">
      {/* Coach Image */}
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
        <div className="rounded-full border-[6px] border-[#d5ff5f] overflow-hidden w-32 h-32 flex items-center justify-center">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Coach Info */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {name}
            </h2>
            <p className="text-gray-300 text-lg">{title}</p>
          </div>
          <p className="italic text-gray-400 text-sm md:text-base mt-2 md:mt-0">
            {tagline}
          </p>
        </div>

        <hr className="border-t border-gray-500 my-3" />

        <p className="text-gray-200 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
