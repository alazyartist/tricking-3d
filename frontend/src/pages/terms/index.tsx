import { trpc } from "@utils/trpc";
import React, { useState } from "react";
const TermsPage = () => {
  const { data } = trpc.glossary.getAll.useQuery();

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="no-scrollbar flex w-[100vw] flex-col place-items-center gap-2 p-2 text-zinc-300">
      <div className="sticky top-2 flex w-full gap-4 p-2 md:w-[60vw]">
        <div className="pb-2 text-2xl">Glossary</div>
        <input
          className="rounded-md bg-zinc-800 bg-opacity-70 p-2"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="minimalistScroll sticky flex h-[76vh] w-full flex-col place-items-center gap-2 overflow-y-scroll p-2">
        {data &&
          data
            .filter((term) =>
              //regex to match search term
              {
                const regex = new RegExp(searchTerm, "gi");
                return term.term.match(regex) || term.definition.match(regex);
              }
            )
            .sort((a, b) => {
              if (searchTerm !== "") {
                const regex = new RegExp(searchTerm, "gi");

                if (a.term.toLowerCase() === searchTerm.toLowerCase())
                  return -1;
                if (b.term.toLowerCase() === searchTerm.toLowerCase()) return 1;
                if (a.term.match(regex)) return -1;
                if (b.term.match(regex)) return 1;
              }
            })
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
        <div className="flex w-[60vw] flex-col gap-2 rounded-md bg-zinc-700 bg-opacity-70 text-center">
          end of results
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
