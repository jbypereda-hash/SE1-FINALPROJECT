import React from "react";
import type { JSX } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import EditWhiteBG from "../assets/icons/edit-whitebg.svg?react";
import EditDarkGreyBG from "../assets/icons/edit-darkgreybg.svg?react";
import Bold from "../assets/icons/bold.svg?react";
import Italicized from "../assets/icons/italicized.svg?react";
import ListBlack from "../assets/icons/list-black.svg?react";
import TextColor from "../assets/icons/textcolor.svg?react";
import AlignLeft from "../assets/icons/alignleft.svg?react";
import AlignCenter from "../assets/icons/aligncenter.svg?react";
import AlignRight from "../assets/icons/alignright.svg?react";
import AlignJustify from "../assets/icons/alignjustify.svg?react";
import Mail from "../assets/icons/mail.svg";
import Phone from "../assets/icons/phone.svg";
import EmptyPhoto from "../assets/icons/emptyphoto.svg"
import Line2 from "../assets/icons/line2.svg";
import Line1 from "../assets/icons/line1.svg";

export const AS_EditCoach = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#1a1a1a]">
      {/* ========== TOP SECTION ========== */}
      <div className="pt-[65px] pr-[129px] pb-[65px] pl-[129px] flex flex-row justify-center w-full overflow-hidden">
        <BackButton />
        <div className="flex flex-col gap-2.5 items-center justify-center h-[75px] flex-1">
          <div className="text-[#d5ff5f] text-center font-['InriaSans-Bold',_sans-serif] text-[32px] font-bold w-full flex items-center justify-center">
            EDIT COACH PROFILE
          </div>
        </div>
      </div>

      {/* ========== MIDDLE SECTION ========== */}
      <div className="flex flex-col lg:flex-row gap-[50px] items-start justify-center w-full px-[129px] overflow-hidden">
        {/* LEFT SIDE */}
        <div className="bg-[#2d2d35] rounded-[50px] p-2.5 flex flex-col gap-5 items-center justify-center shrink-0 w-[562] h-[465px] relative overflow-hidden">
          <div className="flex flex-col items-center justify-center w-[500px] h-[172px] relative">
            <div className="relative w-[193px] h-[193px] flex items-center justify-center">
              <div className="bg-[#d5ff5f] rounded-full w-[193px] h-[193px] absolute"></div>
              <img
                src={EmptyPhoto}
                alt="Empty Photo"
                className="w-[167px] h-[167px] rounded-[126px] z-10"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="border-t-2 border-[#e8e8e8] w-[465px]" />

          <div className="px-[50px] flex flex-col gap-[5px] items-start justify-center w-full">
            <div className="flex flex-row items-center h-[35px]">
              <div className="text-[#d5ff5f] font-['InriaSans-Bold',_sans-serif] text-4xl font-bold">
                Toni Fowler
              </div>
              <Button>
               <EditDarkGreyBG className="w-[25px] h-6" />
              </Button>
            </div>

            <div className="flex flex-row items-center">
              <div className="text-[#e8e8e8] font-['InriaSans-Regular',_sans-serif] text-2xl font-normal">
                Strength &amp; Conditioning Coach
              </div>
              <Button>
               <EditDarkGreyBG className="w-[25px] h-6" />
              </Button>
            </div>

            <div className="pt-2.5 pb-2.5">
              <div className="text-[#d5ff5f] font-['InriaSans-Bold',_sans-serif] text-xl font-bold">
                Contact Information:
              </div>
            </div>

            <div className="bg-[#e8e8e8] rounded-[20px] p-2.5 flex flex-col items-center justify-center w-[435px] h-[73px]">
              <div className="flex flex-row gap-2 items-center w-full">
                <img src={Mail} alt="Email" className="w-[30px] h-[30px]" />
                <div className="text-[#222] font-['Inter-Bold',_sans-serif] text-base font-bold">
                  tFowler@gmail.com
                </div>
                <Button>
                  <EditWhiteBG className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-row gap-2.5 items-center w-full">
                <img src={Phone} alt="Phone" className="w-[30px] h-[30px]" />
                <div className="text-[#222] font-['Inter-Bold',_sans-serif] text-base font-bold">
                  0945 658 3925
                </div>
                <Button>
                  <EditWhiteBG className="w-5 h-5" />
                </Button>              
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#2d2d35] rounded-[50px] p-2.5 flex flex-col gap-2.5 items-center justify-center shrink-0 w-[562] h-[465px] relative overflow-hidden">
          {/* DESCRIPTION */}
          <div className="px-[15px] flex flex-row items-center w-[500px] h-[25px]">
            <div className="text-[#d5ff5f] font-['InriaSans-Bold'] text-2xl font-bold">
              Description
            </div>
            <Button>
               <EditDarkGreyBG className="w-[25px] h-6" />
            </Button>
          </div>

          {/* === DESCRIPTION TOOLBAR === */}
          <div className="bg-[#b5b5b5] rounded-[20px] flex flex-col items-center justify-start w-[485px] h-[172px] relative overflow-hidden">
            <div className="relative w-[500px] h-[52px]">
              <img className="top-[38px] left-0 w-[500px] h-px absolute object-cover" alt="" src={Line1} />
              <img className="top-0 left-[50px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[100px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[150px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[200px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[400px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />

              <Button className="absolute top-2.5 left-[20px] w-5 h-5">
                <Bold className="w-full h-full" />
              </Button>
              <Button className="absolute top-2.5 left-[66px] w-5 h-5">
                <Italicized className="w-full h-full" />
              </Button>
              <Button className="absolute top-1.5 left-[111px] w-7 h-7">
                <ListBlack className="w-full h-full" />
              </Button>
              <Button className="absolute top-2.5 left-[165.5px] w-5 h-5">
                <TextColor className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[215px] w-6 h-6">
                <AlignLeft className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[264px] w-6 h-6">
                <AlignCenter className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[311px] w-6 h-6">
                <AlignRight className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[362px] w-6 h-6">
                <AlignJustify className="w-full h-full" />
              </Button>
            </div>

            <div className="pt-2.5 pb-0 flex items-end justify-center h-[107px] w-full">
              <div className="text-[#000] text-center font-['InriaSans-Regular',_sans-serif] text-xl font-normal w-[434px]">
                Specializing in strength and conditioning, Mommy Oni has a knack
                for pushing members past their perceived limits with safe and
                effective techniques.
              </div>
            </div>
          </div>

          {/* FEEDBACK */}
          <div className="px-[15px] flex flex-row items-center w-[500px] h-[25px]">
            <div className="text-[#d5ff5f] font-['InriaSans-Bold'] text-2xl font-bold">
              Feedback/Review
            </div>
            <Button>
              <EditDarkGreyBG className="w-[25px] h-6" />
            </Button>
          </div>

          {/* === FEEDBACK TOOLBAR === */}
          <div className="bg-[#b5b5b5] rounded-[20px] flex flex-col items-center justify-start w-[485px] h-[172px] relative overflow-hidden">
            <div className="relative w-[500px] h-[52px]">
              <img className="top-[38px] left-0 w-[500px] h-px absolute object-cover" alt="" src={Line1} />
              <img className="top-0 left-[50px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[100px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[150px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[200px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />
              <img className="top-0 left-[400px] w-px h-[38px] absolute object-cover" alt="" src={Line2} />

              <Button className="absolute top-2.5 left-[20px] w-5 h-5">
                <Bold className="w-full h-full" />
              </Button>
              <Button className="absolute top-2.5 left-[66px] w-5 h-5">
                <Italicized className="w-full h-full" />
              </Button>
              <Button className="absolute top-1.5 left-[111px] w-7 h-7">
                <ListBlack className="w-full h-full" />
              </Button>
              <Button className="absolute top-2.5 left-[165.5px] w-5 h-5">
                <TextColor className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[215px] w-6 h-6">
                <AlignLeft className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[264px] w-6 h-6">
                <AlignCenter className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[311px] w-6 h-6">
                <AlignRight className="w-full h-full" />
              </Button>
              <Button className="absolute top-2 left-[362px] w-6 h-6">
                <AlignJustify className="w-full h-full" />
              </Button>
            </div>

            <div
              className="text-[#000] text-center font-['InriaSans-Italic',_sans-serif] text-xl font-normal w-[409px]"
              style={{ fontStyle: "italic" }}
            >
              Top rated coach in 1998!
            </div>
          </div>
        </div>
      </div>

      {/* ========== BOTTOM SECTION ========== */}
      <div className="pt-[65px] pr-2.5 pb-[65px] pl-2.5 flex flex-row gap-[35px] items-start justify-center w-full">
        <Button
          to="/AS_CoachDirectory"
          className="border-4 border-[#d5ff5f] rounded-[50px] px-[37px] py-1 w-[161px] h-12 text-[#d5ff5f] font-bold text-2xl"
        >
          CANCEL
        </Button>
        <Button
          to="/AS_CoachDirectory"
          className="bg-[#d5ff5f] rounded-[50px] px-[55px] py-2 w-[161px] h-12 text-[#000] font-bold text-2xl"
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default AS_EditCoach;
