import React, { useState } from "react";
import * as d3 from "d3";
import { trpc } from "@utils/trpc";
import { bases } from "@prisma/client";
const TrickCategories = ({ tricks }) => {
  const [activeGroup, setActiveGroup] = useState("");
  const { data: bases } = trpc.trick.getBases.useQuery();
  if (!tricks || !bases) return <p>Loading..</p>;
  const cats = Array.from(
    d3.group(tricks, (t: any) => (t.type === "Trick" ? t.trickType : t.type))
  );
  const cats2 = Array.from(
    d3.group(tricks, (t: any) => t.type === "Trick" && t.base_id)
  );
  console.log(cats2);
  console.log("bases");
  const baseGroups = d3.group(bases, (b: bases) => b.direction);
  const baseGroupsArr = Array.from(baseGroups);
  return (
    <div className={"flex flex-col gap-2 text-zinc-300"}>
      <div className={"flex gap-2 text-zinc-300"}>
        {cats.map((c) => {
          return <p>{c[0]}</p>;
        })}
      </div>
      <div
        className={
          "grid grid-cols-6 place-content-center place-items-center gap-2 text-zinc-300"
        }
      >
        {baseGroupsArr.map((c) => {
          return (
            <>
              {c[0] && (
                <div
                  onClick={() => setActiveGroup(c[0])}
                  className={
                    "col-span-3 w-full rounded-md bg-zinc-800 p-2 text-center"
                  }
                  key={`${c[0]}`}
                >
                  <p>{c[0]}</p>
                </div>
              )}
            </>
          );
        })}
        <div
          className={`col-span-6 grid w-full grid-cols-${
            baseGroups
              .get(activeGroup)
              ?.some((s) => s.name === "Hook" || "Round")
              ? "2"
              : "3"
          } gap-2`}
        >
          {baseGroups.get(activeGroup)?.map((b) => (
            <div className={` w-full rounded-md bg-zinc-800 p-2 text-center`}>
              {b.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrickCategories;
