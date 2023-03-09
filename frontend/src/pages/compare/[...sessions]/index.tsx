import { useRouter } from "next/router";
import React from "react";

const CompareSessions = () => {
  const router = useRouter();
  const { sessions } = router.query;
  console.log(typeof sessions, sessions);
  return (
    <div className="text-zinc-300">
      CompareSessions
      <div className="mt-14 grid grid-cols-[1fr_3fr]">
        <div className="flex h-full w-full place-content-end place-items-center">
          Info
        </div>
        <div className="grid grid-cols-3 place-items-center">
          {Array.isArray(sessions)
            ? sessions.map((s) => <div className="p-2">{s}</div>)
            : sessions}
        </div>
        <div className="flex h-full w-full flex-col place-content-center place-items-end">
          {["most used", "favorite", "total tricks"].map((s) => (
            <div>{s}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 place-items-center">
          {[1, 2, 3].map((s) => (
            <div>
              <div>{s}</div>
              <div>{s}</div>
              <div>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareSessions;
