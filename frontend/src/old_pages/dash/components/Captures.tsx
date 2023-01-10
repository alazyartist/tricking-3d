import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";
import UserCard from "./UserCard";

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
      className="flex flex-col place-items-center font-inter"
    >
      <div id="myCaptures" className="w_full">
      
        <div className="flex gap-2 font-inter font-bold">
          <div
            className={display === "captures" ? "text-zinc-300" : "text-zinc-400"}
            onClick={() => {
              setDisplay("captures");
              queryClient.invalidateQueries(["userInfo"]);
            }}
          >
            Your Captures
          </div>
        </div>

        <div id="capturedMe" className="w-full">
          <div
            className={
              display === "captured me" ? "text-zinc-300" : "text-zinc-400"
            }
            onClick={() => {
              setDisplay("captured me");
              queryClient.invalidateQueries(["userInfo"]);
            }}
          >
            Captured You
          </div>
        </div>

      </div>
      <div className="w-[80vw] overflow-x-auto">
        <div
          className={`flex w-full flex-row ${
            captured?.length >= 4
              ? "place-content-start"
              : "place-content-center"
          }`}
        >
          {!!captured &&
            display === "captures" &&
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

        <div className="flex w-[80vw] flex-row place-content-center place-items-start overflow-x-auto">
          {!!capturedYou &&
            display === "captured me" &&
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
