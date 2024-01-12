import React, { useEffect, useState } from "react";
import { animated, useTransition, config } from "@react-spring/web";
import TrickOrComboDetails from "../components/info/trickInfo/TrickOrComboDetails";
import { IoIosWalk } from "react-icons/io";
import { useRouter } from "next/router";
import TrickCategories from "./theory/TrickCategories";
import { trpc } from "@utils/trpc";
import TrickPieChart from "@components/d3/TrickPieChart";
import Link from "next/link";
function AllTrickDisplay() {
  // const { data: TrickListArr } = useGetTricks();
  const { data: TrickListArr } = trpc.trick.findAll.useQuery();
  const [filteredTricks, setFilteredTricks] = useState(TrickListArr);

  const nav = useRouter();
  useEffect(() => {
    setFilteredTricks(TrickListArr);
    console.log(TrickListArr);
  }, [TrickListArr]);
  useEffect(() => {});
  const handleFilter = (event) => {
    const searchTerm = event.target.value || "";
    const newFilter = TrickListArr.filter((value) => {
      return value?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredTricks(newFilter);
  };
  const handleGoToAnim = (e) => {
    console.log("Trying to handle anim", e);
    if (e?.animation?.model && e?.animation?.animationName) {
      nav.push(
        `/sandbox/${e?.animation?.model}/${e?.animation?.animationName}`
      );
    } else {
      nav.push(`/tricks/${e?.trick_id}`);
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
  const [group_by, setGroupBy] = useState("base_id");

  return (
    <>
      {/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
      {/* <AOAT className='rounded-2xl bg-zinc-300' /> */}
      <div
        id={"TrickListContainer"}
        className="  flex max-h-full max-w-full flex-col place-content-center place-items-center gap-4 p-2 font-inter font-bold "
      >
        <div className="text-zinc-300">
          {filteredTricks?.length}/{TrickListArr?.length} Tricks
        </div>
        <div className="flex h-44 w-full place-items-center">
          <TrickPieChart group_by={group_by} data={filteredTricks} />
        </div>

        <div className="flex w-[90vw] justify-around gap-2 p-2 text-zinc-200">
          {["base_id", "takeoffStance", "landingStance", "trickType"].map(
            (key) => (
              <button
                className={`text-8px rounded-md bg-zinc-800 p-2 ${
                  key === group_by ? "text-indigo-400" : "text-zinc-400"
                }`}
                onClick={() => setGroupBy(key)}
              >
                {key === "base_id" && "Family"}
                {key === "landingStance" && "Landing"}
                {key === "takeoffStance" && "Takeoff"}
                {key === "trickType" && "Type"}
              </button>
            )
          )}
        </div>
        <input
          className="sticky top-0 w-full rounded-xl bg-zinc-800 p-2 text-zinc-200"
          type={"search"}
          placeholder="Search for Tricks..."
          onChange={handleFilter}
        />
        {/* Maps over data returned from filter and displays it. */}
        <div className="minimalistScroll flex h-[full] max-h-[80vh] w-[95%] flex-col gap-2 overflow-y-scroll pb-24 ">
          {animatedFilter(({ opacity }, e) => (
            <animated.div
              style={{ opacity: opacity }}
              key={e.trick_id}
              className="rounded-md bg-zinc-900 bg-opacity-40 backdrop-blur-md"
            >
              {/* <div
                onClick={() => handleGoToAnim(e)}
                className="flex place-items-center justify-between text-xs text-zinc-400"
              >
                <div className="p-2">{e?.name?.toUpperCase()}</div>
                <div className="p-2">
                  {e.defaultAnimation && (
                    <IoIosWalk color={"rgb(52 211 153)"} />
                  )}
                </div>
              </div> */}
              <Link
                href={`/tricks/${e?.trick_id}`}
                className="flex place-items-center justify-between text-xs text-zinc-400"
              >
                <div className="p-2">{e?.name?.toUpperCase()}</div>
                <div className="p-2">
                  {e.defaultAnimation && (
                    <IoIosWalk color={"rgb(52 211 153)"} />
                  )}
                </div>
              </Link>
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
          {filteredTricks?.length === 0 && (
            <div className="flex w-full flex-col place-items-center text-zinc-300">
              <div className="">No Tricks Found</div>
              <button className=" rounded-md bg-zinc-800 p-2 px-4">
                Add Trick
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <TrickCategories tricks={TrickListArr} /> */}
    </>
  );
}

export default AllTrickDisplay;
