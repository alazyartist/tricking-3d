import TransitionsBarChart from "@components/d3/TransitionsBarChart";
import TrickPieChart from "@components/d3/TrickPieChart";
import { transitions, tricks } from "@prisma/client";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import * as d3 from "d3";
import useClickOutside from "@hooks/useClickOutside";

const DashboardStats = ({ uuid }) => {
  const { data: sessions, isLoading } =
    trpc.sessionsummaries.getSessionsById.useQuery({
      uuid: uuid,
    });
  const [showUniqueTricks, setShowUniqueTricks] = useState(false);
  if (isLoading) return <div>Gathering Your Stats, just a sec...</div>;
  const tricks = sessions
    ?.map((session) =>
      session.SessionData.map((data) => {
        const ca = data.ClipLabel.comboArray as (tricks | transitions)[];

        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type !== "Transition");
      })
    )
    .flat(2);
  const transitions = sessions
    ?.map((session) => {
      return session.SessionData.map((data) => {
        const ca = data.ClipLabel.comboArray as (tricks | transitions)[];
        return ca
          ?.map((trick) => trick)
          .filter((trick) => trick.type === "Transition");
      });
    })
    .flat(2);
  const uniqueTricks = [...new Set(tricks?.map((trick) => trick.name))];
  const uniqueTricksGroup = Array.from(d3.group(tricks, (d) => d.name))
    .map(([key, value]) => ({ name: key, count: value.length }))
    .sort((a, b) => b.count - a.count);
  console.log(tricks.length, uniqueTricks.length, uniqueTricksGroup);
  return (
    <div className="minimalistScroll lg:no-scrollbar h-full max-h-[60vh] w-full overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70 lg:h-[60vh] lg:max-h-[65vh]">
      <h1 className="p-2 text-zinc-200">DashboardStats</h1>
      <div className="flex w-full flex-col place-items-center gap-2 p-2">
        <StatCard title={"Tricks"} data={tricks && tricks.length} />
        <StatCard
          title={"Transitions"}
          data={transitions && transitions.length}
        />
        <div
          className="w-full"
          onClick={() => setShowUniqueTricks(!showUniqueTricks)}
        >
          <StatCard title={"Unique Tricks"} data={uniqueTricks.length} />
        </div>
        <TrickPieChart data={tricks} group_by={"base_id"} />
        <div className="flex h-32 w-full place-content-center p-2">
          <TransitionsBarChart data={transitions} />
        </div>
        {showUniqueTricks && (
          <ListDisplay
            close={() => setShowUniqueTricks(false)}
            data={uniqueTricksGroup}
          />
        )}
        {/* <TrickPieChart data={transitions} group_by={"name"} /> */}
      </div>
    </div>
  );
};

const StatCard = ({ title, data }) => {
  return (
    <div className="flex  w-full justify-around rounded-md bg-zinc-800 p-2">
      <p className="w-full text-left">{data}</p>
      <p className="w-fit whitespace-nowrap">{title}</p>
    </div>
  );
};

const ListDisplay = ({ data, close }) => {
  const ref = useClickOutside(() => close());
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col place-content-center place-items-center bg-zinc-900 bg-opacity-70 p-8">
      <div
        ref={ref}
        className="minimalist-scroll flex h-[80vh] w-[90vw] flex-col gap-2 overflow-y-scroll"
      >
        {data.map((item) => (
          <div className="flex w-full justify-around rounded-md bg-zinc-800 p-2">
            <p className="w-full whitespace-nowrap">{item.name}</p>
            <p className="w-fit text-left">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
