import React from "react";
import AS_SideBar from "../../components/AS_SideBar";
import AS_AdminDirectoryTile from "./AS_AdminDirectoryTile";

// SAMPLE DATA
const users = [
  { id: 1, name: "Precious Kyle Pagute", position: "CEO", phone: "09952837465", email: "precious@example.com" },
  { id: 2, name: "Ben Joshua Dizon", position: "Manager", phone: "09475863723", email: "ben@example.com" },
  { id: 3, name: "Gabriel Ryne Ledres", position: "Manager", phone: "09712654387", email: "gabriel@example.com" },
  { id: 4, name: "Krishea Joanne Tare", position: "Manager", phone: "09914367583", email: "krishea@example.com" },
  { id: 5, name: "Rowena Montante", position: "Owner", phone: "09959877456", email: "rowena@example.com" },
  { id: 6, name: "Yen Vasquez", position: "Assistant", phone: "09273647891", email: "yen@example.com" },
];

const AS_AdminDirectory: React.FC = () => {
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
              ADMIN DIRECTORY
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3 items-center justify-center shrink-0">
              {/* ADD ADMIN Button */}
              <button className="bg-[#d5ff5f] rounded-[24px] w-[130px] h-[40px] flex items-center justify-center hover:bg-[#c9f255] transition-colors">
                <span className="text-[#000000] font-bold text-[16px] font-['Inter-Bold',_sans-serif]">
                  ADD ADMIN
                </span>
              </button>

              {/* DELETE ADMIN Button */}
              <button className="bg-[#d5ff5f] rounded-[24px] w-[165px] h-[40px] flex items-center justify-center hover:bg-[#c9f255] transition-colors">
                <span className="text-[#000000] font-bold text-[16px] font-['Inter-Bold',_sans-serif]">
                  DELETE ADMIN
                </span>
              </button>
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
              p-6
              bg-[#2d2d35]
              rounded-[25px]
              auto-rows-[minmax(130px,auto)]
              [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]
            "
          >
            {users.map((user) => (
              <AS_AdminDirectoryTile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AS_AdminDirectory;