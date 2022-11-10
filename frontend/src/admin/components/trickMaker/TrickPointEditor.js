import React, { useEffect, useState } from "react";
import useGetTricks, {
	useGetTrickParts,
	useUpdateTrickPoints,
} from "../../../api/useGetTricks";
import { MdSave } from "../../../data/icons/MdIcons";
import useDebounce from "../../../hooks/useDebounce";

const TrickPointEditor = () => {
	const { data: trickParts, isLoading } = useGetTrickParts();
	const { data: tricks } = useGetTricks();
	if (isLoading) return <p>Loading...</p>;
	return (
		<div className='no-scrollbar h-[80vh] w-[80vw] overflow-hidden overflow-y-scroll'>
			{trickParts?.length &&
				trickParts?.map((trick) => {
					return <PointInput trick={trick} />;
				})}
			{tricks?.length &&
				tricks
					?.filter((t) => t.type === "Transition")
					.map((trick) => {
						return <PointInput trick={trick} />;
					})}
			<MdSave className={"absolute top-4 right-4 text-7xl"} />
		</div>
	);
};

export default TrickPointEditor;

const PointInput = ({ trick }) => {
	const [pointValue, setPointValue] = useState(trick?.pointValue);
	//updatepointValue
	const { mutate: updatePoints } = useUpdateTrickPoints();
	const debouncedValue = useDebounce(pointValue, 500);
	useEffect(() => {
		if (pointValue) {
			if (trick.type === "Transition") {
				updatePoints({
					pointValue: debouncedValue,
					type: trick.type,
					id: trick.id,
				});
				return;
			} else if (trick.type === "Variation") {
				updatePoints({
					pointValue: debouncedValue,
					type: trick.type,
					id: trick.id,
				});
				return;
			} else if (trick.type === "Stance") {
				updatePoints({
					pointValue: debouncedValue,
					type: trick.type,
					id: trick.stance_id,
				});
				return;
			} else if (trick.base_id) {
				updatePoints({
					pointValue: debouncedValue,
					type: "Base",
					id: trick.base_id,
				});
				return;
			}
		}
	}, [debouncedValue]);
	return (
		<div className='flex gap-2'>
			<div onClick={() => console.log(trick)} className='w-1/4'>
				{trick?.name}
			</div>
			<input
				on
				onChange={(e) => setPointValue(e.target.value)}
				value={pointValue}
				className='w-1/4 bg-zinc-800 p-2 text-center text-zinc-300'
			/>
		</div>
	);
};
