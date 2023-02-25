import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { animated, useSpring } from "react-spring";

const AnimatedSearch = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTransition = useSpring({
    to: {
      opacity: 1,
      width: searchOpen ? "80vw" : "10vw",
      barWidth: searchOpen ? "50vw" : "0vw",
      marginLeft: searchOpen ? "0px" : "12px",
    },

    delay: 100,
    config: { tension: 280, friction: 40 },
  });
  return (
    <animated.div
      style={{ width: searchTransition.width }}
      className="relative mt-1 mb-2 flex w-[70vw] max-w-[600px] place-content-center place-items-center gap-2 rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
    >
      <IoMdSearch
        onClick={() => setSearchOpen(!searchOpen)}
        style={{
          marginLeft: searchTransition.marginLeft,
        }}
        className={"flex-shrink-0 text-xl"}
      />
      <input
        type="text"
        style={{
          width: searchTransition.barWidth,
        }}
        className="relative w-full rounded-lg"
      />
    </animated.div>
  );
};

export default AnimatedSearch;
