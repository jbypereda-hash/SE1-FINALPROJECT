import React, { useState } from "react";
import Button from "../../components/Button";
import AS_AdminDirectoryTile from "../../components/AS_AdminDirectoryTile";

// SAMPLE DATA
const users = [
  {
    id: 1,
    name: "Precious Kyle Pagute",
    position: "CEO",
    phone: "09952837465",
    email: "precious@example.com",
  },
  {
    id: 2,
    name: "Ben Joshua Dizon",
    position: "Manager",
    phone: "09475863723",
    email: "ben@example.com",
  },
  {
    id: 3,
    name: "Gabriel Ryne Ledres",
    position: "Manager",
    phone: "09712654387",
    email: "gabriel@example.com",
  },
  {
    id: 4,
    name: "Krishea Joanne Tare",
    position: "Manager",
    phone: "09914367583",
    email: "krishea@example.com",
  },
  {
    id: 5,
    name: "Rowena Montante",
    position: "Owner",
    phone: "09959877456",
    email: "rowena@example.com",
  },
  {
    id: 6,
    name: "Yen Vasquez",
    position: "Assistant",
    phone: "09273647891",
    email: "yen@example.com",
  },
];

const AS_AdminDirectory: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex w-screen h-screen">

      <main className="flex flex-col flex-1 p-4 overflow-auto">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[120px] gap-1.5 px-6 pt-6 pb-4">
          {/* Greeting */}
          <h1 className="text-[26px] font-bold font-['Inter-Bold',Helvetica] leading-tight">
            <span className="text-neutral-500">Welcome, </span>
            <span className="text-[#e8e8e8]">Admin!</span>
          </h1>

          {/* Title + Action Buttons */}
          <div className="flex flex-row items-center justify-between w-full h-[60px] mt-1">
            {/* Page Title */}
            <div className="text-[#d5ff5f] font-bold text-[28px] font-['Inter-Bold',_sans-serif] tracking-tight">
              ADMIN DIRECTORY
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 items-center justify-center shrink-0">
              {/* ADD ADMIN Button */}
              <Button
                onClick={() =>
                  window.dispatchEvent(new Event("open-signup-admin"))
                }
                className="shrek-btn py-1 text-xl"
              >
                ADD ADMIN
              </Button>

              {/* DELETE ADMIN Button */}
              <Button to="#" className="shrek-btn py-1 text-xl">
                DELETE ADMIN
              </Button>
            </div>
          </div>
        </header>

        {/* TILE CONTAINER */}
        <div className="flex-1 bg-[#2d2d35] rounded-[30px] p-4 overflow-auto">
          <div
            className="
              grid
              w-full
              gap-4
              p-4
              bg-[#2d2d35]
              rounded-[25px]
              auto-rows-[minmax(auto)]
              [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]
            "
          >
            {users.map((user) => (
              <AS_AdminDirectoryTile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>

      {/* Admin Sign Up Dialog */}
      {showDialog && (
        <AS_AdminSignUpDialogBox onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
};

export default AS_AdminDirectory;
