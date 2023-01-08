"use client";
import React, { lazy, Suspense, useState } from "react";
import Link from "next/link";
import { FaClipboardList, FaQrcode } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { useUserStore } from "../../store/userStore";
import { TrickedexLogo } from "../../data/icons/TrickedexLogo";
// import ComboMakerV2 from "../comboMakerV2/ComboMakerV2";
import useUserInfo from "../../api/useUserInfo";
import { IoIosArrowBack } from "react-icons/io";
import PublicHomePage from "./components/PublicHomePage";
// import Feed from "./components/Feed";
import { useSpring, animated } from "react-spring";
import BiCube from "../../data/icons/BiCube";
import ComboMakerBlueprintsvg from "../../data/ComboMakerBlueprintsvg";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { trpc } from "utils/trpc";
const ProfileCode = dynamic(() => import("../dash/components/ProfileCode"));
const ClaimTricks = dynamic(() => import("../claimtricks/ClaimTricks"));
const TricklistPage = dynamic(() => import("../tricklist/TricklistPage"));
function Home() {
  const user = useUserStore((s) => s.userInfo?.username);
  const { uuid } = useUserStore((s) => s.userInfo);
  const accessToken = useUserStore((s) => s.accessToken);
  const [atLocal, setATLocal] = useState(null);
  useUserInfo();
  useEffect(() => {
    if (accessToken) {
      setATLocal(accessToken);
    } else {
      setATLocal(null);
    }
  }, [accessToken]);
  const [openCaptures, setOpenCaptures] = useState(false);
  const [openTricklists, setOpenTricklists] = useState(false);
  const [openClaimtricks, setOpenClaimtricks] = useState(false);
  const [openComboMaker, setOpenComboMaker] = useState(false);
  // console.log("uuid: ", uuid);
  const { data } = trpc.userDB.findAll.useQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  const logoAnim = useSpring({
    to: { width: atLocal ? "50vw" : "100vw" },
  });
  return (
    <div className="no-scrollbar stick h-[100vh] w-full overflow-y-scroll md:pt-[15vh] ">
      <div
        id="AppBackground-flex"
        className="flex h-screen w-screen flex-col place-items-center"
      >
        <div
          className={`flex w-full  ${
            atLocal ? "place-content-start" : "place-content-center"
          } text-center text-zinc-200 xl:absolute xl:top-0`}
        >
          <animated.div
            style={{ ...logoAnim }}
            className="left-0 flex max-w-[300px] flex-col text-center text-xl "
          >
            {!atLocal && "Welcome to the"}
            <TrickedexLogo className={`-m-2px flex fill-zinc-300`} />
          </animated.div>
        </div>
        <div className="bg-zinc-800 p-1 text-zinc-300">
          {data &&
            data.users?.map((user) => {
              return <div>{user.username}</div>;
            })}
        </div>
        <div className="rounded-xl bg-zinc-800 bg-opacity-40 py-2">
          {!openCaptures &&
            !openComboMaker &&
            !openClaimtricks &&
            !openTricklists && (
              <div className="flex flex-col place-items-center">
                <Link
                  href="/learnMore"
                  className="m-2 rounded-3xl bg-indigo-600 px-4 py-2 font-inter font-semibold text-zinc-300"
                >
                  Learn More
                </Link>
                {/* <Suspense
						fallback={
							<div className='text-center font-inter text-4xl font-black text-zinc-300'>
							Listen. theres a lot here.
							</div>
						}>
						<EnterSandboxLink />
						</Suspense>
						
					<Feed /> */}
                <Link
                  href={"/sandbox"}
                  className=" mt-4 mb-4 w-[70vw] max-w-[600px]  rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-3xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]"
                >
                  <span className="flex place-content-center items-center gap-2">
                    Sandbox <BiCube />
                  </span>
                </Link>
                <Link
                  href={"/pppoints"}
                  className=" mt-4 mb-4 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-3xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]"
                >
                  BattleRooms
                </Link>
                <Link
                  href={accessToken ? "/addSession" : "/login"}
                  className=" mt-4 mb-8 w-[70vw] max-w-[600px] rounded-xl bg-zinc-800 bg-opacity-80 p-2 text-center font-titan text-3xl text-zinc-300 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)] "
                >
                  Add Session
                </Link>
              </div>
            )}
          <div className="flex w-[90vw] max-w-[700px] flex-col place-content-center">
            {!atLocal ? (
              <PublicHomePage />
            ) : (
              // LoggedIn
              <>
                <div className="flex flex-grow-0 justify-around text-zinc-300">
                  <div className="mb-4 grid w-full max-w-[600px] grid-cols-2 grid-rows-2 place-content-center place-items-center gap-4">
                    {/* Captures */}
                    {openCaptures ? (
                      <div
                        className={`${
                          openCaptures ? "col-span-2 row-span-2" : ""
                        }`}
                      >
                        <ProfileCode
                          setProfileCodeOpen={setOpenCaptures}
                          profileCodeOpen={openCaptures}
                        />
                      </div>
                    ) : (
                      !openTricklists &&
                      !openComboMaker &&
                      !openClaimtricks && (
                        <div
                          onClick={() => setOpenCaptures(!openCaptures)}
                          className={`neumorphic active:neumorphicIn flex h-full w-full max-w-[600px] flex-col place-content-center   place-items-center rounded-lg bg-zinc-800 text-4xl `}
                        >
                          <FaQrcode />
                          <div className="text-lg font-bold">Capture</div>
                        </div>
                      )
                    )}

                    {/* Tricklists */}
                    {openTricklists ? (
                      <div
                        className={`neumorphicIn relative my-2 flex max-w-[600px] flex-col place-items-center gap-2 rounded-xl bg-zinc-800 pt-[3vh] ${
                          openTricklists ? "col-span-2 row-span-2" : ""
                        }`}
                      >
                        <IoIosArrowBack
                          className="absolute top-4 right-1 text-4xl"
                          onClick={() => setOpenTricklists(!openTricklists)}
                        />
                        <TricklistPage displayOnly={false} profileuuid={uuid} />
                      </div>
                    ) : (
                      !openCaptures &&
                      !openComboMaker &&
                      !openClaimtricks && (
                        <div
                          onClick={() => setOpenTricklists(!openTricklists)}
                          className="neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl "
                        >
                          <FaClipboardList />
                          <div className="text-lg font-bold">Tricklist</div>
                        </div>
                      )
                    )}
                    {/* ClaimTricks */}

                    {openClaimtricks ? (
                      <div
                        className={`neumorphicIn relative my-2 flex max-w-[600px] flex-col place-items-center gap-2 rounded-xl bg-zinc-800 pt-[3vh] ${
                          openClaimtricks ? "col-span-2 row-span-2" : ""
                        }`}
                      >
                        <IoIosArrowBack
                          className="absolute top-4 right-1 text-4xl"
                          onClick={() => setOpenClaimtricks(!openClaimtricks)}
                        />
                        <ClaimTricks user_id={uuid} />
                      </div>
                    ) : (
                      !openTricklists &&
                      !openCaptures &&
                      !openComboMaker && (
                        <div
                          onClick={() => setOpenClaimtricks(!openClaimtricks)}
                          className="neumorphic active:neumorphicIn flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 text-4xl"
                        >
                          <BsClipboardCheck />
                          <div className="text-lg font-bold">Claim Tricks</div>
                        </div>
                      )
                    )}
                    {/* ComboMaker */}
                    {openComboMaker ? (
                      <div
                        className={`neumorphicIn relative my-2 flex max-w-[600px] flex-col place-items-center gap-2 rounded-xl bg-zinc-800 pt-[3vh] ${
                          openComboMaker ? "col-span-2 row-span-2" : ""
                        }`}
                      >
                        <IoIosArrowBack
                          className="absolute top-4 right-1 text-4xl"
                          onClick={() => setOpenComboMaker(!openComboMaker)}
                        />
                        {/* <ComboMakerV2 /> */}
                      </div>
                    ) : (
                      !openTricklists &&
                      !openCaptures &&
                      !openClaimtricks && (
                        <Link
                          href="/comboMaker"
                          className="neumorphic  active:neumorphicIn min-h-36 flex h-full w-full flex-col place-content-center place-items-center rounded-lg bg-zinc-800 p-4 text-4xl"
                        >
                          <ComboMakerBlueprintsvg
                            className="h-24"
                            fill={"#d4d4d8"}
                          />
                          <div className="mt-[-18px] text-lg font-bold">
                            ComboMaker
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                  <>
                    {/* <div className='flex flex-col gap-2 rounded-xl bg-zinc-700 p-2'>
											<UpdateStatusInput />
										</div> */}
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
