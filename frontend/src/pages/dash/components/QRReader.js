import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import api, { apiPrivate } from "../../../api/api";
import { useUserStore } from "../../../store/userStore";
const QRReader = () => {
	const [QRData, setQRData] = useState();
	const activeUser = useUserStore((s) => s.userInfo);
	console.log("Active", activeUser);

	const handleResult = async (result, err) => {
		if (!!result) {
			setQRData(result?.text);
			console.log(result);
			try {
				const response = await apiPrivate.post(
					"/capture/",
					{
						useruuid: activeUser?.uuid,
						captureuuid: result.text,
						accessToken: activeUser.accessToken,
					},
					{
						withCredentials: true,
						headers: { "Content-Type": "application/json" },
					}
				);
				console.log(response);
			} catch (err) {
				console.log(err);
			}
		}

		if (!!err) {
			// console.log(err);
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

			<div>{QRData}</div>
		</div>
	);
};

export default QRReader;
