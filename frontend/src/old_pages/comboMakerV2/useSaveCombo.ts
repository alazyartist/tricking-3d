import { trpc } from "@utils/trpc";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
const useSaveCombo = (currentItem) => {
  const [comboName, setComboName] = useState<string>();
  const userInfo = useUserStore((s) => s.userInfo);
  const [save, setSave] = useState();
  const { mutate, data, isSuccess } = trpc.combos.saveCombo.useMutation();
  const saveCombo = (currentItem) => {
    if (Array.isArray(currentItem) && currentItem.length > 0) {
      console.log("Saving Combo", currentItem, comboName);
      //TODO: Switch to React Query
      mutate({
        comboName: comboName,
        comboArray: currentItem,
        creator: userInfo.uuid,
      });
    }
  };

  useEffect(() => {
    saveCombo(currentItem);
  }, [save]);

  return { save, setSave, comboName, setComboName, isSuccess };
};
export default useSaveCombo;
