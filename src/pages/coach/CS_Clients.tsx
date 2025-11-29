import React from "react";
import CS_ClientsTile from "../../components/CS_ClientsTile";

interface User {
  uid: string;
  lastName: string;
  firstName: string;
  role: string;
  phoneNumber: string;
  email?: string;
  lastSignInTime: any;
}

export const CS_Clients: React.FC = () => {
  // PLACEHOLDERS FOR UI ONLY
  const clients: User[] = [
    {
      uid: "1",
      firstName: "John",
      lastName: "Doe",
      role: "Client",
      phoneNumber: "09171234567",
      email: "john.doe@example.com",
      lastSignInTime: new Date().toISOString(),
    },
    {
      uid: "2",
      firstName: "Maria",
      lastName: "Santos",
      role: "Client",
      phoneNumber: "09181234567",
      email: "maria.santos@example.com",
      lastSignInTime: new Date().toISOString(),
    },
    {
      uid: "3",
      firstName: "Alex",
      lastName: "Cruz",
      role: "Client",
      phoneNumber: "09191234567",
      email: "alex.cruz@example.com",
      lastSignInTime: new Date().toISOString(),
    },
  ];

  const handleEdit = (user: User) => {
    console.log("Edit client:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete client:", user);
  };

  return (
    <div className="min-h-screen bg-black-35 text-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* TITLE BLOCK */}
        <div className="grid grid-cols-3 items-center mb-12">
          <div />

          <div className="text-center">
            <h2 className="text-5xl text-shrek font-bold">YOUR CLIENTS</h2>
          </div>

          <div className="flex justify-end relative" />
        </div>

        {/* FRAME BACKGROUND */}
        <div className="flex justify-center">
          <div className="w-[1358px] h-[762px] bg-black-34 rounded-[50px] p-8 overflow-y-auto">
            {/* CLIENT TILES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <CS_ClientsTile
                  key={client.uid}
                  user={client}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CS_Clients;