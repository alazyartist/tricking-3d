import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2, MdQrCodeScanner, MdDonutSmall } from "../../../data/icons/MdIcons";
import { TrickedexLogo } from "../../../data/icons/TrickedexLogo";
import QRGenerator from "./QRGenerator";
import QRReader from "./QRReader";
import Captures from "./Captures";
import { active } from "d3";

const ProfileCode: React.FC<any> = ({ setProfileCodeOpen, profileCodeOpen }) => {
  const [activeView, setActiveView] = useState("Capture");
  useEffect(() => {
    console.log(activeView)
  }, [activeView])


  const PPButton = (props) => {
    let style = "flex flex-col flex-1 place-items-center p-1 rounded-lg border-zinc-500"
    if (activeView == props.view) style = style + " border-4"
    switch (props.view) {
      case "Capture":
        style = style + " bg-zinc-600"
        break;
      case "QR":
        style = style + " bg-zinc-800"
        break;
      case "Scan":
        style = style + " bg-red-700"
        break;
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
        <TrickedexLogo className={`-m-2px flex fill-zinc-300`} />
      </div>

      <div
        className="
          neumorphicIn relative bg-zinc-600 p-2 m-auto
          h-full w-[90vw] max-w-[600px]
          flex flex-col place-items-center 
          bg-opacity-60 rounded-xl
          border-[8px] border-zinc-800
        "
      >
        <div className="w-full p-2">
          <div className={'flex place-content-center place-items-center gap-4'}>
            <PPButton view="Capture" />
            <PPButton view="QR" />
            <PPButton view="Scan" />
          </div>
          <div className="flex flex-col place-content-center place-items-center">
            {activeView === "Capture" && <Captures />}
            {activeView === "QR" && <QRGenerator />}
            {activeView === "Scan" && <QRReader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCode;
