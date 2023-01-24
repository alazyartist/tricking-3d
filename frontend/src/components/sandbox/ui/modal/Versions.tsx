import React, { useEffect } from "react";
// import { redirect } from "react-router-dom";
import { useStore } from "@store/store";

const Versions = ({ handleClose }) => {
  const animationsArray = useStore((s) => s.animationsArray);
  const selectAnim = useStore((s) => s.selectAnim);
  const currentAnim = useStore((s) => s.currentAnim);
  const currentModel = useStore((s) => s.activeModel);
  const currVersions = useStore((s) => s.currVersions);

  return (
    <div className="flex-col items-center justify-center overflow-y-auto ">
      {currVersions?.map((e, i) => {
        return (
          <button
            id="dropdown-item"
            className="mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400"
            onClick={() => {
              selectAnim(e);
              window.history.replaceState(
                "",
                "",
                `/sandbox/${currentModel}/${e}`
              );
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

export default Versions;
