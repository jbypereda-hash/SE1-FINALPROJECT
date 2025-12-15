import React from "react";
import Button from "./Button";
import Check from "../assets/icons/check.svg";
import X from "../assets/icons/x.svg";

interface ApplicationData {
  id: string;
  name: string;
  packageName: string;
  contactNo: string;
}

interface Props {
  application: ApplicationData;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AS_PendingApplicationsRow: React.FC<Props> = ({
  application,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex w-full text-black-35 text-2xl bg-donkey-10 rounded-full px-2 py-2.5 items-center gap-3 mb-3 hover:bg-[#e0e0e0] transition-colors duration:400">
      {/* ACTION */}
      <div className="flex flex-1 justify-center gap-2">
        <Button
          onClick={() => onApprove(application.id)}
          className="group w-19 h-11 bg-shrek rounded-full flex items-center justify-center"
        >
          <img src={Check} alt="Approve" className="w-9 h-9 group-hover:scale-110 duration-300 transition-transform" />
        </Button>

        <Button
          onClick={() => onReject(application.id)}
          className="group w-19 h-11 bg-shrek rounded-full flex items-center justify-center"
        >
          <img src={X} alt="Reject" className="w-9 h-9 group-hover:scale-110 duration-300 transition-transform" />
        </Button>
      </div>

      <div className="flex-[1.5] text-center font-bold truncate">
        {application.name}
      </div>

      <div className="flex-1 text-center font-bold">
        {application.packageName}
      </div>

      <div className="flex-1 text-center font-bold">
        {application.contactNo}
      </div>
    </div>
  );
};

export default AS_PendingApplicationsRow;
