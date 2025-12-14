import React, { useEffect, useState } from "react";
import CS_ClassDropdown from "../../components/CS_ClassDropdown";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { deleteDoc } from "firebase/firestore";
import ConfirmActionModal from "../../components/CS_ConfirmActionModal";

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

const CS_Clients: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  const [confirmData, setConfirmData] = useState<null | {
    type: "class" | "client";
    classGroup: ClassGroup;
    user?: User;
  }>(null);

  const handleDeleteClass = (classGroup: ClassGroup) => {
    setConfirmData({
      type: "class",
      classGroup,
    });
  };

  const handleRemoveClient = (classGroup: ClassGroup, user: User) => {
    setConfirmData({
      type: "client",
      classGroup,
      user,
    });
  };

  const deleteClass = async (classGroup: ClassGroup) => {
    const enrollmentsSnap = await getDocs(
      query(
        collection(db, "enrollments"),
        where("classScheduleID", "==", classGroup.id)
      )
    );

    await Promise.all(
      enrollmentsSnap.docs.map((docSnap) => deleteDoc(docSnap.ref))
    );

    await deleteDoc(doc(db, "classSchedules", classGroup.id));

    setClasses((prev) => prev.filter((c) => c.id !== classGroup.id));
  };

  const removeClient = async (classGroup: ClassGroup, user: User) => {
    const enrollmentSnap = await getDocs(
      query(
        collection(db, "enrollments"),
        where("classScheduleID", "==", classGroup.id),
        where("userID", "==", user.uid)
      )
    );

    await Promise.all(enrollmentSnap.docs.map((d) => deleteDoc(d.ref)));

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classGroup.id
          ? { ...c, students: c.students.filter((s) => s.uid !== user.uid) }
          : c
      )
    );
  };

  useEffect(() => {
    const fetchCoachClients = async () => {
      try {
        const coachUID = auth.currentUser?.uid;
        if (!coachUID) return;

        const classGroups: ClassGroup[] = [];

        // 1️⃣ Get schedules created by this coach
        const schedulesSnap = await getDocs(
          query(
            collection(db, "classSchedules"),
            where("coach", "==", coachUID)
          )
        );

        for (const scheduleDoc of schedulesSnap.docs) {
          const schedule = scheduleDoc.data();

          // 2️⃣ Get enrollments for this schedule
          const enrollmentsSnap = await getDocs(
            query(
              collection(db, "enrollments"),
              where("classScheduleID", "==", scheduleDoc.id)
            )
          );

          const students: User[] = [];

          // 3️⃣ Resolve enrolled users
          for (const enrollment of enrollmentsSnap.docs) {
            const { userID } = enrollment.data();

            const userSnap = await getDoc(doc(db, "user", userID));
            if (!userSnap.exists()) continue;

            const u = userSnap.data();

            students.push({
              uid: userID,
              firstName: u.firstName,
              lastName: u.lastName,
              role: u.role,
              phoneNumber: u.phoneNumber,
              email: u.email,
              lastSignInTime: u.lastSignInTime,
            });
          }

          classGroups.push({
            id: scheduleDoc.id,
            name: schedule.title,
            schedule: `${schedule.days} | ${schedule.time}`,
            students,
          });
        }

        setClasses(classGroups);
      } catch (err) {
        console.error("Failed to load clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoachClients();
  }, []);

  const handleViewProfile = (user: User) => {
    navigate(`/profile/${user.uid}`);
  };

  return (
    <div className="h-full bg-black-35 text-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* TITLE BLOCK */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <h2 className="text-6xl text-shrek font-bold">YOUR CLIENTS</h2>
            <p className="text-white text-3xl">
              Manage members currently enrolled in your classes.
            </p>
          </div>
        </div>

        {/* FRAME BACKGROUND */}
        <div className="flex justify-center">
          <div className="w-[1358px] h-full bg-black-34 rounded-[50px] p-5 pb-10 overflow-y-auto flex flex-col gap-3">
            {/* LABELS */}
            <div className="w-full px-6">
              <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto_auto] gap-8 px-5">
                <div className="flex justify-center">
                  <h2 className="font-bold text-shrek text-xl">Class</h2>
                </div>
                <div className="flex justify-center pr-8">
                  <h2 className="font-bold text-shrek text-xl">Schedule</h2>
                </div>
                <div className="flex justify-center pr-14">
                  <h2 className="font-bold text-shrek text-xl">
                    No. of Students
                  </h2>
                </div>
                <div />
              </div>
            </div>

            {/* CLASS DROPDOWNS */}
            <div className="flex flex-col gap-3 w-full">
              {loading ? (
                <div className="text-center text-2xl mt-20">
                  Loading clients...
                </div>
              ) : classes.length === 0 ? (
                <div className="text-center text-2xl mt-20 text-black-30">
                  No clients enrolled yet.
                </div>
              ) : (
                classes.map((classGroup) => (
                  <CS_ClassDropdown
                    key={classGroup.id}
                    classGroup={classGroup}
                    onViewProfile={handleViewProfile}
                    onDeleteClass={handleDeleteClass}
                    onRemoveClient={handleRemoveClient}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {confirmData && (
          <ConfirmActionModal
            title={
              confirmData.type === "class" ? "Delete Class" : "Remove Client"
            }
            description={
              confirmData.type === "class"
                ? `Are you sure you want to delete "${confirmData.classGroup.name}" (${confirmData.classGroup.schedule})?`
                : `Remove ${confirmData.user?.firstName} ${confirmData.user?.lastName} from "${confirmData.classGroup.name}" (${confirmData.classGroup.schedule})?`
            }
            confirmLabel={confirmData.type === "class" ? "DELETE" : "REMOVE"}
            onConfirm={async () => {
              if (confirmData.type === "class") {
                await deleteClass(confirmData.classGroup);
              } else if (confirmData.user) {
                await removeClient(confirmData.classGroup, confirmData.user);
              }
            }}
            onClose={() => setConfirmData(null)}
          />
        )}
      </main>
    </div>
  );
};

export default CS_Clients;
