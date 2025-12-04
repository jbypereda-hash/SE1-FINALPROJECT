import React from "react";
import CS_ClassDropdown from "../../components/CS_ClassDropdown";

interface User {
  uid: string;
  lastName: string;
  firstName: string;
  role: string;
  phoneNumber: string;
  email?: string;
  lastSignInTime: any;
}

interface ClassGroup {
  id: string;
  name: string;
  schedule: string;
  students: User[];
}

export const CS_Clients: React.FC = () => {
  const classes: ClassGroup[] = [
    {
      id: "class-1",
      name: "Kickboxing Cardio",
      schedule: "TThS | 10:00 AM - 11:00 AM",
      students: [
        {
          uid: "1",
          firstName: "Precious Kyle",
          lastName: "Pagute",
          role: "Client",
          phoneNumber: "09171234567",
          email: "ppagute@example.com",
          lastSignInTime: new Date().toISOString(),
        },
        {
          uid: "1",
          firstName: "Precious Kyle",
          lastName: "Pagute",
          role: "Client",
          phoneNumber: "09171234567",
          email: "ppagute@example.com",
          lastSignInTime: new Date().toISOString(),
        },
        {
          uid: "1",
          firstName: "Precious Kyle",
          lastName: "Pagute",
          role: "Client",
          phoneNumber: "09171234567",
          email: "ppagute@example.com",
          lastSignInTime: new Date().toISOString(),
        },
      ],
    },
    {
      id: "class-2",
      name: "Power Flow Yoga",
      schedule: "MWF | 9:00 AM - 10:00 AM",
      students: [
        {
          uid: "2",
          firstName: "Maria",
          lastName: "Santos",
          role: "Client",
          phoneNumber: "09181234567",
          email: "maria.santos@example.com",
          lastSignInTime: new Date().toISOString(),
        },
      ],
    },
  ];

  const handleViewProfile = (user: User) => {
    console.log("View profile for:", user.uid);
  };

  return (
    <div className="min-h-screen bg-black-35 text-color-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* TITLE BLOCK */}
        <div className="grid grid-cols-3 items-center mb-12">
          <div />
          <div className="text-center">
            <h2 className="text-5xl text-shrek font-bold">YOUR CLIENTS</h2>
          </div>
          <div className="flex justify-end relative" />
        </div>

        {/* FRAME BACKGROUND */}
        <div className="flex justify-center">
          <div className="w-[1358px] h-[762px] bg-black-34 rounded-[50px] p-5 overflow-y-auto flex flex-col gap-3">
            {/* LABELS FOR CLASS LIST */}
            <div className="w-full px-6">
              <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto] gap-6 px-5">
                <div className="flex items-center justify-center">
                  <h2 className="font-bold text-[#d5ff5f] text-xl">Class</h2>
                </div>

                <div className="flex items-center justify-center pr-8">
                  <h2 className="font-bold text-[#d5ff5f] text-xl">Schedule</h2>
                </div>

                <div className="flex items-center justify-center pr-14">
                  <h2 className="font-bold text-[#d5ff5f] text-xl">No. of Students</h2>
                </div>

                <div className="flex items-center justify-center" />
              </div>
            </div>

            {/* CLASS DROPDOWNS */}
            <div className="flex flex-col gap-3 w-full">
              {classes.map((classGroup) => (
                <CS_ClassDropdown
                  key={classGroup.id}
                  classGroup={classGroup}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CS_Clients;