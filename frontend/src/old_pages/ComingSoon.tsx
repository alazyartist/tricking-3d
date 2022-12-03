import { useRouter } from "next/router";
import React from "react";
import PaypalDonate from "../components/info/PaypalDonate";

function ComingSoon() {
  const router = useRouter();
  return (
    <>
      <h1 className="mt-14 p-4 text-center font-inter text-6xl text-zinc-300 md:text-9xl">
        ComingSoon
      </h1>
      <p className="p-4 text-center font-inter text-base text-zinc-300 md:text-2xl">
        The page you have requested is still under development and is not ready
        to be seen.
      </p>
      <div className=" flex h-[15vh] w-full place-content-center bg-[url(https://source.unsplash.com/DuHKoV44prg)] bg-cover bg-left bg-no-repeat md:h-[40vh]"></div>
      <div className="flex place-content-center place-items-center p-4">
        <p className="mr-2 text-center font-inter text-xl font-black text-zinc-300">
          Help Speed Up Development
        </p>
        <div className="rounded-xl bg-zinc-300">
          <PaypalDonate />
        </div>
      </div>
      <div className="flex place-content-center place-items-center">
        <div
          onClick={() => router.back()}
          className="flex w-[60vw] place-content-center place-items-center rounded-xl bg-gradient-to-b from-sky-500 to-sky-600 text-center font-inter font-bold text-zinc-300"
        >
          Back to where I was
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
