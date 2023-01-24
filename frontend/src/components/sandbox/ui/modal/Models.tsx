"use client";
import React from "react";
// import { redirect } from "react-router-dom";
import { useStore } from "@store/store";
import { useRouter } from "next/navigation";

const Trickers = ({ handleClose }) => {
  const selectAnim = useStore((s) => s.selectAnim);
  const modelArray = useStore((state) => state.modelArray);
  const selectModel = useStore((s) => s.setModel);
  const router = useRouter();
  return (
    <div className="flex-col items-center justify-center">
      {modelArray?.map((e, i) => {
        return (
          <button
            id="dropdown-item"
            className="mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400"
            onClick={() => {
              if (decodeURI(e) === "Sam Caspio") {
                selectAnim("Cart>Full-feilong");
                selectModel(decodeURI(e));
                // router.push(`/sandbox/${e}/Cart>Full-feilong`);
                window.history.replaceState(
                  "",
                  "",
                  `/sandbox/${e}/Cart>Full-feilong`
                );
              } else if (e === "Frank") {
                selectAnim("Cork");
                selectModel(e);
                // router.push(`/sandbox/${e}/Cork`);
                window.history.replaceState("", "", `/sandbox/${e}/Cork`);
              } else {
                selectAnim("Backflip");
                selectModel(e);
                // router.push(`/sandbox/${e}/Backflip`);
                window.history.replaceState("", "", `/sandbox/${e}/Backflip`);
              }
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

export default Trickers;
