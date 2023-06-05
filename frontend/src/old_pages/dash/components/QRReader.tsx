import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import useCaptureUser from "../../../api/useCaptures";
import useUserInfoByUUID from "../../../api/useUserInfoById";
import { useUserStore } from "../../../store/userStore";
import { useTransition, animated } from "react-spring";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
const QRReader = () => {
  const [QRData, setQRData] = useState();
  const [QRDataResponse, setQRDataResponse] = useState("Capture Valid User");
  const activeUser = useUserStore((s) => s.userInfo);
  // const { mutate: captureUser } = useCaptureUser();
  const { mutate: captureUser } = trpc.userDB.captureUser.useMutation();
  const [addedCapture, setAddedCapture] = useState<boolean>();
  const addCaptureSuccessAnim = useTransition(addedCapture, {
    from: { top: -300, opacity: 0 },
    enter: { top: 0, opacity: 100 },
    leave: { opacity: 0 },
    config: { durration: 300, tension: 200, friction: 50 },
  });
  const nav = useRouter();
  // const location = useLocation();
  const { data: capturedUserInfo } = useUserInfoByUUID(QRData);

  useEffect(() => {
    capturedUserInfo && setQRDataResponse(capturedUserInfo?.username);
  }, [capturedUserInfo]);
  const handleResult = async (result, err) => {
    if (!!result) {
      setQRData(result?.text);
      console.log("result", result);
      captureUser({
        useruuid: activeUser?.uuid as string,
        captureuuid: result.text,
        // accessToken: activeUser.accessToken as string,
      });
      console.log(capturedUserInfo);
      // result.text &&
      // 	location.pathname.includes("/home") &&
      {
        QRDataResponse !== "Capture Valid User" &&
          setTimeout(() => {
            nav.push(`/userProfile/${QRData}`);
          }, 2222);
      }
    }
  };
  return (
    <div className="w-full">
      <div className="mt-8">
        <QrReader
          //ViewFinder={()=>(<div className="border-2 h-20 w-20 z-[100] border-red-300"></div>)}
          onResult={(result, err) => handleResult(result, err)}
          //@ts-ignore
          style={{ width: "325px", height: "325px" }}
          videoId={"video"}
          constraints={{ facingMode: "environment", aspectRatio: 1 }}
          videoStyle={{
            borderColor: "#3f3f46",
            borderRadius: "30px",
            borderWidth: "0px",
            width: "70vw",
            height: "70vw",
          }}
          videoContainerStyle={{
            margin: "auto",
            width: "70vw",
            height: "70vw",
          }}
        />

        <div className="text-center font-inter text-xl font-bold">
          {(QRDataResponse !== "Capture Valid User" && (
            <>
              {addCaptureSuccessAnim(
                (styles, valid) =>
                  valid && (
                    <animated.div
                      className={
                        "place-item-center absolute top-0 left-0 flex w-full rounded-md bg-emerald-600"
                      }
                      style={styles}
                    >
                      <div className="w-full p-2 py-5">{`You Captured ${QRDataResponse}`}</div>
                      {/*
                  <button
                    className="rounded-lg bg-zinc-700 p-1 text-sm"
                    // onClick={() => nav.push(`/userProfile/${QRData}`)}
                  >
                    View Profile
                  </button>
                  */}
                    </animated.div>
                  )
              )}
            </>
          )) || <div>"Capture Valid User"</div>}
          {/* Used to test valid capture 
          <div className="bg-red-500">
            <button onClick={() => {setAddedCapture(!addedCapture); setTimeout(()=>{nav.push('/')},1500)}}>VALIDATE</button>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default QRReader;
