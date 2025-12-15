import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/arrow-left.svg";
import { useMemberProfile } from "../hooks/useMemberProfile";
import { useUserProfile } from "../hooks/useUserProfile";

export default function CS_ClientProfile() {
  const navigate = useNavigate();
  const { clientUid } = useParams<{ clientUid: string }>();

  const { member, loading } = useMemberProfile(clientUid);
  const { userProfile } = useUserProfile(clientUid);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!member || !userProfile) {
    return (
      <div className="min-h-screen bg-[#0f0f13] text-white flex items-center justify-center">
        Client profile not found.
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f13] text-white min-h-screen">
      <div className="px-6 md:px-10 py-10 flex justify-center">
        <div className="flex w-full max-w-4xl gap-6">
          {/* ───── BACK BUTTON COLUMN ───── */}
          <div className="pt-3">
            <button
              onClick={() => navigate("/CS-Client")}
              className="flex items-center gap-2 text-donkey-10 hover:text-shrek transition"
            >
              <img src={backIcon} className="w-7 h-7" alt="Back" />
            </button>
          </div>

          {/* ───── PROFILE CARD ───── */}
          <div className="flex-1 bg-black-34 rounded-[24px] p-6">
            <span className="inline-block bg-shrek text-black text-xs font-bold px-3 py-1 rounded-full mb-2">
              {member.status}
            </span>

            <h1 className="text-shrek text-3xl md:text-4xl font-extrabold">
              {userProfile.fullName}
            </h1>

            {/* CONTACT */}
            <div className="mt-4 space-y-1 text-sm">
              <div>
                <span className="text-gray-400">Email:</span>{" "}
                <span className="font-medium">{userProfile.email || "—"}</span>
              </div>
              <div>
                <span className="text-gray-400">Phone:</span>{" "}
                <span className="font-medium">
                  {userProfile.phoneNumber || "—"}
                </span>
              </div>
            </div>

            {/* GOALS */}
            <div className="mt-10">
              <h3 className="text-gray-400 text-sm tracking-wider font-semibold">
                GOALS
              </h3>

              <div className="flex gap-3 mt-3 flex-wrap">
                {member.goals?.length ? (
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
              <h3 className="text-gray-400 text-sm tracking-wider font-semibold">
                HEALTH INFORMATION
              </h3>

              <div className="mt-4 divide-y divide-gray-600/60">
                {[
                  ["Starting Weight", `${member.health.startingWeight} kg`],
                  ["Current Weight", `${member.health.currentWeight} kg`],
                  ["Goal Weight", `${member.health.goalWeight} kg`],
                  [
                    "BMI",
                    `${member.health.bmiValue} (${member.health.bmiCategory})`,
                  ],
                  ["Height", `${member.health.height} cm`],
                  ["Age", member.health.age ?? "-"],
                ].map(([label, value], i) => (
                  <div key={i} className="py-4 flex justify-between">
                    <div className="text-gray-300">{label}</div>
                    <div className="font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
