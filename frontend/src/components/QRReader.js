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
				constraints={{ facingMode: "environment" }}
				videoStyle={{
					"border-color": "#202021",
					"border-radius": "28px",
					"border-width": "16px",
					width: "400px",
					height: "300px",
				}}
				videoContainerStyle={{
					width: "400px",
					height: "300px",
				}}
			/>

			<div>{QRData}</div>
		</>
	);
};

export default QRReader;
