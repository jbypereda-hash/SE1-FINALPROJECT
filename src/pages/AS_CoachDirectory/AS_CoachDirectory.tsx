import React from "react";
import Button from "../../components/Button";
import AS_SideBar from "../../components/AS_SideBar";
import AS_CoachDirectoryTile from "./AS_CoachDirectoryTile";

// SAMPLE DATA
const users = [
  { id: 1, name: "Toni Fowler", title: "Strength & Conditioning Coach", phone: "09456583925", email: "tFowler@example.com" },
  { id: 2, name: "Ash Trevino", title: "Yoga & Core Strength Coach", phone: "09475638729", email: "aTrevino@example.com" },
  { id: 3, name: "Amberlyn Reid", title: "HIIT Instructor & Dance Fitness Coach", phone: "09856437528", email: "aReid@example.com" },
];

const AS_CoachDirectory: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <AS_SideBar />

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
              COACH DIRECTORY
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 items-center justify-center shrink-0">
              {/* ADD ADMIN Button */}
              <Button
                to="/AS_AddCoach"
                className="bg-[#d5ff5f] rounded-[24px] w-[130px] h-[40px] flex items-center justify-center hover:bg-[#c9f255] transition-colors"
              >
                <span className="text-[#000000] font-bold text-[16px] font-['Inter-Bold',_sans-serif]">
                  ADD COACH
                </span>
              </Button>

              {/* DELETE ADMIN Button */}
              <Button 
                to="#"
                className="bg-[#d5ff5f] rounded-[24px] w-[165px] h-[40px] flex items-center justify-center hover:bg-[#c9f255] transition-colors">
                <span className="text-[#000000] font-bold text-[16px] font-['Inter-Bold',_sans-serif]">
                  DELETE COACH
                </span>
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
              <AS_CoachDirectoryTile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AS_CoachDirectory;