"use client";
import { trpc } from "@utils/trpc";
import React, { useState, lazy, Suspense } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
const DataList = lazy(() => import("./DataList"));
const SessionSummariesOverview = lazy(
  () => import("./SessionSummariesOverview")
);
import * as terms from "../../data/Glossary.json";
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
        {displayItem === "Terms" && (
          <div>
            <TermDisplay />
          </div>
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
      <div
        onClick={() => setDisplayItem("Terms")}
        className={`${
          displayItem === "Terms" ? "text-emerald-500" : "text-zinc-300"
        } text-center font-titan text-xl md:text-2xl`}
      >
        Term
      </div>
    </div>
  );
};

const TermDisplay = () => {
  const [seeTerms, setSeeTerms] = useState(false);
  const { data } = trpc.glossary.getAll.useQuery();
  const preparedTerms = Object.keys(terms).map((term) => {
    return {
      term,
      definition: terms[term].toString(),
    };
  });
  console.log(preparedTerms);
  const { mutate: uploadTerms } = trpc.glossary.addInitialTerms.useMutation();

  return (
    <div className="flex flex-col place-items-center gap-2 ">
      <h1 onClick={() => setSeeTerms((p) => !p)}>Static JSON Terms</h1>
      {seeTerms &&
        Object.keys(terms).map((term) => {
          return (
            <div
              className="flex w-[60vw] flex-col gap-2 rounded-md bg-zinc-900 bg-opacity-70"
              key={term}
            >
              <h2 className="text-xl">{term}</h2>
              <p className="text-sm font-normal text-zinc-400">
                {terms[term].toString()}
              </p>
            </div>
          );
        })}
      <h1>Database Terms</h1>
      {data &&
        data.map((term) => {
          return (
            <div
              className="flex w-[60vw] flex-col gap-2 rounded-md bg-zinc-900 bg-opacity-70"
              key={term.term}
            >
              <h2 className="text-xl">{term.term}</h2>
              <p className="text-sm font-normal text-zinc-400">
                {term.definition}
              </p>
            </div>
          );
        })}
      {!data ||
        (data.length < 1 && (
          <button
            className="mb-14 rounded-xl bg-emerald-500 bg-opacity-70 p-4 py-2 text-xl"
            onClick={() => uploadTerms({ terms: preparedTerms })}
          >
            CLICK ME MOTHERFUCKER
          </button>
        ))}
    </div>
  );
};
