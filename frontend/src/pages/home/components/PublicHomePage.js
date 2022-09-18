import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ComboMakerBlueprint } from "../../../data/ComboMakerBlueprint.svg";
import { FaGraduationCap } from "react-icons/fa";
import MultiDonateButton from "../../../components/info/MultiDonateButton";

const PublicHomePage = () => {
	return (
		<div className='flex flex-col place-items-center'>
			<Link className='' to='/instructions'>
				<div className='flex w-[90vw] flex-col place-items-center justify-center gap-5 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-800 p-2 font-bold text-zinc-300'>
					<div>Instructions</div>
				</div>
			</Link>

			<div className='m-2 flex w-full place-content-center gap-4 rounded-xl p-2 text-zinc-300'>
				<Link
					className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800  text-4xl'
					to='/comboMaker'>
					{/* UnderConstruction Label */}
					<div className='relative top-7 right-8 -rotate-[22deg] rounded-md bg-red-500 bg-opacity-70 p-2 text-base'>
						Under Construction
					</div>
					<ComboMakerBlueprint fill={"#d4d4d8"} />
					<div className='mt-[-14px] text-sm font-bold'>Combo Maker</div>
				</Link>
				<Link
					className='flex h-20 w-full flex-col place-content-center place-items-center rounded-xl bg-gradient-to-b from-zinc-800 text-6xl'
					to='/theory'>
					<FaGraduationCap />
					<div className='text-sm font-bold'>Theory</div>
				</Link>
			</div>

			<div className=' flex gap-4'>
				<Link to='/login'>
					<div className='w-fit rounded-xl bg-zinc-300 p-3'>LOGIN</div>
				</Link>
				<Link to='/register'>
					<div className='w-fit rounded-xl bg-zinc-700 p-3 text-zinc-300'>
						REGISTER
					</div>
				</Link>
			</div>

			<div className='bottom-8 py-8'>
				<MultiDonateButton />
			</div>
		</div>
	);
};

export default PublicHomePage;
