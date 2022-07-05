import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
const QRReader = () => {
	const [QRData, setQRData] = useState();

	const handleResult = (result, err) => {
		if (!!result) {
			setQRData(result?.text);
			console.log(result);
		}

		if (!!err) {
			// console.log(err);
		}
	};
	const ViewFinderComp = () => (
		<div className='border-2 border-dashed border-blue-400'></div>
	);
	return (
		<>
			<div>QRReader</div>
			<QrReader
				onResult={(result, err) => handleResult(result, err)}
				style={{ width: "300px", height: "300px" }}
				videoId={"video"}
				constraints={{ facingMode: "environment", aspectRatio: 1 }}
				videoStyle={{
					"border-color": "#3f3f46",
					"border-radius": "30px",
					"border-width": "12px",
					width: "60vw",
					height: "60vw",
				}}
				videoContainerStyle={{
					width: "60vw",
					height: "60vw",
				}}
			/>

			<div>{QRData}</div>
		</>
	);
};

export default QRReader;
