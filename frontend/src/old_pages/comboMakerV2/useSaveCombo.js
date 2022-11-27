import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import { useUserStore } from "../../store/userStore";
const useSaveCombo = (currentItem) => {
	const apiPrivate = useApiCreds();
	const [comboName, setComboName] = useState();
	const userInfo = useUserStore((s) => s.userInfo);
	const [save, setSave] = useState();
	const saveCombo = (currentItem) => {
		if (Array.isArray(currentItem) && currentItem.length > 0) {
			console.log("Saving Combo", currentItem, comboName);
			//TODO: Switch to React Query
			apiPrivate
				.post("/combo/add", {
					comboName: comboName,
					comboItems: currentItem,
					creator: userInfo.uuid,
				})
				.then((post) => console.log(post))
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		saveCombo(currentItem);
	}, [save]);

	return { save, setSave, comboName, setComboName };
};

export default useSaveCombo;
