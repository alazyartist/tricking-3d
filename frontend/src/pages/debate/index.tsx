import React from "react";

const DebatesOverview = () => {
  let testData = [
    {
      debateid: "somestring",
      title: "DebateTitle",
      topic:
        "DebateTopic would traditionally be much longer than you would expect the titles to be",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      closed: false,
      verdict: "Nay",
    },
    {
      debateid: "someotherstring",
      title: "DebateTitle2",
      topic:
        "DebateTopic would traditionally be much longer than you would expect the titles to be2",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      closed: true,
      verdict: "Nay",
    },
    {
      debateid: "someotherstring",
      title: "DebateTitle2",
      topic:
        "DebateTopic would traditionally be much longer than you would expect the titles to be2",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      closed: true,
      verdict: "Yay",
    },
    {
      debateid: "someotherstring",
      title: "DebateTitle2",
      topic:
        "DebateTopic would traditionally be much longer than you would expect the titles to be2",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      closed: false,
      verdict: "Nay",
    },
    {
      debateid: "someotherstring",
      title: "DebateTitle2",
      topic:
        "DebateTopic would traditionally be much longer than you would expect the titles to be2",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      closed: true,
      verdict: "Yay",
    },
  ];
  const debates = testData;
  return (
    <div className="backrop-blur-xl no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 pt-14 font-inter text-zinc-300">
      <div className="place-self-start  text-4xl ">Debates</div>
      <div className="grid grid-cols-2 gap-4">
        {debates.map((debate) => {
          return (
            <div
              className={`${
                debate.closed ? "opacity-60" : ""
              } flex flex-col rounded-md bg-zinc-800 p-4 `}
              key={debate.debateid}
            >
              <div className="text-xl">{debate.title}</div>
              <div className="text-xs">{debate.topic}</div>
              <div className="flex place-items-center justify-between">
                <div className="pt-3 text-xs text-zinc-400">
                  {debate.createdAt}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebatesOverview;
