import React from "react";
import AS_SideBar from "../components/AS_SideBar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
        <div className="flex h-screen bg-[#1e1e25] overflow-hidden py-2 pl-2">
      {/* Sidebar on the left */}
      <AS_SideBar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-6 text-white">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
