import React, { useEffect, useState } from "react";
import useApiCreds from "../../hooks/useApiCreds";
import { useUserStore } from "../../store/userStore";
const useSaveCombo = (currentItem) => {
	const apiPrivate = useApiCreds();
	const [comboName, setComboName] = useState();
	const userInfo = useUserStore((s) => s.userInfo);
	const [save, setSave] = useState();
	const saveCombo = (currentItem) => {
		console.log("Saving Combo", currentItem, comboName);
		apiPrivate.post("/combo/add", {
			comboName: comboName,
			comboItems: currentItem,
			creator: userInfo.uuid,
		});
	};

	useEffect(() => {
		saveCombo(currentItem);
	}, [save]);

	return { save, setSave, comboName, setComboName };
};

export default useSaveCombo;
