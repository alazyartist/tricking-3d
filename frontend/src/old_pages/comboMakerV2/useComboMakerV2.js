import React, { useEffect, useState } from "react";
import useGetTricks from "../../api/useGetTricks";

export const getStanceLeg = (stance) => {
	switch (stance) {
		case "Backside":
			return "Both";
		case "BacksideComplete":
			return "Left";
		case "BacksideHyper":
			return "Right";
		case "Inside":
			return "Both";
		case "InsideMega":
			return "Left";
		case "InsideHyper":
			return "Right";
		case "Frontside":
			return "Both";
		case "FrontsideMega":
			return "Left";
		case "FrontsideSemi":
			return "Right";
		case "Outside":
			return "Both";
		case "OutsideSemi":
			return "Right";
		case "OutsideComplete":
			return "Left";
	}
};
const useComboMakerV2 = () => {
	const [currentItem, setCurrentItem] = useState([]);
	const [filter, setFilter] = useState();
	const [deleteLast, setDeleteLast] = useState(0);
	const [stances, setStances] = useState();
	const { data, status, isSuccess } = useGetTricks();
	useEffect(() => {
		setStances(data?.filter((t) => t.type === "Stance"));
		setTricks(data);
		console.log(data);
		setFilteredTricks(data);
	}, [data, status, isSuccess]);
	useEffect(() => {
		//deletes most recent addition
		if (currentItem.length >= 1) {
			setCurrentItem([...currentItem.slice(0, currentItem.length - 1)]);
		}
		if (currentItem.length < 1) {
		}
	}, [deleteLast]);
	useEffect(() => {
		//creates item filter
		if (currentItem.length > 0) {
			//sets filter to the leg of the last item
			const lastItem = currentItem[currentItem.length - 1];
			// stance leg||transition leg||trick leg options
			setFilter(getStanceLeg(lastItem?.landingStance));

			console.log("V2", lastItem, filter, stances);
		}
	}, [currentItem]);

	const [tricks, setTricks] = useState([]);
	const [filteredTricks, setFilteredTricks] = useState([]);

	useEffect(() => {
		//resets filter items if items or filtered tricks <1
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
								getStanceLeg(tr?.landingStance).includes(filter)) ||
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

	return {
		currentItem,
		setCurrentItem,
		deleteLast,
		setDeleteLast,
		filter,
		filteredTricks,
		tricks: data,
	};
};

export default useComboMakerV2;
