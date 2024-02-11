import React from "react";
import { useRouter } from "next/router";
const TheoryIndexInstructions = () => {
  const nav = useRouter();
  return (
    <div className="text-center font-virgil text-xl text-zinc-300">
      <div className="font-inter">Above is the anatomy of a Combo</div>
      <div
        className="mb-6 text-base font-thin
			"
      >
        Click on an element to learn more!
      </div>
      <ul className="flex flex-col gap-3 font-light">
        <li
          onClick={() => nav.push("/theory/anatomy")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Anatomy of a Trick
        </li>
        <li
          onClick={() => nav.push("/theory/setups")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Setups
        </li>

        <li
          onClick={() => nav.push("/theory/bases")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Bases
        </li>

        <li
          onClick={() => nav.push("/theory/vertKicks")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Kicks
        </li>
        <li
          onClick={() => nav.push("/theory/tricks")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Tricks
        </li>
        <li
          onClick={() => nav.push("/theory/transitions")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Transitions
        </li>
        <li
          onClick={() => nav.push("/theory/stances")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Stances
        </li>
        <li
          onClick={() => nav.push("/terms")}
          className="rounded-xl border-2 border-zinc-500 p-2"
        >
          Glossary
        </li>
      </ul>
    </div>
  );
};

export default TheoryIndexInstructions;
