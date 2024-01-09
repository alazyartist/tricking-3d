import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ComboMaker from "../comboMaker/ComboMaker";
import NewComboDisplay from "../comboMaker/components/newComboDisplay";
import ComboStructure from "./components/ComboStructure";
import CompareTricks from "./components/CompareTricks";
import SaveCombo from "./components/SaveCombo";
import Tricks from "./components/Tricks";
import TrickShapes from "./components/TrickShapes";
import useComboMakerV2 from "./useComboMakerV2";
import useSaveCombo from "./useSaveCombo";
import { stances } from "@prisma/client";
import { trpc } from "@utils/trpc";
export const getServerSideProps = () => {
  return { props: {} };
};
const ComboMakerV3 = () => {
  const [v2, setV2] = useState(true);
  const accessToken = useUserStore((s) => s.accessToken);
  const { currentItem, setDeleteLast, setCurrentItem, filteredTricks, tricks } =
    useComboMakerV2();
  const { data: combos } = trpc.combos.getAll.useQuery();
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
  const comboExists = combos?.find((c) => c.name === comboName);
  const stances = tricks?.filter((t) => t.type === "Stance");
  const findStanceLeg = (curStance) => {
    const fullStance = stances?.find((s) => s.name === curStance) as stances;
    const leg = fullStance?.leg;
    console.log("foundleg", curStance, fullStance, leg);
    return leg;
  };
  const lastItem = currentItem[currentItem?.length - 1];
  const currentFilter =
    lastItem?.type === "Transition"
      ? lastItem?.toLeg
      : findStanceLeg(lastItem?.landingStance);

  console.log(combos);
  return (
    <>
      {/* {v2 ? ( */}
      <div className="flex h-[100vh] w-[98%] flex-col  font-inter text-zinc-300">
        <div
          onClick={() => setV2(!v2)}
          id="pageTitle"
          className="select-none p-2 text-2xl font-bold text-zinc-400"
        >
          ComboMakerV3
        </div>
        {v2 && (
          <div
            onClick={() =>
              console.log(currentItem[currentItem.length - 1], stances)
            }
            className="overflow-scroll-y absolute right-2 top-2 z-[100] h-[12vh] w-[40vw] rounded-md bg-zinc-700 p-2"
          >
            <p>{currentFilter}</p>
            <div>{comboExists && "Combo Exists"}</div>
          </div>
        )}
        <div
          id="app-content"
          className="no-scrollbar flex h-[85vh] w-full flex-col place-content-start place-items-center overflow-y-auto overflow-x-hidden rounded-lg p-2 text-zinc-300 "
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
          {/* <CompareTricks newCombo={currentItem} /> */}
          <TrickShapes
            findStanceLeg={findStanceLeg}
            currentFilter={currentFilter}
            lastItem={currentItem[currentItem?.length - 1]}
            newCombo={currentItem}
            setCurrentItem={setCurrentItem}
            //TODO add filteredTricks={filteredTricks}
            allTricks={tricks}
          />
          {/* <Tricks
						lastItem={currentItem[currentItem?.length - 1]}
						setCurrentItem={setCurrentItem}
						filteredTricks={filteredTricks}
						allTricks={tricks}
					/> */}
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

export default ComboMakerV3;
