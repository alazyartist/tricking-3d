import RadarChart from "@components/d3/RadarChartAI";
import CapturesPage from "./components/CapturesPage";
import { FaQrcode } from "react-icons/fa";
import React, { useState } from "react";
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

function Dashboard({ uuid, profilePic }) {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  // const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [activeSection, setSection] = useState("sessions");
  const { data } = trpc.tricklists.findTricklistById.useQuery({ uuid: uuid });

  const getActiveSection = (section) => {
    switch (section) {
      case "sessions":
        return <SessionList uuid={uuid} />;
        break;
      case "tricks":
        return <ClaimTricks user_id={uuid} />;
        break;
      case "captures":
        return <Captures dash />;
        break;
      case "tricklists":
        return <TricklistPage profileuuid={uuid} displayOnly={false} />;
        break;
    }
  };

  return (
    <div className="my-4 flex flex-col place-content-center place-items-center gap-2 text-zinc-400">
      {/* <div className="p-4">
        Welcome <span className="font-semibold text-zinc-300">{user}</span>
      </div> */}
      <>
        <UserCard
          edit
          src={
            profilePic !== null
              ? `./images/${uuid}/${profilePic}`
              : "./images/noimg.jpeg"
          }
        />
        <div
          className="
          m-auto max-h-[83vh] w-[98vw] max-w-[600px]
          rounded-xl bg-zinc-900 bg-opacity-30 p-4
         lg:max-w-[90vw] 
        "
        >
          <div className="gap flex flex-row">
            <p
              onClick={() => setSection("sessions")}
              className={`${
                activeSection === "sessions"
                  ? "text-emerald-500"
                  : "text-zinc-300"
              } rounded-t-md bg-zinc-900 bg-opacity-70  p-2`}
            >
              Sessions
            </p>
            <p
              onClick={() => setSection("tricks")}
              className={`${
                activeSection === "tricks"
                  ? "text-emerald-500"
                  : "text-zinc-300"
              } rounded-t-md bg-zinc-900 bg-opacity-70  p-2`}
            >
              Tricks
            </p>
            <p
              onClick={() => setSection("captures")}
              className={`${
                activeSection === "captures"
                  ? "text-emerald-500"
                  : "text-zinc-300"
              } rounded-t-md bg-zinc-900 bg-opacity-70  p-2`}
            >
              Captures
            </p>
            <p
              onClick={() => setSection("tricklists")}
              className={`${
                activeSection === "tricklists"
                  ? "text-emerald-500"
                  : "text-zinc-300"
              } rounded-t-md bg-zinc-900 bg-opacity-70  p-2`}
            >
              TrickLists
            </p>
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
