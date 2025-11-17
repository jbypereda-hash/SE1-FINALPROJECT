import React from "react";
import Phone from "../assets/icons/phone.svg?react";
import Mail from "../assets/icons/mail.svg?react";
import SeeMore from "../assets/icons/threedots.svg?react";
import Button from "./Button";

interface AdminUser {
  id: number;
  name: string;
  position: string;
  phone: string;
  email?: string;
}

interface Props {
  user: AdminUser;
}

const AS_AdminDirectoryTile: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Tile container */}
      <article className="group flex flex-col items-center p-6 bg-donkey-10 rounded-[25px] overflow-hidden w-full h-full hover:bg-[#e0e0e0] transition-colors duration:400">
        {/* Header: Name + Menu Dots */}
        <div className="flex items-center justify-between w-full h-5 mb-1">
          <h1 className="text-2xl font-bold text-black-35 truncate">
            {user.name}
          </h1>

          <Button className="text-black-35 hover:text-donkey-30 transition-colors">
            <SeeMore className="w-7 h-5" />
          </Button>
        </div>

        {/* Position / Role */}
        <div className="flex flex-col items-start w-full mb-7">
          <p className="text-[17px] font-semibold text-donkey-30">
            {user.position}
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
            <Phone className="w-5 h-5"/>
            <a
              href={`tel:${user.phone}`}
              className="ml-2 font-bold text-[17px] truncate"
            >
              {user.phone}
            </a>
          </div>
        </address>
      </article>
    </div>
  );
};

export default AS_AdminDirectoryTile;
