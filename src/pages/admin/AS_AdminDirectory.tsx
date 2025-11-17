import React, { useState } from "react";
import Button from "../../components/Button";
import AS_AdminDirectoryTile from "../../components/AS_AdminDirectoryTile";

// SAMPLE DATA
const users = [
  {
    id: 1,
    name: "Precious Kyle Pagute",
    position: "CEO",
    phone: "09952837465",
    email: "precious@example.com",
  },
  {
    id: 2,
    name: "Ben Joshua Dizon",
    position: "Manager",
    phone: "09475863723",
    email: "ben@example.com",
  },
  {
    id: 3,
    name: "Gabriel Ryne Ledres",
    position: "Manager",
    phone: "09712654387",
    email: "gabriel@example.com",
  },
  {
    id: 4,
    name: "Krishea Joanne Tare",
    position: "Manager",
    phone: "09914367583",
    email: "krishea@example.com",
  },
  {
    id: 5,
    name: "Rowena Montante",
    position: "Owner",
    phone: "09959877456",
    email: "rowena@example.com",
  },
  {
    id: 6,
    name: "Yen Vasquez",
    position: "Assistant",
    phone: "09273647891",
    email: "yen@example.com",
  },
  {
    id: 6,
    name: "Yen Vasquez",
    position: "Assistant",
    phone: "09273647891",
    email: "yen@example.com",
  },
  {
    id: 6,
    name: "Yen Vasquez",
    position: "Assistant",
    phone: "09273647891",
    email: "yen@example.com",
  },
];

const AS_AdminDirectory: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* HEADER */}
        <header className="flex flex-col w-full h-[130px] px-4 pt-6 pb-4">
          {/* Greeting */}
          <h1 className="text-[26px] font-bold leading-tight">
            <span className="text-donkey-30">Welcome, </span>
            <span className="text-white">Admin!</span>
          </h1>

          {/* Title + Action Buttons */}
          <div className="flex justify-between items-center w-full self-stretch my-1">
            <p className="text-shrek font-bold text-5xl whitespace-nowrap">
              ADMIN DIRECTORY
            </p>

            <Button
              onClick={() =>
                window.dispatchEvent(new Event("open-signup-admin"))
              }
              className="shrek-btn py-[8px] text-2xl font-bold inline-flex"
            >
              ADD ADMIN
            </Button>
          </div>
        </header>

        {/* TILE CONTAINER */}
        <div className="flex-1 bg-black-34 rounded-[30px] overflow-auto">
          <div
            className="
              grid
              w-full
              gap-6
              p-8
              bg-black-34
              rounded-[25px]
              auto-rows-[minmax(auto)]
              [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]
            "
          >
            {users.map((user) => (
              <AS_AdminDirectoryTile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AS_AdminDirectory;
