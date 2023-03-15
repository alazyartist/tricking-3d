import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import useAblyStore from "../../../hooks/useAblyStore";
const ably = useAblyStore.getState().ably;

const DebatePage = () => {
  const router = useRouter();
  const { debateid } = router.query;
  const { data: debateDetails, isSuccess } = trpc.debates.findById.useQuery({
    debateid: debateid as string,
  });
  const { uuid } = useUserStore((s) => s.userInfo);
  const [messages, updateMessages] = useState([]);
  const debateChannel = ably.channels.get(`debate-${debateid}`);

  ably.connection.once("connected", () => {
    //@ts-ignore
    const { tokenDetails } = ably.auth;
    console.log("Client connected to Ably using JWT", tokenDetails);
  });
  useEffect(() => {
    const subscribe = async () => {
      await debateChannel.subscribe(`message`, (m) => {
        updateMessages([...messages, m]);
        console.log(m, messages);
      });
    };
    subscribe();

    return () => debateChannel.unsubscribe();
  });
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  if (!isSuccess) return <div>Loading..</div>;

  return (
    <>
      <div className="backrop-blur-xl no-scrollbar flex h-[80vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter">
        <Link href={"/debate"} className={"text-4xl text-zinc-300"}>
          Debates
        </Link>
        <div className=" h-fit w-full rounded-md bg-zinc-100 bg-opacity-40 p-2 text-xl text-zinc-100">
          {debateDetails.title}
          <p className="text-xs">{debateDetails.topic}</p>
          <p className="text-[10px]">see example...</p>
        </div>
        <div className={` grid grid-cols-2 gap-2`}>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-emerald-300`}
          >
            Yay {messages.filter((m) => m.data.vote === "Yay").length}
          </div>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-red-300`}
          >
            {messages.filter((m) => m.data.vote === "Nay").length} Nay
          </div>
        </div>
        <div className="mb-4 grid h-full w-full grid-cols-2 gap-2">
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-emerald-300 bg-opacity-40 p-2">
            {messages
              .filter((m) => m.data.vote === "Yay")
              .map((m) => (
                <MessageDisplay message={m} side={"left"} />
              ))}
          </div>
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-red-300 bg-opacity-40 p-2 pt-12">
            {messages
              .filter((m) => m.data.vote === "Nay")
              .map((m) => (
                <MessageDisplay side={"right"} message={m} />
              ))}
          </div>
          {/* <div className=" h-fit w-full rounded-md bg-emerald-500 p-2"></div>
          <div className=" h-fit w-full rounded-md bg-red-500 p-2"></div> */}
        </div>
      </div>
      <MessageInput channel={debateChannel} />
    </>
  );
};

export default DebatePage;

const MessageDisplay = ({ side, message }) => {
  return (
    <div key={message?.id} className="relative flex rounded-md bg-zinc-500">
      {side === "left" && <div>{message?.data?.message}</div>}
      <div
        className={`relative ${side}-1 bottom-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-600`}
      ></div>
      {side === "right" && <div>{message?.data?.message}</div>}
    </div>
  );
};

const MessageInput = ({ channel }) => {
  const [message, setMessage] = useState("");
  const [vote, setVote] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (vote === "Yay") {
      channel.publish("message", { vote: "Yay", message: message });
    }
    if (vote === "Nay") {
      channel.publish("message", { vote: "Nay", message: message });
    }
    setMessage("");
    setVote("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full p-4 pb-12">
      {(vote === "Yay" || vote === "Nay") && (
        <div className={`grid grid-cols-[4fr_1fr] gap-2`}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md bg-zinc-700 p-2 text-zinc-300"
            placeholder="contribute to the debate"
          />
          <button
            className="w-full rounded-md  bg-sky-500 p-2 text-center text-xl text-sky-200"
            type="submit"
          >
            send
          </button>
        </div>
      )}
      {vote === "" && (
        <div className="flex w-full place-items-center gap-2 p-2">
          <button
            className="w-full rounded-md  bg-emerald-300 p-2 text-center text-xl text-emerald-800"
            type="button"
            onClick={() => setVote("Yay")}
          >
            Yay
          </button>
          <button
            className="w-full rounded-md bg-red-300  p-2 text-center text-xl text-red-800"
            type="button"
            onClick={() => setVote("Nay")}
          >
            Nay
          </button>
        </div>
      )}
    </form>
  );
};
