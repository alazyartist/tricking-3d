import { active } from "d3";
import React, { useEffect, useState } from "react";
import { MdOutlineQrCode2, MdQrCodeScanner, MdDonutSmall } from "../../../data/icons/MdIcons";
import { TrickedexLogo } from "../../../data/icons/TrickedexLogo";
import Captures from "./Captures";
import QRGenerator from "./QRGenerator";
import QRReader from "./QRReader";

const CapturesPage: React.FC<any> = () => {
  const [activeView, setActiveView] = useState("Capture");
  useEffect(() => {
    console.log(activeView)
  }, [activeView])


  const ContentTab = (props) => {
    let style = " flex flex-col flex-1 place-items-center p-1 rounded-lg border-zinc-500 text-zinc-300"
    if (activeView == props.view) style = style + " border-b-4"
    switch (props.view) {
      case "Capture": style = style + " bg-zinc-600"; break;
      case "QR":      style = style + " bg-zinc-800"; break;
      case "Scan":    style = style + " bg-zinc-700";  break;
    }
    return <>
      <button
        className={`${style} $`}
        onClick={() => { setActiveView(props.view) }}
      >
        {props.view == "QR" && <MdOutlineQrCode2 className="h-5 w-5" />}
        {props.view == "Capture" && <MdDonutSmall className="h-5 w-5" />}
        {props.view == "Scan" && <MdQrCodeScanner className="h-5 w-5" />}
        <div className="text-xs">{props.view}</div>
      </button>
    </>
  }

  return (
    <>
      <div className="max-w-[50vw]">
        <TrickedexLogo className={`-m-2px flex fill-zinc-400`} />
      </div>

      {/* Set the general style for the page*/}
      <div 
        className="
          neumorphicIn p-2 m-auto
          max-h-[83vh] w-[98vw] max-w-[600px]
          bg-opacity-30 rounded-xl
          bg-zinc-900 
          border-[4px] border-zinc-600
        "
      >

        {/* Display Content Tabs */}
        <div 
          className="
            max-w-full
            max-h-[80vh]
            flex flex-col place-items-center
            w-full p-2
            overflow-y-auto
          ">
          <div className={'w-full flex place-content-center place-items-center gap-4'}>
            <ContentTab view="Capture" />
            <ContentTab view="QR" />
            <ContentTab view="Scan" />
          </div>
          <div className=" w-full">

            {/* Display Currently Selected View */}
            {activeView === "Capture" && <Captures/>}
            {activeView === "QR" && <QRGenerator />}
            {activeView === "Scan" && <QRReader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CapturesPage;
