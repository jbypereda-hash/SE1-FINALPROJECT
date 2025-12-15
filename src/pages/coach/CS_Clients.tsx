// src/pages/coach/CS_Clients.tsx
import React, { useEffect, useState } from "react";
import CS_ClassDropdown from "../../components/CS_ClassDropdown";
import CS_AssignTodoModal from "../../components/CS_AssignTodoModal";
import ConfirmActionModal from "../../components/CS_ConfirmActionModal";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";

/* ----------------------------------
   Types
---------------------------------- */

interface User {
  uid: string;
  firstName: string;
  lastName: string;
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

/* ----------------------------------
   Component
---------------------------------- */

const CS_Clients: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmData, setConfirmData] = useState<null | {
    type: "class" | "client";
    classGroup: ClassGroup;
    user?: User;
  }>(null);

  const [todoClient, setTodoClient] = useState<User | null>(null);

  /* ----------------------------------
     Firestore Actions
  ---------------------------------- */

  const handleDeleteClass = (classGroup: ClassGroup) => {
    setConfirmData({ type: "class", classGroup });
  };

  const handleRemoveClient = (classGroup: ClassGroup, user: User) => {
    setConfirmData({ type: "client", classGroup, user });
  };

  const deleteClass = async (classGroup: ClassGroup) => {
    const enrollmentsSnap = await getDocs(
      query(
        collection(db, "enrollments"),
        where("classScheduleID", "==", classGroup.id)
      )
    );

    await Promise.all(enrollmentsSnap.docs.map((d) => deleteDoc(d.ref)));
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

  /* ----------------------------------
     Assign Todo
  ---------------------------------- */

  const handleAssignTodo = async (title: string) => {
    if (!todoClient || !auth.currentUser) return;

    await addDoc(collection(db, "members", todoClient.uid, "todos"), {
      title,
      completed: false,
      assignedBy: auth.currentUser.uid,
      assignedTo: todoClient.uid,
      assignedAt: Timestamp.now(),
    });

    setTodoClient(null);
  };

  /* ----------------------------------
     Load Coach Clients
  ---------------------------------- */

  useEffect(() => {
    const fetchCoachClients = async () => {
      try {
        const coachUID = auth.currentUser?.uid;
        if (!coachUID) return;

        const classGroups: ClassGroup[] = [];

        const schedulesSnap = await getDocs(
          query(
            collection(db, "classSchedules"),
            where("coach", "==", coachUID)
          )
        );

        for (const scheduleDoc of schedulesSnap.docs) {
          const schedule = scheduleDoc.data();

          const enrollmentsSnap = await getDocs(
            query(
              collection(db, "enrollments"),
              where("classScheduleID", "==", scheduleDoc.id)
            )
          );

          const students: User[] = [];

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
            name: schedule.title ?? "Unnamed Class",
            schedule: `${schedule.days ?? "—"} | ${schedule.time ?? "—"}`,
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

  /* ----------------------------------
     Navigation
  ---------------------------------- */

  const handleViewProfile = (user: User) => {
    navigate(`/clients/${user.uid}`);
  };

  /* ----------------------------------
     Render
  ---------------------------------- */

  return (
    <div className="h-full bg-black-35 text-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-6xl text-shrek font-bold">YOUR CLIENTS</h2>
          <p className="text-white text-3xl">
            Manage members currently enrolled in your classes.
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex justify-center">
          <div className="w-[1358px] bg-black-34 rounded-[50px] p-5 pb-10">
            {loading ? (
              <div className="text-center text-2xl mt-20">
                Loading clients...
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center text-2xl mt-20 text-black-30">
                No clients enrolled yet.
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {classes.map((classGroup) => (
                  <CS_ClassDropdown
                    key={classGroup.id}
                    classGroup={classGroup}
                    onViewProfile={handleViewProfile}
                    onDeleteClass={handleDeleteClass}
                    onRemoveClient={handleRemoveClient}
                    onAssignTodo={(user) => setTodoClient(user)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CONFIRM MODAL */}
        {confirmData && (
          <ConfirmActionModal
            title={
              confirmData.type === "class" ? "Delete Class" : "Remove Client"
            }
            description={
              confirmData.type === "class"
                ? `Delete "${confirmData.classGroup.name}" (${confirmData.classGroup.schedule})?`
                : `Remove ${confirmData.user?.firstName} ${confirmData.user?.lastName}?`
            }
            confirmLabel={confirmData.type === "class" ? "DELETE" : "REMOVE"}
            onConfirm={async () => {
              if (confirmData.type === "class") {
                await deleteClass(confirmData.classGroup);
              } else if (confirmData.user) {
                await removeClient(confirmData.classGroup, confirmData.user);
              }
              setConfirmData(null);
            }}
            onClose={() => setConfirmData(null)}
          />
        )}

        {/* ASSIGN TODO MODAL */}
        {todoClient && (
          <CS_AssignTodoModal
            clientName={`${todoClient.firstName} ${todoClient.lastName}`}
            onAssign={handleAssignTodo}
            onClose={() => setTodoClient(null)}
          />
        )}
      </main>
    </div>
  );
};

export default CS_Clients;
