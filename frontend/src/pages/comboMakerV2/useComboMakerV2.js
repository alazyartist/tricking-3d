import React, { useEffect, useState } from "react";
import { stances } from "../../data/trickDataModel/TrickObjects";
import useApiCreds from "../../hooks/useApiCreds";

const useComboMakerV2 = () => {
	const [currentItem, setCurrentItem] = useState([]);
	const [filter, setFilter] = useState();
	const [deleteLast, setDeleteLast] = useState(0);

	useEffect(() => {
		if (currentItem.length >= 1) {
			setCurrentItem([...currentItem.slice(0, currentItem.length - 1)]);
		}
		if (currentItem.length < 1) {
		}
	}, [deleteLast]);
	useEffect(() => {
		if (currentItem.length > 0) {
			const lastItem = currentItem[currentItem.length - 1];
			setFilter(
				stances[lastItem?.landingStance]?.leg ||
					lastItem?.toLeg ||
					lastItem?.leg
			);

			console.log("V2", lastItem, filter);
		}
	}, [currentItem]);
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

	return {
		currentItem,
		setCurrentItem,
		deleteLast,
		setDeleteLast,
		filter,
		filteredTricks,
	};
};

export default useComboMakerV2;
