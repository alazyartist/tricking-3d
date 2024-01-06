import React from "react";
import { stances } from "@data/trickDataModel/TrickObjects";
// import { useComboMakerStore } from "@store/comboMakerStore";
// import { useStore } from "@store/store";
import TransitionButtons from "@old_pages/comboMaker/components/TransitionButtons";
import { useComboMakerStore } from "@store/comboMakerStore";
export const color = {
  Backside: `bg-[#07b9e9]`,
  Inside: `bg-[#06d8b7]`,
  Outside: `bg-[#10b35d]`,
  Frontside: `bg-[#003eb3]`,
  BacksideComplete: `bg-[#7EE0FB]`,
  OutsideComplete: `bg-[#75FBB3]`,
  OutsideSemi: `bg-[#2db36c]`,
  FrontsideSemi: `bg-[#2b5ab3]`,
  FrontsideMega: `bg-[#4171ca]`,
  InsideMega: `bg-[#40baa6]`,
  InsideHyper: `bg-[#5ed8c5]`,
  BacksideHyper: `bg-[#6bcee9]`,
};
function StanceInfo(props) {
  const currentLeg = useComboMakerStore((s) => s.currentLeg);
  // const stanceColor = useStore((s) => s.stanceColor);

  let currentColor = color[props.stance];
  // let curColor = `bg-[#4171ca]`;
  // let curColor = `${color[props.stance]} `;
  return (
    <div
      className={`place-content-center 
		${currentColor} place-items-center
			rounded-xl bg-opacity-75 font-inter`}
    >
      <div
        className={`col-span-3 flex h-10 w-60 place-content-center place-items-center gap-2 rounded-md 
				text-center text-2xl text-zinc-800`}
      >
        {props.stance}
      </div>
      <div className="flex flex-row place-content-center place-items-center gap-2 p-2">
        <div className="text-light w-30 flex flex-col rounded-xl bg-sky-400 bg-opacity-40 p-2">
          <div className="whitespace-nowrap text-xs">Plant Foot</div>
          <TransitionButtons currentLeg={currentLeg} />
        </div>
        <div className="text-light w-30 rounded-xl bg-emerald-400 bg-opacity-40 p-2 ">
          <div className="whitespace-nowrap text-xs">Direction</div>
          <div>{stances[props.stance].direction}</div>
        </div>
        <div className="flex flex-col">
          {/* <div className='text-light w-30 rounded-xl bg-zinc-100 p-2 '> */}
          {/* <div className='whitespace-nowrap text-xs'>Direction</div> */}
          {/* <StanceSVG currentStance={props.stance} /> */}
          {/* </div> */}
          <div className="text-light w-30  rounded-xl bg-teal-400 bg-opacity-40 p-2 ">
            <div className="whitespace-nowrap text-xs">Family</div>
            <div>{stances[props.stance].getTrick().name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StanceInfo;
