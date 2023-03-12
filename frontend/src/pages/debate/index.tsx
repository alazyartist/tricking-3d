import React from "react";

const DebatePage = () => {
  return (
    <div className="mt-14 flex h-[80vh] w-full flex-col place-items-center gap-2 p-4">
      <div className="h-[150px] w-full rounded-md bg-sky-300">test</div>
      <div className="grid h-full w-full grid-cols-2 gap-2">
        <div className="flex h-full w-full flex-col gap-2 rounded-md bg-red-300 p-2">
          {[1, 2, 3].map((m) => (
            <MessageDisplay />
          ))}
        </div>
        <div className="flex h-full w-full flex-col gap-2 rounded-md bg-red-500 p-2">
          {[1, 2, 3].map((m) => (
            <MessageDisplay />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebatePage;

const MessageDisplay = () => {
  return (
    <div className="flex rounded-md bg-zinc-500">
      <div className="h-6 w-6 rounded-full bg-indigo-600"></div>
      <div>Test message text here</div>
    </div>
  );
};
