import React, { useEffect } from "react";
import { useStore } from "../../../../store/store";

const useCreateVersions = () => {
	const animationsArray = useStore((s) => s.animationsArray);
	const currentAnim = useStore((s) => s.currentAnim);

	const setVersions = useStore((s) => s.setVersions);
	const regEx = /(\s?\-?\d+)$/;
	const renameAnimArr = animationsArray.map((anim) => anim.replace(regEx, ""));
	const animSet = Array.from(new Set(renameAnimArr));
	useEffect(() => {
		setVersions(animationsArray.filter((curr) => curr.includes(currentAnim)));
	}, [currentAnim]);
	return animSet;
};

export default useCreateVersions;
