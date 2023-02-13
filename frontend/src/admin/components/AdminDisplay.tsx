"use client";
import React, { useState, lazy, Suspense } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
const DataList = lazy(() => import("./DataList"));
const SessionSummariesOverview = lazy(
  () => import("./SessionSummariesOverview")
);
const TrickPointEditor = lazy(() => import("./trickMaker/TrickPointEditor"));
const UserList = lazy(() => import("./UserList"));
const AdminDisplay = () => {
  const [displayItem, setDisplayItem] = useState("SessionSummaries");
  return (
    <>
      <div className="z-[100] flex w-full justify-around gap-2 rounded-md rounded-l-none bg-zinc-900 p-2 py-2 text-2xl md:text-4xl">
        <IoIosList
          className={`${
            displayItem === "Tricks" ? "text-emerald-500" : "text-zinc-300"
          }`}
          onClick={() => setDisplayItem("Tricks")}
        />
        <IoIosPeople
          className={`${
            displayItem === "Users" ? "text-emerald-500" : "text-zinc-300"
          }`}
          onClick={() => setDisplayItem("Users")}
        />
        <span
          onClick={() => setDisplayItem("SessionSummaries")}
          className={`${
            displayItem === "SessionSummaries"
              ? "text-emerald-500"
              : "text-zinc-300"
          } text-center font-titan text-xl md:text-2xl`}
        >
          S
        </span>
        <span
          onClick={() => setDisplayItem("TrickPoints")}
          className={`${
            displayItem === "TrickPoints" ? "text-emerald-500" : "text-zinc-300"
          } text-center font-titan text-xl md:text-2xl`}
        >
          TP
        </span>
      </div>
      <div>
        {displayItem === "Tricks" && (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <DataList />
          </Suspense>
        )}
        {displayItem === "Users" && (
          <Suspense fallback={<div>Loading...</div>}>
            <UserList />
          </Suspense>
        )}
        {displayItem === "SessionSummaries" && (
          <Suspense fallback={<div>Loading...</div>}>
            <SessionSummariesOverview />
          </Suspense>
        )}
        {displayItem === "TrickPoints" && (
          <Suspense fallback={<div>Loading...</div>}>
            <TrickPointEditor />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default AdminDisplay;
