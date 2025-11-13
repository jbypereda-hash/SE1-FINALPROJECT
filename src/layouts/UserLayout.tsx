import React from "react";
import NavigationBar from "../components/NavigationBar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavigationBar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
