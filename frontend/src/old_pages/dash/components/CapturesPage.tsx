import { active } from "d3";
import React, { useEffect, useState } from "react";
import { MdOutlineQrCode2, MdQrCodeScanner, MdDonutSmall } from "../../../data/icons/MdIcons";
import { TrickedexLogo } from "../../../data/icons/TrickedexLogo";
import QRGenerator from "./QRGenerator";
import QRReader from "./QRReader";
import Captures from "./Captures";

const CapturesPage: React.FC<any> = () => {
  const [activeView, setActiveView] = useState("Capture");
  useEffect(() => {
    console.log(activeView)
  }, [activeView])


  const ContentTab = (props) => {
    let style = "flex flex-col flex-1 place-items-center p-1 rounded-lg border-zinc-500 text-zinc-400"
    if (activeView == props.view) style = style + " border-b-4"
    switch (props.view) {
      case "Capture": style = style + " bg-zinc-600"; break;
      case "QR":      style = style + " bg-zinc-800"; break;
      case "Scan":    style = style + " bg-red-700";  break;
    }
    return <>
      <button
        className={`${style} $`}
        onClick={() => { setActiveView(props.view) }}
      >
        {props.view == "QR" && <MdDonutSmall className="h-5 w-5" />}
        {props.view == "Capture" && <MdOutlineQrCode2 className="h-5 w-5" />}
        {props.view == "Scan" && <MdQrCodeScanner className="h-5 w-5" />}
        <div className="text-xs">{props.view}</div>
      </button>
    </>
  }

  return (
    <>
      <div className="max-w-[50vw]">
        <TrickedexLogo className={`-m-2px flex fill-red-900`} />
      </div>

      {/* Set the general style for the page*/}
      <div 
        className="
          neumorphicIn p-2 m-auto
          max-h-[83vh] w-[98vw] max-w-[600px]
          flex flex-col place-items-center 
          bg-opacity-20 rounded-xl
          bg-zinc-300 
          border-[4px] border-red-900
        "
      >

        {/* Display Content Tabs */}
        <div className="w-full p-2">
          <div className={'flex place-content-center place-items-center gap-4'}>
            <ContentTab view="Capture" />
            <ContentTab view="QR" />
            <ContentTab view="Scan" />
          </div>
          <div className="flex flex-col place-content-center place-items-center">

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
