import { useRouter } from "next/router";
import React from "react";

const CompareSessions = () => {
  const router = useRouter();
  const { sessions } = router.query;
  console.log(typeof sessions, sessions);
  return (
    <div className="text-zinc-300">
      CompareSessions
      <div>
        {Array.isArray(sessions)
          ? sessions.map((s) => <div className="p-2">{s}</div>)
          : sessions}
      </div>
    </div>
  );
};

export default CompareSessions;
