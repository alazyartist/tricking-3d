import React, { useEffect, useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import useApiCreds from "../../../hooks/useApiCreds";

const Tricks = ({ setCurrentItem, filter }) => {
	const apiPrivate = useApiCreds();
	const [tricks, setTricks] = useState([]);
	const getTricks = async () => {
		apiPrivate
			.get("/tricks")
			.then((res) => {
				console.log(res.data);
				setTricks(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getTricks();
	}, []);

	//This works just need to save a copy of the filtered list.
	// useEffect(() => {
	// 	setTricks((t) => {
	// 		return [
	// 			...t.filter((tr) => {
	// 				return (
	// 					(tr.type === "Trick" && tr?.fromLeg?.includes(filter)) ||
	// 					tr?.takeoffStance?.includes(filter) ||
	// 					tr?.leg?.includes(filter) ||
	// 					tr.type === "Stance"
	// 				);
	// 			}),
	// 		];
	// 	});
	// }, [filter]);

	return (
		<>
			<div className='flex h-[60vh] w-[60vw] flex-col gap-3 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
				{tricks.length &&
					tricks.map((trick) => (
						<div className='rounded-xl  bg-zinc-800 p-2'>
							<div
								className='flex w-full justify-between'
								onClick={() => setCurrentItem((s) => [...s, trick])}>
								<div>{trick?.name}</div>
								<div className='text-zinc-500'>{trick?.type}</div>
							</div>
						</div>
					))}
			</div>
			<div className='absolute bottom-16 flex gap-2'>
				<MdOutlineArrowUpward />
				From Database
				<MdOutlineArrowUpward />
			</div>
		</>
	);
};

export default Tricks;
