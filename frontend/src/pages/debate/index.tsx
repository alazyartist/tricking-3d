import React from "react";

const DebatePage = () => {
  let messagesYay = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
  let messagesNay = [1, 2, 3, 1, 1, 2, 3];

  return (
    <>
      <div className="backrop-blur-xl flex h-[80vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 pt-14 font-inter">
        <div className=" h-fit w-full rounded-md bg-zinc-100 bg-opacity-40 p-2 text-xl text-zinc-100">
          Proposition Here
          <p className="text-xs">
            This is where the general proposition for the debate will go it will
            show us a general overfiew of the information to be debated up on
            and should end with a yes or format.ex. Double-cork.mega should be
            worth more than Double-full-snapu
          </p>
        </div>
        <div className={` grid grid-cols-2 gap-2`}>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-emerald-300`}
          >
            Yay
          </div>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-red-300`}
          >
            Nay
          </div>
        </div>
        <div className="mb-4 grid h-full w-full grid-cols-2 gap-2">
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-emerald-300 bg-opacity-40 p-2">
            {messagesYay.map((m) => (
              <MessageDisplay side={"left"} />
            ))}
          </div>
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-red-300 bg-opacity-40 p-2 pt-12">
            {messagesNay.map((m) => (
              <MessageDisplay side={"right"} />
            ))}
          </div>
          <div className=" w-full rounded-md bg-emerald-500 p-2">
            {messagesYay.length}
          </div>
          <div className=" w-full rounded-md bg-red-500 p-2">
            {messagesNay.length}
          </div>
        </div>
      </div>
      <MessageInput />
    </>
  );
};

export default DebatePage;

const MessageDisplay = ({ side }) => {
  return (
    <div className="relative flex rounded-md bg-zinc-500">
      {side === "left" && <div>Test message text here</div>}
      <div
        className={`relative ${side}-1 bottom-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-600`}
      ></div>
      {side === "right" && <div>Test message text here</div>}
    </div>
  );
};

const MessageInput = () => {
  return (
    <div className="w-full p-4 pb-12">
      <input
        className="w-full rounded-md bg-zinc-700 p-2 text-zinc-300"
        placeholder="contribute to the debate"
      />
    </div>
  );
};
