import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "../../data/icons/MdIcons";
import { useRouter } from "next/router";
import { useTransition, animated, useSpring } from "@react-spring/web";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import ProfileNav from "./components/ProfileNav";

import ProfileSessionInfo from "./components/ProfileSessionInfo";

import SessionStatsList from "./components/SessionStatsList";
import SessionStatsContainer from "./components/SessionStatsContainer";
import OverallStatDisplay from "./components/OverallStatDisplay";
import { trpc } from "utils/trpc";
import { sessionsummaries, user_sessions } from "@prisma/client";
import LastSessionStats from "./components/LastSessionStats";

const UserProfile = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const router = useRouter();
  const { uuid, sessionid } = router.query;
  const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
  const { data: profileInfo } = trpc.userDB.findByUUID.useQuery({
    userid: uuid as string,
  });
  const [editing, setEditing] = useState(false);
  const [activeSummary, setActiveSummary] = useState<
    sessionsummaries | user_sessions
  >();
  const [activeView, setActiveView] = useState("Stats");
  const isUsersPage = uuid === loggedInUUID;
  useEffect(() => {
    if (sessionid && profileInfo?.SessionSummaries) {
      let tempSummary = profileInfo?.SessionSummaries.find(
        (summary: sessionsummaries | user_sessions) =>
          summary.sessionid === sessionid
      );
      setActiveView("Sessions");
      setActiveSummary(tempSummary);
    }
  }, [router, profileInfo]);
  const [fullScreenLower, setFullScreenLower] = useState(false);
  const editView = useTransition(editing, {
    from: { top: -400, opacity: 0 },
    enter: { top: 0, opacity: 100 },
    leave: { top: -400 },
    reverse: editing,
    config: { durration: 100, tension: 260, friction: 50 },
    exitBeforeEnter: true,
  });
  //if window orientation is horizontal, make the upper section full height, and the lower section hidden
  // const isSideways = window.orientation === 90 || window.orientation === -90;
  // console.log(isSideways);

  const hideStyles = useSpring({
    to: { height: hidden ? "0vh" : "27vh", opacity: hidden ? 0 : 1 },
    from: { height: "27vh", opacity: 1 },
    config: { durration: 100, tension: 260, friction: 50 },
    exitBeforeEnter: true,
  });
  const resizeUpper = useSpring({
    to: {
      height: hidden
        ? !activeSummary
          ? "73vh"
          : fullScreenLower
          ? "5vh"
          : "43vh"
        : "27vh",
    },
    from: { height: "27vh" },
    config: { durration: 100, tension: 260, friction: 50 },
    exitBeforeEnter: true,
  });
  const resizeLower = useSpring({
    to: {
      height: hidden
        ? !activeSummary
          ? "13vh"
          : fullScreenLower
          ? "90vh"
          : "45vh"
        : "27vh",
    },
    from: { height: "27vh" },
    config: { durration: 100, tension: 260, friction: 50 },
    exitBeforeEnter: true,
  });
  // useEffect(() => {
  //   console.log(profileInfo);
  //   console.log(activeSummary);
  // }, [profileInfo, hidden]);
  useEffect(() => {
    if (activeView === "Stats") {
      setHidden(false);
    } else if (activeView === "Sessions") setHidden(true);
  }, [activeView]);

  if (!profileInfo)
    return <div className="text-center text-white">Loading the infos...</div>;

  return (
    <div className="flex w-full flex-col place-items-center p-2 font-inter text-zinc-300">
      <animated.div style={hideStyles} className={"relative"}>
        <div className="flex flex-col">
          {editView((styles, editing) =>
            editing ? (
              <animated.div
                style={styles}
                className="relative flex flex-col place-items-center gap-2"
              >
                {isUsersPage && (
                  <>
                    {editing}
                    <div
                      className="absolute top-0 flex place-content-center place-items-center gap-1"
                      onClick={() => setEditing(!editing)}
                    >
                      <MdOutlineClose /> <div>Close</div>
                    </div>
                  </>
                )}
                <ProfileInfoCardEditable
                  setEditing={setEditing}
                  userInfo={profileInfo}
                />
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
      </animated.div>

      <div className="relative top-0 z-[2] flex max-h-[95vh] w-full flex-col place-items-center gap-2 rounded-lg p-2">
        <animated.div
          style={resizeUpper}
          className="relative h-[40vh] w-full overflow-y-scroll rounded-lg bg-zinc-800 bg-opacity-40 p-2 backdrop-blur-xl"
        >
          {activeView === "Stats" ? (
            <div>
              <ProfileNav
                setActiveView={setActiveView}
                activeView={activeView}
              />
              <OverallStatDisplay profileInfo={profileInfo} />
            </div>
          ) : null}
          {activeView === "Sessions" ? (
            <div className=" flex h-full w-full gap-2 ">
              {!activeSummary ? (
                profileInfo && (
                  <SessionStatsList
                    setActiveView={setActiveView}
                    activeView={activeView}
                    profileInfo={profileInfo}
                    setActiveSummary={setActiveSummary}
                  />
                )
              ) : (
                <SessionStatsContainer
                  uuid={uuid}
                  setActiveSummary={setActiveSummary}
                  activeSummary={activeSummary}
                />
              )}
            </div>
          ) : null}
        </animated.div>
        <div></div>
        <animated.div
          style={resizeLower}
          className={`z-[-2] h-[27vh] w-full rounded-lg bg-zinc-800 bg-opacity-40 p-2 backdrop-blur-xl`}
        >
          {activeView === "Stats" ? (
            <div
              className="mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4"
              // onClick={() => setActiveView("Sessions")}
            >
              <LastSessionStats profileInfo={profileInfo} />
            </div>
          ) : null}
          {activeView === "Sessions" ? (
            <div className="no-scrollbar relative  h-full w-full ">
              {activeSummary ? (
                <>
                  {/* <div
                    className={
                      "sticky top-[-10] mb-2 w-fit rounded-md bg-zinc-900 p-1 px-4"
                    }
                  >
                    Selected Session Breakdown
                  </div> */}
                  <ProfileSessionInfo
                    fullScreenLower={fullScreenLower}
                    setFullScreenLower={setFullScreenLower}
                    summary={activeSummary}
                  />
                </>
              ) : (
                <h1 className="h-full w-full p-2 text-center text-2xl font-bold text-zinc-300">
                  Select a Session to see the breakdown.
                </h1>
              )}
            </div>
          ) : null}
        </animated.div>
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
