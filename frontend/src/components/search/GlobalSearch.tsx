import React, { Fragment, useEffect, useRef, createElement } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
// import "@algolia/autocomplete-theme-classic";
import { handleSlash } from "../../admin/components/sessionreview/CommandBar";
import useGetTricks from "@api/useGetTricks";

import { trpc } from "@utils/trpc";
import { getQueryPattern } from "../../admin/DataListCommandBar";
const GlobalSearch = () => {
  const { data: tricks } = trpc.trick.findAll.useQuery();
  const { data: transitions } = trpc.trick.findAllTransitions.useQuery();
  const { data: stances } = trpc.trick.findAllStances.useQuery();
  // console.log(tricks.tricks);
  useEffect(() => {
    console.log(document.getElementsByClassName("aa-Panel"));
  });
  const { data: combos } = trpc.combos.getAll.useQuery();
  return (
    <div>
      <Autocomplete
        transitions={transitions}
        stances={stances}
        tricks={tricks}
        combos={combos}
        defaultActiveItemId="0"
        placeholder="/ to open cmdBar"
        openOnFocus={true}
        autoFocus={true}
      />
    </div>
  );
};

const Autocomplete = (props: any) => {
  const { tricks, combos, stances, transitions } = props;
  const commandBarRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  console.log(commandBarRef);
  useEffect(() => {
    document.addEventListener("keyup", (e) => handleSlash(e));
    return () => document.removeEventListener("keyup", (e) => handleSlash(e));
  }, []);
  useEffect(() => {
    if (!commandBarRef.current) {
      return undefined;
    }

    const search = autocomplete({
      // detachedMediaQuery: "none",
      detachedMediaQuery: "",
      container: commandBarRef.current,
      // plugins: [tagsPlugin],/
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }
        panelRootRef.current.render(children);
      },
      getSources: ({ query }) => {
        return [
          //   {
          //     sourceId: "actions",
          //     templates: {
          //       item({ item }: any) {
          //         return (
          //           <div>
          //             <span>{item?.label}</span>
          //             <span>{item.placeholder}</span>
          //           </div>
          //         );
          //       },
          //     },
          //     onSelect(params: any) {
          //       const { item, setQuery } = params;
          //       item.onSelect(params);
          //       setQuery("");
          //     },
          //     getItems() {
          //       const pattern = getQueryPattern(query);

          //       return [
          //         {
          //           label: "/m",
          //           placeholder: " open trickMaker",
          //           onSelect: (params) => {
          //           },
          //         },
          //       ].filter((t) => pattern.test(t.label));
          //     },
          //   },
          {
            sourceId: "Tricks",
            templates: {
              header() {
                return <p>Tricks</p>;
              },
              item({ item }: any) {
                if (item.type === "Transition") {
                  return (
                    <span className="flex justify-between">
                      <p>{item.name}</p>
                      <span className="flex gap-2">
                        <p>{item.pointValue}</p>
                        <p className="text-2xs">{item.fromLeg}</p>
                        <p className="text-2xs">{item.toLeg}</p>
                      </span>
                    </span>
                  );
                }
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2">
                      <p>{item.pointValue}</p>
                      <p>{item.type}</p>
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await tricks;
              if (!tricks) return [];
              if (query.length > 0) {
                return tricks
                  ?.filter((t) => pattern.test(t.name))
                  ?.sort((a, b) => {
                    if (a.name.length < b.name.length) return -1;
                    if (a.name.length > b.name.length) return 1;
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return tricks?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name.length < b.name.length) return -1;
                  if (a.name.length > b.name.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);

              setQuery("");
            },
          },
          {
            sourceId: "Combos",
            templates: {
              header() {
                return <p>Combos</p>;
              },
              item({ item }: any) {
                if (item.type === "Transition") {
                  return (
                    <span className="flex justify-between">
                      <p>{item.name}</p>
                      <span className="flex gap-2">
                        <p className="text-2xs">{item.fromLeg}</p>
                        <p className="text-2xs">{item.toLeg}</p>
                      </span>
                    </span>
                  );
                }
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2">
                      <p>{item.type}</p>
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await combos;
              if (!combos) return [];
              if (query.length > 0) {
                return combos
                  ?.filter((t) => pattern.test(t.name))
                  ?.sort((a, b) => {
                    if (a.name.length < b.name.length) return -1;
                    if (a.name.length > b.name.length) return 1;
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return combos?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name.length < b.name.length) return -1;
                  if (a.name.length > b.name.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);

              setQuery("");
            },
          },
          {
            sourceId: "Transitions",
            templates: {
              header() {
                return <p>Transitions</p>;
              },
              item({ item }: any) {
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2">
                      <p>{item.type}</p>
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await transitions;
              if (!transitions) return [];
              if (query.length > 0) {
                return transitions
                  ?.filter((t) => pattern.test(t.name))
                  ?.sort((a, b) => {
                    if (a.name.length < b.name.length) return -1;
                    if (a.name.length > b.name.length) return 1;
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return transitions?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name.length < b.name.length) return -1;
                  if (a.name.length > b.name.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);

              setQuery("");
            },
          },
          {
            sourceId: "Stances",
            templates: {
              header() {
                return <p>Stances</p>;
              },
              item({ item }: any) {
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2">
                      <p>{item.type}</p>
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await stances;
              if (!stances) return [];
              if (query.length > 0) {
                return stances
                  ?.filter((t) => pattern.test(t.name))
                  ?.sort((a, b) => {
                    if (a.name.length < b.name.length) return -1;
                    if (a.name.length > b.name.length) return 1;
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return stances?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name.length < b.name.length) return -1;
                  if (a.name.length > b.name.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);

              setQuery("");
            },
          },
        ];
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props, tricks]);

  return (
    <>
      <div id="commandbar" ref={commandBarRef} />
    </>
  );
};

export default GlobalSearch;
