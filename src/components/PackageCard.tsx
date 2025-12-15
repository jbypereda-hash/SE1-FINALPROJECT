import starterBg from "../assets/images/starter-package.png";
import flexBg from "../assets/images/flex-package.png";
import proBg from "../assets/images/pro-package.png";

const packageBackgrounds: Record<string, string> = {
  "Starter Package": starterBg,
  "Flex Package": flexBg,
  "Pro Package": proBg,
};

interface PackageCardProps {
  data: {
    title: string;
    pricePerMonth: number;
    description: string;
  };
  onClick: () => void;
}

export default function PackageCard({ data, onClick }: PackageCardProps) {
  const detailItems = data.description
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="relative rounded-[60px] overflow-hidden min-h-[600px] bg-black-34">
      {/* BACKGROUND IMAGE (20% opacity) */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{
          backgroundImage: `url(${packageBackgrounds[data.title]})`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 p-8 text-white flex flex-col h-full">
        <h2 className="text-shrek text-4xl font-bold mb-2">{data.title}</h2>

        <p className="text-2xl font-bold mb-6">
          ₱{data.pricePerMonth} per month
        </p>

        <div className="space-y-8 mt-8 mb-8 text-2xl">
          {detailItems.map((item, i) => (
            <p key={i}>{item}.</p>
          ))}
        </div>

        <div className="mt-auto flex justify-center">
          <button
            onClick={onClick}
            className="shrek-btn font-bold w-[150px]"
          >
            AVAIL
          </button>
        </div>
      </div>
    </div>
  );
}
