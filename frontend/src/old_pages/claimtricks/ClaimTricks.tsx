import React, { useState, useEffect } from "react";
import useGetTricks from "../../api/useGetTricks";
import ClaimedTricks from "./components/ClaimedTricks";

const ClaimTricks = ({ user_id }) => {
  const { data: tricks } = useGetTricks();

  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState<undefined | any[]>();
  useEffect(() => {
    if ((tricks !== undefined && !searchTerm) || searchedItems?.length === 0) {
      setSearchedItems(tricks);
    }
  }, [tricks, searchedItems, searchTerm]);
  const handleFilter = (event) => {
    const searchTerm = event.target.value;
    const newFilter = tricks.filter((trick) => {
      return trick.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchTerm(searchTerm);
    setSearchedItems(newFilter);
  };
  return (
    <div className="no-scrollbar h-[60vh] w-full overflow-y-scroll bg-zinc-900 bg-opacity-70 font-inter">
      <div className="text-center text-3xl font-bold">ClaimTricks</div>
      <div className="sticky top-0 z-[4] my-2 w-full p-2 backdrop-blur-md">
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
        <div className="flex gap-2 p-2">
          <p className="place-self-center">Sort By</p>
          <p
            className="rounded-md border-2 border-zinc-300 p-1 px-2"
            onClick={() =>
              setSortType((s) => (s === "Claimed" ? "All" : "Claimed"))
            }
          >
            {sortType === "Claimed" ? "All" : "Claimed"}
          </p>
          <p
            className="rounded-md border-2 border-zinc-300 p-1 px-2"
            onClick={() => setSortType("ABC")}
          >
            ABC
          </p>
          <p
            className="rounded-md border-2 border-zinc-300 p-1 px-2"
            onClick={() => setSortType("Family")}
          >
            Family
          </p>
        </div>
      </div>
      <div className="flex w-[88vw] max-w-[540px] flex-col place-items-center p-2 lg:max-w-full">
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
                  trick={trick}
                  sortType={sortType}
                  key={"claim" + trick.trick_id}
                  trick_id={trick.trick_id}
                  user_id={user_id}
                />
              )
          )}
      </div>
    </div>
  );
};

export default ClaimTricks;
