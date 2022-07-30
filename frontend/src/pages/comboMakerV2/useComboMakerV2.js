import React, { useEffect, useState } from "react";

const useComboMakerV2 = () => {
	const [currentItem, setCurrentItem] = useState([]);
	const [filter, setFilter] = useState();
	const [deleteLast, setDeleteLast] = useState(0);
	useEffect(() => {
		if (currentItem.length >= 1) {
			setCurrentItem([...currentItem.slice(0, currentItem.length - 1)]);
		}
	}, [deleteLast]);
	useEffect(() => {
		const lastItem = currentItem[currentItem.length - 1];
		setFilter(lastItem?.landingStance || lastItem?.toLeg || lastItem?.leg);

		console.log(
			"V2",
			lastItem?.landingStance || lastItem?.toLeg || lastItem?.leg
		);
	}, [currentItem]);
	return { currentItem, setCurrentItem, deleteLast, setDeleteLast, filter };
};

export default useComboMakerV2;
