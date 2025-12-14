import type { JSX } from "react";
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
    details: string;
};
onClick: () => void;
}

export default function PackageCard({ data, onClick }: PackageCardProps): JSX.Element {

const detailItems = data.details
.split(".")
.map(sentence => sentence.trim())
.filter(sentence => sentence.length > 0);

return (
    
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-donkey-30 bg-cover bg-center min-h-[600px]"
    style={{
    backgroundImage: `url(${packageBackgrounds[data.title]})`,}}>

    <div className="absolute inset-0 bg-black/60" />
    <div className="relative p-8 text-center text-white flex flex-col h-full">
        <h2 className="text-shrek text-4xl font-semibold mb-4">{data.title}</h2>
        <p className="text-xl font-bold mb-6">₱{data.pricePerMonth} per month</p>
        <div className="space-y-4 mb-8 flex-basis"/>

    <div className="text-lar opacity-90 space-y-8">
    {detailItems.map((item, index) => (
    <p key={index}>{item}.</p>
))}
</div>

        <button
        onClick={onClick}
        className="text-xl font-bold px-6 rounded-3xl shrek-btn mx-auto py-1 mt-auto">
        AVAIL
        </button>
    </div>
    </div>
);
}