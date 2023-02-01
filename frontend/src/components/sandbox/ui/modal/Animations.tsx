import React from "react";
import { useStore } from "@store/store";
import useCreateVersions from "./useCreateVersions";

const Animations = ({ handleClose }) => {
  const selectAnim = useStore((s) => s.selectAnim);
  const currentModel = useStore((s) => s.activeModel);
  const animSet = useCreateVersions();
  const animationsArray = useStore((s) => s.animationsArray);
  const currentAnim = useStore((s) => s.currentAnim);
  const setVersions = useStore((s) => s.setVersions);

  return (
    <div
      className="max-h-[60vh] overflow-y-auto w-full flex-col items-center justify-center"
    >
      {animSet?.map((e, i) => {
        return (
          <button
            id="dropdown-item"
            className={`${currentAnim === e ? "text-zinc-100 font-bold text-2xl" : "text-zinc-200 font-light text-xl"} odd:bg-zinc-600 odd:bg-opacity-70 mt-1 mb-2 flex w-full justify-center rounded-lg font-inter hover:text-zinc-400`}
            onClick={() => {
              selectAnim(e);
              window.history.replaceState(
                "",
                "",
                `/sandbox/${currentModel}/${e}`
              );
              setVersions(animationsArray.filter((curr) => curr.includes(e)));
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
