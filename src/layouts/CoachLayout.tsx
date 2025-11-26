import React from "react";
import PageTransition from "./PageTransition";
import NavigationBar from "../components/NavigationBar";

const CoachLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavigationBar /> {/* Same navbar */}
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};

export default CoachLayout;
