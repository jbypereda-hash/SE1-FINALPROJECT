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
    <div className="flex w-full bg-[#b5b5b5] rounded-[30px] px-4 py-2.5 items-center gap-3">
      {/* ACTION */}
      <div className="flex flex-1 justify-center gap-2">
        <Button
          onClick={() => onApprove(application.id)}
          className="w-19 h-11 bg-[#d5ff5f] rounded-full flex items-center justify-center"
        >
          <img src={Check} alt="Approve" className="w-9 h-9" />
        </Button>

        <Button
          onClick={() => onReject(application.id)}
          className="w-19 h-11 bg-[#d5ff5f] rounded-full flex items-center justify-center"
        >
          <img src={X} alt="Reject" className="w-9 h-9" />
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
