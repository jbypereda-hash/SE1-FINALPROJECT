// src/components/AS_SideBar.tsx
import { Link } from "react-router-dom";
import personIcon from "../assets/person.svg";
import gearIcon from "../assets/gear.svg";
import dumbbellIcon from "../assets/dumbbell.svg";
import clockIcon from "../assets/clock.svg";
import homeIcon from "../assets/home.svg";
import listIcon from "../assets/list.svg";
import type { JSX } from "react";

export const AS_SideBar = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[310px] h-[960px] items-center gap-7 px-0 py-6 bg-[#2d2d35] rounded-[50px] overflow-hidden">
      {/* CORE LAB Logo */}
      <div className="flex w-64 items-center justify-center">
        <div className="flex items-center justify-center w-fit font-bold text-[#d5ff5f] text-[40px] tracking-[0]">
          CORE LAB
        </div>
      </div>

      <div className="flex flex-col w-full px-3">
        {/* DIRECTORIES Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 flex items-center justify-center">
            <img
              className="max-w-full max-h-full"
              alt="Directories"
              src={listIcon}
            />
          </div>
          <div className="text-[#d5ff5f] font-bold text-[21px]">
            DIRECTORIES
          </div>
        </div>

        {/* Admin Directory */}
        <div className="flex flex-col gap-2">
          <Link
            to="/AS_AdminDirectory"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Admin Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Admin Directory
            </span>
          </Link>

          {/* Admin Directory */}
          <Link
            to="/AS_MemberDirectory"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Member Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Member Directory
            </span>
          </Link>

          {/* Coach Directory */}
          <Link
            to="/AS_CoachDirectory"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Coach Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Coach Directory
            </span>
          </Link>
        </div>

        {/* CONTENT MANAGEMENT Header */}
        <div className="flex items-center gap-2 mt-6 mb-2">
          <div className="w-7 h-7 flex items-center justify-center">
            <img
              className="max-w-full max-h-full"
              alt="Content Management"
              src={gearIcon}
            />
          </div>
          <div className="text-[#d5ff5f] font-bold text-[21px]">
            CONTENT MANAGEMENT
          </div>
        </div>

        {/* Homepage */}
        <div className="flex flex-col gap-2">
          <Link
            to="/AS_Homepage"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-5 h-5" alt="Homepage" src={homeIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Homepage
            </span>
          </Link>

          {/* Memberships Page */}
          <Link
            to="/AS_Memberships"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Memberships Page" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Memberships Page
            </span>
          </Link>

          {/* Classes Page */}
          <Link
            to="/AS_Classes"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Classes Page" src={dumbbellIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Classes Page
            </span>
          </Link>

          {/* Coaches Page */}
          <Link
            to="/AS_Coaches"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-6 h-6" alt="Coaches Page" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Coaches Page
            </span>
          </Link>
        </div>

        {/* Membership Applications */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mt-6 mb-2">
            <div className="w-7 h-7 flex items-center justify-center">
              <img
                className="max-w-full max-h-full"
                alt="Membership Applications"
                src={gearIcon}
              />
            </div>
            <span className="text-[#d5ff5f] font-bold text-[19px]">
              MEMBERSHIP APPLICATIONS
            </span>
          </div>

          {/* Pending */}
          <Link
            to="/AS_PendingMemberships"
            className="flex items-center gap-2 p-2 hover:bg-[#3a3a45] rounded"
          >
            <img className="w-5 h-5" alt="Pending" src={clockIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">Pending</span>
          </Link>
        </div>
      </div>

      {/* Spacer for bottom */}
      <div className="flex-1" />

      {/* LOG OUT BUTTON */}
      <Link
        to="/"
        className="flex items-center justify-center gap-2 px-14 py-3 bg-[#d5ff5f] rounded-[30px] hover:bg-[#c0ff55]"
      >
        <span className="font-bold text-black text-[28px]">LOG OUT</span>
      </Link>
    </div>
  );
};
