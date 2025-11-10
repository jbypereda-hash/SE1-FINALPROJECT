import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ProfileCard from "../components/ProfileCard";
import HealthInfoCard from "../components/HealthInfoCard";
import Calendar from "../components/Calendar";
import QrCodeCard from "../components/QrCodeCard";
import { getAuth } from "firebase/auth";

interface MemberData {
  name: string;
  status: string;
  membershipType: string;
  validUntil: string;
  goals: string[];
  health: {
    startingWeight: number;
    currentWeight: number;
    goalWeight: number;
    bmiCategory: string;
    bmiValue: number;
    height: number;
    age: number;
    medicalConditions: string;
  };
}

export const ProfilePage = () => {
  const [member, setMember] = useState<MemberData | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return; //please login message

      const ref = doc(db, "members", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setMember(snap.data() as MemberData);
    };
    fetchMember();
  }, []);

  if (!member)
    return (
      <div className="min-h-screen bg-[#1c1c22] flex items-center justify-center text-white">
        Loading profile...
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
