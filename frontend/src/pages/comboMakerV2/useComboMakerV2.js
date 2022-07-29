import React, { useEffect, useState } from "react";

const useComboMakerV2 = () => {
	const [currentItem, setCurrentItem] = useState([]);
	useEffect(() => {}, []);
	return [currentItem, setCurrentItem];
};

export default useComboMakerV2;
