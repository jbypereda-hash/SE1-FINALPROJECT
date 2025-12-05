import React, { useState } from "react";
import DropdownArrow from "../assets/icons/dropdownarrow.svg?react";
import line1 from "../assets/icons/line1.svg";
import Button from "./Button";

export interface MembershipPackage {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
}

interface AS_PackagesDropdownProps {
  pkg: MembershipPackage;
  onCancel?: () => void;
  onSave?: (pkg: MembershipPackage) => void;
}

const AS_PackagesDropdown: React.FC<AS_PackagesDropdownProps> = ({
  pkg,
  onCancel,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (onSave) onSave(pkg);
  };

  return (
    <div className="flex flex-col w-full bg-donkey-10 rounded-[30px] px-5 py-2.5 gap-3">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full h-10 px-1 rounded-[30px] hover:opacity-90 transition-opacity"
      >
        <p className="font-bold text-black-35 text-[28px] truncate">
          {pkg.name}
        </p>

        <DropdownArrow
          className={`w-10 h-10 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* INNER CONTENT */}
      {isOpen && (
        <div className="flex flex-col items-center gap-2.5">
          {/* PACKAGE NAME CARD */}
          <div className="flex flex-col w-full max-w-full h-[120px] items-center gap-2.5 bg-donkey-30 rounded-[25px] overflow-hidden">
            <div className="w-full px-[15px] pt-2 pb-2">
              <p className="flex items-center justify-left font-bold text-black-35 text-[24px] text-center">
                Package Name
              </p>

              <img
                src={line1}
                alt="divider"
                className="w-full h-[2px] mt-1 object-cover"
              />
            </div>

            <p className="text-shrek text-2xl mb-4 text-center font-bold">
              {pkg.name}
            </p>
          </div>

          {/* PACKAGE PRICE CARD */}
          <div className="flex flex-col w-full max-w-full h-[120px] items-center gap-2.5 bg-donkey-30 rounded-[25px] overflow-hidden">
            <div className="w-full px-[15px] pt-2 pb-2">
              <p className="flex items-center justify-left font-bold text-black-35 text-[24px] text-center">
                Package Price
              </p>

              <img
                src={line1}
                alt="divider"
                className="w-full h-[2px] mt-1 object-cover"
              />
            </div>

            <p className="text-white text-[20px] font-semibold truncate px-4 w-full text-center">
              {pkg.priceLabel}
            </p>
          </div>

          {/* PACKAGE DEFINITION CARD */}
          <div className="flex flex-col w-full max-w-full h-[299px] items-center gap-2.5 bg-donkey-30 rounded-[25px] overflow-hidden">
            <div className="w-full px-[15px] pt-2 pb-2">
              <p className="flex items-center justify-left font-bold text-black-35 text-[24px] text-center">
                Package Definition
              </p>

              <img
                src={line1}
                alt="divider"
                className="w-full h-[2px] mt-1 object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 text-center max-w-[80%]">
              {pkg.description.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="text-white text-[20px] leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* BUTTON ROW */}
          <div className="flex items-center justify-center gap-[35px] w-full px-2.5">
            <Button
              type="button"
              onClick={onCancel}
              className="w-[161px] h-12 rounded-[50px] border-4 border-shrek text-shrek text-2xl font-bold flex items-center justify-center"
            >
              CANCEL
            </Button>

            <Button
              type="button"
              onClick={handleSave}
              className="w-[161px] h-12 rounded-[50px] bg-shrek px-[38px] py-2 text-black-35 text-2xl font-bold"
            >
              SAVE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AS_PackagesDropdown;