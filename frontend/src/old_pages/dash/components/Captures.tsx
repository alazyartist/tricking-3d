//import { UserCard } from "./UserCard";
//import { useApiCreds } from "../../../hooks/useApiCreds";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";

const Captures = () => {
  const [captured, setCaptured] = useState<any>();
  const [capturedYou, setCapturedYou] = useState<any>();
  const [display, setDisplay] = useState("captures");
  const userInfo = useUserStore((s) => s.userInfo);
  const queryClient = useQueryClient();
  const nav = useRouter();
  useEffect(() => {
    console.log(userInfo);
    setCaptured(userInfo.Captured);
    setCapturedYou(userInfo.CapturedMe);
  }, [userInfo]);

  return (
    <div
      id="captureContainer"
      className="w-full pt-4 flex flex-col gap-4 place-items-center font-inter"
    >

    {/* Caprured Me */}
      <div id="myCaptures" className="w-full py-1 p-2 rounded-md border-cyan-300 border-2">
        <div className="flex gap-2 font-bold">
          <div className="text-zinc-300">
            Your Captures
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            className={`flex flex-row ${captured?.length >= 4
              ? "place-content-start"
              : "place-content-center"
              }`}
          >
            {!!captured &&
              Object.keys(captured).map((key) => (
                <div
                  onClick={() => nav.push(`/userProfile/${captured[key].uuid}`)}
                  key={`${captured[key].username}`}
                  className="flex flex-row gap-3"
                >
                  <CapturedCard
                    name={
                      captured[key].first_name + " " + captured[key].last_name
                    }
                    src={
                      captured[key].profilePic
                        ? `./images/${captured[key].uuid}/${captured[key].profilePic}`
                        : `./images/noimg.jpeg`
                    }
                    username={`${captured[key].username}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Caprured Me */}
      <div id="capturedMe" className="w-full py-1 p-2 rounded-md border-emerald-300 border-2">
        <div className="text-zinc-300 font-bold">
          Captured You
        </div>
        <div className="flex w-[80vw] flex-row place-content-center place-items-start overflow-x-auto">
          {!!capturedYou &&
            Object.keys(capturedYou).map((key) => (
              <div
                onClick={() =>
                  nav.push(`/userProfile/${capturedYou[key].uuid}`)
                }
                key={`${capturedYou[key].username}`}
                className="flex  flex-row gap-3"
              >
                <CapturedCard
                  name={
                    capturedYou[key].first_name +
                    " " +
                    capturedYou[key].last_name
                  }
                  src={
                    capturedYou[key].profilePic
                      ? `./images/${capturedYou[key].uuid}/${capturedYou[key].profilePic}`
                      : `./images/noimg.jpeg`
                  }
                  username={`${capturedYou[key].username}`}
                />
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Captures;
