import React, {
  Fragment,
  useEffect,
  useRef,
  createElement,
  useState,
  useCallback,
} from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";
import "@algolia/autocomplete-theme-classic";
import "../autocomplete.css";
import { useSessionSummariesStore } from "./components/sessionreview/SessionSummaryStore";
import useGetTricks from "../api/useGetTricks";
import { useTrickMakerStore } from "./components/trickMaker/TrickMakerStore";
import { handleSlash } from "./components/sessionreview/CommandBar";

const DataListCommandBar = () => {
  const { data: tricks } = useGetTricks();
  return (
    <div className="fixed bottom-[48px] left-[20vw] h-[8vh] w-[60vw] rounded-md rounded-b-none bg-zinc-900 p-2 font-titan text-zinc-400 md:left-[20vw] md:w-[60vw] lg:left-[35vw] lg:w-[30vw]">
      <Autocomplete
        tricks={tricks}
        defaultActiveItemId="0"
        placeholder="/ to open cmdBar"
        openOnFocus={true}
        autoFocus={true}
      />
    </div>
  );
};
const getQueryPattern = (query: string, flags = "i") => {
  const pattern = new RegExp(
    `(${query
      .trim()
      .toLowerCase()
      .split(" ")
      .map((token) => `${token}`)
      .join("|")})`,
    flags
  );
  return pattern;
};
const Autocomplete = (props: any) => {
  let tricks = props.tricks;
  const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
  const setTrickMakerOpen = useSessionSummariesStore(
    (s) => s.setTrickMakerOpen
  );
  const setName = useTrickMakerStore((s) => s.setName);
  const setBase_id = useTrickMakerStore((s) => s.setBase_id);
  const setVariationsArr = useTrickMakerStore((s) => s.setVariationsArr);
  const setTakeoffStance = useTrickMakerStore((s) => s.setTakeoffStance);
  const setLandingStance = useTrickMakerStore((s) => s.setLandingStance);
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
      detachedMediaQuery: "none",
      // detachedMediaQuery: "",
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
        if (trickMakerOpen) {
          return [
            {
              sourceId: "actions",
              templates: {
                item({ item }: any) {
                  return (
                    <div>
                      <span>{item?.label}</span>
                      <span>{item.placeholder}</span>
                    </div>
                  );
                },
              },
              onSelect(params: any) {
                const { item, setQuery } = params;
                item.onSelect(params);
                setQuery("");
              },
              getItems() {
                const pattern = getQueryPattern(query);

                return [
                  {
                    label: "/exit",
                    placeholder: " close trickMaker",
                    onSelect: (params) => {
                      setTrickMakerOpen(false);
                    },
                  },
                  {
                    label: "/save",
                    placeholder: " save trick",
                    onSelect: (params) => {
                      //call api here
                    },
                  },
                ].filter((t) => pattern.test(t.label));
              },
            },
          ];
        } else
          return [
            {
              sourceId: "actions",
              templates: {
                item({ item }: any) {
                  return (
                    <div>
                      <span>{item?.label}</span>
                      <span>{item.placeholder}</span>
                    </div>
                  );
                },
              },
              onSelect(params: any) {
                const { item, setQuery } = params;
                item.onSelect(params);
                setQuery("");
              },
              getItems() {
                const pattern = getQueryPattern(query);

                return [
                  {
                    label: "/m",
                    placeholder: " open trickMaker",
                    onSelect: (params) => {
                      setTrickMakerOpen(true);
                    },
                  },
                ].filter((t) => pattern.test(t.label));
              },
            },
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
                  return tricks
                    ?.filter((t) => pattern.test(t.name))
                    ?.sort((a, b) => {
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
                setTrickMakerOpen(true);
                setName(item.name);
                setBase_id(item.base_id);
                let Varray = item.Variations.map((v) => v.Variation);

                setVariationsArr(Varray);
                setTakeoffStance(item.takeoffStance);
                setLandingStance(item.landingStance);
                // item.onSelect(params);
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
  }, [props, tricks, trickMakerOpen]);

  return (
    <>
      <div id="commandbar" ref={commandBarRef} />
    </>
  );
};
export default DataListCommandBar;
