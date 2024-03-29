import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import NewComboDisplay from "../comboMaker/components/newComboDisplay";
import ComboStructure from "./components/ComboStructure";
import SaveCombo from "./components/SaveCombo";
import Tricks from "./components/Tricks";
import useComboMakerV2 from "./useComboMakerV2";
import useSaveCombo from "./useSaveCombo";

const ComboMakerV2 = () => {
  const accessToken = useUserStore((s) => s.accessToken);
  const { currentItem, setDeleteLast, setCurrentItem, filteredTricks, tricks } =
    useComboMakerV2();
  const { save, setSave, comboName, setComboName } = useSaveCombo(currentItem);
  useEffect(() => {
    if (currentItem?.length > 0) {
      setComboName(
        currentItem
          .map((item) => {
            return item?.name;
          })
          .join(">")
          .toString()
      );
    } else if (currentItem?.length === 0) {
      setComboName("");
    }
  }, [currentItem]);
  return (
    <>
      {/* {v2 ? ( */}
      <div className="flex h-[90%] w-[98%] flex-col font-inter text-zinc-300">
        <div
          // onClick={() => setV2(!v2)}
          id="pageTitle"
          className="select-none text-2xl font-bold text-zinc-400"
        >
          ComboMakerV2
        </div>
        <div
          id="app-content"
          className="flex h-[80vh] w-full flex-col place-content-start place-items-center overflow-y-auto overflow-x-hidden rounded-lg  p-2 text-zinc-300 "
        >
          {accessToken && (
            <SaveCombo
              save={save}
              setSave={setSave}
              setComboName={setComboName}
              comboName={comboName}
            />
          )}
          <NewComboDisplay
            setDeleteLast={setDeleteLast}
            newCombo={currentItem}
          />
          <Tricks
            lastItem={currentItem[currentItem?.length - 1]}
            setCurrentItem={setCurrentItem}
            filteredTricks={filteredTricks}
            allTricks={tricks}
          />
          <ComboStructure />
        </div>
      </div>
      {/* ) : (
				// comboMaker original
				<ComboMaker setV2={setV2} v2={v2} />
			)} */}
    </>
  );
};

export default ComboMakerV2;
