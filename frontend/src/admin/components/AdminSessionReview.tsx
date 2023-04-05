import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useGetSessionDetailsbySessionid } from "../../api/useSessionSummaries";
import ActiveClipDisplay from "./sessionreview/ActiveClipDisplay";
import CommandBar from "./sessionreview/CommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import SessionDetailDisplay from "./sessionreview/SessionDetailDisplay";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useGetTricks from "@api/useGetTricks";
import { trpc } from "@utils/trpc";

import SessionSourceDisplay from "./sessionreview/SessionSourceDisplay";
// const SessionSourceDisplay = dynamic(
//   () => import("./sessionreview/SessionSourceDisplay"),
//   { ssr: false }
// );

const AdminSessionReview = () => {
  const router = useRouter();
  const sessionid = router.query["sessionid"];
  console.log("sessionid", sessionid);
  const { data: tricks } = useGetTricks();
  const { data: combos } = trpc.combos.getAll.useQuery();
  const { data } = useGetSessionDetailsbySessionid(sessionid);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setSessionid = useSessionSummariesStore((s) => s.setSessionid);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const clearSessionData = useSessionSummariesStore((s) => s.clearSessionData);
  const setSessionSources = useSessionSummariesStore(
    (s) => s.setSessionSources
  );
  const sessionDetails = data?.data;
  useEffect(() => {
    clearSessionData();
  }, []);
  useEffect(() => {
    clearSessionData();
    setSessionid(sessionid as string);
    sessionDetails?.SessionData?.forEach((sd) => {
      console.log("sd");
      console.log(sd);
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
    return;
  }, [
    sessionid,
    sessionDetails,
    data,
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
    <div className="no-scrollbar fixed top-0 left-0 h-screen w-screen overflow-scroll">
      <Link href={"/admin"}>
        <IoIosArrowBack className="absolute top-4 left-2 text-3xl text-zinc-300" />
      </Link>
      {sessionDetails && (
        <div className="mt-4 flex flex-col place-items-center text-zinc-300 md:mt-8">
          <div>{sessionDetails?.name}</div>
          <div className="absolute left-2  top-[40vh] w-[135px] md:top-[20vh]">
            {sessionDetails?.SessionSources?.map((source) => (
              <SessionSourceDisplay
                mirrored={mirrored}
                key={source.srcid}
                source={source}
              />
            ))}
          </div>
          <div className="fo absolute left-2 top-0 w-[135px] font-inter">
            <SessionDetailDisplay
              mirrored={mirrored}
              toggleMirrored={toggleMirrored}
              sessionDetails={sessionDetails}
            />
          </div>
        </div>
      )}
      <MakeNewTrickModal />
      <ActiveClipDisplay />
      {tricks !== undefined && combos !== undefined && (
        <CommandBar tricks={tricks} combos={combos} />
      )}
    </div>
  );
};

export default AdminSessionReview;
