import React, { useEffect, useState } from "react";
import { MdOutlineQrCode2, MdQrCodeScanner } from "react-icons/md";
import QRGenerator from "../components/QRGenerator";
import QRReader from "../components/QRReader";

const ProfileCode = () => {
	const [showQR, setShowQR] = useState(true);
	const [showQrReader, setShowQrReader] = useState(false);
	useEffect(() => {
		if (showQR === true) {
			setShowQrReader(false);
			setShowQR(true);
		}
	}, [showQR]);
	useEffect(() => {
		if (showQrReader === true) {
			setShowQR(false);
			setShowQrReader(true);
		}
	}, [showQrReader]);
	return (
		<div className='absolute top-28 left-[15vw] w-[70vw]'>
			<div className=' rounded-xl  p-2'>
				<div className='flex place-content-center place-items-center gap-2'>
					<button
						className=' flex w-14 flex-col place-items-center rounded-lg bg-zinc-700 p-1'
						onClick={() => setShowQR(!showQR)}>
						<MdOutlineQrCode2 className='h-5 w-5' />
						<div className='text-xs'>Generate</div>
					</button>
					<button
						className='flex w-14 flex-col place-items-center rounded-lg bg-red-700 p-1'
						onClick={() => setShowQrReader(!showQrReader)}>
						<MdQrCodeScanner className='h-5 w-5' />
						<div className='text-xs'>Scan</div>
					</button>
				</div>
				<div className='flex w-full flex-col place-content-center place-items-center'>
					{showQR && <QRGenerator />}
					{showQrReader && <QRReader />}
				</div>
			</div>
		</div>
	);
};

export default ProfileCode;
