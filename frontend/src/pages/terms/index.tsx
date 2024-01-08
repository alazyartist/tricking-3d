import React, { useState } from "react";
import * as terms from "../../data/Glossary.json";
const TermsPage = () => {
  console.log(Object.keys(terms).length);
  const termArray = Object.keys(terms);
  const [filter, setFilter] = useState("");
  return (
    <div className="p-2 text-zinc-300">
      <div className="sticky top-2 p-2">
        <div className="pb-2 text-2xl">Glossary</div>
        <input
          className="rounded-md bg-zinc-800 bg-opacity-70 p-2"
          placeholder="Search"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div className="sticky flex h-[76vh] w-full flex-col gap-2 overflow-y-scroll p-2">
        {termArray
          .filter((key) => key.toLowerCase().includes(filter.toLowerCase()))
          .map((key) => {
            return (
              <div
                className="rounded-md bg-zinc-800 bg-opacity-70 p-2"
                key={key}
              >
                <p className="text-lg font-semibold">{key}</p>
                <p className="text-sm">{(terms?.[key]).toString()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TermsPage;
