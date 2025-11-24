import React from "react";
import NavigationBar from "../components/NavigationBar";
import PageTransition from "./PageTransition";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};

export default UserLayout;
