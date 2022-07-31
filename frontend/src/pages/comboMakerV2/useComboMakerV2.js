import React, { useEffect, useState } from "react";
import { stances } from "../../data/trickDataModel/TrickObjects";

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
	return { currentItem, setCurrentItem, deleteLast, setDeleteLast, filter };
};

export default useComboMakerV2;
