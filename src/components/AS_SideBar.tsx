// src/components/AS_SideBar.tsx
import { Link } from "react-router-dom";
import personIcon from "../assets/person.svg";
import gearIcon from "../assets/gear.svg";
import dumbbellIcon from "../assets/dumbbell.svg";
import clockIcon from "../assets/clock.svg";
import homeIcon from "../assets/home.svg";
import listIcon from "../assets/list.svg";
import type { JSX } from "react";
import Button from "./Button";

export const AS_SideBar = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[260px] h-full items-center gap-6 px-2 py-6 bg-[#2d2d35] rounded-[40px] overflow-hidden">
      {/* CORE LAB Logo */}
      <div className="flex w-full items-center justify-center mb-2">
        <div className="font-bold text-[#d5ff5f] text-[32px] tracking-[0.5px]">
          CORE LAB
        </div>
      </div>

      <div className="flex flex-col w-full px-2 overflow-y-auto">
        {/* DIRECTORIES Header */}
        <div className="flex items-center gap-2 mb-2">
<<<<<<< HEAD
          <div className="w-7 h-7 flex items-center justify-center">
            <img
              className="max-w-full max-h-full"
              alt="Directories"
              src={listIcon}
            />
          </div>
          <div className="text-[#d5ff5f] font-bold text-[21px]">
            DIRECTORIES
=======
          <img src={listIcon} alt="Directories" className="w-6 h-6" />
          <div className="text-[#d5ff5f] font-bold text-[18px] uppercase">
            Directories
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
          </div>
        </div>

        {/* Directory Links */}
        <div className="flex flex-col gap-1.5">
          <Button
            to="/AS_AdminDirectory"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45] transition-colors"
          >
<<<<<<< HEAD
            <img className="w-6 h-6" alt="Admin Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Admin Directory
            </span>
          </Link>

          {/* Admin Directory */}
          <Link
=======
            <img src={personIcon} alt="Admin Directory" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Admin Directory
            </span>
          </Button>

          <Button
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
            to="/AS_MemberDirectory"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45] transition-colors"
          >
<<<<<<< HEAD
            <img className="w-6 h-6" alt="Member Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Member Directory
            </span>
          </Link>

          {/* Coach Directory */}
          <Link
=======
            <img src={personIcon} alt="Member Directory" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Member Directory
            </span>
          </Button>

          <Button
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
            to="/AS_CoachDirectory"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45] transition-colors"
          >
<<<<<<< HEAD
            <img className="w-6 h-6" alt="Coach Directory" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Coach Directory
            </span>
          </Link>
=======
            <img src={personIcon} alt="Coach Directory" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Coach Directory
            </span>
          </Button>
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
        </div>

        {/* CONTENT MANAGEMENT Header */}
        <div className="flex items-center gap-2 mt-6 mb-2">
<<<<<<< HEAD
          <div className="w-7 h-7 flex items-center justify-center">
            <img
              className="max-w-full max-h-full"
              alt="Content Management"
              src={gearIcon}
            />
          </div>
          <div className="text-[#d5ff5f] font-bold text-[21px]">
            CONTENT MANAGEMENT
=======
          <img src={gearIcon} alt="Content Management" className="w-6 h-6" />
          <div className="text-[#d5ff5f] font-bold text-[18px] uppercase">
            Content Management
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
          </div>
        </div>

        {/* Management Buttons */}
        <div className="flex flex-col gap-1.5">
          <Button
            to="/AS_Homepage"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45]"
          >
<<<<<<< HEAD
            <img className="w-5 h-5" alt="Homepage" src={homeIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Homepage
            </span>
          </Link>

          {/* Memberships Page */}
          <Link
=======
            <img src={homeIcon} alt="Homepage" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Homepage
            </span>
          </Button>

          <Button
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
            to="/AS_Memberships"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45]"
          >
<<<<<<< HEAD
            <img className="w-6 h-6" alt="Memberships Page" src={personIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Memberships Page
            </span>
          </Link>

          {/* Classes Page */}
          <Link
=======
            <img src={personIcon} alt="Memberships Page" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Memberships Page
            </span>
          </Button>

          <Button
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
            to="/AS_Classes"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45]"
          >
<<<<<<< HEAD
            <img className="w-6 h-6" alt="Classes Page" src={dumbbellIcon} />
            <span className="text-[#e8e8e8] font-normal text-2xl">
              Classes Page
            </span>
          </Link>

          {/* Coaches Page */}
          <Link
=======
            <img src={dumbbellIcon} alt="Classes Page" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Classes Page
            </span>
          </Button>

          <Button
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
            to="/AS_Coaches"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45]"
          >
<<<<<<< HEAD
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
=======
            <img src={personIcon} alt="Coaches Page" className="w-5 h-5" />
            <span className="text-[#e8e8e8] text-[18px] font-medium">
              Coaches Page
            </span>
          </Button>
        </div>

        {/* MEMBERSHIP APPLICATIONS Header */}
        <div className="flex items-center gap-2 mt-6 mb-2">
          <img
            src={gearIcon}
            alt="Membership Applications"
            className="w-6 h-6"
          />
          <span className="text-[#d5ff5f] font-bold text-[15.6px] uppercase">
            Membership Applications
          </span>
        </div>

        {/* Pending */}
        <Button
          to="/AS_PendingMemberships"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3a3a45]"
        >
          <img src={clockIcon} alt="Pending" className="w-5 h-5" />
          <span className="text-[#e8e8e8] text-[18px] font-medium">Pending</span>
        </Button>
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* LOG OUT BUTTON */}
      <Button
        to="/"
        className="flex items-center justify-center gap-2 px-10 py-2.5 bg-[#d5ff5f] rounded-[25px] hover:bg-[#c0ff55] transition-colors mb-4"
      >
<<<<<<< HEAD
        <span className="font-bold text-black text-[28px]">LOG OUT</span>
      </Link>
=======
        <span className="font-bold text-black text-[20px]">LOG OUT</span>
      </Button>
>>>>>>> ccec67740b16a2366cd61f5f21ec3d5b7d8ba0a6
    </div>
  );
};

export default AS_SideBar;