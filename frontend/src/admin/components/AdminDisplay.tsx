"use client";
import { trpc } from "@utils/trpc";
import React, { useState, lazy, Suspense } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
import { set, useForm } from "react-hook-form";
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
  const { data } = trpc.glossary.getAll.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [addTermOpen, setAddTermOpen] = useState(false);
  return (
    <div className="mb-14 flex flex-col place-items-center gap-2">
      <div className="flex gap-2">
        <input
          className="rounded-md bg-zinc-800 bg-opacity-70 p-2"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          className="rounded-md bg-zinc-800 bg-opacity-70 p-2"
          onClick={() => setAddTermOpen(true)}
        >
          Add
        </button>
      </div>
      {addTermOpen && (
        <div className="absolute left-1/2 top-20 z-[100] flex h-fit w-[60vw] -translate-x-1/2 transform flex-col place-content-center place-items-center gap-2 rounded-md bg-zinc-600 bg-opacity-70 p-2 backdrop-blur-md">
          <AddTermForm setAddTermOpen={setAddTermOpen} />
        </div>
      )}
      <h1>Database Terms</h1>
      {data &&
        data
          .filter((term) =>
            //regex to match search term
            {
              const regex = new RegExp(searchTerm, "gi");
              return term.term.match(regex) || term.definition.match(regex);
            }
          )

          .map((term) => {
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
    </div>
  );
};

const AddTermForm = ({ setAddTermOpen }) => {
  //useReactFormHook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: addTerm } = trpc.glossary.addTerm.useMutation();
  const onSubmit = (data) => {
    addTerm(data);
    setAddTermOpen(false);
  };
  return (
    <form
      className="flex w-full flex-col place-items-center gap-2 p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full  place-items-center gap-2">
        <label className="min-w-[25%] text-xl">Add Term</label>
        <input
          className="rounded-md bg-zinc-800 p-2 text-zinc-300"
          {...register("term")}
        />
      </div>
      <div className="flex w-full  place-items-center gap-2">
        <label className="min-w-[25%] text-xl">Add Definition</label>
        <textarea
          className=" w-[50%] rounded-md bg-zinc-800 p-2 text-zinc-300"
          {...register("definition")}
        />
      </div>
      <button
        className="rounde-md w-fit bg-zinc-900 p-2 text-zinc-300"
        type="submit"
      >
        Add Term
      </button>
    </form>
  );
};
