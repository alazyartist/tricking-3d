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
      <AdminNav displayItem={displayItem} setDisplayItem={setDisplayItem} />
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

const AdminNav = ({ displayItem, setDisplayItem }) => {
  return (
    <div className="relative right-5 z-[100] mt-4 grid w-[80vw] grid-cols-4 justify-around gap-2 rounded-md rounded-l-none bg-zinc-900 p-2 px-4 text-2xl md:text-4xl">
      <div
        onClick={() => setDisplayItem("Tricks")}
        className="place-self-center"
      >
        <IoIosList
          color={
            displayItem === "Tricks" ? "rgb(16 185 129)" : "rgb(212 212 216)"
          }
        />
      </div>
      <div
        onClick={() => setDisplayItem("Users")}
        className="place-self-center"
      >
        <IoIosPeople
          color={
            displayItem === "Users" ? "rgb(16 185 129)" : "rgb(212 212 216)"
          }
        />
      </div>
      <div
        onClick={() => setDisplayItem("SessionSummaries")}
        className={`${
          displayItem === "SessionSummaries"
            ? "text-emerald-500"
            : "text-zinc-300"
        } text-center font-titan text-xl md:text-2xl`}
      >
        S
      </div>
      <div
        onClick={() => setDisplayItem("TrickPoints")}
        className={`${
          displayItem === "TrickPoints" ? "text-emerald-500" : "text-zinc-300"
        } text-center font-titan text-xl md:text-2xl`}
      >
        TP
      </div>
    </div>
  );
};
