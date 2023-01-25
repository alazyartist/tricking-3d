import React from "react";
import { useStore } from "@store/store";
import useCreateVersions from "./useCreateVersions";
import { useEffect } from "react";

const Animations = ({ handleClose }) => {
  const selectAnim = useStore((s) => s.selectAnim);
  const currentModel = useStore((s) => s.activeModel);
  const animSet = useCreateVersions();

  const animationsArray = useStore((s) => s.animationsArray);
  const currentAnim = useStore((s) => s.currentAnim);
  const setVersions = useStore((s) => s.setVersions);
  const versions = animationsArray.filter((curr) => curr.includes(currentAnim));
  
  return (
    <div
      className="max-h-full w-full flex-col items-center justify-center"
    >
      {animSet?.map((e, i) => {
        return (
          <button
            id="dropdown-item"
            className="mt-1 mb-2 flex w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400"
            onClick={() => {
              selectAnim(e);
              window.history.replaceState(
                "",
                "",
                `/sandbox/${currentModel}/${e}`
              );
              setVersions(versions);
              handleClose();
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

export default Animations;
