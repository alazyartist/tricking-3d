import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "../../data/icons/MdIcons";
import { useRouter } from "next/router";
import { useTransition, animated } from "react-spring";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import ProfileNav from "./components/ProfileNav";

import ProfileSessionInfo from "./components/ProfileSessionInfo";

import SessionStatsList from "./components/SessionStatsList";
import SessionStatsContainer from "./components/SessionStatsContainer";

const UserProfile = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
  const { data: profileInfo } = useUserInfoByUUID(uuid as string);
  const [editing, setEditing] = useState(false);
  const [activeSummary, setActiveSummary] = useState<any>();
  const editView = useTransition(editing, {
    from: { top: -400, opacity: 0 },
    enter: { top: 0, opacity: 100 },
    leave: { top: -400 },
    reverse: editing,
    config: { durration: 100, tension: 260, friction: 50 },
    exitBeforeEnter: true,
  });
  const isUsersPage = uuid === loggedInUUID;
  const [activeView, setActiveView] = useState("Stats");
  useEffect(() => {
    console.log(profileInfo);
    console.log(activeSummary);
  }, [profileInfo]);

  return (
    <div className="flex w-full flex-col place-items-center p-2 font-inter text-zinc-300">
      <div className="flex flex-col">
        {editView((styles, editing) =>
          editing ? (
            <animated.div
              style={styles}
              className="relative flex flex-col place-items-center gap-2"
            >
              <ProfileInfoCardEditable
                setEditing={setEditing}
                userInfo={profileInfo}
              />
              {isUsersPage && (
                <>
                  {editing}
                  <div
                    className="flex place-content-center place-items-center gap-1"
                    onClick={() => setEditing(!editing)}
                  >
                    <MdOutlineClose /> <div>Close</div>
                  </div>
                </>
              )}
            </animated.div>
          ) : (
            <animated.div
              style={styles}
              className="relative flex flex-col place-items-center gap-2"
            >
              <ProfileInfoCard userInfo={profileInfo} />
              {isUsersPage && (
                <>
                  {editing}
                  <div onClick={() => setEditing(!editing)}>Edit Info</div>
                </>
              )}
            </animated.div>
          )
        )}
      </div>

      <div className="flex w-full flex-col place-items-center gap-4 rounded-lg p-2">
        <div className="relative h-[40vh] w-full rounded-lg bg-zinc-700 bg-opacity-20 p-2">
          {activeView === "Stats" ? (
            <ProfileNav setActiveView={setActiveView} activeView={activeView} />
          ) : null}
          {activeView === "Sessions" ? (
            <div className=" flex h-full w-full gap-2 ">
              {!activeSummary ? (
                <SessionStatsList
                  setActiveView={setActiveView}
                  activeView={activeView}
                  profileInfo={profileInfo}
                  setActiveSummary={setActiveSummary}
                />
              ) : (
                <SessionStatsContainer
                  setActiveSummary={setActiveSummary}
                  activeSummary={activeSummary}
                />
              )}
            </div>
          ) : null}
        </div>
        <div></div>
        <div className="h-[27vh] w-full rounded-lg bg-zinc-700 bg-opacity-20 p-2">
          {activeView === "Stats" ? (
            <div
              className="mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4"
              // onClick={() => setActiveView("Sessions")}
            >
              Last Session Stats
            </div>
          ) : null}
          {activeView === "Sessions" ? (
            <div className="no-scrollbar relative h-full w-full overflow-hidden overflow-y-scroll">
              {activeSummary ? (
                <>
                  <div
                    className={
                      "sticky top-0 mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4"
                    }
                  >
                    Selected Session Breakdown
                  </div>
                  <ProfileSessionInfo summary={activeSummary} />
                </>
              ) : (
                <h1 className="h-full w-full p-2 text-center text-4xl font-bold">
                  Select a Session to see the breakdown.
                </h1>
              )}
            </div>
          ) : null}
        </div>
        {/* <TricklistsAndClamiedContainer
					profileuuid={uuid}
					MyTricklists={profileInfo?.MyTricklists}
					ClaimedCombos={profileInfo?.CombosClaimed}
					ClaimedTricks={profileInfo?.TricksClaimed}
				/> */}
      </div>
    </div>
  );
};

export default UserProfile;
