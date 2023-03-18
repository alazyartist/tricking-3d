import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import useAblyStore from "../../../hooks/useAblyStore";
import { v4 as uuidv4 } from "uuid";
const ably = useAblyStore.getState().ably;

const DebatePage = () => {
  const router = useRouter();
  const { debateid } = router.query;
  const { data: debateDetails, isSuccess } = trpc.debates.findById.useQuery({
    debateid: debateid as string,
  });
  const { mutate: deleteDebate } = trpc.debates.deleteDebate.useMutation();
  const { uuid } = useUserStore((s) => s.userInfo);
  const [messages, updateMessages] = useState([]);
  const [seeExample, setSeeExample] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const debateChannel = ably.channels.get(`debate-${debateid}`);

  ably.connection.once("connected", () => {
    //@ts-ignore
    const { tokenDetails } = ably.auth;
    console.log("Client connected to Ably using JWT", tokenDetails);
  });
  useEffect(() => {
    const subscribe = async () => {
      await debateChannel.subscribe(`message`, (m) => {
        updateMessages([...messages, m.data]);
        console.log(m, messages);
      });
    };
    subscribe();

    return () => debateChannel.unsubscribe();
  });
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    if (debateDetails?.messages) {
      updateMessages((prev) =>
        Array.from(new Set(debateDetails?.messages)).sort((a, b) =>
          a.updatedAt < b.updatedAt ? -1 : 1
        )
      );
    }
  }, [debateDetails]);

  const handleDelete = () => {
    deleteDebate({
      user_id: uuid,
      debateid: debateDetails.debateid,
    });
    setDeleteCheck(false);
    router.push("/debate");
  };
  if (!isSuccess) return <div>Loading..</div>;

  return (
    <>
      <div className="backrop-blur-xl no-scrollbar flex h-[80vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter">
        <Link href={"/debate"} className={"text-4xl text-zinc-300"}>
          Debates
        </Link>
        <div className=" h-fit w-full rounded-md bg-zinc-800 bg-opacity-40 p-2 text-xl text-zinc-100">
          {debateDetails?.title}
          <p className="text-xs">{debateDetails?.topic}</p>
          <button
            onClick={() => setSeeExample((prev) => !prev)}
            type="button"
            className="text-[10px]"
          >
            {seeExample ? "hide" : "see"} example...
          </button>
          {seeExample && (
            <div className="p-2">
              <div className="aspect-video h-[200px] w-full overflow-clip rounded-md">
                <ReactPlayer
                  config={{ facebook: { appId: "508164441188790" } }}
                  id={"video"}
                  controls={true}
                  muted
                  width={"100%"}
                  height={"100%"}
                  loop
                  playsInline
                  url={debateDetails?.media}
                />
              </div>
            </div>
          )}
          {uuid === debateDetails?.host?.uuid && !deleteCheck ? (
            <div className="flex gap-2">
              <button className="rounded-md  px-2 text-xs text-zinc-400">
                edit
              </button>
              <button
                onClick={() => setDeleteCheck(true)}
                className="rounded-md  px-2 text-xs text-red-400"
              >
                delete
              </button>
            </div>
          ) : (
            <DeleteCheck
              deleteCheck={deleteCheck}
              setDeleteCheck={setDeleteCheck}
              handleDelete={handleDelete}
            />
          )}
        </div>
        <div className={` grid grid-cols-2 gap-2`}>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-emerald-300`}
          >
            Yay {messages.filter((m) => m?.vote === "Yay").length}
          </div>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-red-300`}
          >
            {messages.filter((m) => m?.vote === "Nay").length} Nay
          </div>
        </div>
        <div className="mb-4 grid h-full w-full grid-cols-2 gap-2">
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-emerald-300 bg-opacity-40 p-2">
            {messages.map((m) => (
              <MessageDisplay
                hidden={m.vote === "Nay"}
                message={m}
                side={"left"}
              />
            ))}
          </div>
          <div className="flex h-full w-full flex-col gap-2 rounded-md border-[1px] border-red-300 bg-opacity-40 p-2">
            {messages.map((m) => (
              <MessageDisplay
                hidden={m.vote === "Yay"}
                side={"right"}
                message={m}
              />
            ))}
          </div>
          {/* <div className=" h-fit w-full rounded-md bg-emerald-500 p-2"></div>
          <div className=" h-fit w-full rounded-md bg-red-500 p-2"></div> */}
        </div>
      </div>
      <MessageInput
        uuid={uuid}
        debateid={debateDetails.debateid}
        channel={debateChannel}
      />
    </>
  );
};

export default DebatePage;

const MessageDisplay = ({ side, message, hidden }) => {
  return (
    <div
      key={message?.messageid}
      className={`relative flex rounded-md bg-zinc-500 ${
        hidden ? "invisible" : ""
      }`}
    >
      {side === "left" && <div>{message?.message}</div>}
      <div
        className={`relative ${side}-1 bottom-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-600`}
      ></div>
      {side === "right" && <div>{message?.message}</div>}
      <p className="text-[10px]">{message?.anonHash}</p>
    </div>
  );
};

const MessageInput = ({ channel, debateid, uuid }) => {
  const { mutate: saveMessage } = trpc.debates.saveMessage.useMutation();
  const [message, setMessage] = useState("");
  const [vote, setVote] = useState("");
  const anonHash = generateAnonHash();
  console.log("anonHash", anonHash);
  const messageid = uuidv4();
  const handleSubmit = (e) => {
    e.preventDefault();
    saveMessage({
      vote: vote,
      message: message,
      user_id: uuid,
      debateid: debateid,
      anonHash: anonHash,
      messageid: messageid,
    });

    channel.publish("message", {
      anonHash: anonHash,
      vote: vote,
      message: message,
      messageid: messageid,
    });
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

const DeleteCheck = ({ deleteCheck, setDeleteCheck, handleDelete }) => {
  return (
    <div className="flex gap-2 text-sm">
      <div
        onClick={() => handleDelete()}
        className={`rounded-md bg-red-300 p-2 text-red-800`}
      >
        Delete
      </div>
      <div
        onClick={() => setDeleteCheck(false)}
        className={`rounded-md bg-emerald-300 p-2 text-emerald-800`}
      >
        Just Kidding
      </div>
    </div>
  );
};

const generateAnonHash = () => {
  const descriptor = [
    "Icy",
    "Nimble",
    "Mystic",
    "Thundering",
    "Quiet",
    "Loud",
    "Electric",
  ];
  const title = [
    "Champion",
    "Sultan",
    "Titan",
    "Wizard",
    "Gaurdian",
    "Troll",
    "Master",
  ];
  const trick = [
    "Corks",
    "Swings",
    "Dubs",
    "Kicks",
    "Twists",
    "Psueudoflips",
    "Variations",
    "Swipes",
    "Shurikens",
  ];
  const getidx = (arr) => Math.floor(Math.random() * arr?.length);
  return `${descriptor[getidx(descriptor)]} ${title[getidx(title)]} of ${
    trick[getidx(trick)]
  }`;
};
