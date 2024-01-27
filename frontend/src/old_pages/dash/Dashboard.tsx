import RadarChart from "@components/d3/RadarChartAI";
import CapturesPage from "./components/CapturesPage";
import { FaQrcode } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import UserCard from "./components/UserCard";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "@store/userStore";
import Captures from "./components/Captures";
import UserList from "@components/UserList";
import SessionList from "./components/SessionList";
import ClaimTricks from "@old_pages/claimtricks/ClaimTricks";
import Link from "next/link";
import { trpc } from "@utils/trpc";
import TricklistPage from "@old_pages/tricklist/TricklistPage";
import DashboardStats from "./components/DashboardStats";
import ReactPlayer from "react-player";
import { useDashStore } from "@store/dashStore";
import useClickOutside from "@hooks/useClickOutside";
import NicknamesPanel from "./components/NicknamesPanel";

function Dashboard({ uuid, profilePic, first_name, last_name, username }) {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  // const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [activeSection, setSection] = useState("stats");
  const vidref = useRef<ReactPlayer>(null);
  const { data } = trpc.tricklists.findTricklistById.useQuery({ uuid: uuid });
  const vidsrc = useDashStore((s) => s.vidsrc);
  const clipStart = useDashStore((s) => s.clipStart);
  const clipEnd = useDashStore((s) => s.clipEnd);
  const setVidSrc = useDashStore((s) => s.setVidSrc);
  const playerRef = useClickOutside(() => setVidSrc(null));
  const getActiveSection = (section) => {
    switch (section) {
      case "stats":
        return <DashboardStats uuid={uuid} />;
      case "sessions":
        return <SessionList uuid={uuid} />;
      case "tricks":
        return <ClaimTricks user_id={uuid} />;
      case "captures":
        return <CapturesPage dash={true} />;
      case "nicknames":
        return <NicknamesPanel />;
      // case "tricklists":
      //   return <TricklistPage profileuuid={uuid} displayOnly={false} />;
      //   break;
    }
  };

  useEffect(() => {
    if (vidsrc !== null) {
      vidref.current?.seekTo(clipStart);
    }
  }, [vidsrc, clipStart]);
  return (
    <div className="my-4 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
      {/* <div className="p-4">
        Welcome <span className="font-semibold text-zinc-300">{user}</span>
      </div> */}
      {vidsrc !== null && (
        <div
          ref={playerRef}
          className="absolute left-[2.5vw] top-[2.5vw] z-[4000] aspect-video h-[30vh] w-[95vw] overflow-hidden rounded-xl"
        >
          <ReactPlayer
            ref={vidref}
            url={vidsrc}
            playing
            controls
            onProgress={() => {
              if (vidref.current?.getCurrentTime() > clipEnd) {
                vidref.current.seekTo(clipStart);
              }
            }}
            loop
            muted
            width="100%"
            height="100%"
          />
        </div>
      )}
      <>
        <UserCard
          edit
          first_name={first_name}
          last_name={last_name}
          username={username}
          src={profilePic !== null ? profilePic : "./images/noimg.jpeg"}
        />
        <div
          className="
          m-auto max-h-[83vh] w-[98vw] max-w-[600px] rounded-xl
          bg-zinc-900 bg-opacity-30 p-4 lg:w-[60vw]
         lg:max-w-[90vw] 
        "
        >
          <div className="gap no-scrollbar flex w-full flex-row overflow-x-scroll">
            {[
              { title: "Stats", key: "stats" },
              { title: "Sessions", key: "sessions" },
              { title: "Tricks", key: "tricks" },
              { title: "Captures", key: "captures" },
              { title: "Nicknames", key: "nicknames" },
              // { title: "Tricklists", key: "tricklists" },
            ].map((item) => (
              <button
                onClick={() => setSection(item.key)}
                className={`${
                  activeSection === item.key
                    ? "text-indigo-400"
                    : "text-zinc-500"
                } rounded-t-md bg-zinc-900 bg-opacity-70  p-2`}
              >
                {item.title}
              </button>
            ))}
          </div>
          {getActiveSection(activeSection)}
        </div>
      </>

      {/* <UserList /> */}
      {/* <button className="fixed right-5 bottom-14" onClick={() => logout()}>
        Logout
      </button> */}
    </div>
  );
}

export default Dashboard;
