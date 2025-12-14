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
    const results = [];

    for (const appDoc of snap.docs) {
      const app = appDoc.data();

      // ✅ USERS COLLECTION IS "user"
      const userSnap = await getDoc(doc(db, "user", app.userID));
      const user = userSnap.exists() ? userSnap.data() : null;

      // ✅ PACKAGES COLLECTION IS "packages"
      const packageSnap = await getDoc(doc(db, "packages", app.packageID));
      const pkg = packageSnap.exists() ? packageSnap.data() : null;

      results.push({
        id: appDoc.id,
        userID: app.userID,
        packageID: app.packageID,

        // ✅ CORRECT FIELD NAMES
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
    <div className="flex w-screen h-screen">
      <main className="flex flex-col flex-1 p-4 overflow-auto">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[120px] gap-1.5 px-6 pt-6 pb-4">
          <h1 className="text-[26px] font-bold">
            <span className="text-neutral-500">Welcome, </span>
            <span className="text-[#e8e8e8]">Admin!</span>
          </h1>

          <div className="text-[#d5ff5f] font-bold text-[28px]">
            PENDING MEMBERSHIP APPLICATIONS
          </div>
        </header>

        {/* CONTAINER */}
        <div className="flex flex-col flex-1 bg-[#2d2d35] rounded-[40px] p-4 gap-3 overflow-auto">
          {/* LABELS */}
          <div className="flex w-full items-center gap-4 px-4">
            <div className="flex-1 text-center text-[#d5ff5f] font-bold">
              Action
            </div>
            <div className="flex-[1.5] text-center text-[#d5ff5f] font-bold">
              Name
            </div>
            <div className="flex-1 text-center text-[#d5ff5f] font-bold">
              Package
            </div>
            <div className="flex-1 text-center text-[#d5ff5f] font-bold">
              Contact No.
            </div>
          </div>

          {/* ROWS */}
          {loading ? (
            <p className="text-center text-white/60 mt-6">Loading...</p>
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
