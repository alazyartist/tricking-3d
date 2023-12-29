"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
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
  // let todaytime = new Date(Date.now()).toISOString().slice(-13, -8);

  const { mutate: submitSession, data: response } =
    trpc.sessionsummaries.submitSession.useMutation();

  const { uuid: user_id } = useUserStore((s) => s.userInfo);

  const { data: SessionReviewCredits } =
    trpc.userDB.getCurrentCredits.useQuery();
  const [showOutOfCredits, setShowOutOfCredits] = useState(false);
  const [submitSuccess, setSubmitSucces] = useState(false);
  const [formData, setFormData] = useState({
    sessionDate: whatsToday(),
    url: "",
    user_id: user_id as string,
    sessionid: uuidv4(),
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
    if (response?.message === "Submitted") {
      setSubmitSucces(true);
    }
  }, [response]);
  useEffect(() => {
    if (response?.message === "Out of Credits" || SessionReviewCredits === 0) {
      setShowOutOfCredits(true);
    }
  }, [response]);
  const [count, setCount] = useState(1);
  let isEnabled =
    (SessionReviewCredits > 0 &&
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
  let enabledTwo = (formData?.sessionDate && true) || false;
  let enabledThree = formData?.trickers.length >= 1;
  //TODO: get rid of step 2 and make it a date picker
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
            className="absolute left-4 top-4 rounded-md bg-gradient-to-b from-teal-400 to-emerald-500 p-2 font-bold text-zinc-900 drop-shadow-md"
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
            <div>{response?.message}</div>
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
      <div>You have {SessionReviewCredits} left</div>
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
        <div className="absolute left-[0vw] top-[0vh] z-[1290] h-[100vh] w-[100vw] rounded-md bg-zinc-900 bg-opacity-40 p-8 backdrop-blur-md">
          <PaymentEmbed creditAmount={creditAmount} setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
};
