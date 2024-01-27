import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NicknamesPanel = () => {
  const { data: nicknames } = trpc.trick.getDashNicknames.useQuery();
  const { data: tricks } = trpc.trick.getTricks.useQuery();
  const [input_id, setInput_id] = useState(null);
  const { register, handleSubmit, getValues } = useForm<{ nickname: string }>();
  const onSubmit = (data) => {
    console.log({ nickname: data.nickname, trick_id: input_id }, data);
    setInput_id(null);
  };

  if (!nicknames) return <div>loading...</div>;
  return (
    <div className="lg:no-scrollbar h-full max-h-[60vh] min-h-[50vh] w-full overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-70 lg:h-[60vh] lg:max-h-[65vh]">
      <h1 className="p-2 text-zinc-200">Nicknames</h1>
      <div className="flex w-full flex-col place-items-center gap-2 p-2">
        {Array.isArray(nicknames) &&
          nicknames?.map((nname) => (
            <div
              key={nname.trick_id}
              className="flex w-full items-center justify-between gap-2"
            >
              <div className="text-xl text-zinc-200">{nname.nickname}</div>
              <div className="text-md text-zinc-300">{nname?.trick?.name}</div>
              <div className="text-md text-zinc-400">
                {nname.createdAt.toDateString()}
              </div>
            </div>
          ))}
        {Array.isArray(tricks) &&
          tricks
            ?.sort((a, b) => a?.name.localeCompare(b?.name))
            ?.map(
              (trick) =>
                !nicknames.some((n) => n.trick_id === trick.trick_id) && (
                  <div
                    key={trick.trick_id}
                    className="no-scrollbar flex w-full items-center justify-between gap-2 overflow-x-scroll"
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
                      </form>
                    ) : (
                      <div
                        onClick={() => setInput_id(trick.trick_id)}
                        className="rounded-md p-2 text-xl text-zinc-200 hover:bg-zinc-700"
                      >
                        {trick?.displayName}
                      </div>
                    )}
                    <div className="text-md text-zinc-300">{trick?.name}</div>
                  </div>
                )
            )}
      </div>
    </div>
  );
};

export default NicknamesPanel;
