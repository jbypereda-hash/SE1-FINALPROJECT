import React from "react";
import AS_SideBar from "../components/AS_SideBar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
        <div className="flex h-screen bg-black-35 overflow-hidden py-5 px-5">
      {/* Sidebar on the left */}
      <AS_SideBar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto text-white">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
