import React, { useEffect, useState } from "react";
import { animated, useTransition, config } from "react-spring";
import TrickOrComboDetails from "../components/info/trickInfo/TrickOrComboDetails";
import useGetTricks from "../api/useGetTricks";
import { IoIosWalk } from "react-icons/io";
import { useRouter } from "next/router";
import TrickCategories from "./theory/TrickCategories";
function AllTrickDisplay() {
  const { data: TrickListArr } = useGetTricks();
  const [filteredTricks, setFilteredTricks] = useState(TrickListArr);
  const nav = useRouter();
  useEffect(() => {
    setFilteredTricks(TrickListArr);
    console.log(TrickListArr);
  }, [TrickListArr]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value || "";
    const newFilter = TrickListArr.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredTricks(newFilter);
  };
  const handleGoToAnim = (e) => {
    console.log("Trying to handle anim");
    if (e?.Animation?.model && e?.Animation?.animationName) {
      nav.push(
        `/sandbox/${e?.Animation?.model}/${e?.Animation?.animationName}`
      );
    }
  };
  const animatedFilter = useTransition(filteredTricks, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 300,
      config: config.stiff,
    },
  });

  return (
    <>
      {/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
      {/* <AOAT className='rounded-2xl bg-zinc-300' /> */}
      <div
        id={"TrickListContainer"}
        className="  flex max-h-full max-w-full flex-col place-content-center place-items-center gap-4 p-2 font-inter font-bold "
      >
        <div>
          {filteredTricks?.length}/{TrickListArr?.length} Tricks
        </div>
        <input
          className="sticky top-0 w-full rounded-xl p-2"
          type={"search"}
          placeholder="Search for Tricks..."
          onChange={handleFilter}
        />
        {/* Maps over data returned from filter and displays it. */}
        <div className="minimalistScroll flex h-[full] max-h-[30vh] w-[95%] flex-col gap-2 overflow-y-scroll">
          {animatedFilter(({ opacity }, e) => (
            <animated.div
              style={{ opacity: opacity }}
              key={e}
              className="rounded-md bg-zinc-900 bg-opacity-40 backdrop-blur-md"
            >
              <div
                onClick={() => handleGoToAnim(e)}
                className="flex place-items-center justify-between text-xs text-zinc-400"
              >
                <div className="p-2">{e.name.toUpperCase()}</div>
                <div className="p-2">
                  {e.defaultAnimation && (
                    <IoIosWalk className="text-emerald-400" />
                  )}
                </div>
              </div>
              {/* <div className='m-4 flex w-[60vw] flex-col rounded-lg p-2  text-left md:flex-row'> */}
              {/* <div className='flex w-full place-content-center place-items-center md:w-[50%]'>
								<Canvas className='rounded-2xl bg-zinc-800'>
									<Suspense fallback={<Loader />}>
										<TrickListScene trick={e.name} />
										</Suspense>
								</Canvas> 
							</div>*/}
              {/* <TrickOrComboDetails
								details={e}
								trickOrCombo='Trick'
								key={e.name}
							/> */}
              {/* <div
								className='flex w-full flex-col place-items-center text-zinc-600'
								id={e}>
								<div className=''>{`${e.takeoffStance}`}</div>
								<div className=''>{`Travels: ${e.direction}`}</div>
								<div className=''>{`Family: ${
									e.base?.name || e.base || "no base found"
								}`}</div>
								<div className=''>{`Rotation: ${e.rotation}`}</div>
								<div className=''>{`${e.landingStance}`}</div>
							</div> */}
              {/* </div> */}
            </animated.div>
          ))}
        </div>
      </div>
      <TrickCategories tricks={TrickListArr} />
    </>
  );
}

export default AllTrickDisplay;
