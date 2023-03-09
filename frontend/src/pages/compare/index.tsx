import { SessionSummaryCard } from "@old_pages/userProfile/components/SessionStatsList";
import { trpc } from "@utils/trpc";
import React from "react";

const ComparePage = () => {
  const { data: summaries, status } =
    trpc.sessionsummaries.getAllSessionSummaries.useQuery();
  return (
    <div className="h-full w-full text-zinc-300">
      ComparePage
      <button className=" outlineButton absolute top-14 right-8 px-4 py-2 text-xl">
        compare
      </button>
      <div>
        {status === "success" &&
          summaries?.map((summary) => <SessionSummaryCard summary={summary} />)}
      </div>
    </div>
  );
};

export default ComparePage;
