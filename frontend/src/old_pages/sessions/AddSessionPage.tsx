import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useSubmitSessionForReview } from "../../api/useSessionSummaries";
import { v4 as uuidv4 } from "uuid";
import { MdCheckCircle } from "../../data/icons/MdIcons";
import Link from "next/link";
import PaymentEmbed from "../../admin/components/payments/PaymentEmbed";
import useUserInfo from "../../api/useUserInfo";
import { useQueryClient } from "@tanstack/react-query";
import BackgroundCircles from "../../admin/components/BackgroundCircles";
import { trpc } from "utils/trpc";
import { StepOne, StepReview, StepThree, StepTwo } from "./AddSessionSteps";
const whatsToday = () => {
  let today = new Date(Date.now());
  return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
    "0" + today.getDate()
  ).slice(-2)}`;
};
const AddSessionPage = () => {
  // const { data: availableUsers } = trpc.userDB.findAll.useQuery();
  let todaytime = new Date(Date.now()).toISOString().slice(-13, -8);

  const { mutateAsync: submitSession, data: response } =
    useSubmitSessionForReview();
  const { uuid: user_id, SessionReviewCredits } = useUserStore(
    (s) => s.userInfo
  );
  const userInfo = useUserStore((s) => s.userInfo);
  console.log(userInfo);
  const [showOutOfCredits, setShowOutOfCredits] = useState(false);
  const [submitSuccess, setSubmitSucces] = useState(false);
  const [formData, setFormData] = useState({
    sessionDate: whatsToday(),
    url: {},
    user_id: user_id,
    sessionid: uuidv4(),
    startTime: null,
    endTime: null,
    type: "Session",
    trickers: [],
    name: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    submitSession(formData);
    console.log("submitting", formData);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    if (response?.data?.message === "Submitted") {
      setSubmitSucces(true);
    }
  }, [response]);
  useEffect(() => {
    if (
      response?.data?.message === "Out of Credits" ||
      SessionReviewCredits === 0
    ) {
      setShowOutOfCredits(true);
    }
  }, [response]);
  const [count, setCount] = useState(1);
  let isEnabled =
    (SessionReviewCredits > 0 &&
      formData.startTime &&
      formData.endTime &&
      formData.type &&
      formData.sessionDate &&
      formData.sessionid &&
      formData.url[0] &&
      true) ||
    false;
  console.log(isEnabled);
  const [currentStep, setCurrentStep] = useState(0);
  let enabledOne =
    (formData?.name && formData.type && formData.url[0] && true) || false;
  let enabledTwo =
    (formData?.sessionDate && formData.startTime && formData.endTime && true) ||
    false;
  let enabledThree = formData?.trickers.length >= 1;
  // const [addTrickersOpen, setAddTrickersOpen] = useState(false);
  let stepEnabled =
    (currentStep === 0 && enabledOne) ||
    (currentStep === 1 && enabledTwo) ||
    currentStep === 2 ||
    enabledThree;

  return (
    <div className="mt-[10vh] flex h-[80vh] flex-col place-content-center place-items-center font-inter text-zinc-300">
      {submitSuccess ? (
        <SessionSubmitted
          formData={formData}
          SessionReviewCredits={SessionReviewCredits}
        />
      ) : (
        <>
          <button
            type="button"
            id="addCreditbutton"
            onClick={() => setShowOutOfCredits((prev) => !prev)}
            className="absolute top-4 left-4 rounded-md bg-gradient-to-b from-teal-400 to-emerald-500 p-2 font-bold text-zinc-900 drop-shadow-md"
          >
            Credit{`${SessionReviewCredits > 1 ? "s" : ""}`}:{" "}
            {SessionReviewCredits}
          </button>
          <form
            onSubmit={onSubmit}
            className="relative flex h-full w-[90vw] flex-col gap-2 rounded-md bg-zinc-700 bg-opacity-30 p-3 backdrop-blur-2xl"
          >
            {/* <div className="p-2 text-center font-inter text-3xl font-bold tracking-wide text-zinc-200 drop-shadow-lg md:text-5xl">
              Submit {formData.type}
            </div> */}
            {currentStep === 0 && (
              <StepOne
                setFormData={setFormData}
                count={count}
                setCount={setCount}
                formData={formData}
              />
            )}
            {currentStep === 1 && (
              <StepTwo setFormData={setFormData} formData={formData} />
            )}
            {currentStep === 2 && (
              <StepThree setFormData={setFormData} formData={formData} />
            )}
            {currentStep === 3 && <StepReview formData={formData} />}

            <div className="flex w-full place-content-center gap-2">
              {[0, 1, 2, 3].map((step) => (
                <div
                  onClick={() => setCurrentStep(step)}
                  className={`h-3 w-3 rounded-full ${
                    step === currentStep ? "bg-zinc-300" : "bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            {currentStep !== 3 && (
              <button
                disabled={!stepEnabled}
                className={`m-4 rounded-lg p-2 font-virgil text-2xl  ${
                  stepEnabled
                    ? "bg-emerald-400 text-emerald-800"
                    : "bg-zinc-800 text-zinc-600"
                }`}
                type="button"
                onClick={() => setCurrentStep((currentStep + 1) % 4)}
              >
                {currentStep === 0 && "Gimmie Them Stats"}
                {currentStep === 1 && "Finished"}
                {currentStep === 2 && formData.trickers.length < 1 && "Skip"}
                {currentStep === 2 &&
                  formData.trickers.length >= 1 &&
                  "That's All"}
                {currentStep === 3 && "Looks Great!"}
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                value="Submit"
                disabled={isEnabled === false ? true : false}
                className={`rounded-lg ${
                  isEnabled ? "bg-emerald-500" : "bg-zinc-800 text-zinc-600"
                } m-4 p-2 text-2xl`}
              >
                Start Processing
              </button>
            )}
          </form>
          <div className="flex flex-col place-items-center gap-2">
            <div>{response?.data?.message}</div>
            {showOutOfCredits && <OutOfCredits />}
          </div>
        </>
      )}
      <BackgroundCircles />
    </div>
  );
};

export default AddSessionPage;

const SessionSubmitted = ({ SessionReviewCredits, formData }) => {
  return (
    <div className=" flex h-full w-[90vw] flex-col place-content-center place-items-center justify-around gap-2 rounded-md bg-zinc-700 bg-opacity-30 p-3 font-virgil backdrop-blur-2xl">
      <div className="text-center text-3xl">
        Your {formData.type} was Submitted
      </div>
      <MdCheckCircle className={"text-6xl text-emerald-500"} />
      <div className="text-center font-virgil text-xl">
        Please check back later for the Summary
      </div>
      <div>You have {SessionReviewCredits - 1} left</div>
      <Link href={"/home"} className={"rounded-md bg-zinc-700 p-1"}>
        Home
      </Link>
    </div>
  );
};

export const OutOfCredits = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [creditAmount, setcreditAmount] = useState(1);
  // useUserInfo();
  useEffect(() => {
    queryClient.invalidateQueries(["userInfo"]);
  }, [showForm]);
  return (
    <>
      <div className="flex place-content-center place-items-center gap-4 text-center font-inter text-4xl">
        <div
          className="flex h-10 w-10 place-content-center place-items-center rounded-full bg-zinc-200 bg-opacity-10"
          onClick={() => setcreditAmount((ca) => ca - 1)}
        >
          -
        </div>
        {(creditAmount > 0 ? creditAmount : 1) * 5}$
        <div
          className="flex h-10 w-10 place-content-center place-items-center rounded-full bg-zinc-200 bg-opacity-10"
          onClick={() => setcreditAmount((ca) => ca + 1)}
        >
          +
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="w-[200px] rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 py-2 text-2xl font-bold text-zinc-200"
        id="submit"
      >
        Add Credits
      </button>
      {showForm && (
        <div className="absolute top-[0vh] left-[0vw] z-[1290] h-[100vh] w-[100vw] rounded-md bg-zinc-900 bg-opacity-40 p-8 backdrop-blur-md">
          <PaymentEmbed creditAmount={creditAmount} setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
};

///DELETE LATER VVVVV
{
  /* <input
              onChange={(e) =>
                setFormData((s) => ({ ...s, name: e.target.value }))
              }
              id="name"
              type="text"
              className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
              placeholder="Session Name"
            /> */
}
{
  /* <input
              onChange={(e) =>
                setFormData((s) => ({ ...s, sessionDate: e.target.value }))
              }
              id="date"
              type="date"
              value={whatsToday()}
              className="rounded-md bg-zinc-900 bg-opacity-80 p-1 text-zinc-300"
            />
            <div className="flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
              <label className="w-1/6 pl-2" htmlFor="startTime">
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
            <div className="flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
              <label className="w-1/6 pl-2" htmlFor="endTime">
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
            </div> */
}
{
  /* <div className="flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
              <label className="w-1/6 pl-2" htmlFor="type">
                Type
              </label>
              <select
                onChange={(e) =>
                  setFormData((s) => ({ ...s, type: e.target.value }))
                }
                id="type"
                style={{ color: "#fff" }}
                className="w-full select-none  place-self-end bg-zinc-900 bg-opacity-0 p-1 text-zinc-800  "
                value={formData.type}
              >
                <option
                  style={{ color: "#000" }}
                  className=""
                  value={"Session"}
                >
                  Session
                </option>
                <option style={{ color: "#000" }} className="" value={"Battle"}>
                  Battle
                </option>
                <option
                  style={{ color: "#000" }}
                  className=""
                  value={"Sampler"}
                >
                  Sampler
                </option>
              </select>
            </div> */
}
{
  /* {
              <div className="flex items-center gap-2 rounded-md bg-zinc-900 bg-opacity-80">
                <label
                  onClick={() => setAddTrickersOpen(!addTrickersOpen)}
                  className="w-1/6 p-1 pl-2"
                  htmlFor="trickers"
                >
                  Trickers
                </label>

                <div
                  style={{ color: "#fff" }}
                  className="flex w-full flex-col gap-2 rounded-md bg-zinc-900 bg-opacity-0 p-1 text-zinc-300"
                >
                  <div className="flex w-full flex-col place-content-center place-items-center text-center text-sm">
                    {formData?.trickers?.map((battler) => (
                      <div
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
                      </div>
                    ))}
                    <div
                      className={"w-[150px] rounded-md bg-emerald-500 p-1"}
                      onClick={() => setAddTrickersOpen(!addTrickersOpen)}
                    >
                      Add
                    </div>
                  </div>
                  {availableUsers && addTrickersOpen && (
                    <div
                      className={
                        "absolute top-[2.5%] left-[2.5%] flex h-[95%] w-[95%] flex-col justify-between gap-1 rounded-md bg-zinc-900 bg-opacity-90 p-2"
                      }
                    >
                      <div className={"flex flex-col gap-1"}>
                        {availableUsers?.map((user) => {
                          return (
                            <div
                              key={user.uuid}
                              onClick={() => {
                                !formData.trickers.some(
                                  (item) => item.uuid === user.uuid
                                )
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
                              className={`flex w-full place-items-center gap-2 rounded-md p-1 text-zinc-300 ${
                                formData.trickers.some(
                                  (item) => item.uuid === user.uuid
                                )
                                  ? " bg-teal-500 "
                                  : " bg-teal-800 "
                              }`}
                            >
                              <img
                                className={`h-6 w-6 rounded-full`}
                                src={`${
                                  user.profilePic
                                    ? `./images/${user?.uuid}/${user?.profilePic}`
                                    : `./images/noimg.jpeg`
                                }`}
                                alt={"image"}
                              />
                              {user.username}
                            </div>
                          );
                        })}
                      </div>
                      <div
                        onClick={() => setAddTrickersOpen(false)}
                        className="flex place-content-center place-items-center rounded-md bg-emerald-500 p-1 text-2xl"
                      >
                        Done
                      </div>
                    </div>
                  )}
                </div>
              </div>
            } */
}
{
  /* {Array.from(Array(count).keys()).map((i) => (
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
              className="flex place-items-center gap-2 font-titan"
            >
              <span>Add Another URL Source</span>
              <span className="text-2xl leading-none text-emerald-500">+</span>
            </span> */
}
