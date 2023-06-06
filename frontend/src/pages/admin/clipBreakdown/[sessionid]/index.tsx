import ClipBreakdown from "@admin/components/clipBreakdown/ClipBreakdown";
import { PrismaClient } from "@prisma/client";
import React from "react";

const ClipBreakdownPage = ({ sessionid, initialSummary }) => {
  const initSum = JSON.parse(initialSummary);

  return <ClipBreakdown sessionid={sessionid} initialSummary={initSum} />;
};

export default ClipBreakdownPage;
const prisma = new PrismaClient();
export const getStaticProps = async (props) => {
  const initialSummary = await prisma.sessionsummaries.findUnique({
    where: { sessionid: props.params.sessionid },
    include: {
      SessionSources: true,
      trickers: { include: { user: true } },
      SessionData: { include: { ClipLabel: true, SessionSource: true } },
    },
  });

  const sessionStringy = JSON.stringify(initialSummary);
  return {
    props: {
      initialSummary: sessionStringy,
      sessionid: props.params.sessionid,
    },
    revalidate: 120,
  };
};
export const getStaticPaths = async (props) => {
  const summaries = await prisma.sessionsummaries.findMany({});
  const summaryMap = summaries.map(
    (summary) => `/admin/clipBreakdown/${summary.sessionid}`
  );
  return { paths: summaryMap, fallback: "blocking" };
};
