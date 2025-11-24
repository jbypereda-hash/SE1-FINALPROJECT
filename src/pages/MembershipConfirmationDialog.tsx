import React from "react";

export interface MembershipConfirmationDialogProps {
onExplore: () => void;
onProfile: () => void;
}

export default function MembershipConfirmationDialog({ onExplore, onProfile }: MembershipConfirmationDialogProps) {
return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 font-[Inria Sans]">
    <div className="bg-[var(--color-black-35)] text-white p-6 rounded-2xl w-[360px] shadow-xl text-center">
        <h1 className="text-shrek text-2xl font-bold mb-2">CORE LAB</h1>
        <p className="mb-2">Congratulations!</p>
        <p className="text-donkey-10 text-sm mb-6">Your application is under review.</p>

        <div className="flex justify-center gap-4">
        <button onClick={onExplore} className="px-4 py-2 bg-shrek text-black rounded-xl">Explore Classes</button>
        <button onClick={onProfile} className="px-4 py-2 bg-shrek text-black rounded-xl">Go to My Profile</button>
        </div>
    </div>
    </div>
);
}
