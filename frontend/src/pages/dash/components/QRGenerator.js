import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useUserStore } from "../../../store/userStore";
const QRGenerator = () => {
	const { uuid, profilePic } = useUserStore((s) => s.userInfo);
	return (
		<>
			<div>Your Profile Code</div>
			<QRCode
				size={"225"}
				value={uuid}
				ecLevel='H'
				logoHeight={"59"}
				logoWidth={"59"}
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
		</>
	);
};

export default QRGenerator;
