import React, { Suspense, useState } from "react";
import Link from "next/link";
import { TrickedexLogo } from "@data/icons/TrickedexLogo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FaHamburger } from "react-icons/fa";
import { useRouter } from "next/router";
import mixpanel from "@utils/mixpanel";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
const LandingCanvas = dynamic(
  () => import("@old_pages/landing/components/LandingCanvas"),
  { suspense: true }
);
const AnatomySketch = dynamic(
  () => import("old_pages/theory/components/AnatomySketchSVG")
);
const DetailCard = dynamic(
  () => import("@old_pages/landing/components/DetailCard")
);

const MovingBackground = dynamic(
  () => import("@old_pages/landing/components/MovingBackground"),
  { suspense: false }
);

const LandingPage: NextPage<{ a: boolean }> = ({ a }) => {
  const [loadScene, setLoadScene] = useState(false);
  // mixpanel.track("Landing Page View");
  return (
    <div className="no-scrollbar fixed top-0 flex h-[100vh] w-[100vw] flex-col place-items-center justify-between gap-2 overflow-y-scroll bg-zinc-100 text-zinc-800">
      <div
        id="abovethefold"
        className="flex h-[100vh] flex-shrink-0 flex-col items-center gap-2 "
      >
        <div className=" flex w-full place-items-center justify-between p-2">
          <TrickedexLogo className="w-[45%] flex-shrink-0 fill-zinc-800 md:w-[20%]" />
          {/* <div className="rounded-md border-[1px] border-zinc-800 p-2">
            <FaHamburger className="text-2xl text-zinc-800" />
          </div> */}
        </div>
        <TagLine a={a}></TagLine>
        {/* <div className="mx-4 my-2 rounded-md bg-zinc-900 bg-opacity-70 p-2 px-4 text-zinc-300 backdrop-blur-md">
          At the Trickedex, we believe that everyone has the potential to be a
          great tricker. With the right tools and resources, anyone can master
          the art of tricking, and that's exactly what we provide. Whether
          you're just starting out or you're a seasoned veteran, the Trickedex
          is the ultimate resource for anyone who loves tricking
        </div> */}
        <div className="flex gap-2">
          <Link
            onClick={() =>
              mixpanel.track("Sandbox", {
                source: "landing",
                destination: "sandbox",
              })
            }
            href="/sandbox"
            className="rounded-md bg-sky-500 p-2 font-bold text-zinc-100"
          >
            Sandbox
          </Link>
          <Link
            onClick={() =>
              mixpanel.track("Home", {
                source: "landing",
                destination: "home",
              })
            }
            href="/home"
            className="rounded-md bg-sky-500 p-2 font-bold text-zinc-100"
          >
            Home
          </Link>
          <button
            type={"button"}
            onClick={() =>
              mixpanel.track("Login", {
                source: "landing",
                destination: "login",
              })
            }
            className="rounded-md bg-sky-500 p-2 font-bold text-zinc-100"
          >
            <SignInButton
              mode="modal"
              redirectUrl="/home"
              children={<p>Login</p>}
            />
          </button>
        </div>
        <Suspense
          fallback={
            <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" />
          }
        >
          <MovingBackground />
        </Suspense>
        <PEtheMess />
        {/* <div className="absolute top-[50vh] -z-20 h-[60vw] w-[60vw] rounded-full bg-teal-300 blur-3xl" /> */}
        {/* <div className='flex w-[100vw] flex-shrink-0  gap-2 overflow-hidden'>
					<div className='h-[200px] w-[300px] flex-shrink-0 rounded-md bg-zinc-900'></div>
					<div className='h-[200px] w-[100px] flex-shrink-0 rounded-md bg-zinc-900'></div>
				</div> */}
        <div className="absolute bottom-4 font-inter text-xl font-black md:text-3xl">
          Scroll to See More
        </div>
      </div>
      <div className="grid w-[90%] grid-cols-1 gap-4 md:grid-cols-2">
        <DetailCard
          link={"/theory"}
          cta={"Explore Theory Now"}
          title={"Discover the Secrets of Tricking Theory"}
          description="We believe that understanding the theory behind tricking is key to becoming a great tricker. That's why we've made it easy for you to access a wealth of information about the discipline, including comprehensive tutorials and in-depth explanations. With the Trickedex, you'll be able to take your tricking skills to the next level in no time!"
        >
          <Suspense>
            <AnatomySketch
              className={
                "h-full w-full rounded-md bg-gradient-to-b from-teal-500 to-cyan-600 "
              }
            />
          </Suspense>
        </DetailCard>
        <DetailCard
          left
          link={"/sandbox"}
          cta={"Go to Sandbox"}
          title={"See Tricks Come to Life with 3D"}
          description="Tricking has never been more exciting, thanks to the Trickedex's innovative 3D library of motion-captured tricks. Explore each move in detail, and see exactly how the pros do it. With our cutting-edge technology, you'll be able to gain a whole new perspective on tricking and take your own skills to new heights."
        >
          {loadScene ? (
            <Suspense>
              <LandingCanvas />
            </Suspense>
          ) : (
            <div
              className="flex h-full place-content-center place-items-center rounded-md bg-zinc-900 text-zinc-300"
              onClick={() => setLoadScene(true)}
            >
              <div>Click to Load</div>
            </div>
          )}
        </DetailCard>
        <DetailCard
          left
          link={"/register"}
          cta={"Register Now"}
          title={"Track Your Tricking Progress with Ease"}
          description="At the Trickedex, we're committed to helping trickers of all levels reach their full potential. That's why we've created a comprehensive set of tools for tracking your progress, including detailed user profile pages and easy-to-use performance metrics. Whether you're just starting out or are a seasoned tricker, the Trickedex is the perfect way to stay motivated and reach new heights in your tricking journey."
        ></DetailCard>
        <DetailCard
          link={"/register"}
          cta={"Register Now"}
          title={"Join a Community of Tricking Enthusiasts"}
          description="The Trickedex isn't just a database of tricks and tutorials - it's also a vibrant community of like-minded trickers from around the world. Follow your friends, connect with new trickers, and be a part of something special. With our social media platform, you can share your tricks, give and receive feedback, and be a part of a supportive and encouraging community of trickers."
        ></DetailCard>
        <div className="h-[40px]" />
      </div>
    </div>
  );
};

export default LandingPage;
const TagLine: React.FC<{ a: boolean }> = ({ a }) => {
  const router = useRouter();
  if (a)
    return (
      <div className="my-8 flex min-h-[120px] flex-shrink-0 flex-col place-content-center items-center leading-loose md:leading-9">
        <div className="text-center font-inter text-3xl font-light leading-relaxed md:text-7xl md:leading-loose">
          Your Tricking journey
          <br /> starts{" "}
          <span
            onClick={() => {
              mixpanel.track("Registration Page", {
                source: "landing",
                destination: "register",
                option: "a",
              });
              // router.push("/register");
            }}
          >
            <SignUpButton
              mode="modal"
              redirectUrl="/home"
              children={
                <span className="rounded-md border-[1px] border-zinc-900 px-1 font-black md:px-2">
                  here.
                </span>
              }
            />
          </span>
        </div>
        <div className="text-xl font-light">
          <span className={`font-bold md:text-3xl`}>Trickedex</span>, the
          ultimate resource.
        </div>
      </div>
    );
  if (!a)
    return (
      <div className="my-8 flex min-h-[120px] flex-shrink-0 flex-col place-content-center items-center gap-2 md:my-16">
        <div className="font-inter text-3xl font-light md:text-7xl">
          Tricking is <span className="font-black">complicated.</span>
        </div>
        <div className="font-light md:text-3xl">
          The trickedex gives you the tools <br />
          to make sense of it in one place
        </div>
        <div
          onClick={() => {
            mixpanel.track("Registration Page", {
              source: "landing",
              destination: "register",
              option: "b",
            });
            // router.push("/register");
          }}
          className="rounded-md border-[1px] border-zinc-900 px-1 font-black md:px-2"
        >
          <SignUpButton
            mode="modal"
            redirectUrl="/home"
            children={<p>Register Now</p>}
          />
          {/* Register Now */}
        </div>
      </div>
    );
};

const PEtheMess = () => {
  return (
    <div className=" h-[60vw] w-[90vw] py-4 font-inter font-semibold text-zinc-800">
      <div className="text-center text-xl leading-relaxed md:text-3xl">
        <span className="font-black ">Please </span>Excuse the Mess.
      </div>
      <div className="text-center text-sm">
        We are hard at work on some
        <br /> backend things at the moment.
        <br /> big update on the horizion.
        <div>Stay tuned</div>
      </div>
    </div>
  );
};
