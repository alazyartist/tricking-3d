import { useSessionSummariesStore } from "./SessionSummaryStore";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@store/userStore";

const CommandBarControls = () => {
  const setClipData = useSessionSummariesStore((s) => s.setClipData);
  const setVidIsPlaying = useSessionSummariesStore((s) => s.setVidIsPlaying);
  const vidIsPlaying = useSessionSummariesStore((s) => s.vidIsPlaying);
  const adminuuid = useUserStore((s) => s?.userInfo?.uuid);
  const setSessionData = useSessionSummariesStore((s) => s.setSessionData);
  const clearClipCombo = useSessionSummariesStore((s) => s.clearClipCombo);

  const controls = [
    {
      title: "in",
      command: () =>
        setClipData({
          startTime: parseFloat(
            useSessionSummariesStore.getState().currentTime.toFixed(2)
          ),
        }),
    },
    {
      title: vidIsPlaying ? "pause" : "play",
      command: () => setVidIsPlaying(),
    },
    {
      title: "out",
      command: () =>
        setClipData({
          endTime: parseFloat(
            useSessionSummariesStore.getState().currentTime.toFixed(2)
          ),
        }),
    },
    {
      title: "save",
      command: () => console.log("save"),
    },
    {
      title: "clear",
      command: () => console.log("clear"),
    },
    {
      title: "add",
      command: () => {
        let combo = useSessionSummariesStore.getState().clipCombo;
        let name = combo.map((c) => c.name).join(">");
        setClipData({
          id: uuidv4(),
          admin: adminuuid as string,
          clipLabel: combo,
          name: name,
          sessionid: useSessionSummariesStore.getState().sessionid,
          srcid: useSessionSummariesStore.getState().srcid,
          vidsrc: useSessionSummariesStore.getState().vidsrc as string,
        });
        setSessionData(useSessionSummariesStore.getState().clipData);
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
    ,
  ];
  return (
    <div className="z-[-500] grid h-full max-h-[9vh] w-full grid-cols-3 place-content-center place-items-center justify-around gap-2">
      {controls.map((n) => (
        <button
          key={n.title}
          onClick={n.command}
          className="h-fit w-full  rounded-md border-[1px] border-b-2 border-zinc-100 border-opacity-30 p-1 text-center"
        >
          {n.title}
        </button>
      ))}
    </div>
  );
};

export default CommandBarControls;
