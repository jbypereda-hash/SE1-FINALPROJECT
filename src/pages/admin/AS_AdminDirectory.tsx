import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Button from "../../components/Button";
import AS_DirectoryTile from "../../components/AS_DirectoryTile";
import EditUserModal from "../../components/AS_EditUserModal";
import AS_DeleteConfirmModal from "../../components/AS_DeleteConfirmModal";
import { deleteUser } from "../../api/userAPI";

interface FirestoreUser {
  uid: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  role: string;
  lastSignInTime?: any;
}

const AS_AdminDirectory: React.FC = () => {
  const [admins, setAdmins] = useState<FirestoreUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FirestoreUser | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<FirestoreUser | null>(null);

  useEffect(() => {
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("role", "==", "admin"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as FirestoreUser),
        uid: doc.id, // Ensure UID matches doc ID
      }));

      setAdmins(data);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (user: FirestoreUser) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = (user: FirestoreUser) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const result = await deleteUser(userToDelete.uid);

      if (result?.success) {
        console.log("User deleted successfully");

        // optional: locally remove from state so UI updates immediately
        setAdmins((prev) => prev.filter((u) => u.uid !== userToDelete.uid));
      } else {
        console.error("Backend error:", result);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }

    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleSave = async (
    updatedUser: Partial<FirestoreUser> & { uid: string }
  ) => {
    try {
      const userRef = doc(db, "user", updatedUser.uid);

      const payload: Partial<User> = {
        firstName: updatedUser.firstName ?? "",
        lastName: updatedUser.lastName ?? "",
        phoneNumber: updatedUser.phoneNumber ?? "",
        gender: updatedUser.gender ?? "",
        role: updatedUser.role ?? "member",
      };
      await updateDoc(userRef, payload);

      setAdmins((prev) =>
        prev.map((u) => (u.uid === updatedUser.uid ? { ...u, ...payload } : u))
      );

      setModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex h-full w-full">
      <main className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          <h1 className="text-[26px] font-bold leading-tight">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          <div className="flex justify-between items-center w-full my-1">
            <p className="text-shrek font-bold text-5xl">ADMIN DIRECTORY</p>

            <Button
              onClick={() =>
                window.dispatchEvent(new Event("open-signup-admin"))
              }
              className="shrek-btn py-[8px] text-2xl font-bold"
            >
              ADD ADMIN
            </Button>
          </div>
        </header>

        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700">
          <div className="grid w-full gap-6 p-8 auto-rows-[minmax(auto)] [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            {admins.map((user) => (
              <AS_DirectoryTile
                key={user.uid}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </main>

      <EditUserModal
        user={selectedUser}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <AS_DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        userName={
          userToDelete
            ? `${userToDelete.firstName} ${userToDelete.lastName}`
            : ""
        }
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AS_AdminDirectory;
