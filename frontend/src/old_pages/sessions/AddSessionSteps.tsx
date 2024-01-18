import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import ReactPlayer from "react-player";

export const StepOne = ({ setFormData, count, formData, setCount }) => {
  return (
    <div className="flex h-[90%] flex-col justify-evenly gap-4">
      <div>
        <h1 className={"pt-2 text-center font-inter text-3xl"}>
          Get Your Stats
        </h1>
        <p className={`text-xs`}>
          Submit your videos here to get a full breakdown and compete in the
          leaderboards!
        </p>
      </div>
      <div className="flex w-full flex-col gap-1">
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
        <div className="px-2">
          {formData.type === "Session" && (
            <p className={`text-xs`}>
              Sesssions are raw unedited training clips,. These may include
              bails. Can be footage clipped together from a few days.
            </p>
          )}
          {formData.type === "Battle" && (
            <p className={`text-xs`}>
              Battles are battles. One on One and Team Battles supported.You
              will be able to add trickers in a later step.
            </p>
          )}
          {formData.type === "Sampler" && (
            <p className={`text-xs`}>
              Samplers are more edited clips spanning across mulitple sessions,
              typically over weeks to months and showcase the highlights of your
              best moves.
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <p className={`font-inter text-sm tracking-wider`}>
          what should we call your{" "}
          <span className={` font-bold`}>{formData.type}</span>
        </p>
        <input
          onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
          id="name"
          type="text"
          value={formData.name}
          className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
          placeholder={`${formData.type} Name`}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className={`font-inter text-sm`}>
          when did this <span className={`font-bold`}>{formData.type}</span>{" "}
          take place
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
        {formData.type === "Session" && (
          <p className={`text-xs`}>please use the day of the session</p>
        )}
        {formData.type === "Battle" && (
          <p className={`text-xs`}>please use the day the battle happened</p>
        )}
        {formData.type === "Sampler" && (
          <p className={`text-xs`}>
            please use the original upload date of the sampler
          </p>
        )}
      </div>
      {/* {Array.from(Array(count).keys()).map((i) => ( */}
      <div
        key={`${formData.url}`}
        className="flex w-full gap-2 rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
      >
        <input
          onChange={(e) =>
            setFormData((s) => ({
              ...s,
              url: e.target.value,
            }))
          }
          id={`url`}
          className="w-full bg-transparent p-1 text-zinc-300"
          type="url"
          value={formData.url}
          placeholder={`https://your-video.com/goes-here`}
        />
        {/* {i > 0 && (
            <span
              className="text-2xl leading-none text-red-500"
              onClick={() => {
                setCount((c) => c - 1);
                setFormData((fd) => {
                  const updatedData = { ...fd };
                  delete updatedData.url[i];
                  return updatedData;
                });
              }}
            >
              -
            </span>
          )} */}
      </div>
      {/* ))} */}
      {/* <span
        onClick={() => setCount((c) => (c + 1 < 4 ? c + 1 : 4))}
        className="flex place-content-end place-items-center gap-2 font-inter font-bold tracking-wider"
      >
        <span>add more links</span>
        <span className="text-2xl leading-none text-emerald-500">+</span>
      </span> */}
    </div>
  );
};

export const StepTwo = ({ setFormData, formData }) => {
  return (
    <div className="flex h-[90%] flex-col justify-around">
      <h1 className="pt-2 text-center font-inter text-3xl">
        Tell us about <br />
        the {formData.type.toLowerCase()}
      </h1>
      <div className="flex w-full flex-col gap-1">
        <p className={`font-inter text-sm`}>
          when did this <span className={`font-bold`}>{formData.type}</span>{" "}
          take place
        </p>
        {formData.type === "Session" && (
          <p className={`text-xs`}>
            please use the day of the session(not the upload date)
          </p>
        )}
        {formData.type === "Battle" && (
          <p className={`text-xs`}>please use the day the battle happened</p>
        )}
        {formData.type === "Sampler" && (
          <p className={`text-xs`}>
            please use the original upload date of the sampler
          </p>
        )}
        <input
          onChange={(e) =>
            setFormData((s) => ({ ...s, sessionDate: e.target.value }))
          }
          id="date"
          type="date"
          value={formData.sessionDate}
          className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
        />
      </div>

      {/* <div className="grid grid-cols-2 gap-4">
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
      </div> */}
    </div>
  );
};

export const StepThree = ({ formData, setFormData }) => {
  const { data: availableUsers } = trpc.userDB.findAll.useQuery();

  return (
    <div className="flex h-[70%] flex-col">
      <h1 className="pt-2 text-center font-inter text-3xl">
        Who is in the video?
      </h1>

      <div
        style={{ color: "#fff" }}
        className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-md p-1 text-zinc-300"
      >
        <div className="grid w-full grid-cols-2 place-content-center place-items-center text-center text-sm">
          {formData?.trickers?.map((battler) => (
            <button
              type="button"
              className={"flex place-items-center gap-2 p-1"}
              onClick={() => {
                setFormData((s) => ({
                  ...s,
                  trickers: s?.trickers?.filter(
                    (b) => b.username !== battler.username
                  ),
                }));
              }}
            >
              <img
                className={`h-8 w-8 rounded-full`}
                src={`${
                  battler.profilePic
                    ? battler?.profilePic
                    : `./images/noimg.jpeg`
                }`}
                alt={"image"}
              />
              <p>{battler.username}</p>
            </button>
          ))}
        </div>
        {availableUsers && (
          <div
            className={
              " flex h-full w-full flex-col justify-between gap-1 overflow-hidden overflow-y-scroll rounded-md  p-2"
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
                    className={`flex aspect-square w-full flex-col place-content-center place-items-center gap-1 rounded-xl bg-opacity-10 p-1 text-zinc-300 ${
                      formData.trickers.some((item) => item.uuid === user.uuid)
                        ? " bg-zinc-900 text-zinc-500"
                        : "  text-zinc-300"
                    }`}
                  >
                    <img
                      className={`h-8 w-8 rounded-full ${
                        formData.trickers.some(
                          (item) => item.uuid === user.uuid
                        )
                          ? " opacity-40"
                          : "  "
                      }`}
                      src={`${
                        user.profilePic
                          ? user?.profilePic
                          : `./images/noimg.jpeg`
                      }`}
                      alt={"image"}
                    />
                    <p className={"text-sm"}>{user.username}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const StepReview = ({ formData }) => {
  return (
    <div className="flex h-[90%] flex-col place-content-center place-items-center justify-around">
      <h1 className={`w-full text-center font-inter text-xl text-zinc-400`}>
        Review
      </h1>
      <div className="w-full space-y-3 text-center">
        <h1 className="text-2xl font-bold">{formData.name}</h1>
        <h2>{new Date(formData.sessionDate).toDateString()}</h2>
      </div>
      <div className="grid w-[60%] grid-cols-2 gap-2">
        {formData.trickers.map((tricker) => (
          <div className="flex flex-col place-items-center">
            <img
              className={`h-8 w-8 rounded-full`}
              src={`${
                tricker.profilePic ? tricker.profilePic : `./images/noimg.jpeg`
              }`}
              alt={"image"}
            />
            <p>{tricker.username}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex flex-col place-items-center gap-2">
          {/* <p>
              {formData.url[key].replace(
                "https://www.youtube.com/watch?v=",
                "youtube/"
              )} 
            </p>
              */}
          <div className={`overflow-hidden rounded-xl lg:h-[30vw] lg:w-[50vw]`}>
            <ReactPlayer
              config={{ facebook: { appId: "508164441188790" } }}
              id={"video"}
              controls={true}
              muted
              width={"100%"}
              height={"100%"}
              loop
              playsInline
              url={formData.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
