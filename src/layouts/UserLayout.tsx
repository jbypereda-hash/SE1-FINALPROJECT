import React from "react";
import NavigationBar from "../components/NavigationBar";
import PageTransition from "./PageTransition";
import AuthTransitionBlocker from "../context/AuthTransitionBlocker";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthTransitionBlocker>
      <NavigationBar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
    </AuthTransitionBlocker>
  );
};

export default UserLayout;
