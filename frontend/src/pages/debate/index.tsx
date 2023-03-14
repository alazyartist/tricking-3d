import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import React, { useState } from "react";

const DebatesOverview = () => {
  const { data: debates, isSuccess } = trpc.debates.getAll.useQuery();
  const [debateCreationOpen, setDebateCreationOpen] = useState(false);
  return (
    <div className="backrop-blur-xl no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 pt-14 font-inter text-zinc-300">
      <div className="flex w-full justify-between">
        <div className=" text-4xl ">Debates</div>
        <button
          onClick={() => {
            setDebateCreationOpen(true);
          }}
          className="rounded-md bg-sky-500 p-2"
        >
          Start Debate
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isSuccess &&
          debates.map((debate) => {
            return <DebateCard debate={debate} />;
          })}
      </div>
      {debateCreationOpen && (
        <OpenNewDebate setDebateCreationOpen={setDebateCreationOpen} />
      )}
    </div>
  );
};

export default DebatesOverview;
const DebateCard = ({ debate }) => {
  return (
    <Link
      href={`/debate/${debate?.debateid}`}
      className={`${
        debate.closed ? "opacity-60" : ""
      } flex flex-col rounded-md bg-zinc-800 p-4 `}
      key={debate.debateid}
    >
      <div className="text-xl">{debate.title}</div>
      <div className="text-xs">{debate.topic}</div>
      <div className="flex place-items-center justify-between">
        <div className="pt-3 text-xs text-zinc-400">
          {debate.createdAt.toDateString()}
        </div>
        <div className="">{debate.closed && debate.verdict}</div>
        {/* <div className=" flex">
            {[1, 2, 3].map((d) => {
              return (
                <div className=" -mr-2 h-4 w-4 flex-shrink-0 rounded-full border-[1px] border-zinc-800 bg-sky-300" />
              );
            })}
          </div> */}
      </div>
    </Link>
  );
};
const OpenNewDebate = ({ setDebateCreationOpen }) => {
  const userInfo = useUserStore((s) => s.userInfo);
  const { mutate: openDebate } = trpc.debates.openDebate.useMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    openDebate({
      title: debateDetails.title,
      topic: debateDetails.topic,
      user_id: userInfo.uuid,
    });
    console.log("Starting New Debate");
    setDebateCreationOpen(false);
  };
  const [debateDetails, setDebateDetails] = useState({
    title: "",
    topic: "",
    media: "",
  });

  return (
    <div className="absolute top-[10vh] left-[10vw] flex h-[80vh] w-[80vw] flex-col bg-zinc-800">
      <button
        type="button"
        onClick={() => setDebateCreationOpen(false)}
        className="p-2 text-3xl"
      >
        X
      </button>
      <div className="p-2 text-3xl">Start New Debate</div>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        <div>Debate Title</div>
        <input
          value={debateDetails.title}
          onChange={(e) =>
            setDebateDetails((prev) => ({ ...prev, title: e.target.value }))
          }
          className="bg-zinc-900 p-2"
        />
        <div>Topic</div>
        <textarea
          value={debateDetails.topic}
          onChange={(e) =>
            setDebateDetails((prev) => ({ ...prev, topic: e.target.value }))
          }
          className="bg-zinc-900 p-2"
        />
        <div>Example(media)</div>
        <input
          value={debateDetails.media}
          className="bg-zinc-900 p-2"
          type={"text"}
        />
        <div className="flex flex-col place-items-center">
          <button className="rounded-md bg-sky-500 p-2">Start Debate</button>
        </div>
      </form>
    </div>
  );
};

// let testData = [
//     {
//       debateid: "somestring",
//       title: "DebateTitle",
//       topic:
//         "DebateTopic would traditionally be much longer than you would expect the titles to be",
//       createdAt: new Date().toDateString(),
//       updatedAt: new Date().toDateString(),
//       closed: false,
//       verdict: "Nay",
//     },
//     {
//       debateid: "someotherstring",
//       title: "DebateTitle2",
//       topic:
//         "DebateTopic would traditionally be much longer than you would expect the titles to be2",
//       createdAt: new Date().toDateString(),
//       updatedAt: new Date().toDateString(),
//       closed: true,
//       verdict: "Nay",
//     },
//     {
//       debateid: "someotherstring2",
//       title: "DebateTitle2",
//       topic:
//         "DebateTopic would traditionally be much longer than you would expect the titles to be2",
//       createdAt: new Date().toDateString(),
//       updatedAt: new Date().toDateString(),
//       closed: true,
//       verdict: "Yay",
//     },
//     {
//       debateid: "someotherstring3",
//       title: "DebateTitle2",
//       topic:
//         "DebateTopic would traditionally be much longer than you would expect the titles to be2",
//       createdAt: new Date().toDateString(),
//       updatedAt: new Date().toDateString(),
//       closed: false,
//       verdict: "Nay",
//     },
//     {
//       debateid: "someotherstring4",
//       title: "DebateTitle2",
//       topic:
//         "DebateTopic would traditionally be much longer than you would expect the titles to be2",
//       createdAt: new Date().toDateString(),
//       updatedAt: new Date().toDateString(),
//       closed: true,
//       verdict: "Yay",
//     },
//   ];
