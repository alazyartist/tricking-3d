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
    <div className={"flex w-[100vw] flex-col place-items-center"}>
      <div id="sticky-header" className="sticky top-0 h-14 bg-zinc-900"></div>
      <div className=" px-4 font-inter text-3xl font-bold text-zinc-300">
        We are always looking for help!
      </div>
      <div
        id="outlet-container"
        className="grid grid-cols-3 place-content-center gap-4 text-zinc-300"
      >
        <div className={"col-span-2 row-span-2 grid grid-cols-2 gap-2"}>
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
        <div className="row-span-2">
          <ContributeCard>
            <Code />
          </ContributeCard>
        </div>
        {/* TODO children for routes */}
      </div>

      <DonateText />
    </div>
  );
}

export default Contribute;
