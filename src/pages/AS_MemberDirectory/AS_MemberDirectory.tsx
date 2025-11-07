import React from "react";
import AS_SideBar from "../../components/AS_SideBar";
import AS_MemberDirectoryTile from "./AS_MemberDirectoryTile";

// SAMPLE DATA
const users = [
  { id: 1, name: "Lucas Martinez", packageType: "Pro Package", phone: "09123456789", email: "lucas@example.com" },
  { id: 2, name: "Sofia Delgado", packageType: "Starter Package", phone: "09234567890", email: "sofia@example.com" },
  { id: 3, name: "Ethan Rivera", packageType: "Flex Package", phone: "09345678901", email: "ethan@example.com" },
  { id: 4, name: "Isabella Cruz", packageType: "Pro Package", phone: "09456789012", email: "isabella@example.com" },
  { id: 5, name: "Mason Lee", packageType: "Starter Package", phone: "09567890123", email: "mason@example.com" },
  { id: 6, name: "Olivia Reyes", packageType: "Flex Package", phone: "09678901234", email: "olivia@example.com" },
];

const AS_MemberDirectory: React.FC = () => {
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
              MEMBER DIRECTORY
            </div>

            {/* Action Buttons */}

              {/* DELETE MEMBER Button */}
              <button className="bg-[#d5ff5f] rounded-[24px] w-[165px] h-[40px] flex items-center justify-center hover:bg-[#c9f255] transition-colors">
                <span className="text-[#000000] font-bold text-[16px] font-['Inter-Bold',_sans-serif]">
                  DELETE MEMBER
                </span>
              </button>
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
              <AS_MemberDirectoryTile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AS_MemberDirectory;