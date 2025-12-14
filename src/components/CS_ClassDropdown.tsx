import React, { useState } from "react";
import CS_ClientsRow from "./CS_ClientsRow";
import DropdownArrow from "../assets/icons/dropdownarrow.svg?react";

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

interface CS_ClassDropdownProps {
  classGroup: ClassGroup;
  onViewProfile?: (user: User) => void;
}

const CS_ClassDropdown: React.FC<CS_ClassDropdownProps> = ({
  classGroup,
  onViewProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-donkey-10 rounded-[30px] px-6 py-3 gap-3">
      {/* CLASS HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid w-full grid-cols-[1fr_1fr_1fr_auto] items-center gap-6 px-5 hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center justify-center">
          <p className="font-bold text-black-35 text-[18px] truncate">
            {classGroup.name}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <p className="font-semibold text-black-35 text-[16px] truncate">
            {classGroup.schedule}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <p className="font-semibold text-black-35 text-[16px] truncate">
            {classGroup.students.length} Student
            {classGroup.students.length !== 1 && "s"}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <DropdownArrow
            className={`w-8 h-8 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* INNER CLIENT LIST PANEL */}
      {isOpen && (
        <div className="w-full bg-black-34 rounded-[24px] border border-donkey-30 px-5 py-3 flex flex-col gap-2 text-white">
          {/* CLIENT ROWS */}
          <div className="flex flex-col gap-2 w-full">
            {classGroup.students.map((student) => (
              <CS_ClientsRow
                key={student.uid}
                user={student}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CS_ClassDropdown;