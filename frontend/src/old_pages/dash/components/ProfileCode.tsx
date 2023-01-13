import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineQrCode2, MdQrCodeScanner, MdDonutSmall } from "../../../data/icons/MdIcons";
import { TrickedexLogo } from "../../../data/icons/TrickedexLogo";
import QRGenerator from "./QRGenerator";
import QRReader from "./QRReader";
import Captures from "./Captures";

const ProfileCode: React.FC<any> = ({ setProfileCodeOpen, profileCodeOpen }) => {
  const [activeView, setActiveView] = useState("Capture");
  useEffect(() => {
    console.log(activeView)
  }, [activeView])
  return (
    <>
      <div className="max-w-[50vw]">
        <TrickedexLogo className={`-m-2px flex fill-zinc-300`} />
      </div>
      <div className="m-auto mt-2 bg-zinc-700 p-2 w-[90vw] max-w-[600px] rounded-xl text-zinc-300">
        <div className="neumorphicIn relative flex h-full w-full flex-col place-items-center rounded-xl bg-zinc-800 p-2">
          {/*
          <IoIosArrowBack
            className="absolute top-4 right-1 text-4xl"
            onClick={() => setProfileCodeOpen(!profileCodeOpen)}
          />
          */}
          <div className="w-full p-2">
          <div className={'flex place-content-center place-items-center gap-4'}>
              <button
                className={`
                  ${activeView === "Capture" ? "border-2" : "border-0"} border-zinc-500 
                  flex flex-col flex-1 place-items-center 
                  bg-zinc-600 p-1
                  rounded-lg
                `}
                onClick={() => { setActiveView("Capture") }}
              >
                <MdDonutSmall className="h-5 w-5" />
                <div className="text-xs">Captures</div>
              </button>

              <button
                className={`
                  ${activeView === "QR" ? "border-2" : "border-0"} border-zinc-500
                  flex flex-col flex-1 place-items-center 
                  bg-zinc-700 p-1
                  rounded-lg
                `}
                onClick={() => { setActiveView("Capture") }}
                onClick={() => { setActiveView("QR") }}
              >
                <MdOutlineQrCode2 className="h-5 w-5" />
                <div className="text-xs">Generate</div>
              </button>

              <button
                className={`
                  ${activeView === "Scan" ? "border-2" : "border-0"} border-zinc-500 
                  flex flex-col flex-1 place-items-center 
                  bg-red-700 p-1
                  rounded-lg
                `}
                onClick={() => { setActiveView("Capture") }}
                onClick={() => { setActiveView("Scan") }}
              >
                <MdQrCodeScanner className="h-5 w-5" />
                <div className="text-xs">Scan</div>
              </button>
            </div>
            <div className="flex flex-col place-content-center place-items-center">
              {activeView === "Capture" && <Captures />}
              {activeView === "QR" && <QRGenerator />}
              {activeView === "Scan" && <QRReader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCode;
