import React, { useEffect, useState } from "react";

const useComboMakerV2 = () => {
	const [currentItem, setCurrentItem] = useState([]);
	const [deleteLast, setDeleteLast] = useState(0);
	useEffect(() => {
		if (currentItem.length >= 1) {
			setCurrentItem([...currentItem.slice(0, currentItem.length - 1)]);
		}
	}, [deleteLast]);
	useEffect(() => {}, []);
	return { currentItem, setCurrentItem, deleteLast, setDeleteLast };
};

export default useComboMakerV2;
