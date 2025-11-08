import React from "react";
import Phone from "../../assets/icons/phone.svg";
import Mail from "../../assets/icons/mail.svg";

interface AdminUser {
  id: number;
  name: string;
  title: string;
  phone: string;
  email?: string;
}

interface Props {
  user: AdminUser;
}

const AS_AdminDirectoryTile: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full max-w-[270px]">
      {/* Tile container */}
      <article className="flex flex-col items-center gap-2 p-4 bg-[#b5b5b5] rounded-[20px] overflow-hidden w-[290px] h-[150px]">
        
        {/* Header: Name + Menu Dots */}
        <div className="flex items-center justify-between w-full h-5">
          <h1 className="text-[18px] font-bold text-[#040404] truncate">
            {user.name}
          </h1>

          <div className="relative w-[28px] h-2">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#212121] rounded-[4px]" />
            <div className="absolute top-0 left-[10px] w-2 h-2 bg-[#212121] rounded-[4px]" />
            <div className="absolute top-0 left-[20px] w-2 h-2 bg-[#212121] rounded-[4px]" />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-start w-full">
          <p className="text-[15px] font-semibold text-neutral-600">
            {user.title}
          </p>
        </div>

        {/* Contact Info Box */}
        <address className="flex flex-col items-start gap-1 p-2 bg-[#e8e8e8] rounded-[14px] w-full not-italic">
          {/* Email */}
          {user.email && (
            <div className="flex items-center w-full">
              <img src={Mail} alt="Email" className="w-[18px] h-[18px]" />
              <a
                href={`mailto:${user.email}`}
                className="ml-2 font-semibold text-[#212121] text-[13px] truncate"
              >
                {user.email}
              </a>
            </div>
          )}

          {/* Phone */}
          <div className="flex items-center w-full">
            <img src={Phone} alt="Phone" className="w-[18px] h-[18px]" />
            <a
              href={`tel:${user.phone}`}
              className="ml-2 font-semibold text-[#212121] text-[13px] truncate"
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