// src/pages/CS_CoachProfile.tsx
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/icons/edit.png";
import MyClasses from "../../components/MyClasses";
import { useCoachProfile } from "../../hooks/useCoachProfile";
import { useNavigate } from "react-router-dom";
import { useCoachMyClasses } from "../../hooks/useCoachMyClasses";
import CoachRegistrationDialog from "../../components/CoachRegistrationDialog";

const CS_CoachProfile: React.FC = () => {
  const navigate = useNavigate();

  const { user, profile, loading: loadingProfile } = useCoachProfile();
  const coachUid = user?.uid;
  const { classes } = useCoachMyClasses(coachUid);

  const [showRegistration, setShowRegistration] = useState(false);

  /* 🔒 GUARD: force registration if incomplete */
  useEffect(() => {
    if (!loadingProfile && user) {
      if (!profile || profile.isProfileComplete !== true) {
        setShowRegistration(true);
      }
    }
  }, [loadingProfile, user, profile]);

  /* ❌ If modal is closed → go home */
  const handleCloseRegistration = () => {
    setShowRegistration(false);
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/CS-CoachEditProfile");
  };

  if (loadingProfile || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading coach…
      </div>
    );
  }

  /* 🚫 BLOCK VIEW if profile incomplete */
  if (showRegistration) {
    return (
      <>
        <CoachRegistrationDialog
          isOpen={showRegistration}
          onClose={handleCloseRegistration}
          onComplete={() => setShowRegistration(false)}
        />
      </>
    );
  }

  const infoRows = [
    { label: "Email", value: user.email ?? "—" },
    { label: "Contact Number", value: user.phoneNumber ?? "—" },
    {
      label: "Description",
      value: profile?.description ?? "—",
      justify: true,
    },
    {
      label: "Tagline",
      value: profile?.tagline ?? "—",
      justify: true,
    },
  ];

  return (
    <div className="bg-black-35 text-white px-6 md:px-10 py-10 h-full">
      <div className="flex gap-10">
        {/* LEFT SIDE – COACH PROFILE */}
        <div className="w-full max-w-xl">
          <div className="bg-black-34 rounded-[24px] p-6">
            <div className="bg-black-34 rounded-[24px] p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-shrek text-3xl md:text-4xl font-extrabold">
                    {user.firstName || "Unnamed Coach"}
                    {user.lastName ? ` ${user.lastName}` : ""}
                  </h1>

                  <p className="text-donkey-10 text-sm mt-2">
                    {profile?.title ?? "Coach"}
                  </p>
                </div>

                <button onClick={handleEditProfile}>
                  <img
                    src={editIcon}
                    alt="Edit Coach"
                    className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                  />
                </button>
              </div>

              {/* COACH INFO */}
              <div className="mt-10">
                <h3 className="text-donkey-20 text-sm tracking-wider font-semibold">
                  COACH INFORMATION
                </h3>

                <div className="mt-4 divide-y divide-donkey-30/60">
                  {infoRows.map(({ label, value, justify }, index) => (
                    <div
                      key={index}
                      className="py-4 flex justify-between items-start"
                    >
                      <span className="text-donkey-10">{label}</span>
                      <span
                        className={[
                          "text-white font-semibold ml-4",
                          justify ? "text-sm max-w-xs text-justify" : "",
                          label === "Tagline" ? "italic" : "",
                        ].join(" ")}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – CLASSES */}
        <div className="hidden lg:flex flex-col flex-1 gap-6">
          <MyClasses classes={classes} onUnenroll={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CS_CoachProfile;
