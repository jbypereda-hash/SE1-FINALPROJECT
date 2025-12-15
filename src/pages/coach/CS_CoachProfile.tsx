// src/pages/CS_CoachProfile.tsx
import React from "react";
import editIcon from "../../assets/icons/edit.png";
import MyClasses from "../../components/MyClasses";
import { useCoachProfile } from "../../hooks/useCoachProfile";
//import { useCoachSchedules } from "../../hooks/useCoachSchedules";
import { useNavigate } from "react-router-dom";
import { useCoachMyClasses } from "../../hooks/useCoachMyClasses";

const CS_CoachProfile: React.FC = () => {
  // optional: read coach uid from route params (e.g. /coach/:coachUid)
  const navigate = useNavigate();

  const { user, profile, loading: loadingProfile } = useCoachProfile();

  // If you intend to show the logged-in coach, you can pass auth.currentUser.uid instead.
  const coach = user?.uid;
  const { classes } = useCoachMyClasses(coach);

  console.log("Coach UID:", coach);
  console.log("Classes:", classes);

  const handleEditProfile = () => {
    // navigate to edit coach page (implement separately)
    navigate("/CS-CoachEditProfile");
  };

  // compose rows
  const infoRows = [
    { label: "Email", value: user?.email ?? "—" },
    { label: "Contact Number", value: user?.phoneNumber ?? "—" },
    { label: "Description", value: profile?.description ?? "—", justify: true },
    { label: "Tagline", value: profile?.tagline ?? "—", justify: true },
  ];

  if (loadingProfile || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading coach…
      </div>
    );
  }

  return (
    <div className="bg-black-35 text-white px-6 md:px-10 py-10 h-full">
      <div className="flex gap-10">
        {/* LEFT SIDE – COACH PROFILE */}
        <div className="w-full max-w-xl">
          <div className="bg-black-34 rounded-[24px] p-6">
            <div className="bg-black-34 rounded-[24px] p-6 w-full max-w-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-shrek text-3xl md:text-4xl font-extrabold leading-tight">
                    {user?.firstName || "Unnamed Coach"}
                    {user?.lastName ? ` ${user.lastName}` : ""}
                  </h1>

                  <p className="text-donkey-10 text-sm mt-2">
                    {profile?.title ?? "Coach"}
                  </p>
                </div>

                <div>
                  <button onClick={handleEditProfile}>
                    <img
                      src={editIcon}
                      alt="Edit Coach"
                      className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                    />
                  </button>
                </div>
              </div>

              {/* COACH INFO */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-donkey-20 text-sm tracking-wider font-semibold">
                    COACH INFORMATION
                  </h3>
                </div>

                <div className="mt-4 divide-y divide-donkey-30/60">
                  {infoRows.map(({ label, value, justify }, index) => (
                    <div
                      key={index}
                      className="py-4 flex justify-between items-start"
                    >
                      <div className="text-donkey-10">{label}</div>

                      <div
                        className={[
                          "text-white font-semibold ml-4",
                          justify ? "text-justify text-sm max-w-xs" : "",
                          label === "Tagline" ? "italic" : "",
                        ].join(" ")}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — My Classes */}
        <div className="hidden lg:flex flex-col flex-1 gap-6">
          <MyClasses
            classes={classes}
            onUnenroll={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CS_CoachProfile;
