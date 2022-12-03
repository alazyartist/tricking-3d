import React from "react";
import { useStore } from "../store/store";
import Instructions from "@old_pages/instructrions/components/Instructions";
import { TiInfoOutline } from "react-icons/ti";
function InstructionsModal() {
  const openInstructions = useStore((s) => s.areInstructionsOpen);
  const setInstructions = useStore((s) => s.setInstructions);
  return (
    <div>
      <div
        onClick={() => setInstructions()}
        className="absolute bottom-32 right-2 font-inter text-2xl font-bold text-zinc-300"
      >
        <TiInfoOutline />
      </div>
      {openInstructions && (
        <>
          <div
            onClick={() => setInstructions()}
            className="top-0 flex h-screen w-screen place-content-center place-items-center font-inter font-semibold text-zinc-300"
          >
            <Instructions />
          </div>
          <div
            id="trick-info-modal-bg"
            className="fixed top-0 left-0 z-[-1] h-full w-full bg-zinc-800 bg-opacity-40 filter backdrop-blur-md"
            onClick={() => setInstructions()}
          ></div>
        </>
      )}
    </div>
  );
}

export default InstructionsModal;
