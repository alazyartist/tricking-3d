import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useStore } from "@store/store";
import useCreateVersions from "./useCreateVersions";

const Backgrounds = () => {
  const setBackground = useStore((s) => s.setBackground);
  const backgroundArray = useStore((s) => s.backgroundArray);

  const navigate = useNavigate();
  const animSet = useCreateVersions();

  return (
    <div
      className="no-scrollbar flex-col items-center justify-center overflow-y-auto 
        rounded-2xl py-6 sm:pr-6 md:pr-4 lg:pr-[5rem]"
    >
      {backgroundArray?.map((e, i) => {
        return (
          <button
            id="dropdown-item"
            className="mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400"
            onClick={() => {
              setBackground(e);
            }}
            key={i}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
};

export default Backgrounds;
