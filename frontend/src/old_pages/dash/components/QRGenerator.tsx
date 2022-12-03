import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useUserStore } from "../../../store/userStore";
const QRGenerator = () => {
  const { uuid, profilePic } = useUserStore((s) => s.userInfo);
  return (
    <div className="mt-4 overflow-hidden rounded-2xl">
      <QRCode
        size={225}
        value={uuid as string}
        ecLevel="H"
        logoHeight={59}
        logoWidth={59}
        removeQrCodeBehindLogo
        logoImage={`./images/${uuid}/${profilePic}`}
        bgColor={"#d4d4d8"}
        fgColor={"#242427"}
        qrStyle={"dots"}
        eyeRadius={[
          [0, 15, 15, 15],
          [15, 0, 15, 15],
          [15, 15, 15, 0],
        ]}
      />
    </div>
  );
};

export default QRGenerator;
