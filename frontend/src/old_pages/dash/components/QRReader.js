import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import useCaptureUser from "../../../api/useCaptures";
import useUserInfoByUUID from "../../../api/useUserInfoById";
import { useUserStore } from "../../../store/userStore";
const QRReader = () => {
	const [QRData, setQRData] = useState();
	const [QRDataResponse, setQRDataResponse] = useState("Capture Valid User");
	const activeUser = useUserStore((s) => s.userInfo);
	const { mutate: captureUser } = useCaptureUser();
	// const nav = useNavigate();
	// const location = useLocation();
	const { data: capturedUserInfo } = useUserInfoByUUID(QRData);
	useEffect(() => {
		capturedUserInfo && setQRDataResponse(capturedUserInfo?.username);
	}, [capturedUserInfo]);
	const handleResult = async (result, err) => {
		if (!!result) {
			setQRData(result?.text);
			console.log("result", result);
			captureUser({
				useruuid: activeUser?.uuid,
				captureuuid: result.text,
				accessToken: activeUser.accessToken,
			});
			console.log(capturedUserInfo);
			// result.text &&
			// 	location.pathname.includes("/home") &&
			// 	nav(`/userProfile/${result?.text}`);
		}
	};
	const ViewFinderComp = () => (
		<div className='border-2 border-dashed border-blue-400'></div>
	);
	return (
		<div className='mt-4'>
			<QrReader
				onResult={(result, err) => handleResult(result, err)}
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

			<div className='text-center font-inter text-xl font-bold'>
				{(QRDataResponse !== "Capture Valid User" && (
					<>
						<div>{`You Captured ${QRDataResponse}`}</div>
						<button
							className='rounded-lg bg-zinc-700 p-1 text-sm'
							// onClick={() => nav(`/userProfile/${QRData}`)}
						>
							View Profile
						</button>
					</>
				)) || <div>"Capture Valid User"</div>}
			</div>
		</div>
	);
};

export default QRReader;
