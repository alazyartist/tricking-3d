import React, { Fragment, useEffect, useRef, createElement } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
// import "@algolia/autocomplete-theme-classic";
import { handleSlash } from "../../admin/components/sessionreview/CommandBar";
import useGetTricks from "@api/useGetTricks";

import { trpc } from "@utils/trpc";
import { getQueryPattern } from "../../admin/DataListCommandBar";
import { useRouter } from "next/router";
const GlobalSearch = ({
  searchOpen,
  tricks,
  transitions,
  stances,
  combos,
  users,
  sessionsummaries,
}) => {
  // const { data: tricks } = trpc.trick.findAll.useQuery();
  // const { data: transitions } = trpc.trick.findAllTransitions.useQuery();
  // const { data: stances } = trpc.trick.findAllStances.useQuery();
  // const { data: combos } = trpc.combos.getAll.useQuery();
  // const { data: users } = trpc.userDB.findAll.useQuery();
  // const { data: sessionsummaries } =
  //   trpc.sessionsummaries.getAllSessionSummaries.useQuery();

  return (
    <div>
      <Autocomplete
        classNames={{
          sourceHeader: "bg-zinc-800 rounded-md !p-4 text-zinc-300",
          detachedSearchButton: `${!searchOpen ? "invisible" : ""}`,
        }}
        sessionsummaries={sessionsummaries}
        transitions={transitions}
        stances={stances}
        tricks={tricks}
        combos={combos}
        users={users}
        defaultActiveItemId="0"
        placeholder="search everything"
        openOnFocus={true}
        autoFocus={true}
      />
    </div>
  );
};

const Autocomplete = (props: any) => {
  const router = useRouter();
  const { tricks, users, combos, stances, transitions, sessionsummaries } =
    props;
  const commandBarRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
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
      // plugins: [tagsPlugin],
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
                return <div className="">Tricks</div>;
              },
              item({ item }: any) {
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2 p-4">
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
                    if (a?.name?.length < b?.name?.length) return -1;
                    if (a?.name?.length > b?.name?.length) return 1;
                    if (a?.name > b?.name) return 1;
                    if (a?.name < b?.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return tricks?.sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  if (a.name?.length < b?.name?.length) return -1;
                  if (a.name?.length > b?.name?.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);
              router.push(`/tricks/${item.trick_id}`);

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
                return (
                  <span className="flex justify-between">
                    <p>{item?.name}</p>
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
                    if (a?.name?.length < b?.name?.length) return -1;
                    if (a?.name?.length > b?.name?.length) return 1;
                    if (a?.name > b?.name) return 1;
                    if (a?.name < b?.name) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return combos?.sort((a, b) => {
                  if (a?.name > b?.name) return 1;
                  if (a?.name < b?.name) return -1;
                  if (a?.name?.length < b?.name?.length) return -1;
                  if (a?.name?.length > b?.name?.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);
              router.push(`/combos/${item.combo_id}`);

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
          {
            sourceId: "Trickers",
            templates: {
              header() {
                return <p>Trickers</p>;
              },
              item({ item }: any) {
                return (
                  <span className="flex justify-between">
                    <p>{item.username}</p>
                    <span className="flex gap-2">
                      <img
                        className={"h-7 w-7 rounded-full"}
                        src={
                          item.profilePic !== null
                            ? `/images/${item.uuid}/${item.profilePic}`
                            : `/images/noimg.jpeg`
                        }
                      />
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await users;
              if (!users) return [];
              if (query.length > 0) {
                return users
                  ?.filter((t) => pattern.test(t.username))
                  ?.sort((a, b) => {
                    if (a.username.length < b.username.length) return -1;
                    if (a.username.length > b.username.length) return 1;
                    if (a.username > b.username) return 1;
                    if (a.username < b.username) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              } else
                return users?.sort((a, b) => {
                  if (a.username > b.username) return 1;
                  if (a.username < b.username) return -1;
                  if (a.username.length < b.username.length) return -1;
                  if (a.username.length > b.username.length) return 1;
                  //check your filters
                  //then check the length

                  return 0;
                });
            },
            onSelect(params: any) {
              const { item, setQuery } = params;
              console.log(item);
              router.push(`/userProfile/${item.uuid}`);

              setQuery("");
            },
          },
          {
            sourceId: "Samplers",
            templates: {
              header() {
                return <p>Samplers</p>;
              },
              item({ item }: any) {
                return (
                  <span className="flex justify-between">
                    <p>{item.name}</p>
                    <span className="flex gap-2">
                      <img
                        className={"h-7 w-7 rounded-full"}
                        src={
                          item.user.profilePic !== null
                            ? `/images/${item.user.uuid}/${item.user.profilePic}`
                            : `/images/noimg.jpeg`
                        }
                      />
                    </span>
                  </span>
                );
              },
            },
            getItems: async () => {
              const pattern = getQueryPattern(query);
              await sessionsummaries;
              if (!sessionsummaries) return [];
              if (query.length > 0) {
                return sessionsummaries
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
                return sessionsummaries?.sort((a, b) => {
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
              router.push(
                `/userProfile/${item.user.uuid}?sessionid=${item.sessionid}`
              );

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
  }, [props, tricks, transitions, stances, combos, users, sessionsummaries]);

  return (
    <>
      <div id="commandbar" ref={commandBarRef} />
    </>
  );
};

export default GlobalSearch;
