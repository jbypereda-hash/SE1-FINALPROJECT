import React, { useState } from "react";
import CS_ClientsRow from "./CS_ClientsRow";
import DropdownArrow from "../assets/icons/dropdownarrow.svg?react";
import Delete from "../assets/icons/trashcan.svg?react";

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
  onDeleteClass?: (classGroup: ClassGroup) => void;
  onRemoveClient?: (classGroup: ClassGroup, user: User) => void;
}

const CS_ClassDropdown: React.FC<CS_ClassDropdownProps> = ({
  classGroup,
  onViewProfile,
  onDeleteClass,
  onRemoveClient,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-donkey-10 rounded-[30px] px-6 pt-3 gap-3 hover:bg-[#e0e0e0] transition-colors duration-300">
      {/* HEADER (DIV — NOT BUTTON) */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="grid w-full grid-cols-[1fr_1fr_1fr_auto] items-center gap-6 px-5 cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="flex justify-center">
          <p className="font-bold text-black-35 text-2xl truncate">
            {classGroup.name}
          </p>
        </div>

        <div className="flex justify-center">
          <p className="font-semibold text-black-35 text-xl truncate">
            {classGroup.schedule}
          </p>
        </div>

        <div className="flex justify-center">
          <p className="font-semibold text-black-35 text-xl truncate">
            {classGroup.students.length} Student
            {classGroup.students.length !== 1 && "s"}
          </p>
        </div>

        {/* ACTIONS */}
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()} // 🚫 prevent dropdown toggle
        >
          <button
            type="button"
            onClick={() => onDeleteClass?.(classGroup)}
            className="blackicon-btn px-0 py-0 hover:text-red-400"
            title="Delete Class"
          >
            <Delete className="w-6 h-6" />
          </button>

          <DropdownArrow
            className={`w-10 h-10 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* DROPDOWN CONTENT */}
      <div
        className={`
          w-full bg-black-34 rounded-[24px] border border-donkey-30
          overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]
          ${isOpen ? "max-h-[600px] opacity-100 mb-4" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-5 py-3 flex flex-col gap-2">
          {classGroup.students.length === 0 ? (
            <p className="text-center text-donkey-20 italic py-4">
              No students enrolled
            </p>
          ) : (
            classGroup.students.map((student) => (
              <CS_ClientsRow
                key={student.uid}
                user={student}
                classGroup={classGroup}
                onViewProfile={onViewProfile}
                onRemoveClient={onRemoveClient}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CS_ClassDropdown;
