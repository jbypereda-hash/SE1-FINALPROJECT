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

interface ClassGroup {
  id: string;
  name: string;
  schedule: string;
  students: User[];
}

interface Props {
  user: User;
  classGroup: ClassGroup;
  onViewProfile?: (user: User) => void;
  onRemoveClient?: (classGroup: ClassGroup, user: User) => void;
}

const CS_ClientsRow: React.FC<Props> = ({
  user,
  classGroup,
  onViewProfile,
  onRemoveClient,
}) => {
  return (
    <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto_auto] px-5 py-2.5 gap-2 hover:bg-black-35 rounded-full transition-colors items-center">
      {/* NAME */}
      <div className="flex justify-center">
        <p className="font-bold text-white text-[20px] truncate text-center">
          {user.firstName} {user.lastName}
        </p>
      </div>

      {/* EMAIL */}
      <div className="flex justify-center">
        {user.email ? (
          <a
            href={`mailto:${user.email}`}
            className="italic text-white text-[18px] truncate"
          >
            {user.email}
          </a>
        ) : (
          <p className="text-white/60 italic text-[12px]">No email</p>
        )}
      </div>

      {/* PHONE */}
      <div className="flex justify-center">
        <a
          href={`tel:${user.phoneNumber}`}
          className="font-bold text-white text-[16px]"
        >
          {user.phoneNumber}
        </a>
      </div>

      {/* VIEW PROFILE */}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() => onViewProfile?.(user)}
          className="shrek-btn font-bold text-[20px] px-5 py-1"
        >
          VIEW PROFILE
        </Button>
      </div>

      {/* REMOVE CLIENT */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveClient?.(classGroup, user);
          }}
          className="shrek-btn font-bold text-[20px] px-5 py-1"
          title="Remove Client"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CS_ClientsRow;
