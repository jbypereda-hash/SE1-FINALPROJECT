import React from "react";
import NavigationBar from "../components/NavigationBar";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default UserLayout;
