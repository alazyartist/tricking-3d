import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

import { trpc } from "@utils/trpc";

const AdminSessionReview = dynamic(
  () => import("@admin/components/AdminSessionReview")
);
const SessionReview = ({
  initialTricks,
  initialCombos,
  initialSummary,
  sessionid,
}) => {
  // const router = useRouter();
  // const { sessionid } = router.query;
  const initialTricksReady = JSON.parse(initialTricks);
  const initialCombosReady = JSON.parse(initialCombos);
  const initialSummaryReady = JSON.parse(initialSummary);
  const { data } = trpc.sessionsummaries.detailsById.useQuery(
    { sessionid: sessionid },
    { initialData: initialSummaryReady }
  );
  return (
    <AdminSessionReview
      initialTricks={initialTricksReady}
      initialCombos={initialCombosReady}
      sessionid={sessionid}
      sessionDetails={data}
    />
  );
};

export default SessionReview;
const prisma = new PrismaClient();
export const getStaticProps = async (props) => {
  const sessionSummary = await prisma.sessionsummaries.findUnique({
    where: { sessionid: props.params.sessionid },
    include: {
      SessionSources: true,
      trickers: { include: { user: true } },
      SessionData: { include: { ClipLabel: true, SessionSource: true } },
    },
  });
  const combos = await prisma.combos.findMany({});
  const tricks = await prisma.tricks.findMany({});
  const transitions = await prisma.transitions.findMany({});
  const stances = await prisma.stances.findMany({});

  const allTricks = [...tricks, ...transitions, ...stances];
  const sessionstringy = JSON.stringify(sessionSummary);
  const trickstringy = JSON.stringify(allTricks);
  const combostringy = JSON.stringify(combos);
  return {
    props: {
      initialCombos: combostringy,
      initialTricks: trickstringy,
      initialSummary: sessionstringy,
      sessionid: props.params.sessionid,
    },
    revalidate: 120,
  };
};

export const getStaticPaths = async (props) => {
  const summaries = await prisma.sessionsummaries.findMany({});
  const summaryMap = summaries.map(
    (summary) => `/admin/sessionReview/${summary.sessionid}`
  );
  return { paths: summaryMap, fallback: "blocking" };
};
