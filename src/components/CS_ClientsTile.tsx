import { useRef, useState, useEffect } from "react";
import React from "react";
import Phone from "../assets/icons/phone.svg?react";
import Mail from "../assets/icons/mail.svg?react";
import SeeMore from "../assets/icons/threedots.svg?react";
import Button from "./Button";

interface User {
  uid: string;
  lastName: string;
  firstName: string;
  role: string;
  phoneNumber: string;
  email?: string;
  lastSignInTime: any;
}

interface Props {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const CS_ClientsTile: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Tile container */}
      <article className="group relative flex flex-col items-center p-6 bg-donkey-10 rounded-[25px] overflow-hidden w-full h-full hover:bg-[#e0e0e0] transition-colors duration:400">
        {/* Header: Name + Menu Dots */}
        <div
          className="flex items-center justify-between w-full h-5 mb-1"
          ref={menuRef}
        >
          <h1 className="text-2xl font-bold text-black-35 truncate">
            {user.firstName + " " + user.lastName}
          </h1>

          <Button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`text-black-35 transition-colors ${
              menuOpen ? "text-donkey-30" : "hover:text-donkey-30"
            }`}
          >
            <SeeMore className="w-7 h-5" />
          </Button>

          {menuOpen && (
            <div className="absolute right-5 top-10 bg-white shadow-lg rounded-md z-10 overflow-hidden">
              <Button
                className="block w-full text-left px-4 py-2 hover:bg-donkey-10 font-bold text-black-34 transition-colors duration-200"
                onClick={() => {
                  onEdit(user);
                  setMenuOpen(false);
                }}
              >
                Edit
              </Button>
              <Button
                className="block w-full text-left px-4 py-2 hover:bg-donkey-10 font-bold text-red-500 transition-colors duration-200"
                onClick={() => {
                  onDelete(user);
                  setMenuOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Position / Role */}
        <div className="flex flex-col items-start w-full mb-7">
          <p className="text-[17px] font-semibold text-donkey-30">
            {"Signed In: " +
              (user.lastSignInTime
                ? new Date(Date.parse(user.lastSignInTime)).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "N/A")}
          </p>
        </div>

        {/* Contact Info Box */}
        <address className="flex flex-col items-start gap-1 p-3 bg-[#e8e8e8] rounded-[15px] w-full not-italic group-hover:bg-donkey-10">
          {/* Email */}
          {user.email && (
            <div className="flex items-center w-full text-black-35 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              <a
                href={`mailto:${user.email}`}
                className="ml-2 font-bold text-[17px] truncate"
              >
                {user.email}
              </a>
            </div>
          )}

          {/* Phone */}
          <div className="flex items-center w-full text-black-35 hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            <a
              href={`tel:${user.phoneNumber}`}
              className="ml-2 font-bold text-[17px] truncate"
            >
              {user.phoneNumber}
            </a>
          </div>
        </address>
      </article>
    </div>
  );
};

export default CS_ClientsTile;
