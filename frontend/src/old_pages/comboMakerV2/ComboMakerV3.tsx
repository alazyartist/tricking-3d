import React, { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import ComboMaker from "../comboMaker/ComboMaker";
import NewComboDisplay from "../comboMaker/components/newComboDisplay";
import ComboStructure from "./components/ComboStructure";
import CompareTricks from "./components/CompareTricks";
import SaveCombo from "./components/SaveCombo";
import Tricks from "./components/Tricks";
import SelectTrickPopup from "./components/SelectTrickPopup";
import useComboMakerV2 from "./useComboMakerV2";
import useSaveCombo from "./useSaveCombo";
import { stances } from "@prisma/client";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
export const getServerSideProps = () => {
  return { props: {} };
};
const ComboMakerV3 = () => {
  const [debugOpen, setDebugOpen] = useState(false);
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
  const [currentFilter, setCurrentFilter] = useState(
    currentItem.length > 0
      ? lastItem?.type === "Transition"
        ? lastItem?.toLeg
        : findStanceLeg(lastItem?.landingStance)
      : null!
  );

  useEffect(() => {
    if (currentItem.length > 0) {
      if (lastItem?.type === "Transition") {
        setCurrentFilter(lastItem?.toLeg);
      } else {
        setCurrentFilter(findStanceLeg(lastItem?.landingStance));
      }
    }
  }, [lastItem]);

  console.log(combos);
  return (
    <>
      {/* {v2 ? ( */}
      <div className="flex h-[100vh] w-[98%] flex-col  font-inter text-zinc-300">
        <div
          onClick={() => setDebugOpen(!debugOpen)}
          id="pageTitle"
          className="select-none p-2 text-2xl font-bold text-zinc-400"
        >
          ComboMakerV3
        </div>
        {debugOpen && (
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
          {comboExists && (
            <Link
              className={
                "flex min-h-[40px] place-content-center place-items-center rounded-xl p-2 text-left "
              }
              href={`/combos/${comboExists.combo_id}`}
            >
              <p>See Combo Page</p>
            </Link>
          )}
          <SignedIn>
            {!comboExists && (
              <SaveCombo
                save={save}
                setSave={setSave}
                setComboName={setComboName}
                comboName={comboName}
              />
            )}
          </SignedIn>

          <NewComboDisplay
            setDeleteLast={setDeleteLast}
            newCombo={currentItem}
          />
          {/* <CompareTricks newCombo={currentItem} /> */}
          <SelectTrickPopup
            setCurrentFilter={setCurrentFilter}
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
