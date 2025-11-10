import ProfileCard from "../components/ProfileCard";
import HealthInfoCard from "../components/HealthInfoCard";
import Calendar from "../components/Calendar";
import QrCodeCard from "../components/QrCodeCard";
import { useMemberProfile } from "../hooks/useMemberProfile";

export const ProfilePage = () => {
  const { member, loading } = useMemberProfile();

  if (loading)
    return (
      <div className="min-h-screen bg-[#1c1c22] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );

  if (!member)
    return (
      <div className="min-h-screen bg-[#1c1c22] flex items-center justify-center text-white">
        No profile found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1c1c22] text-white px-8 py-10 flex flex-col items-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <ProfileCard
            name={member.name}
            membershipType={member.membershipType}
            validUntil={member.validUntil}
            status={member.status}
            goals={member.goals}
          />
          <HealthInfoCard health={member.health} />
        </div>

        <div className="flex flex-col gap-8">
          <Calendar />
          <QrCodeCard />
        </div>
      </div>
    </div>
  );
};
