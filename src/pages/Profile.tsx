import QrCodeCard from "../components/QrCodeCard";
import { useMemberProfile } from "../hooks/useMemberProfile";
import { useUserProfile } from "../hooks/useUserProfile";
import { useEffect } from "react";
import editIcon from "../assets/icons/edit.png";
import { useNavigate } from "react-router-dom";
import { useMemberTodos } from "../hooks/useMemberTodos.ts";
import ToDoList from "../components/ToDoList.tsx";
import { useMyClasses } from "../hooks/useMyClasses";
import MyClasses from "../components/MyClasses";

export default function ProfilePage() {
  const { member, loading } = useMemberProfile();
  const { userProfile } = useUserProfile();
  const { todos } = useMemberTodos();
  const { myClasses } = useMyClasses();

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    if (!loading && !member) {
      window.dispatchEvent(new Event("check-member-registration"));
    }
  }, [loading, member]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center text-white"></div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center text-white">
        No profile found.
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f13] text-white px-6 md:px-10 py-10 h-full">
      <div className="flex gap-10">
        {/* LEFT SIDE – PROFILE */}
        <div className="w-full max-w-xl">
          <div className="bg-[#1c1c22] rounded-[24px] p-6 ">
            {/* CARD */}
            <div className="bg-[#1c1c22] rounded-[24px] p-6 w-full max-w-xl">
              <div className="flex justify-between items-start">
                {/* LEFT SECTION */}
                <div>
                  {/* STATUS */}
                  <span className="inline-block bg-shrek text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {member.status}
                  </span>

                  <p className="text-gray-300 text-sm mb-2">
                    {member.membershipType}{" "}
                    <span className="text-gray-400 text-xs">
                      valid until {member.validUntil || "—"}
                    </span>
                  </p>

                  {/* ⬇⬇ DISPLAY FULL NAME FROM useUserProfile() */}
                  <h1 className="text-shrek text-3xl md:text-4xl font-extrabold leading-tight">
                    {userProfile?.fullName || "Unnamed Member"}
                  </h1>
                </div>

                {/* QR */}
                <div className="ml-6">
                  <div className="bg-[#e4e4e7] p-3 rounded-xl shadow-sm">
                    <QrCodeCard />
                  </div>
                </div>
              </div>

              {/* GOALS */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm tracking-wider font-semibold">
                    GOALS
                  </h3>

                  <button onClick={handleEditProfile}>
                    <img
                      src={editIcon}
                      alt="Edit Goals"
                      className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                    />
                  </button>
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  {member.goals && member.goals.length > 0 ? (
                    member.goals.map((g, i) => (
                      <span
                        key={i}
                        className="bg-donkey-10 text-black px-4 py-[6px] rounded-lg text-sm font-medium"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-donkey-10">No goals set</span>
                  )}
                </div>
              </div>

              {/* HEALTH INFO */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm tracking-wider font-semibold">
                    HEALTH INFORMATION
                  </h3>

                  <button onClick={handleEditProfile}>
                    <img
                      src={editIcon}
                      alt="Edit Health"
                      className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                    />
                  </button>
                </div>

                <div className="mt-4 divide-y divide-gray-600/60">
                  {[
                    ["Starting Weight", `${member.health.startingWeight} kg`],
                    ["Current Weight", `${member.health.currentWeight} kg`],
                    ["Goal Weight", `${member.health.goalWeight} kg`],
                    [
                      "Body Mass Index",
                      <>
                        {member.health.bmiValue}{" "}
                        <span className=" inline-block ml-4 text-gray-400 italic text-sm">
                          {member.health.bmiCategory}
                        </span>
                      </>,
                    ],
                    ["Height", `${member.health.height} cm`],
                    ["Age", member.health.age ?? "-"],
                  ].map(([label, value], index) => (
                    <div
                      key={index}
                      className="py-4 flex justify-between items-center"
                    >
                      <div className="text-gray-300">{label}</div>
                      <div className="text-white font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – FOR FUTURE FEATURES */}
        <div className="hidden lg:flex flex-col flex-1 gap-6">
          <div className="h-[350px] overflow-y-auto">
            <MyClasses classes={myClasses} />
          </div>

          <div className="h-[350px] overflow-y-auto">
            <ToDoList todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}
