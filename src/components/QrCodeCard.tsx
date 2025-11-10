import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { getAuth } from "firebase/auth";
import { saveAs } from "file-saver";

export default function QrCodeCard() {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const generateQr = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      // Generate a QR code using the user's UID
      const url = await QRCode.toDataURL(user.uid, { width: 200 });
      setQrUrl(url);
      setUserName(user.displayName || "CoreLab Member");
    };

    generateQr();
  }, []);

  const handleDownloadQR = () => {
    if (qrUrl) {
      saveAs(qrUrl, `${userName.replace(/\s+/g, "_")}_QR.png`);
    }
  };

  return (
    <div className="bg-[#2d2d35] rounded-[20px] p-6 shadow-md flex flex-col items-center justify-center">
      <h3 className="text-[#d5ff5f] text-lg font-bold mb-3">Member QR Code</h3>

      {qrUrl ? (
        <>
          <div className="bg-white p-3 rounded">
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-32 h-32 object-contain"
            />
          </div>

          <button
            onClick={handleDownloadQR}
            className="mt-4 bg-[#d5ff5f] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#caff4f] transition"
          >
            Download QR Code
          </button>
        </>
      ) : (
        <p className="text-gray-400">Generating QR code...</p>
      )}
    </div>
  );
}
