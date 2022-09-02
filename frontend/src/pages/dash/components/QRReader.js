import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate, useLocation } from "react-router-dom";
import useCaptureUser from "../../../api/useCaptures";
import { useUserStore } from "../../../store/userStore";
const QRReader = () => {
	const [QRData, setQRData] = useState();
	const activeUser = useUserStore((s) => s.userInfo);
	const { mutate: captureUser } = useCaptureUser();
	const nav = useNavigate();
	const location = useLocation();
	const handleResult = async (result, err) => {
		if (!!result) {
			setQRData(result?.text);
			console.log("result", result);
			captureUser({
				useruuid: activeUser?.uuid,
				captureuuid: result.text,
				accessToken: activeUser.accessToken,
			});
			result.text &&
				location.pathname.includes("/home") &&
				nav(`/userProfile/${result?.text}`);
		}
	};
	const ViewFinderComp = () => (
		<div className='border-2 border-dashed border-blue-400'></div>
	);
	return (
		<div className='mt-4'>
			<QrReader
				onResult={(result, err) => {
					handleResult(result, err);
				}}
				style={{ width: "325px", height: "325px" }}
				videoId={"video"}
				constraints={{ facingMode: "environment", aspectRatio: 1 }}
				videoStyle={{
					borderColor: "#3f3f46",
					borderRadius: "30px",
					borderWidth: "0px",
					width: "70vw",
					height: "70vw",
				}}
				videoContainerStyle={{
					width: "70vw",
					height: "70vw",
				}}
			/>

			<div>{QRData}</div>
		</div>
	);
};

export default QRReader;
