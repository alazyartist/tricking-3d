import React, { useState, useEffect } from "react";
import { MdInfo, MdInfoOutline, MdSettings } from "@data/icons/MdIcons";
import { useStore } from "@store/store";
import TrickInfo from "@components/info/TrickInfo";
import Animations from "./modal/Animations";
import Trickers from "./modal/Models";
import AnimationsDropwdown from "./AnimationsDropwdown";
import InfoButton from "./InfoButton";
import DropdownContent from "../components/DropdownContent";
import ModelDropdown from "./ModelDropdown";
import ModalButton from "./modal/ModalButton";
import Versions from "./modal/Versions";
import Settings from "./modal/Settings";
import { active } from "d3";

const SandboxNav = () => {
  //global states
  const currentAnim = useStore((s) => s.currentAnim);
  const currentModel = useStore((s) => s.activeModel);
  const currentVersions = useStore((s) => s.currVersions);

  //local states
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeView, setActiveView] = useState(0);

  const handleOpen = (caseNum) => {
    setActiveView(caseNum);
    //setOpen(true);
    //setVisible(false);
  };

  const handleClose = () => {
    setActiveView(0);
    setOpen(false);
    setVisible(true);
  };
  function getViewContent(caseNum) {
    switch (caseNum) {
      case 1:
        return;
      case 2:
        return <TrickInfo />
      case 3:
        return;
      case 4:
        return;
      case 5:
        return;
      default:
        return null;
    }
  } //takes care of rendering stateful logic when switching views

  const NavBody = (props) => {
    let view = props.activeView
    let content = <><h1>View: {view}</h1></>
    switch (view) {
      case 0: return;
      case 1: return (<Animations handleClose={handleClose} />)
      case 2: return (<TrickInfo handleClose={handleClose} />)
      case 3: return (<Trickers handleClose={handleClose} />)
      case 4: return (<Versions handleClose={handleClose} />)
      case 5: return (<Settings />)
    }
  }

  return (
    <div className="w-full max-h-full flex flex-col flex-grow p-2">

      <div className="text-3xl font-bold text-zinc-400 pb-2">
        {activeView === 0 && "Sandbox"}
        {activeView === 1 && "Change Trick"}
        {activeView === 2 && "Trick Info"}
        {activeView === 3 && "Change Tricker"}
        {activeView === 4 && "Other Combos"}
        {activeView === 5 && "Gym Settings"}
      </div>

      {visible && (
        <div className=" p-2 flex flex-col justify-evenly w-full gap-3 bg-zinc-900 bg-opacity-50 rounded-lg">
          <div className="flex flex-row justify-evenly">
            <ModalButton
              handleOpen={() => {
                handleOpen(1);
              }}
              content="Trick"//{currentAnim}
            />
            {/**trickInfo button */}
            <ModalButton
              handleOpen={() => handleOpen(2)}
              content={
                activeView === 1 ? (
                  <MdInfo className="fill-zinc-300 text-3xl" />
                ) : (
                  <MdInfoOutline className="fill-zinc-300 text-3xl" />
                )
              }
            />
            {/**models button*/}
            <ModalButton
              handleOpen={() => handleOpen(3)}
              content="Tricker"//{currentModel}
            />
            {/**versions button*/}
            {currentVersions.length > 1 && (<></>)}
            <ModalButton
              handleOpen={() => handleOpen(4)}
              content={"Combo"}//"Version"
            />
            {/**versions button*/}
            <ModalButton
              handleOpen={() => handleOpen(5)}
              content="Gym"//{<MdSettings className="fill-zinc-300 text-3xl" />}
            />
          </div>

          <div className={`${activeView > 0 ? "p-2 " : " h-0"} w-full bg-zinc-400 rounded-b-lg bg-opacity-20 text-zinc-600 `}>
            <NavBody activeView={activeView} />
          </div>
        </div>
      )}

    </div>
  );
};

export default SandboxNav;
