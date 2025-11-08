import React from "react";
import Check from "../../assets/icons/check.svg";
import X from "../../assets/icons/x.svg";

interface UserData {
  id: number;
  name: string;
  package: string;
  contactNo: string;
}

interface AS_PendingApplicationsRowProps {
  user: UserData;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const AS_PendingApplicationsRow: React.FC<AS_PendingApplicationsRowProps> = ({
  user,
  onApprove = (id) => console.log(`Approved user ${id}`),
  onReject = (id) => console.log(`Rejected user ${id}`),
}) => {
  return (
    <div className="flex w-full bg-[#b5b5b5] rounded-[30px] px-4 py-2.5 items-center gap-3">
      {/* ACTION BUTTONS */}
      <div className="flex flex-1 justify-center gap-2">
        <button
          onClick={() => onApprove(user.id)}
          className="w-19 h-11 bg-[#d5ff5f] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <img src={Check} alt="Approve" className="w-9 h-9" />
        </button>
        <button
          onClick={() => onReject(user.id)}
          className="w-19 h-11 bg-[#d5ff5f] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <img src={X} alt="Reject" className="w-9 h-9" />
        </button>
      </div>

      {/* NAME */}
      <div className="flex-[1.5] flex justify-center">
        <p className="font-bold text-[#040404] text-[16px] truncate">{user.name}</p>
      </div>

      {/* PACKAGE */}
      <div className="flex-1 flex justify-center">
        <p className="font-bold text-black text-[16px] truncate">{user.package}</p>
      </div>

      {/* CONTACT NO. */}
      <div className="flex-1 flex justify-center">
        <p className="font-bold text-black text-[16px] truncate">{user.contactNo}</p>
      </div>
    </div>
  );
};

export default AS_PendingApplicationsRow;