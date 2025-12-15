import QrCodeCard from "../components/QrCodeCard";
import { useMemberProfile } from "../hooks/useMemberProfile";
import { useUserProfile } from "../hooks/useUserProfile";
import { useEffect } from "react";
import editIcon from "../assets/icons/edit.png";
import { useNavigate } from "react-router-dom";
import { useMemberTodos } from "../hooks/useMemberTodos";
import ToDoList from "../components/ToDoList";
import { useMyClasses } from "../hooks/useMyClasses";
import MyClasses from "../components/MyClasses";

export default function ProfilePage() {
  const navigate = useNavigate();

  // ✅ ALL HOOKS FIRST — NO RETURNS ABOVE THIS
  const { member, loading } = useMemberProfile();
  const { userProfile } = useUserProfile();
  const { todos } = useMemberTodos();
  const { myClasses, unenroll } = useMyClasses();

  // ✅ SIDE EFFECT AFTER HOOKS
  useEffect(() => {
    if (!loading && !member) {
      window.dispatchEvent(new Event("check-member-registration"));
    }
  }, [loading, member]);

  // ✅ SINGLE LOADING GATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  // ✅ NO MEMBER
  if (!member) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center text-white">
        No profile found.
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="bg-[#0f0f13] text-white px-6 md:px-10 py-10 h-full">
      <div className="flex gap-10">
        {/* LEFT SIDE */}
        <div className="w-full max-w-xl">
          <div className="bg-black-34 rounded-[24px] p-6">
            <div className="bg-black-34 rounded-[24px] p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-shrek text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {member.status}
                  </span>

                  <p className="text-gray-300 text-sm mb-2">
                    {member.membershipType}
                    {member.validUntil && (
                      <span className="ml-2 text-gray-400 text-xs">
                        valid until {member.validUntil}
                      </span>
                    )}
                  </p>

                  <h1 className="text-shrek text-3xl md:text-4xl font-extrabold">
                    {userProfile?.fullName || "Unnamed Member"}
                  </h1>
                </div>

                <div className="ml-6">
                  <div className="bg-[#e4e4e7] p-3 rounded-xl">
                    <QrCodeCard />
                  </div>
                </div>
              </div>

              {/* GOALS */}
              <div className="mt-10">
                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm font-semibold">GOALS</h3>
                  <button onClick={handleEditProfile}>
                    <img src={editIcon} className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-3 mt-3 flex-wrap">
                  {member.goals?.length ? (
                    member.goals.map((g, i) => (
                      <span
                        key={i}
                        className="bg-donkey-10 text-black px-4 py-1 rounded-lg text-sm"
                      >
                        {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-donkey-10">No goals set</span>
                  )}
                </div>
              </div>

              {/* HEALTH */}
              <div className="mt-10">
                <h3 className="text-gray-400 text-sm font-semibold mb-4">
                  HEALTH INFORMATION
                </h3>

                <div className="divide-y divide-gray-600/60">
                  {[
                    ["Starting Weight", `${member.health.startingWeight} kg`],
                    ["Current Weight", `${member.health.currentWeight} kg`],
                    ["Goal Weight", `${member.health.goalWeight} kg`],
                    ["Height", `${member.health.height} cm`],
                    ["Age", member.health.age ?? "-"],
                  ].map(([label, value], i) => (
                    <div key={i} className="py-4 flex justify-between">
                      <span className="text-gray-300">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col flex-1 gap-6">
          <div className="h-[350px] overflow-y-auto">
            <MyClasses classes={myClasses} onUnenroll={unenroll} />
          </div>

          <div className="h-[350px] overflow-y-auto">
            <ToDoList todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}
