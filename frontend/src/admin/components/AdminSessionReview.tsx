import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import ActiveClipDisplay from "./sessionreview/ActiveClipDisplay";
import CommandBar from "./sessionreview/CommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import SessionDetailDisplay from "./sessionreview/SessionDetailDisplay";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";
import { trpc } from "@utils/trpc";

import SessionSourceDisplay from "./sessionreview/SessionSourceDisplay";
import useScreenOrientation from "@hooks/UseScreenOrientaion";

const AdminSessionReview = ({
  sessionid,
  sessionDetails,
  initialTricks,
  initialCombos,
}) => {
  const { data: tricks } = trpc.trick.getAll.useQuery(
    {},
    { initialData: initialTricks }
  );
  const { data: combos } = trpc.combos.getAll.useQuery(
    {},
    { initialData: initialCombos }
  );
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSessionid = useSessionSummariesStore((s) => s.setSessionid);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const clearSessionData = useSessionSummariesStore((s) => s.clearSessionData);
  const setSessionSources = useSessionSummariesStore(
    (s) => s.setSessionSources
  );
  const orientation = useScreenOrientation();
  console.log(orientation);
  useEffect(() => {
    setSessionid(sessionid as string);
    if (sessionData.length < 0 || sessionid !== sessionData?.[0]?.sessionid) {
      clearSessionData();
      sessionDetails?.SessionData?.forEach((sd) => {
        setSessionData({
          id: sd?.id,
          sessionid: sd?.sessionid,
          name: sd?.ClipLabel?.name,
          startTime: sd?.clipStart,
          endTime: sd?.clipEnd,
          clipLabel: [...sd?.ClipLabel?.comboArray],
          srcid: sd?.srcid,
          vidsrc: sd?.SessionSource?.vidsrc,
          bail: sd?.bail,
        });
      });
    }
    return;
  }, [
    sessionid,
    sessionDetails,
    clearSessionData,
    setSessionData,
    setSessionid,
  ]);
  useEffect(() => {
    setSessionSources(sessionDetails?.SessionSources);
    setVidsrc(sessionDetails?.SessionSources?.[0]?.vidsrc);
  }, [sessionDetails, setSessionSources, setVidsrc]);
  const [mirrored, toggleMirrored] = useState(false);
  return (
    <div className="no-scrollbar noTouch fixed left-0 top-0 h-screen w-screen overflow-scroll">
      <Link
        className="absolute left-2 top-4 text-3xl text-zinc-300"
        href={"/admin"}
      >
        <IoIosArrowBack />
      </Link>
      {sessionDetails && (
        <div className="mt-4 flex flex-col place-items-center text-zinc-300 md:mt-8">
          <div>{sessionDetails?.name}</div>
          <div className="absolute left-2  top-[40vh] w-[135px] md:top-[20vh]">
            {sessionDetails?.SessionSources?.map((source) => (
              <SessionSourceDisplay
                orientation={orientation}
                mirrored={mirrored}
                key={source.srcid}
                source={source}
              />
            ))}
          </div>
          {/* <div className="fo absolute left-2 top-0 w-[135px] font-inter">
            <SessionDetailDisplay
              mirrored={mirrored}
              toggleMirrored={toggleMirrored}
              sessionDetails={sessionDetails}
            />
          </div> */}
        </div>
      )}
      {/* <div id={"portal-root"}></div> */}
      <MakeNewTrickModal />
      <ActiveClipDisplay />
      {tricks !== undefined && combos !== undefined && (
        <CommandBar tricks={tricks} combos={combos} />
      )}
    </div>
  );
};

export default AdminSessionReview;
