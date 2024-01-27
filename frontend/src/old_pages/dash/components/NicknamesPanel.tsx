import { MdClose } from "@data/icons/MdIcons";
import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NicknamesPanel = () => {
  const { data: nicknames } = trpc.trick.getDashNicknames.useQuery();
  const { data: tricks } = trpc.trick.getTricks.useQuery();
  const [input_id, setInput_id] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const { register, handleSubmit, getValues, reset } = useForm<{
    nickname: string;
  }>();
  const { mutate: addNickname } = trpc.trick.addNickname.useMutation();
  const { mutate: updateNickname } = trpc.trick.updateNickname.useMutation();
  const { mutate: deleteNickname } = trpc.trick.removeNickname.useMutation();
  const onSubmit = (data) => {
    if (typeof input_id === "string") {
      addNickname({ nickname: data.nickname, trick_id: input_id });
    }
    if (typeof input_id === "number") {
      updateNickname({ nickname: data.nickname, id: input_id });
    }
    setInput_id(null);
    reset();
  };
  const handleDelete = (nickname) => {
    deleteNickname({ id: nickname.id });
    setDeleteMode(false);
  };

  if (!nicknames) return <div>loading...</div>;
  return (
    <div className="lg:no-scrollbar h-full max-h-[60vh] min-h-[50vh] w-full overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70 lg:h-[60vh] lg:max-h-[65vh]">
      <div className="flex w-full flex-col place-items-center gap-2 p-2">
        <div className="flex w-full gap-2">
          <h1 className="place-self-start p-2 text-zinc-200">Nicknames</h1>
          <button
            onClick={() => setDeleteMode(!deleteMode)}
            className={`${deleteMode ? "text-red-500" : "text-zinc-400"} `}
          >
            Delete Mode
          </button>
        </div>
        {Array.isArray(nicknames) &&
          nicknames
            ?.sort((a, b) => a?.nickname.localeCompare(b?.nickname))
            ?.map((nname) => (
              <div
                key={nname.trick_id}
                className="no-scrollbar flex h-fit w-full items-center justify-between gap-2 overflow-x-scroll rounded-md bg-zinc-800 p-2 "
              >
                {input_id === nname.id ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full gap-2"
                  >
                    <input
                      {...register("nickname", {
                        required: true,
                      })}
                      placeholder={nname.nickname}
                      className="w-[169px] rounded-md bg-zinc-700 p-2 text-xl text-zinc-200 placeholder-zinc-200"
                      type={"text"}
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-zinc-700 p-2 text-xl text-zinc-200"
                    >
                      add
                    </button>
                    <button
                      type={"button"}
                      onClick={() => setInput_id(null)}
                      className="rounded-md bg-zinc-700 px-2 text-xl text-zinc-200"
                    >
                      x
                    </button>
                  </form>
                ) : (
                  <div
                    onClick={() => setInput_id(nname.id)}
                    className="whitespace-nowrap rounded-md p-2 text-xl text-zinc-200 hover:bg-zinc-700"
                  >
                    {nname?.nickname}
                  </div>
                )}
                {deleteMode ? (
                  <button
                    onClick={() => handleDelete(nname)}
                    className="whitespace-nowrap rounded-md bg-red-200 p-2 text-xl text-red-700 "
                  >
                    Delete
                  </button>
                ) : (
                  <div className="text-md whitespace-nowrap text-zinc-300">
                    {nname?.trick?.name}
                  </div>
                )}
                <div className="text-md whitespace-nowrap text-zinc-400">
                  {nname.createdAt.toDateString()}
                </div>
              </div>
            ))}
        <h1 className="place-self-start p-2 text-zinc-200">Tricks</h1>
        {Array.isArray(tricks) &&
          tricks
            ?.sort((a, b) => a?.name.localeCompare(b?.name))
            ?.map(
              (trick) =>
                !nicknames.some((n) => n.trick_id === trick.trick_id) && (
                  <div
                    key={trick.trick_id}
                    className="no-scrollbar flex w-full items-center justify-between gap-2 overflow-x-scroll rounded-md bg-zinc-800 p-2"
                  >
                    {input_id === trick.trick_id ? (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full gap-2"
                      >
                        <input
                          {...register("nickname", {
                            required: true,
                          })}
                          placeholder={trick.name}
                          className="w-[169px] rounded-md bg-zinc-700 p-2 text-xl text-zinc-200 placeholder-zinc-200"
                          type={"text"}
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-zinc-700 p-2 text-xl text-zinc-200"
                        >
                          add
                        </button>
                        <button
                          type={"button"}
                          onClick={() => setInput_id(null)}
                          className="rounded-md bg-zinc-700 p-2 text-xl text-zinc-200"
                        >
                          x
                        </button>
                      </form>
                    ) : (
                      <div
                        onClick={() => setInput_id(trick.trick_id)}
                        className="whitespace-nowrap rounded-md p-2 text-xl text-zinc-200 hover:bg-zinc-700"
                      >
                        {trick?.displayName}
                      </div>
                    )}
                    <div className="text-md whitespace-nowrap text-zinc-300">
                      {trick?.name}
                    </div>
                  </div>
                )
            )}
      </div>
    </div>
  );
};

export default NicknamesPanel;
