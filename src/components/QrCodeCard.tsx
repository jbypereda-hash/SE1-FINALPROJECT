import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { getAuth } from "firebase/auth";

const QrCodeCard = () => {
  const [open, setOpen] = useState(false);
  const modalQrRef = useRef<HTMLDivElement>(null);

  const auth = getAuth();
  const uid = auth.currentUser?.uid ?? "no-uid";

  const handleDownload = () => {
    if (!modalQrRef.current) return;

    const svg = modalQrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "my-qr-code.png";
      link.href = pngFile;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <>
      {/* SMALL QR FOR PROFILE CARD */}
      <div
        className="cursor-pointer hover:scale-[1.04] transition"
        onClick={() => setOpen(true)}
      >
        <QRCode value={uid} size={80} bgColor="transparent" fgColor="#000000" />
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black-35 px-8 py-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
            {/* Center the QR code */}
            <div className="mb-6 flex justify-center">
              <div ref={modalQrRef}>
                <QRCode
                  value={uid}
                  size={260}
                  bgColor="transparent"
                  fgColor="#e8e8e8" // donkey-10 hex
                />
              </div>
            </div>

            {/* Smaller download button, centered */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleDownload}
                className="bg-shrek text-black-35 px-4 py-1 rounded-lg border-2 border-black transition 
          hover:bg-black hover:text-[#d5ff5f] hover:border-[#d5ff5f] text-sm font-semibold"
                style={{ minWidth: 0, width: "auto" }}
              >
                Download QR Code
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white transition underline mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QrCodeCard;
