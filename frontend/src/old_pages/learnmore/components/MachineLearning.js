import React, { useState } from "react";
import { MyH3 } from "./WhatDoesItInclude";

const MachineLearning = () => {
  const [id, setId] = useState("Capturing");

  return (
    <>
      <h2
        onClick={() => {
          setId("Machine");
        }}
        className="text-2xl font-semibold"
      >
        Machine Learning
      </h2>
      <div className="grid w-full grid-cols-3 gap-1">
        <MyH3 setId={setId} id={id} title={"Capturing"} />
        <MyH3 setId={setId} id={id} title={"Analysis"} />
        <MyH3 setId={setId} id={id} title={"Generation"} />
      </div>
      {id === "Capturing" && (
        <p id="videoCapture" className="indent-4 text-base font-light">
          The idea is to be able to upload your personally shot videos and
          compare them with a Trick you are working towards. Once uploaded you
          would be able to see the difference between your attempt and the goal
          you are working towards. Using computer vision to draw pose estimation
          on top of the body and the model we would be able to see very accurate
          differences between our actual attempts and the goals we are working
          towards. Having the Trick models be captured in a 3D way allows for
          any angle that you film from to be able to be overlayed with any trick
          you would want to emulate.
        </p>
      )}
      {id === "Analysis" && (
        <p id="videoAnalysis" className="indent-4 text-base font-light">
          Buiding on the Video Capture and Comparisson feature the idea here is
          to use the data from our users to build a Trick Classifier that will
          be able to watch through a video and make suggestions of the Tricks it
          is seeing. Eventually this would be able to take in footage and
          timestamp relevant Tricks with their relevant labels, making footage
          ingestion for video editing much easier.{" "}
        </p>
      )}
      {id === "Generation" && (
        <p id="generativeAnimation" className="indent-4 text-base font-light">
          Using all of the other aspects of this Application together the
          attempt will be to create a completely interactive Trick builder that
          can take in paramaters and deliver back a new (possibly never been
          seen before) trick based on the criteria it was given. You would be
          able to select various element of a Trick and have an example be
          created for you out of those. Say an inside flip that has 720degrees
          of rotation, takes off from hyper and lands in semi, and has a hook
          kick at the end. It would generate some version of a
          GrandMasterDoubleTwistHookHalfGyro. Which maybe has been done but i
          wouldnt know where to find footage of it off the top of my head. This
          would allow for that, or anything we could conceivably dream up, to be
          accessible.{" "}
        </p>
      )}
    </>
  );
};

export default MachineLearning;
