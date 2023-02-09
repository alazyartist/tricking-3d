import { animated, useSpring } from "react-spring";
import React, { useEffect } from "react";
import { useSessionSummariesStore } from "./SessionSummaryStore";
import { trpc } from "utils/trpc";

const SessionDetailDisplay = ({ sessionDetails, mirrored, toggleMirrored }) => {
  const detailsVisible = useSessionSummariesStore((s) => s.detailsVisible);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  const showDetails = useSpring({
    from: { spanOpacity: 1, opacity: 0, left: "-10vw" },
    to: {
      spanOpacity: !detailsVisible ? 1 : 0,
      opacity: detailsVisible ? 1 : 1,
      left: detailsVisible ? "0" : "-122px",
    },
    delay: 100,
    config: { tension: 280, friction: 40 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });

  const { data: sessionSummary } = trpc.sessionsummaries.detailsById.useQuery({
    sessionid: sessionDetails.sessionid,
  });

  // useEffect(
  //   () => console.log(sessionDetails, sessionSummary),
  //   [sessionDetails, sessionSummary]
  // );
  return (
    <animated.div
      key={sessionDetails.sessionid + "details"}
      style={{ left: showDetails.left, opacity: showDetails.opacity }}
      className="absolute top-14 flex h-[92vh] w-full flex-col gap-2 rounded-md rounded-l-none bg-zinc-900 bg-opacity-30 p-1 font-inter text-xs"
    >
      <div
        className="w-full rounded-md rounded-l-sm bg-zinc-200 bg-opacity-70 p-1 text-center font-inter text-lg font-bold leading-tight text-zinc-900"
        onClick={() => setDetailsVisible()}
      >
        {sessionDetails?.name}
      </div>
      <div className="flex place-items-center justify-between">
        <div>{sessionDetails?.user_id?.slice(-8)}</div>
        <div
          onClick={() => toggleMirrored(!mirrored)}
          className=" rounded-md bg-zinc-800 p-1 text-sm text-zinc-300"
        >
          {mirrored ? "Mirrored" : "Normal"}
        </div>
      </div>
      <div className="w-full text-center">
        {new Date(sessionDetails?.sessionDate).toDateString()}
      </div>
      <div className="flex place-content-center gap-2">
        <div className="rounded-md bg-zinc-200 bg-opacity-20 p-1 font-semibold text-emerald-400">
          {sessionDetails?.startTime}
        </div>
        <div className="rounded-md bg-zinc-200 bg-opacity-20 p-1  font-semibold text-red-400">
          {sessionDetails?.endTime}
        </div>
      </div>
      <animated.span
        style={{ opacity: showDetails.spanOpacity }}
        className="absolute right-[-11px] top-[9.5vh] rotate-90"
      >
        Details
      </animated.span>
      {sessionSummary?.trickers &&
        sessionSummary?.trickers.map((tricker) => (
          <div key={`${tricker.user.uuid}`}>{tricker.user.username}</div>
        ))}
    </animated.div>
  );
};

export default SessionDetailDisplay;
