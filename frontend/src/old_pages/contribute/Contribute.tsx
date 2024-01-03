import React from "react";
import Code from "./components/Code";
import ContributeCard from "./components/ContributeCard";
import ContributeNavBar from "./components/ContributeNavBar";
import Design from "./components/Design";
import DonateText from "./components/DonateText";
import HelpWith3d from "./components/HelpWith3d";
import Marketing from "./components/Marketing";
import Theory from "./components/Theory";
function Contribute() {
  return (
    <div
      className={
        "no-scrollbar flex h-[100vh] w-[100vw] flex-col place-items-center overflow-y-scroll p-2"
      }
    >
      <div id="sticky-header" className="sticky top-0 h-14 bg-zinc-900"></div>
      <div className="w-[90vw] p-4 font-inter text-3xl font-bold text-zinc-300">
        We are always looking for help!
      </div>
      <div
        id="outlet-container"
        className=" flex flex-col place-content-center gap-4 text-zinc-300 "
      >
        <div className={"flex flex-col gap-2 "}>
          <ContributeCard>
            <Design />
          </ContributeCard>
          <ContributeCard>
            <Marketing />
          </ContributeCard>
          <ContributeCard>
            <HelpWith3d />
          </ContributeCard>
          <ContributeCard>
            <Theory />
          </ContributeCard>
        </div>
        <div className="md:row-span-2">
          <ContributeCard>
            <Code />
          </ContributeCard>
        </div>
        <DonateText />
        <div className={"p-4"} />
      </div>
    </div>
  );
}

export default Contribute;
