import React, { useState } from "react";

export const MyH3 = ({ title, id, setId }) => {
  return (
    <>
      <h3
        onClick={() => {
          setId(title);
        }}
        className={`cursor-pointer rounded-md
           ${
             id === title
               ? "bg-indigo-500 text-zinc-200"
               : "bg-zinc-600 text-zinc-400"
           } p-2 text-center text-sm font-semibold
`}
      >
        {title}
      </h3>
    </>
  );
};
const WhatDoesItInclude = () => {
  const [id, setId] = useState("Tricktionary");
  return (
    <>
      <h2 className="text-2xl font-semibold">What does it include?</h2>
      <div className="grid grid-cols-3 gap-1 font-inter font-semibold ">
        <MyH3 setId={setId} id={id} title="Tricktionary" />
        <MyH3 setId={setId} id={id} title="Theory" />
        <MyH3 setId={setId} id={id} title="Social" />
      </div>
      {id === "Tricktionary" && (
        <p className="indent-4 text-base font-light">
          The goal is to create an application that can showcase Tricking
          movements in a way that can be easily pulled up and its associated
          information had at a glance. Each Trick will have information about
          its various Parts, Takeoff, Landing, What Trick Progression it is
          within, Prerequisites, and interactive 3D examples. Users should be
          able to have discussions around these Tricks and Concepts. Saving the
          ones most relevant to their current exploration of Tricking.
        </p>
      )}
      {id === "Theory" && (
        <p className="indent-4 text-base font-light">
          This section would be taking the pure theory of many of these tricks
          and show how they are used and manipulated. The goal here would be to
          encourage an understanding of how Tricks can be created an explored
          beyond what is commonly used.
        </p>
      )}
      {id === "Social" && (
        <p className="indent-4 text-base font-light">
          A different take on the social media experience. Instead of being able
          to add just anyone to your friends list. I think it would benefit us
          to encourage the in-person connection to be had first. So in order to
          capture another user you would need fo physically scan their code.
          This would mean we are only interacting with people we actually know
          in some way or other. Not complete strangers. I believe this will
          encourage more cordiality in discussion rather than the disrespect we
          commonly see on the internet. This would work by having a QR style
          code on the user’s device that other Users can scan to capture them.
          This encourages travel and interacting in person to grow your network,
          not mass clicking add friend because this person knows 5 people you
          do.
        </p>
      )}
    </>
  );
};

export default WhatDoesItInclude;
