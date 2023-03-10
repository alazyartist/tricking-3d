import { SessionSummaryCard } from "@old_pages/userProfile/components/SessionStatsList";
import { sessionsummaries } from "@prisma/client";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ComparePage = ({ sessionSummaries }) => {
  const initialSummaries = JSON.parse(sessionSummaries);
  const { data: summaries, status } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery(
      {},
      {
        initialData: initialSummaries,
      }
    );
  const [compareList, addToCompare] = useState<sessionsummaries[]>([]);
  const compareurl = compareList.map((cs) => cs.sessionid).join("/");
  return (
    <div className="h-full w-full text-zinc-300">
      <h1 className=" font-semi-bold p-4 text-4xl">ComparePage</h1>
      <div className=" flex flex-col gap-2 p-2">
        <Link
          href={`/compare/${compareurl}`}
          className=" outlineButton  place-self-end px-4 py-2 text-xl"
        >
          compare
        </Link>
        <div className="h-[74vh] space-y-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-40 p-2">
          {status === "success" &&
            summaries?.map((summary) => {
              const chosen = compareList?.find(
                (s) => JSON.stringify(s) === JSON.stringify(summary)
              );
              return (
                <div
                  className={`${
                    chosen ? "border-4 border-zinc-100" : ""
                  } rounded-md`}
                >
                  <SessionSummaryCard
                    f={() =>
                      !chosen
                        ? compareList.length <= 4
                          ? addToCompare((s) => [...s.slice(-3), summary])
                          : addToCompare((s) => [...s, summary])
                        : addToCompare((s) => [
                            ...s.filter((s) => s !== summary),
                          ])
                    }
                    summary={summary}
                  />
                </div>
              );
            })}
          {status === "success" &&
            summaries?.map((summary) => {
              const chosen = compareList?.find(
                (s) => JSON.stringify(s) === JSON.stringify(summary)
              );
              return (
                <div
                  className={`${
                    chosen ? "border-2 border-zinc-300" : ""
                  } rounded-md`}
                >
                  <SessionSummaryCard
                    f={() =>
                      !chosen
                        ? compareList.length <= 4
                          ? addToCompare((s) => [...s.slice(-3), summary])
                          : addToCompare((s) => [...s, summary])
                        : addToCompare((s) => [
                            ...s.filter((s) => s !== summary),
                          ])
                    }
                    summary={summary}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div>{compareList.map((cl) => cl.name)}</div>
    </div>
  );
};

export default ComparePage;

export const getStaticProps = async () => {
  const sessionSummaries = await prisma.sessionsummaries.findMany({
    where: { status: "Reviewed" },
    // take: 5,
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { username: true, profilePic: true, uuid: true } },
      SessionData: true,
    },
  });
  let stringy = JSON.stringify(sessionSummaries);
  return { props: { sessionSummaries: stringy } };
};
