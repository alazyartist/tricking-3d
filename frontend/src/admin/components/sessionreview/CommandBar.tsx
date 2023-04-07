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
import { useSessionSummariesStore } from "./SessionSummaryStore";
import useGetTricks from "../../../api/useGetTricks";
import { v4 as uuidv4 } from "uuid";
import {
  useChangeSessionStatus,
  useSaveSessionDetails,
} from "../../../api/useSessionSummaries";
import { useUserStore } from "@store/userStore";
import { trpc } from "../../../utils/trpc";
import { transitions, tricks } from "@prisma/client";
const CommandBar = ({ tricks, combos }) => {
  if (!tricks) return;
  if (!combos) return;
  return (
    <div className="absolute bottom-[44px] left-[10vw] z-[10] h-[8vh] w-[80vw] rounded-md rounded-b-none bg-zinc-900 p-2 font-titan text-zinc-400 md:left-[20vw] md:w-[60vw] lg:left-[35vw] lg:w-[30vw]">
      <Autocomplete
        classNames={{ panel: "custom-Panel" }}
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
export const handleSlash = (e) => {
  if (e.key !== "/" || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
  e.preventDefault();
  //@ts-ignore
  document.querySelector(".aa-Input")?.focus();
};
const getQueryPattern = (query, flags = "i") => {
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
  const { tricks, combos } = props;
  const adminuuid = useUserStore((s) => s?.userInfo?.uuid);
  const { mutate: changeSessionStatus } = useChangeSessionStatus();
  const { mutate: saveSessionDetails, data: saveResponse } =
    useSaveSessionDetails();
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const removeClipfromCombo = useSessionSummariesStore(
    (s) => s.removeClipfromCombo
  );
  const sessionSources = useSessionSummariesStore((s) => s.sessionSources);
  const setVidsrc = useSessionSummariesStore((s) => s.setVidsrc);
  const setCurrentTime = useSessionSummariesStore((s) => s.setCurrentTime);
  const currentTime = useSessionSummariesStore((s) => s.currentTime);
  const setSeekTime = useSessionSummariesStore((s) => s.setSeekTime);
  const setActiveClipData = useSessionSummariesStore((s) => s.setClipData);
  const sessionData = useSessionSummariesStore((s) => s.sessionData);
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const setClipCombo = useSessionSummariesStore((s) => s.setClipCombo);
  const setClipComboAppend = useSessionSummariesStore(
    (s) => s.setClipComboAppend
  );
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);
  const trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);

  const setTrickMakerOpen = useSessionSummariesStore(
    (s) => s.setTrickMakerOpen
  );
  const setVidIsPlaying = useSessionSummariesStore((s) => s.setVidIsPlaying);
  const setDetailsVisible = useSessionSummariesStore(
    (s) => s.setDetailsVisible
  );
  const setClipDetailsVisible = useSessionSummariesStore(
    (s) => s.setClipDetailsVisible
  );
  const timeRef = useRef(currentTime);
  const commandBarRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log(sessionData);
  // }, [sessionData]);
  const syncTime = useCallback(
    (time: number) => {
      setCurrentTime(time);
      setSeekTime(time);
      timeRef.current = time;
    },
    [currentTime]
  );
  useEffect(() => {
    if (saveResponse?.status === 200) {
      setSaveSuccessful(true);
      setTimeout(() => {
        setSaveSuccessful(false);
      }, 3000);
    }
  }, [saveResponse]);
  const handleSource = (e) => {
    if (
      !["0", "[", "]", "k", "j", "l"].includes(e.key) ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.metaKey
    ) {
      return;
    }
    if (e.key === "0") {
      e.preventDefault();
      setCount(0);
      // setVidsrc(sessionSources[0]?.vidsrc);
    }

    if (e.key === "[") {
      e.preventDefault();
      setCount((count) => (count > 0 ? count - 1 : 0));
    }

    if (e.key === "]") {
      e.preventDefault();
      setCount((count) => count + 1);
    }
    if (e.key === "k") {
      e.preventDefault();
      setVidIsPlaying();
    }
    if (e.key === "j") {
      e.preventDefault();
      // setSeekTime(parseInt(currentTime) - 5);
      syncTime((currentTime as number) - 5);
    }
    if (e.key === "l") {
      e.preventDefault();
      // setSeekTime(parseInt(currentTime) + 5);
      syncTime((currentTime as number) + 5);
    }
  };
  useEffect(() => {
    if (sessionSources) {
      setVidsrc(sessionSources[count % sessionSources?.length]?.vidsrc);
    }
  }, [count, sessionSources]);
  useEffect(() => {
    document.addEventListener("keyup", (e) => handleSlash(e));
    return () => document.removeEventListener("keyup", (e) => handleSlash(e));
  }, []);
  useEffect(() => {
    document.addEventListener("keyup", (e) => handleSource(e));
    return () => document.removeEventListener("keyup", (e) => handleSource(e));
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
                  // {
                  // 	label: "/t",
                  // 	placeholder: " setTakeoffStance",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
                  // {
                  // 	label: "/l",
                  // 	placeholder: " setLandingStance",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
                  // {
                  // 	label: "/b",
                  // 	placeholder: " setBase",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
                  // {
                  // 	label: "/v",
                  // 	placeholder: " addVariation",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
                  // {
                  // 	label: "/vr",
                  // 	placeholder: " removeVariation",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
                  // {
                  // 	label: "/k",
                  // 	placeholder: " switchType",
                  // 	onSelect: (params) => {
                  // 		//dosomething here
                  // 	},
                  // },
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
                    <p>
                      {item?.label} {item.placeholder}
                    </p>
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
                    label: "/h",
                    placeholder: " or press h to hideDetails",
                    onSelect: (params: any) => {
                      setDetailsVisible();
                    },
                  },
                  {
                    label: "/ha",
                    placeholder: " hide ActiveClip Detials",
                    onSelect: (params: any) => {
                      setClipDetailsVisible();
                    },
                  },
                  {
                    label: "/p",
                    placeholder: " or press k to play/pause",
                    onSelect: (params: any) => {
                      setVidIsPlaying();
                    },
                  },
                  {
                    label: "/c",
                    placeholder: "clear clipCombo",
                    onSelect: (params: any) => {
                      clearClipCombo();
                    },
                  },
                  {
                    label: "/cio",
                    placeholder: "clear in/out markers",
                    onSelect: (params: any) => {
                      setClipData({ startTime: 0, endTime: 0 });
                    },
                  },
                  {
                    label: "/m",
                    placeholder: "open TrickMaker",
                    onSelect: (params: any) => {
                      setTrickMakerOpen(true);
                    },
                  },
                  {
                    label: "/i",
                    placeholder: " set clipStart",
                    onSelect: (params) => {
                      console.log(timeRef);
                      setActiveClipData({
                        startTime: parseFloat(
                          useSessionSummariesStore
                            .getState()
                            .currentTime.toFixed(2)
                        ),
                      });
                    }, //
                  },
                  {
                    label: "/o",
                    placeholder: " set clipEnd",
                    onSelect: (params) => {
                      console.log(timeRef);
                      setActiveClipData({
                        endTime: parseFloat(
                          useSessionSummariesStore
                            .getState()
                            .currentTime.toFixed(2)
                        ),
                      });
                    },
                  },
                  {
                    label: "/s",
                    placeholder: "seekTo time",
                    onSelect: ({ itemInputValue }) => {
                      let seekTime = itemInputValue.split(" ")[1];
                      let time;
                      if (seekTime.includes(":")) {
                        let min = seekTime.split(":")[0];
                        let sec = seekTime.split(":")[1];
                        time = parseInt(min) * 60 + parseInt(sec);
                      } else {
                        time = seekTime;
                      }
                      console.log(time);
                      setSeekTime(time);
                      // console.log("selectVideo");
                      // document.getElementById("video").focus();
                    },
                  },
                  {
                    label: "/completed",
                    placeholder: " change status to completed",
                    onSelect: ({ itemInputValue }) => {
                      let status = "Reviewed";
                      changeSessionStatus(status);

                      // console.log("selectVideo");
                      // document.getElementById("video").focus();
                    },
                  },
                  {
                    label: "/in review",
                    placeholder: " change status to In Review",
                    onSelect: ({ itemInputValue }) => {
                      let status = "In Review";
                      changeSessionStatus(status);

                      // console.log("selectVideo");
                      // document.getElementById("video").focus();
                    },
                  },
                  {
                    label: "/b",
                    placeholder: "set bail amount",
                    onSelect: ({ itemInputValue }) => {
                      let bailAmount = itemInputValue.split(" ")[1];
                      if (bailAmount > 5) {
                        bailAmount = 5;
                      }
                      if (bailAmount < 1) {
                        bailAmount = 0;
                      }
                      setClipData({ bail: bailAmount });
                    },
                  },
                  {
                    label: "/r",
                    placeholder: "remove item",
                    onSelect: ({ itemInputValue }) => {
                      let index = itemInputValue.split(" ")[1];
                      removeClipfromCombo(index - 1);
                    },
                  },
                  {
                    label: "/save",
                    placeholder: "saveSessionDetails",
                    onSelect: ({ itemInputValue }) => {
                      setSaveSuccessful(false);
                      saveSessionDetails({
                        sessionData,
                        sessionid:
                          useSessionSummariesStore.getState().sessionid,
                      });
                    },
                  },
                  {
                    label: "/a",
                    placeholder: "add clip to sesison",
                    onSelect: ({ itemInputValue }) => {
                      let combo = useSessionSummariesStore.getState().clipCombo;
                      let name = combo.map((c) => c.name).join(">");
                      setClipData({
                        id: uuidv4(),
                        admin: adminuuid as string,
                        clipLabel: combo,
                        name: name,
                        sessionid:
                          useSessionSummariesStore.getState().sessionid,
                        srcid: useSessionSummariesStore.getState().srcid,
                        vidsrc: useSessionSummariesStore.getState().vidsrc,
                      });
                      setSessionData(
                        useSessionSummariesStore.getState().clipData
                      );
                      setClipData({
                        name: "",
                        startTime: 0,
                        endTime: 0,
                        clipLabel: [],
                        srcid: "",
                        vidsrc: "",
                        bail: 0,
                      });
                      clearClipCombo();
                    },
                  },
                ]
                  ?.sort((a, b) => {
                    if (a.label?.length < b.label?.length) return -1;
                    if (a.label?.length > b.label?.length) return 1;
                    if (a.label > b.label) return 1;
                    if (a.label < b.label) return -1;
                    //check your filters
                    //then check the length

                    return 0;
                  })
                  ?.filter((i) => pattern.test(i.label));
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
                          <p className="text-2xs">{item.fromLeg}</p>
                          <p className="text-2xs">{item.toLeg}</p>
                        </span>
                      </span>
                    );
                  }
                  return (
                    <span className="flex justify-between">
                      <p>{item.name}</p>
                      <p>{item.type}</p>
                    </span>
                  );
                },
              },
              getItems: async () => {
                const pattern = getQueryPattern(query);
                await tricks;
                if (query.length > 0) {
                  return tricks
                    ?.filter((t) => pattern.test(t.name))
                    ?.sort((a, b) => {
                      if (a.name?.length < b.name?.length) return -1;
                      if (a.name?.length > b.name?.length) return 1;
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
                    if (a.name?.length < b.name?.length) return -1;
                    if (a.name?.length > b.name?.length) return 1;
                    //check your filters
                    //then check the length

                    return 0;
                  });
              },
              onSelect(params) {
                const { item, setQuery } = params;
                console.log(item);
                setClipCombo(item);
                // item.onSelect(params);
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
                    <span className="flex h-fit w-full justify-between">
                      <p className="w-full p-2">
                        {item?.comboArray?.length &&
                          item?.comboArray?.map((t, i) => (
                            <span key={item.comboid}>
                              {t.name}
                              {i !== item.comboArray?.length - 1 && ">"}
                            </span>
                          ))}
                      </p>
                      {/* <p>{item?.shorthand}</p> */}
                      {/* <span className="flex gap-2">
                          <p className="text-2xs">{item.fromLeg}</p>
                          <p className="text-2xs">{item.toLeg}</p>
                        </span> */}
                    </span>
                  );
                },
              },
              getItems: async () => {
                const pattern = getQueryPattern(query);
                await combos;
                if (query.length > 0) {
                  return combos
                    ?.filter((t) => pattern.test(t?.name))
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
              onSelect(params) {
                const { item, setQuery } = params;
                console.log(item);
                setClipComboAppend(item?.comboArray as any[]);
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
  }, [props, tricks, combos, trickMakerOpen, sessionData]);

  return (
    <>
      <div>{saveSuccessful && saveResponse?.data}</div>
      <div id="commandbar" ref={commandBarRef} />
    </>
  );
};
export default CommandBar;

export function ProductItem({ hit, components }) {
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}
