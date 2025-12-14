import React from "react";
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
  onViewProfile?: (user: User) => void;
}

const CS_ClientsRow: React.FC<Props> = ({ user, onViewProfile }) => {
  return (
    <div className="grid w-full grid-cols-4 px-5 py-2.5 gap-6 hover:bg-black-35 rounded-full transition-colors">
      {/* NAME */}
      <div className="flex items-center justify-center">
        <p className="font-bold text-white text-[18px] truncate text-center">
          {user.firstName} {user.lastName}
        </p>
      </div>

      {/* EMAIL */}
      <div className="flex items-center justify-center">
        {user.email ? (
          <a
            href={`mailto:${user.email}`}
            className="font-bold text-white text-[16px] truncate text-center"
          >
            {user.email}
          </a>
        ) : (
          <p className="font-bold text-white/60 text-[12px] italic text-center">
            No email
          </p>
        )}
      </div>

      {/* PHONE */}
      <div className="flex items-center justify-center">
        <a
          href={`tel:${user.phoneNumber}`}
          className="font-bold text-white text-[16px] truncate text-center"
        >
          {user.phoneNumber}
        </a>
      </div>

      {/* ACTION BUTTON - VIEW PROFILE */}
      <div className="flex items-center justify-center">
        <Button
          to="#"
          onClick={() => onViewProfile && onViewProfile(user)}
          className="px-5 h-10 bg-shrek rounded-full flex items-center justify-center font-bold text-black-35 text-[18px] hover:opacity-90 transition-opacity"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default CS_ClientsRow;