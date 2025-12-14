import React, { useState } from "react";
import DropdownArrow from "../assets/icons/dropdownarrow.svg?react";
import Button from "./Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

/* ---------- TYPES ---------- */

export interface MembershipPackage {
  id: string;
  title: string;
  pricePerMonth: number;
  description: string;
}

export interface GymClass {
  id: string;
  title: string;
  level: number;
  pricePerWeek: number;
  description: string;
}

interface AS_DropdownProps {
  mode: "package" | "class";
  item: MembershipPackage | GymClass;
}

/* ---------- COMPONENT ---------- */

const AS_Dropdown: React.FC<AS_DropdownProps> = ({ mode, item }) => {
  const isClass = mode === "class";

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Shared
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  // Package-only
  const [pricePerMonth, setPricePerMonth] = useState(
    !isClass ? (item as MembershipPackage).pricePerMonth : 0
  );

  // Class-only
  const [level, setLevel] = useState(
    isClass ? (item as GymClass).level : 1
  );
  const [pricePerWeek, setPricePerWeek] = useState(
    isClass ? (item as GymClass).pricePerWeek : 0
  );

  /* ---------- HANDLERS ---------- */

  const handleCancel = () => {
    setTitle(item.title);
    setDescription(item.description);

    if (isClass) {
      const cls = item as GymClass;
      setLevel(cls.level);
      setPricePerWeek(cls.pricePerWeek);
    } else {
      const pkg = item as MembershipPackage;
      setPricePerMonth(pkg.pricePerMonth);
    }

    setIsEditing(false);
  };

  const handleSave = async () => {
    const ref = doc(db, isClass ? "classes" : "packages", item.id);

    await updateDoc(ref, {
      title,
      description,
      ...(isClass
        ? {
            level,
            pricePerWeek,
          }
        : {
            pricePerMonth,
          }),
    });

    setIsEditing(false);
  };

  /* ---------- RENDER ---------- */

  return (
    <div className="flex flex-col w-full bg-donkey-10 rounded-[30px] px-5 py-3">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center justify-between w-full"
      >
        <p className="font-bold text-black-35 text-[28px] truncate">
          {title}
        </p>

        <DropdownArrow
          className={`w-10 h-10 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN CONTENT */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[1000px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col gap-4 mt-4">
          {/* TITLE */}
          <div className="bg-donkey-30 rounded-[25px] p-4">
            <p className="font-bold text-black-35 text-[22px] mb-2">
              {isClass ? "Class Name" : "Package Name"}
            </p>
            <div className="w-full h-[2px] bg-black-35 my-2" />
            <input
              disabled={!isEditing}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-center text-2xl font-bold bg-transparent outline-none text-shrek"
            />
          </div>

          {/* CLASS LEVEL */}
          {isClass && (
            <div className="bg-donkey-30 rounded-[25px] p-4">
              <p className="font-bold text-black-35 text-[22px] mb-2">
                Class Level
              </p>
              <div className="w-full h-[2px] bg-black-35 my-2" />
              <input
                type="number"
                min={1}
                disabled={!isEditing}
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full text-center text-xl bg-transparent outline-none text-white"
              />
            </div>
          )}

          {/* PRICE */}
          <div className="bg-donkey-30 rounded-[25px] p-4">
            <p className="font-bold text-black-35 text-[22px] mb-2">
              {isClass ? "Price Per Week" : "Price Per Month"}
            </p>
            <div className="w-full h-[2px] bg-black-35 my-2" />
            <input
              type="number"
              disabled={!isEditing}
              value={isClass ? pricePerWeek : pricePerMonth}
              onChange={(e) =>
                isClass
                  ? setPricePerWeek(Number(e.target.value))
                  : setPricePerMonth(Number(e.target.value))
              }
              className="w-full text-center text-xl bg-transparent outline-none text-white"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="bg-donkey-30 rounded-[25px] p-4">
            <p className="font-bold text-black-35 text-[22px] mb-2">
              Description
            </p>
            <div className="w-full h-[2px] bg-black-35 my-2" />
            <textarea
              disabled={!isEditing}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full text-center text-lg bg-transparent outline-none text-white resize-none"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center gap-6">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  className="nobg-btn p-0 text-black-35 hover:text-black-35"
                >
                  CANCEL
                </Button>
                <Button
                  onClick={handleSave}
                  className="shrek-btn font-bold hover:scale-105 hover:bg-shrek hover:text-black-35 transition-transform py-1 mb-1 w-80"
                >
                  SAVE
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="shrek-btn font-bold hover:scale-105 hover:bg-shrek hover:text-black-35 transition-transform py-1 mb-1 w-100"
              >
                EDIT
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AS_Dropdown;
