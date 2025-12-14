import PersonIcon from "../assets/icons/person.svg?react";
import gearIcon from "../assets/icons/gear.svg";
import ClockIcon from "../assets/icons/clock.svg?react";
import listIcon from "../assets/icons/list.svg";
import Calendar from "../assets/icons/calendar.svg?react";
import Package from "../assets/icons/package.svg?react";

import type { JSX } from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";

export const AS_SideBar = (): JSX.Element => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex flex-col w-[260px] h-full items-center gap-6 px-2 py-6 mr-5 bg-[#2d2d35] rounded-[40px] overflow-hidden">
      {/* CORE LAB Logo */}
      <h1 className="text-[39px] transition-transform duration-400 hover:scale-110 my-3">
        CORE LAB
      </h1>

      <div className="flex flex-col w-full px-2 overflow-y-auto">
        {/* DIRECTORIES Header */}
        <div className="flex items-center gap-1 mb-2">
          <img src={listIcon} alt="Directories" className="w-10 h-10" />
          <div className="text-shrek font-bold text-[25px] uppercase">
            Directories
          </div>
        </div>

        {/* Directory Links */}
        <div className="flex flex-col">
          <Button
            to="/AS_AdminDirectory"
            className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
              ${
                path === "/AS_AdminDirectory"
                  ? "bg-[#3a3a45]"
                  : "hover:bg-[#3a3a45]"
              }
            `}
          >
            <div className="flex gap-1 items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
              <PersonIcon className="w-6 h-6" />
              <p className="text-xl">Admin Directory</p>
            </div>
          </Button>

          <Button
            to="/AS_MemberDirectory"
            className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
              ${
                path === "/AS_MemberDirectory"
                  ? "bg-[#3a3a45]"
                  : "hover:bg-[#3a3a45]"
              }
            `}
          >
            <div className="flex gap-1 items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
              <PersonIcon className="w-6 h-6" />
              <p className="text-xl">Member Directory</p>
            </div>
          </Button>

          <Button
            to="/AS_CoachDirectory"
            className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
              ${
                path === "/AS_CoachDirectory"
                  ? "bg-[#3a3a45]"
                  : "hover:bg-[#3a3a45]"
              }
            `}
          >
            <div className="flex gap-1 items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
              <PersonIcon className="w-6 h-6" />
              <p className="text-xl">Coach Directory</p>
            </div>
          </Button>
        </div>

        {/* CONTENT MANAEGEMENT Header */}
        <div className="flex items-center gap-2 mt-6 mb-2">
          <img
            src={gearIcon}
            alt="Content Management"
            className="w-7 h-7"
          />
          <span className="text-shrek font-bold text-[25px] uppercase">
            Management
          </span>
        </div>

        {/* Packages */}
        <Button
          to="/AS_Packages"
          className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
          ${
            path === "/AS_Packages"
              ? "bg-[#3a3a45]"
              : "hover:bg-[#3a3a45]"
            }
          `}>
          <div className="flex gap-[6px] items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
          <Package className="w-6 h-6" />
          <p className="text-xl">Packages</p>
          </div>
        </Button>

        {/* Classes */}
        <Button
          to="/AS_Classes"
          className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
          ${
            path === "/AS_Classes"
              ? "bg-[#3a3a45]"
              : "hover:bg-[#3a3a45]"
            }
          `}>
          <div className="flex gap-[6px] items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
          <Calendar className="w-6 h-6" />
          <p className="text-xl">Classes</p>
          </div>
        </Button>

        {/* MEMBERSHIP APPLICATIONS Header */}
        <div className="flex items-center gap-2 mt-6 mb-2">
          <img
            src={gearIcon}
            alt="Membership Applications"
            className="w-7 h-7"
          />
          <span className="text-shrek font-bold text-[25px] uppercase">
            Applications
          </span>
        </div>

        {/* Pending */}
        <Button
          to="/AS_PendingMemberships"
          className={`group flex items-center p-2 pl-2 rounded-lg transition-colors
          ${
            path === "/AS_PendingMemberships"
              ? "bg-[#3a3a45]"
              : "hover:bg-[#3a3a45]"
            }
          `}>
          <div className="flex gap-[6px] items-center transform transition-all duration-200 group-hover:scale-105 group-hover:text-shrek">
            <ClockIcon className="w-5 h-5 ml-[4px]" />
            <p className="text-xl">Pending</p>
          </div>
        </Button>

      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* LOG OUT BUTTON */}
      <Button
        className="shrek-btn w-50 font-bold"
        onClick={() => window.dispatchEvent(new Event("open-logout-confirm"))}
      >
        LOG OUT
      </Button>
    </div>
  );
};

export default AS_SideBar;
