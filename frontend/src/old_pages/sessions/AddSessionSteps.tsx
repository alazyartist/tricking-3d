import { trpc } from "@utils/trpc";
import React, { useState } from "react";

export const StepOne = ({ setFormData, count, formData, setCount }) => {
  return (
    <div className="flex h-[90%] flex-col justify-evenly gap-4">
      <div>
        <h1 className={"pt-2 text-center font-virgil text-3xl"}>
          Get Your Stats
        </h1>
        <p className={`text-xs`}>
          Submit your videos here to get a full breakdown and compete in the
          leaderboards!
        </p>
      </div>
      <div className="flex w-full place-items-center justify-around gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-2">
        <button
          type="button"
          className={`rounded-md  bg-opacity-30 p-2 px-4 ${
            formData.type === "Session"
              ? "bg-zinc-300 text-zinc-100"
              : "bg-zinc-700 text-zinc-400"
          }`}
          onClick={() => setFormData((s) => ({ ...s, type: "Session" }))}
        >
          Session
        </button>
        <button
          type="button"
          className={`rounded-md  bg-opacity-30 p-2 px-4 ${
            formData.type === "Battle"
              ? "bg-zinc-300 text-zinc-100"
              : "bg-zinc-700 text-zinc-400"
          }`}
          onClick={() => setFormData((s) => ({ ...s, type: "Battle" }))}
        >
          Battle
        </button>
        <button
          type="button"
          className={`rounded-md  bg-opacity-30 p-2 px-4 ${
            formData.type === "Sampler"
              ? "bg-zinc-300 text-zinc-100"
              : "bg-zinc-700 text-zinc-400"
          }`}
          onClick={() => setFormData((s) => ({ ...s, type: "Sampler" }))}
        >
          Sampler
        </button>
      </div>
      <div className="flex w-full flex-col">
        <p className={`font-virgil text-sm`}>
          what should we call your{" "}
          <span className={`font-inter font-bold`}>{formData.type}</span>
        </p>
        <input
          onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
          id="name"
          type="text"
          className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
          placeholder={`${formData.type} Name`}
        />
      </div>
      {Array.from(Array(count).keys()).map((i) => (
        <div
          key={`${formData.url[i]} ${i} `}
          className="flex w-full gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
        >
          <input
            onChange={(e) =>
              setFormData((s) => ({
                ...s,
                url: { ...s.url, [i]: e.target.value },
              }))
            }
            id={`url${i}`}
            className="w-full bg-transparent p-1 text-zinc-300"
            type="url"
            value={formData.url[i]}
            placeholder={`https://your-video.com/goes-here${i}`}
          />
          {i > 0 && (
            <span
              className="text-2xl leading-none text-red-500"
              onClick={() => setCount((c) => c - 1)}
            >
              -
            </span>
          )}
        </div>
      ))}
      <span
        onClick={() => setCount((c) => c + 1)}
        className="flex place-content-end place-items-center gap-2 font-inter font-bold tracking-wider"
      >
        <span>add more links</span>
        <span className="text-2xl leading-none text-emerald-500">+</span>
      </span>
    </div>
  );
};

export const StepTwo = ({ setFormData, formData }) => {
  return (
    <div className="flex h-[90%] flex-col justify-around">
      <h1 className="pt-2 text-center font-virgil text-3xl">
        Tell us about <br />
        the {formData.type.toLowerCase()}
      </h1>
      <p className={`font-virgil text-sm`}>
        when did this{" "}
        <span className={`font-inter font-bold`}>{formData.type}</span> take
        place
      </p>
      <input
        onChange={(e) =>
          setFormData((s) => ({ ...s, sessionDate: e.target.value }))
        }
        id="date"
        type="date"
        value={formData.sessionDate}
        className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col place-items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
          <label className="w-full text-center" htmlFor="startTime">
            Start
          </label>
          <input
            onChange={(e) =>
              setFormData((s) => ({ ...s, startTime: e.target.value }))
            }
            id="startTime"
            step={"00:15"}
            className="w-full select-none place-self-end bg-transparent p-1 text-zinc-300  "
            type="time"
            value={formData.startTime}
          />
        </div>
        <div className="flex flex-col place-items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
          <label className="w-full text-center" htmlFor="endTime">
            End
          </label>
          <input
            onChange={(e) =>
              setFormData((s) => ({ ...s, endTime: e.target.value }))
            }
            id="endTime"
            step={"00:15"}
            className="w-full select-none place-self-end bg-transparent p-1 text-zinc-300  "
            type="time"
            value={formData.endTime}
          />
        </div>
      </div>
    </div>
  );
};

export const StepThree = ({ formData, setFormData }) => {
  const { data: availableUsers } = trpc.userDB.findAll.useQuery();
  //   const [addTrickersOpen, setAddTrickersOpen] = useState(false);

  return (
    <div className="flex h-[70%] flex-col bg-zinc-900 bg-opacity-80">
      <div>Step Three</div>

      {/* <div className="flex flex-col items-center gap-2 rounded-md "> */}
      <label
        // onClick={() => setAddTrickersOpen(!addTrickersOpen)}
        className="w-1/6 p-1 pl-2"
        htmlFor="trickers"
      >
        Trickers
      </label>

      <div
        style={{ color: "#fff" }}
        className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-md bg-zinc-900 bg-opacity-0 p-1 text-zinc-300"
      >
        <div className="flex w-full flex-col place-content-center place-items-center text-center text-sm">
          {formData?.trickers?.map((battler) => (
            <button
              type="button"
              className={"flex flex-col gap-2 p-1"}
              onClick={() => {
                setFormData((s) => ({
                  ...s,
                  trickers: s?.trickers?.filter(
                    (b) => b.username !== battler.username
                  ),
                }));
              }}
            >
              {battler.username}
            </button>
          ))}
          {/* <div
            className={"w-[150px] rounded-md bg-emerald-500 p-1"}
            onClick={() => setAddTrickersOpen(!addTrickersOpen)}
          >
            Add
          </div> */}
        </div>
        {availableUsers && (
          <div
            className={
              " flex h-full w-full flex-col justify-between gap-1 overflow-hidden overflow-y-scroll rounded-md bg-zinc-900 bg-opacity-90 p-2"
            }
          >
            <div className={"grid grid-cols-3 gap-2"}>
              {availableUsers?.map((user) => {
                return (
                  <button
                    type="button"
                    key={user.uuid}
                    onClick={() => {
                      !formData.trickers.some((item) => item.uuid === user.uuid)
                        ? setFormData((s) => ({
                            ...s,
                            trickers: [...s.trickers, user],
                          }))
                        : setFormData((s) => ({
                            ...s,
                            trickers: s.trickers?.filter(
                              (b) => b.username !== user.username
                            ),
                          }));
                    }}
                    className={`flex aspect-square w-full flex-col place-content-center place-items-center gap-1 rounded-md p-1 text-zinc-300 ${
                      formData.trickers.some((item) => item.uuid === user.uuid)
                        ? " bg-zinc-500 "
                        : " bg-zinc-800 "
                    }`}
                  >
                    <img
                      className={`h-8 w-8 rounded-full`}
                      src={`${
                        user.profilePic
                          ? `./images/${user?.uuid}/${user?.profilePic}`
                          : `./images/noimg.jpeg`
                      }`}
                      alt={"image"}
                    />
                    <p className={"text-sm"}>{user.username}</p>
                  </button>
                );
              })}
            </div>
            {/* <div
              onClick={() => setAddTrickersOpen(false)}
              className="flex place-content-center place-items-center rounded-md bg-emerald-500 p-1 text-2xl"
            >
              Done
            </div> */}
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export const StepReview = ({ formData }) => {
  return (
    <div className="flex h-[90%] flex-col">
      <div>Review</div>
      {Object.keys(formData).map((key) => (
        <div>
          {key}:{JSON.stringify(formData[key])}
        </div>
      ))}
    </div>
  );
};
