import GlobalSearch from "@components/search/GlobalSearch";
import useClickOutside from "hooks/useClickOutside";
import React, { useState, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { animated, useSpring } from "@react-spring/web";
import { trpc } from "@utils/trpc";

const AnimatedSearch = () => {
  const { data: tricks } = trpc.trick.findAll.useQuery();
  const { data: transitions } = trpc.trick.findAllTransitions.useQuery();
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  const { data: combos } = trpc.combos.getAll.useQuery();
  const { data: users } = trpc.userDB.findAll.useQuery();
  const { data: sessionsummaries } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();

  const [searchOpen, setSearchOpen] = useState(false);
  const searchTransition = useSpring({
    to: {
      opacity: 1,
      width: searchOpen ? "80vw" : "14vw",
      barWidth: searchOpen ? "100%" : "0%",
      marginLeft: searchOpen ? "8px" : "4px",
    },

    delay: 100,
    config: { tension: 280, friction: 40 },
  });
  const ref = useRef();
  let clicked = 0;
  useClickOutside(ref, () => {
    if (clicked > 0) {
      setSearchOpen(false);
    }
    if (ref.current && searchOpen === true) {
      console.log("clickedOutside", clicked);
      clicked++;
    }
  });
  return (
    <animated.div
      ref={ref}
      style={{ width: searchTransition.width }}
      className={`relative mt-1 mb-2 flex w-[70vw] max-w-[600px] place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-80 p-1 text-center font-inter text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] `}
    >
      {!searchOpen && (
        <IoMdSearch
          onClick={() => {
            setSearchOpen(!searchOpen);
          }}
          style={{
            //@ts-ignore
            paddingLeft: searchTransition.marginLeft,
          }}
          className={"flex-shrink-0 p-1 text-4xl"}
        />
      )}
      <animated.div
        style={{
          //@ts-ignore
          width: searchTransition.barWidth,
        }}
      >
        <GlobalSearch
          sessionsummaries={sessionsummaries}
          transitions={transitions}
          stances={stances}
          tricks={tricks}
          combos={combos}
          users={users}
          searchOpen={searchOpen}
        />
        {/* <input
          type="text"
          placeholder="Search Coming Soon..."
          className={`relative w-full appearance-none rounded-lg bg-zinc-700 text-base text-zinc-300 outline-none ${
            searchOpen ? "px-1" : "p-0"
          }`}
        /> */}
      </animated.div>
    </animated.div>
  );
};

export default AnimatedSearch;
