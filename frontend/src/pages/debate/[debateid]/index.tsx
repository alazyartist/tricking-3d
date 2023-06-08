import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import useAblyStore from "../../../hooks/useAblyStore";
import { v4 as uuidv4 } from "uuid";
import { OpenNewDebate } from "..";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
const ably = useAblyStore.getState().ably;

const DebatePage = () => {
  const { isSignedIn, user } = useUser();
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const { data: userData } = trpc.userDB.findByClerkId.useQuery(
    { clerk_id: user?.id },
    {
      onSuccess(data) {
        setUserInfo({ ...data });
      },
    }
  );

  const router = useRouter();
  const { debateid } = router.query;
  const { data: debateDetails, isSuccess } = trpc.debates.findById.useQuery({
    debateid: debateid as string,
  });
  const { mutate: deleteDebate } = trpc.debates.deleteDebate.useMutation();
  const { mutate: closeDebate } =
    trpc.debates.closeOrReopenDebate.useMutation();
  const { uuid } = useUserStore((s) => s.userInfo);
  const [messages, updateMessages] = useState([]);
  const [seeExample, setSeeExample] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
      <div
        className={`backrop-blur-xl no-scrollbar flex h-[${
          debateDetails.closed ? "95vh" : "80vh"
        }] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter`}
      >
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
              <div className="flex aspect-video w-full overflow-clip rounded-md">
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
          {uuid === debateDetails?.host?.uuid && (
            <div className="flex gap-2">
              <button
                onClick={() => setEditOpen(true)}
                className="rounded-md  px-2 text-xs text-zinc-400"
              >
                edit
              </button>
              <button
                onClick={() => setDeleteCheck(true)}
                className="rounded-md  px-2 text-xs text-red-400"
              >
                delete
              </button>
              <button
                onClick={() =>
                  closeDebate({
                    debateid: debateDetails.debateid,
                    closed: !debateDetails.closed,
                  })
                }
                className={`rounded-md px-2 text-xs text-${
                  !debateDetails.closed ? "red" : "emerald"
                }-400`}
              >
                {debateDetails.closed ? "reopen" : "close"}
              </button>
            </div>
          )}
          {deleteCheck && (
            <DeleteCheck
              deleteCheck={deleteCheck}
              setDeleteCheck={setDeleteCheck}
              handleDelete={handleDelete}
            />
          )}
          {editOpen && (
            <OpenNewDebate
              setDebateCreationOpen={setEditOpen}
              opendebateDetails={debateDetails}
            />
          )}
        </div>
        <div className={` grid grid-cols-2 gap-2`}>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-emerald-300`}
          >
            Yay{" "}
            {
              Array.from(
                new Set(
                  messages
                    .filter((m) => m?.vote === "Yay")
                    .map((m) => m.user_id)
                )
              ).length
            }
          </div>
          <div
            className={`text-zinc h-fit bg-opacity-40 text-xl font-bold text-red-300`}
          >
            {
              Array.from(
                new Set(
                  messages
                    .filter((m) => m?.vote === "Nay")
                    .map((m) => m.user_id)
                )
              ).length
            }{" "}
            Nay
          </div>
        </div>
        <div className="mb-4 grid h-full w-full grid-cols-2 gap-2">
          <div className="flex h-full w-full flex-col gap-2 rounded-md  bg-opacity-40 p-2">
            {messages.map((m) => (
              <MessageDisplay
                closed={debateDetails.closed}
                hidden={m.vote === "Nay"}
                message={m}
                side={"right"}
              />
            ))}
          </div>
          <div className="flex h-full w-full flex-col gap-2 rounded-md  bg-opacity-40 p-2">
            {messages.map((m) => (
              <MessageDisplay
                closed={debateDetails.closed}
                hidden={m.vote === "Yay"}
                side={"left"}
                message={m}
              />
            ))}
          </div>
          {/* <div className=" h-fit w-full rounded-md bg-emerald-500 p-2"></div>
          <div className=" h-fit w-full rounded-md bg-red-500 p-2"></div> */}
        </div>
      </div>
      {!debateDetails.closed && (
        <SignedIn>
          <MessageInput
            uuid={uuid}
            debateid={debateDetails.debateid}
            channel={debateChannel}
          />
        </SignedIn>
      )}
      <SignedOut>
        <div className={`flex w-full flex-col place-items-center p-2 `}>
          <div
            // href={"/login"}
            className={` rounded-md bg-sky-400 p-2 text-3xl text-zinc-300`}
          >
            <SignInButton
              mode="modal"
              redirectUrl={`/debate/${debateid}`}
              children={"Login to contribute"}
            />
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default DebatePage;

const MessageDisplay = ({ side, message, hidden, closed }) => {
  let color = side === "left" ? "red" : "emerald";
  return (
    <div
      key={message?.messageid}
      className={` relative flex w-[70vw] flex-col rounded-md border-[1px] p-2 font-inter text-zinc-300 border-${color}-300 bg-${color}-200 border-opacity-40 bg-opacity-20 ${
        hidden ? "invisible" : ""
      } ${side === "right" ? "left-0 top-0" : "top-0 right-[27vw]"}`}
    >
      {message.media && (
        <div className="flex aspect-video w-full rounded-md  p-2">
          <ReactPlayer
            config={{ facebook: { appId: "508164441188790" } }}
            id={"video"}
            controls={true}
            muted
            width={"100%"}
            height={"100%"}
            loop
            playsInline
            url={message?.media}
          />
        </div>
      )}{" "}
      <div className={`leading-[1.15]`}>{message?.message}</div>
      <div
        className={`absolute bg-${color}-500 ${side}-1 bottom-1 h-4 w-4 flex-shrink-0 rounded-full`}
      >
        {closed && (
          <img
            className="h-4 w-4 rounded-full"
            src={
              message.user.profilePic !== null
                ? `/images/${message.user.uuid}/${message.user.profilePic}`
                : `/images/noimg.jpeg`
            }
          />
        )}
      </div>
      <p
        className={`min-h-8 text-[10px] ${
          side === "left" ? "place-self-end" : ""
        }`}
      >
        {closed ? message?.user?.username : message?.anonHash}
      </p>
    </div>
  );
};

const MessageInput = ({ channel, debateid, uuid }) => {
  const { mutate: saveMessage } = trpc.debates.saveMessage.useMutation();
  const [message, setMessage] = useState({
    message: "",
    media: "",
    mediaType: "",
  });
  const [vote, setVote] = useState("");
  const anonHash = generateAnonHash();
  console.log("anonHash", anonHash);
  const messageid = uuidv4();
  const handleSubmit = (e) => {
    e.preventDefault();
    saveMessage({
      vote: vote,
      message: message.message,
      user_id: uuid,
      debateid: debateid,
      anonHash: anonHash,
      messageid: messageid,
      media: message.media,
      mediaType: message.mediaType,
    });

    channel.publish("message", {
      anonHash: anonHash,
      vote: vote,
      message: message.message,
      messageid: messageid,
      media: message.media,
      mediaType: message.mediaType,
    });
    setMessage((prev) => ({ media: "", message: "", mediaType: "" }));
    setVote("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full p-4 pb-12">
      {(vote === "Yay" || vote === "Nay") && (
        <div>
          <div className={`grid grid-cols-[4fr_1fr] gap-2`}>
            <input
              value={message.message}
              onChange={(e) =>
                setMessage((prev) => ({ ...prev, message: e.target.value }))
              }
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
          {!message?.mediaType && (
            <div className="flex w-full place-items-center gap-2 py-2">
              {/* <button
              className="w-full"
              type="button"
              onClick={() =>
                setDebateDetails((prev) => ({ ...prev, mediaType: "Image" }))
              }
            >
              Image
            </button> */}
              <button
                className="w-full rounded-md bg-zinc-700 p-2 text-zinc-300"
                type="button"
                onClick={() =>
                  setMessage((prev) => ({ ...prev, mediaType: "Video" }))
                }
              >
                Add Video Link
              </button>
            </div>
          )}
          {message?.mediaType === "Video" && (
            <>
              <input
                onChange={(e) =>
                  setMessage((prev) => ({
                    ...prev,
                    media: e.target.value,
                  }))
                }
                value={message.media}
                className="w-full bg-zinc-900 p-2 text-zinc-300"
                type={"text"}
              />
              {message.media && (
                <div className="flex aspect-video w-full rounded-md bg-neutral-600 p-2">
                  <ReactPlayer
                    config={{ facebook: { appId: "508164441188790" } }}
                    id={"video"}
                    controls={true}
                    muted
                    width={"100%"}
                    height={"100%"}
                    loop
                    playsInline
                    url={message?.media}
                  />
                </div>
              )}
            </>
          )}
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
