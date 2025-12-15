import React, { useEffect, useState } from "react";
import AS_PendingApplicationsRow from "../../components/AS_PendingApplicationsRow";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface PendingApplication {
  id: string;
  userID: string;
  packageID: string;
  name: string;
  packageName: string;
  contactNo: string;
}

const AS_PendingMemberships: React.FC = () => {
  const [applications, setApplications] = useState<PendingApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    setLoading(true);

    const q = query(
      collection(db, "applications"),
      where("status", "==", "pending")
    );

    const snap = await getDocs(q);
    const results: PendingApplication[] = [];

    for (const appDoc of snap.docs) {
      const app = appDoc.data();

      const userSnap = await getDoc(doc(db, "user", app.userID));
      const user = userSnap.exists() ? userSnap.data() : null;

      const packageSnap = await getDoc(doc(db, "packages", app.packageID));
      const pkg = packageSnap.exists() ? packageSnap.data() : null;

      results.push({
        id: appDoc.id,
        userID: app.userID,
        packageID: app.packageID,
        name: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
        contactNo: user?.phoneNumber ?? "N/A",
        packageName: pkg?.title ?? "Unknown Package",
      });
    }

    setApplications(results);
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    await updateDoc(doc(db, "applications", id), {
      status: "active",
    });

    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = async (id: string) => {
    await deleteDoc(doc(db, "applications", id));
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex h-full w-full bg-black-35 text-white">
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          <h1 className="text-[26px] font-bold leading-tight">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          <div className="flex justify-between items-center w-full my-1">
            <p className="text-shrek font-bold text-5xl">
              PENDING MEMBERSHIPS
            </p>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto px-8 py-3">
          {/* TABLE HEADER */}
          <div className="flex w-full text-2xl items-center gap-4 px-4 mb-1">
            <div className="flex-1 text-center text-shrek font-bold">
              ACTION:
            </div>
            <div className="flex-[1.5] text-center text-shrek font-bold">
              NAME:
            </div>
            <div className="flex-1 text-center text-shrek font-bold">
              PACKAGE:
            </div>
            <div className="flex-1 text-center text-shrek font-bold">
              CONTACT NO.:
            </div>
          </div>

          {/* ROWS */}
          {loading ? (
            <p className="text-center text-white/60 mt-10">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-center text-white/60 mt-10">
              No pending membership applications.
            </p>
          ) : (
            applications.map((app) => (
              <AS_PendingApplicationsRow
                key={app.id}
                application={app}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AS_PendingMemberships;
