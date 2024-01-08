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
import DashboardStats from "./components/DashboardStats";

function Dashboard({ uuid, profilePic, first_name, last_name, username }) {
  const logout = useLogout();
  const user = useUserStore((s) => s.user);
  // const { profilePic, uuid } = useUserStore((s) => s.userInfo);
  const [activeSection, setSection] = useState("stats");
  const { data } = trpc.tricklists.findTricklistById.useQuery({ uuid: uuid });

  const getActiveSection = (section) => {
    switch (section) {
      case "stats":
        return <DashboardStats uuid={uuid} />;
        break;
      case "sessions":
        return <SessionList uuid={uuid} />;
        break;
      case "tricks":
        return <ClaimTricks user_id={uuid} />;
        break;
      case "captures":
        return <Captures dash />;
        break;
      // case "tricklists":
      //   return <TricklistPage profileuuid={uuid} displayOnly={false} />;
      //   break;
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
          first_name={first_name}
          last_name={last_name}
          username={username}
          src={profilePic !== null ? profilePic : "./images/noimg.jpeg"}
        />
        <div
          className="
          m-auto max-h-[83vh] w-[98vw] max-w-[600px]
          rounded-xl bg-zinc-900 bg-opacity-30 p-4
         lg:max-w-[90vw] 
        "
        >
          <div className="gap flex flex-row">
            {[
              { title: "Stats", key: "stats" },
              { title: "Sessions", key: "sessions" },
              { title: "Tricks", key: "tricks" },
              { title: "Captures", key: "captures" },
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
