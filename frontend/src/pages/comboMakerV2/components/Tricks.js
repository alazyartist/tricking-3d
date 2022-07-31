import React, { useEffect, useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { stances } from "../../../data/trickDataModel/TrickObjects";
import useApiCreds from "../../../hooks/useApiCreds";

const Tricks = ({ setCurrentItem, filter, currentItem }) => {
	const apiPrivate = useApiCreds();
	const [tricks, setTricks] = useState([]);
	const [filteredTricks, setFilteredTricks] = useState([]);
	const getTricks = async () => {
		apiPrivate
			.get("/tricks")
			.then((res) => {
				console.log(res.data);
				setTricks(res.data);
				setFilteredTricks(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getTricks();
	}, []);
	useEffect(() => {
		if (currentItem.length < 1 || filteredTricks.length < 1) {
			setFilteredTricks([...tricks]);
		}
		console.log(filteredTricks.length);
	}, [currentItem]);
	// This works just need to save a copy of the filtered list.
	useEffect(() => {
		if (filteredTricks !== undefined) {
			setFilteredTricks(() => {
				return [
					...tricks.filter((tr) => {
						return (
							(tr.type === "Trick" &&
								stances[tr?.takeoffStance].leg?.includes(filter)) ||
							(tr.type === "Stance" && tr?.leg?.includes(filter)) ||
							(tr.type === "Transition" && tr?.fromLeg.includes(filter))
						);
					}),
				];
			});
		} else {
			setFilteredTricks([...tricks]);
		}
	}, [filter]);

	return (
		<>
			<div className='no-scrollbar flex h-[60vh] w-[60vw] flex-col gap-3 overflow-y-auto rounded-xl p-2 peer-hover:bg-red-500'>
				{filteredTricks.length &&
					filteredTricks.map((trick) => (
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
