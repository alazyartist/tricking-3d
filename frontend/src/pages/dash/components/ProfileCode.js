import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2, MdQrCodeScanner } from "react-icons/md";
import QRGenerator from "../components/QRGenerator";
import QRReader from "../components/QRReader";
import Captures from "./Captures";

const ProfileCode = ({ setProfileCodeOpen, profileCodeOpen }) => {
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
		<>
			{/* <div
				id='bacground-color'
				onClick={() => setProfileCodeOpen(false)}
				className=' h-full w-full bg-zinc-800 opacity-90'
			/> */}
			<div className='neumorphicIn relative flex h-full flex-col place-items-center rounded-xl bg-zinc-800 p-2'>
				<IoIosArrowBack
					className='absolute top-4 right-1 text-4xl'
					onClick={() => setProfileCodeOpen(!profileCodeOpen)}
				/>
				<div className=' rounded-xl  p-2'>
					<div className=' flex place-content-center place-items-center gap-2 '>
						<button
							className=' flex w-14 flex-col place-items-center rounded-lg bg-zinc-700 p-1'
							onClick={() => setShowQR(true)}>
							<MdOutlineQrCode2 className='h-5 w-5' />
							<div className='text-xs'>Generate</div>
						</button>
						<button
							className='flex w-14 flex-col place-items-center rounded-lg bg-red-700 p-1'
							onClick={() => setShowQrReader(true)}>
							<MdQrCodeScanner className='h-5 w-5' />
							<div className='text-xs'>Scan</div>
						</button>
					</div>
					<div className='flex w-full flex-col place-content-center place-items-center'>
						{showQR && <QRGenerator />}
						{showQrReader && <QRReader />}
					</div>
					<div className='py-2 text-xl'>
						<Captures />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileCode;
