import React, { useState, useEffect } from "react";

import ClaimedTricks from "./components/ClaimedTricks";
import { trpc } from "@utils/trpc";
import { stances, transitions, tricks } from "@prisma/client";

const ClaimTricks = ({ user_id }) => {
  const { data: tricks } = trpc.trick.findAll.useQuery();

  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState<undefined | any[]>();

  const { data: profileInfo } = trpc.userDB.findByUUID.useQuery({
    userid: user_id,
  });

  const allSessionTricks = profileInfo?.SessionSummaries?.map((summary) =>
    summary?.SessionData?.map(
      (data) =>
        Array.isArray(data?.ClipLabel?.comboArray) &&
        data?.ClipLabel?.comboArray
          .map((trick: tricks | transitions | stances) => {
            if (trick.type !== "Transition") {
              // console.log(trick);
            }
            if (trick?.type !== ("Transition" || "Stance"))
              return trick as tricks;
          })
          .filter((combo) => combo !== undefined)
    )
  ).flat(2);
  const clips = profileInfo?.SessionSummaries?.map((summary) =>
    summary?.SessionData?.map((data) => data)
  ).flat(2);
  let uniqueTricks = [];
  let uniqueTricksRaw = {};

  if (allSessionTricks) {
    uniqueTricks = Object.keys(
      allSessionTricks?.reduce((acc, curr) => {
        if (acc[curr.name]) {
          acc[curr.name]++;
        } else {
          acc[curr.name] = 1;
        }
        return acc;
      }, {})
    );
    uniqueTricksRaw = allSessionTricks?.reduce((acc, curr) => {
      if (acc[curr.name]) {
        acc[curr.name]++;
      } else {
        acc[curr.name] = 1;
      }
      return acc;
    }, {});
  }
  const totalTricksClaimed =
    profileInfo?.TricksClaimed?.length + uniqueTricks?.length;
  useEffect(() => {
    if ((tricks !== undefined && !searchTerm) || searchedItems?.length === 0) {
      setSearchedItems(tricks);
    }
  }, [tricks, searchedItems, searchTerm]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    const newFilter = tricks.filter((trick) => {
      return trick?.name?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
    setSearchTerm(searchTerm);
    setSearchedItems(newFilter);
  };
  useEffect(() => {
    console.log(uniqueTricksRaw);
    console.log(clips);
  }, [uniqueTricksRaw]);
  return (
    <div className="no-scrollbar flex h-[60vh] w-full flex-col place-items-start overflow-y-scroll bg-zinc-900 bg-opacity-70 font-inter ">
      <div className="flex h-fit place-content-center place-items-center justify-between text-center font-bold">
        <h1 className="p-2 text-2xl">ClaimTricks:</h1>
        <p className="w-full p-2 text-sm">
          {totalTricksClaimed}/{tricks?.length}
        </p>
      </div>
      <div className="sticky top-0 z-[4] w-full p-2 backdrop-blur-md">
        <input
          id="searchBar"
          type={"text"}
          placeholder="Search for a Trick..."
          className={
            "neumorphicIn w-full rounded-xl p-2 text-xl focus:outline-none"
          }
          value={searchTerm}
          onChange={handleFilter}
        />
        <div className="flex w-full gap-2 whitespace-nowrap p-2 text-sm lg:text-xl">
          <p className="place-self-center">Sort By</p>
          <p
            className={`${
              sortType === "All" ? " text-emerald-500" : ""
            } rounded-md border-[1px] border-zinc-300 p-1 px-2`}
            onClick={() => setSortType("All")}
          >
            All
          </p>
          <p
            className={`${
              sortType === "Claimed" ? " text-emerald-500" : ""
            } rounded-md border-[1px] border-zinc-300 p-1 px-2`}
            onClick={() => setSortType("Claimed")}
          >
            Claimed
          </p>
          <p
            className={`${
              sortType === "ABC" ? " text-emerald-500" : ""
            } rounded-md border-[1px] border-zinc-300 p-1 px-2`}
            onClick={() => setSortType("ABC")}
          >
            ABC
          </p>
          <p
            className={`${
              sortType === "Family" ? " text-emerald-500" : ""
            } rounded-md border-[1px] border-zinc-300 p-1 px-2`}
            onClick={() => setSortType("Family")}
          >
            Family
          </p>
        </div>
      </div>
      <div className="flex w-[88vw] max-w-[540px] flex-col place-items-center gap-4 p-2 lg:max-w-full">
        {searchedItems
          ?.sort((a, b) => {
            if (sortType === "Family") {
              console.log(a, b);
              return a.base_id > b.base_id ? 1 : -1;
            } else {
              return a.name > b.name ? 1 : -1;
            }
          })
          .map(
            (trick) =>
              trick.type === "Trick" && (
                <ClaimedTricks
                  clips={clips}
                  profileInfo={profileInfo}
                  uniqueTricks={uniqueTricks}
                  trick={trick}
                  sortType={sortType}
                  key={"claim" + trick.trick_id}
                  trick_id={trick.trick_id}
                  user_id={user_id}
                  uniqueTricksRaw={uniqueTricksRaw}
                />
              )
          )}
      </div>
    </div>
  );
};

export default ClaimTricks;
