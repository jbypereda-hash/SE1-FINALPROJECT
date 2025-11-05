import React from "react";
import AS_SideBar from "../../components/AS_SideBar";
import AS_PendingApplicationsRow from "./AS_PendingApplicationsRow";

// SAMPLE DATA
const users = [
  { id: 1, name: "Precious Kyle Pagute", package: "Flex Package", contactNo: "09952837465" },
  { id: 2, name: "Ben Joshua Dizon", package: "Starter Package", contactNo: "09475863723" },
  { id: 3, name: "Gabriel Ryne Ledres", package: "Pro Package", contactNo: "09712654387" },
  { id: 4, name: "Krishea Joanne Tare", package: "Flex Package", contactNo: "09914367583" },
];

const AS_PendingMemberships: React.FC = () => {
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
              PENDING MEMBERSHIP APPLICATIONS
            </div>
          </div>
        </header>

        {/* CONTAINER */}
        <div className="flex flex-col flex-1 bg-[#2d2d35] rounded-[40px] p-4 gap-3 overflow-auto">
          {/* LABELS */}
          <div className="flex w-full items-center gap-4 px-4 py-0">
            <div className="flex-1 flex justify-center">
              <h2 className="font-bold text-[#d5ff5f] text-xl">Action</h2>
            </div>
            <div className="flex-[1.5] flex justify-center">
              <h2 className="font-bold text-[#d5ff5f] text-xl">Name</h2>
            </div>
            <div className="flex-1 flex justify-center">
              <h2 className="font-bold text-[#d5ff5f] text-xl">Package</h2>
            </div>
            <div className="flex-1 flex justify-center">
              <h2 className="font-bold text-[#d5ff5f] text-xl">Contact No.</h2>
            </div>
          </div>

          {/* INDIVIDUAL ROWS */}
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <AS_PendingApplicationsRow key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AS_PendingMemberships;