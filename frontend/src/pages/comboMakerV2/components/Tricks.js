import React, { useEffect, useState } from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import useApiCreds from "../../../hooks/useApiCreds";

const Tricks = ({ setCurItem }) => {
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
	return (
		<>
			<div className='flex h-[60vh] w-[60vw] flex-col gap-1 overflow-y-auto rounded-xl bg-zinc-800 p-2'>
				{tricks.length &&
					tricks.map((trick) => (
						<div>
							<div onClick={() => setCurItem((s) => [...s, trick.name])}>
								{trick?.name}
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
