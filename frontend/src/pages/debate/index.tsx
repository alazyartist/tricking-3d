import { SignedIn, useUser } from "@clerk/nextjs";
import { debates } from "@prisma/client";
import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import ReactPlayer from "react-player";
import { v4 as uuidv4 } from "uuid";

const DebatesOverview = () => {
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

  const { data: debates, isSuccess } = trpc.debates.getAll.useQuery();
  const [debateCreationOpen, setDebateCreationOpen] = useState(false);
  return (
    <div className="backrop-blur-xl no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 pt-14 font-inter text-zinc-300">
      <div className="flex w-full justify-between">
        <div className=" text-4xl ">Debates</div>
        <SignedIn>
          <button
            onClick={() => {
              setDebateCreationOpen(true);
            }}
            className="rounded-md bg-sky-500 p-2"
          >
            Start Debate
          </button>
        </SignedIn>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isSuccess &&
          debates &&
          debates.map((debate) => {
            return <DebateCard key={debate.debateid} debate={debate} />;
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
  const userInfo = useUserStore((s) => s.userInfo);
  return (
    <Link
      href={`/debate/${debate?.debateid}`}
      className={`${
        debate.closed ? "opacity-60" : ""
      } flex flex-col rounded-md bg-zinc-800 p-4 `}
    >
      <div className="text-xl">{debate.title}</div>
      <div className="text-xs">{debate.topic}</div>
      <div className="flex place-content-center place-items-center justify-between pt-3">
        <div className="text-xs text-zinc-400">
          {debate.createdAt.toDateString()}
        </div>
        <div className="text-xs"></div>
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
type DebateProps = {
  setDebateCreationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  opendebateDetails?: debates;
};
export const OpenNewDebate: React.FC<DebateProps> = ({
  setDebateCreationOpen,
  opendebateDetails,
}) => {
  const userInfo = useUserStore((s) => s.userInfo);
  const { mutate: openDebate } = trpc.debates.openDebate.useMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    openDebate({
      title: debateDetails.title,
      topic: debateDetails.topic,
      media: debateDetails.media,
      mediaType: debateDetails.mediaType,
      user_id: userInfo.uuid,
      debateid: opendebateDetails?.debateid || uuidv4(),
    });
    console.log("Starting New Debate");
    setDebateCreationOpen(false);
  };
  const [debateDetails, setDebateDetails] = useState({
    title: opendebateDetails?.title || "",
    topic: opendebateDetails?.topic || "",
    media: opendebateDetails?.media || "",
    mediaType: opendebateDetails?.mediaType || "",
  });
  const isDisabled = debateDetails.title === "" || debateDetails.topic === "";
  return (
    <div className="no-scrollbar absolute top-[10vh] left-[10vw] z-[200] flex h-[80vh] w-[80vw] flex-col overflow-hidden overflow-y-scroll  rounded-md bg-zinc-800">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setDebateCreationOpen(false)}
          className="p-2 text-left text-3xl"
        >
          X
        </button>
        {!opendebateDetails && (
          <div className="flex place-items-center whitespace-nowrap p-2 text-2xl">
            Start New Debate
          </div>
        )}
      </div>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        <div>Debate Title</div>
        <input
          value={debateDetails.title}
          onChange={(e) =>
            setDebateDetails((prev) => ({ ...prev, title: e.target.value }))
          }
          className="bg-zinc-900 p-2 text-base"
        />
        <div>Topic</div>
        <textarea
          value={debateDetails.topic}
          onChange={(e) =>
            setDebateDetails((prev) => ({ ...prev, topic: e.target.value }))
          }
          className="bg-zinc-900 p-2 text-xs"
        />
        <div>Example</div>
        {!debateDetails?.mediaType && (
          <div className="flex w-full place-items-center gap-2">
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
              className="w-full"
              type="button"
              onClick={() =>
                setDebateDetails((prev) => ({ ...prev, mediaType: "Video" }))
              }
            >
              Add Video Link
            </button>
          </div>
        )}
        {debateDetails?.mediaType === "Video" && (
          <>
            <input
              onChange={(e) =>
                setDebateDetails((prev) => ({ ...prev, media: e.target.value }))
              }
              value={debateDetails.media}
              className="bg-zinc-900 p-2 text-xs"
              type={"text"}
            />
            {debateDetails.media && (
              <div className="aspect-video h-[200px] w-full rounded-md bg-neutral-600 p-2">
                <ReactPlayer
                  config={{ facebook: { appId: "508164441188790" } }}
                  id={"video"}
                  controls={true}
                  muted
                  width={"70vw"}
                  height={"40vw"}
                  loop
                  playsInline
                  url={debateDetails?.media}
                />
              </div>
            )}
          </>
        )}
        {debateDetails?.mediaType === "Image" && <UploadAttatchment />}
        <div className="flex flex-col place-items-center">
          <button
            disabled={isDisabled}
            className={`rounded-md  p-2 ${
              isDisabled ? "bg-zinc-700" : "bg-sky-500"
            }`}
          >
            {opendebateDetails ? "Update" : "Start"} Debate
          </button>
        </div>
      </form>
    </div>
  );
};

const UploadAttatchment = () => {
  const [file, setFile] = useState<File>();
  const [filename, setFilename] = useState<string | undefined>(
    "Add Attachment"
  );
  const { uuid } = useUserStore((s) => s.userInfo);
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file as File);
    formData.append("uuid", uuid as string);
    //send (formData)
  };
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e?.target?.files?.[0]);
    setFilename(e?.target?.files?.[0]?.name);
  };
  return (
    <form>
      <label
        className=" flex w-full place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300"
        placeholder="Add Attachment"
        htmlFor="profilePic"
      >
        {filename}
        <input
          onChange={onChange}
          id={"profilePic"}
          className="hidden"
          type={"file"}
          accept="image/png, image/jpeg"
        />
      </label>
      {/* <label
        className="mb-2 flex w-1/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300"
        htmlFor="upload"
      >
        Upload
        <input id="upload" className="hidden" type={"submit"} />
      </label> */}
    </form>
  );
};
