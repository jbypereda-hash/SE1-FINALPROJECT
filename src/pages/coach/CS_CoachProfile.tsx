import editIcon from "../../assets/icons/edit.png";
import MyClasses from "../../components/MyClasses";
import type { MyClassItem } from "../../components/MyClasses";

const CS_CoachProfile = () => {
  // PLACEHOLDERS FOR UI ONLY
  const coach = {
    title: "Strength & Conditioning Coach",
    description:
      "Specializing in strength and conditioning, Mommy Oni has a knack for pushing members past their perceived limits with safe and effective techniques.",
    tagline: "Top rated coach in 1998!",
  };

  const userProfile = {
    fullName: "Toni Fowler",
    email: "tFowler@gmail.com",
    phoneNumber: "0945 658 3925",
  };

  // SAMPLE CLASSES
  const dummyClasses: MyClassItem[] = [
    {
      id: "1",
      classId: "core-crusher",
      scheduleId: "sched1",
      classInfo: { name: "Core Crusher", description: "", intensity: 3 },
      scheduleInfo: { day: "MWF", startTime: "9:00 AM", endTime: "10:00 AM" },
    },
    {
      id: "2",
      classId: "hiit-blast",
      scheduleId: "sched2",
      classInfo: { name: "HIIT Blast", description: "", intensity: 4 },
      scheduleInfo: { day: "TThS", startTime: "3:00 PM", endTime: "4:00 PM" },
    },
    {
      id: "3",
      classId: "yoga-flow",
      scheduleId: "sched3",
      classInfo: { name: "Power Flow Yoga", description: "", intensity: 2 },
      scheduleInfo: { day: "MWF", startTime: "11:00 AM", endTime: "12:00 PM" },
    },
  ];

  const handleEditProfile = () => {
    console.log("Edit coach profile clicked");
  };

  // rows for coach info
  const infoRows: { label: string; value: string; justify?: boolean }[] = [
    { label: "Email", value: userProfile.email },
    { label: "Contact Number", value: userProfile.phoneNumber },
    { label: "Description", value: coach.description, justify: true },
    { label: "Feedback/Review", value: coach.tagline, justify: true },
  ];

  return (
    <div className="bg-black-35 text-white px-6 md:px-10 py-10 h-full">
      <div className="flex gap-10">
        {/* LEFT SIDE – COACH PROFILE */}
        <div className="w-full max-w-xl">
          <div className="bg-black-34 rounded-[24px] p-6">
            {/* CARD */}
            <div className="bg-black-34 rounded-[24px] p-6 w-full max-w-xl">
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  {/* NAME */}
                  <h1 className="text-shrek text-3xl md:text-4xl font-extrabold leading-tight">
                    {userProfile.fullName}
                  </h1>

                  {/* TITLE */}
                  <p className="text-donkey-10 text-sm mt-2">{coach.title}</p>
                </div>
              </div>

              {/* COACH INFO */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-donkey-20 text-sm tracking-wider font-semibold">
                    COACH INFORMATION
                  </h3>

                  <button onClick={handleEditProfile}>
                    <img
                      src={editIcon}
                      alt="Edit Coach"
                      className="w-5 h-5 cursor-pointer hover:opacity-80 transition"
                    />
                  </button>
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
                          label === "Feedback/Review" ? "italic" : "",
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

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex flex-col flex-1 gap-6">
          <MyClasses classes={dummyClasses} />
        </div>
      </div>
    </div>
  );
};

export default CS_CoachProfile;