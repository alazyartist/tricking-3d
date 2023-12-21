import React, { useState, useEffect } from "react";
import { MdInfo, MdInfoOutline, MdSettings } from "@data/icons/MdIcons";
import { useStore } from "@store/store";
import TrickInfo from "@components/info/TrickInfo";
import Animations from "./modal/Animations";
import Trickers from "./modal/Models";
import AnimationsDropwdown from "./AnimationsDropwdown";
import InfoButton from "./InfoButton";
import ModelDropdown from "./ModelDropdown";
import ModalButton from "./modal/ModalButton";
import Versions from "./modal/Versions";
import Settings from "./modal/Settings";
import { active } from "d3";
import TrickInfoNew from "./TrickInfoNew";

const SandboxNav = () => {
  //global states
  //const currentModel = useStore((s) => s.activeModel);
  const currentAnim = useStore((s) => s.currentAnim);
  const currentVersions = useStore((s) => s.currVersions);
  const [activeView, setActiveView] = useState(0);

  const handleOpen = (caseNum) => {
    if (activeView == caseNum) caseNum = 0;
    return setActiveView(caseNum);
  };

  const handleClose = () => {
    setActiveView(0);
  };

  const NavBody = () => {
    switch (activeView) {
      case 1:
        return <Animations handleClose={handleClose} />;
      case 2:
        return <TrickInfoNew />;
      case 3:
        return <Trickers handleClose={handleClose} />;
      case 4:
        return <Versions handleClose={handleClose} />;
      case 5:
        return <Settings />;
    }
  };

  return (
    <div className="flex max-h-full w-full flex-grow flex-col p-2">
      <div className="pb-2 text-3xl font-bold text-zinc-400">
        {activeView === 0 && currentAnim}
        {activeView === 1 && "Change Trick"}
        {activeView === 2 && "Trick Info"}
        {activeView === 3 && "Change Tricker"}
        {activeView === 4 && "Other Combos"}
        {activeView === 5 && "Gym Settings"}
      </div>

      <div className=" flex w-full flex-col justify-evenly gap-3 rounded-lg bg-zinc-900 bg-opacity-50 p-2">
        <div className="flex flex-row place-items-center justify-evenly">
          <ModalButton
            handleOpen={() => {
              handleOpen(1);
            }}
            content="Tricks" //{currentAnim}
          />
          {/**trickInfo button */}
          <ModalButton
            handleOpen={() => handleOpen(2)}
            content={<MdInfoOutline />}
          />
          {/**models button*/}
          <ModalButton
            handleOpen={() => handleOpen(3)}
            content="Tricker" //{currentModel}
          />
          {/**versions button*/}
          {currentVersions.length > 1 && <></>}
          {currentVersions?.length > 1 && (
            <ModalButton
              handleOpen={() => handleOpen(4)}
              content={
                <div>
                  {" "}
                  Combo{" "}
                  {currentVersions?.length > 1 ? (
                    <span className="rounded-md border-2 border-zinc-100 bg-zinc-800 pl-2 pr-2">
                      {" "}
                      {currentVersions?.length}{" "}
                    </span>
                  ) : null}
                </div>
              } //"Version"
            />
          )}
          {/**versions button*/}
          <ModalButton
            handleOpen={() => handleOpen(5)}
            content="Gym" //{<MdSettings className="fill-zinc-300 text-3xl" />}
          />
        </div>

        <div
          className={`${
            activeView > 0 ? "p-2 " : " h-0"
          } w-full rounded-b-lg bg-zinc-400 bg-opacity-20 text-zinc-600 `}
        >
          <NavBody />
        </div>
      </div>
    </div>
  );
};

export default SandboxNav;
