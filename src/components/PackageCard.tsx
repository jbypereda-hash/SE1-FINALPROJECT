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
    <div className="relative rounded-2xl overflow-hidden min-h-[600px] bg-cover"
      style={{ backgroundImage: `url(${packageBackgrounds[data.title]})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative p-8 text-white flex flex-col h-full">
        <h2 className="text-shrek text-4xl font-semibold mb-4">
          {data.title}
        </h2>

        <p className="text-xl font-bold mb-6">
          ₱{data.pricePerMonth} per month
        </p>

        <div className="space-y-6 mb-8">
          {detailItems.map((item, i) => (
            <p key={i}>{item}.</p>
          ))}
        </div>

        <button
          onClick={onClick}
          className="shrek-btn text-xl font-bold mt-auto mx-auto px-8 py-1 rounded-3xl"
        >
          AVAIL
        </button>
      </div>
    </div>
  );
}
