import React from "react";
import AS_SideBar from "../components/AS_SideBar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <AS_SideBar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
