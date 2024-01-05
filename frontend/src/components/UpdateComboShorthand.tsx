import { MdClose } from "@data/icons/MdIcons";
import { useUpdateComboShorthand } from "api/useGetCombos";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { trpc } from "utils/trpc";
import * as d3 from "d3";

const UpdateComboShorthand = ({ sessiondata, setShorthandOpen, summary }) => {
  const { mutate: updateShorthand } = useUpdateComboShorthand();
  const [shorthand, setShorthand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateShorthand({ combo_id: sessiondata.ClipLabel.combo_id, shorthand });
    setShorthandOpen((prev) => !prev);
  };
  console.log("summary", summary);
  const { mutateAsync: updateTricker, data: updatedTricker } =
    trpc.sessionsummaries.updateSessionDataTricker.useMutation();
  return (
    <>
      <MdClose
        onClick={() => setShorthandOpen((prev) => !prev)}
        className={"absolute left-2 top-2 z-[6] text-2xl"}
      />
      <div className="absolute left-0 top-0 z-[4] flex h-full w-full flex-col place-content-center place-items-center  bg-zinc-900 bg-opacity-90">
        <div
          className={
            "mt-6 flex max-w-[90vw] flex-col place-content-center place-items-center gap-2"
          }
        >
          <h1>
            {updatedTricker?.tricker?.username ||
              sessiondata?.tricker?.username}
          </h1>
          <h1 className="text-xs md:text-lg">
            <div className="flex w-full flex-wrap gap-1 p-2">
              {sessiondata.ClipLabel.comboArray.map((item, i) => (
                <div key={i + item.name}>
                  <span>{item.name}</span>
                  {i !== sessiondata.ClipLabel.comboArray.length - 1 && (
                    <span>{">"}</span>
                  )}
                </div>
              ))}
            </div>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex place-items-center gap-2"
          >
            <input
              spellCheck={false}
              className="text-md rounded-md p-2 px-4 md:text-xl"
              type="text"
              value={shorthand}
              onChange={(e) => setShorthand(e.target.value)}
            />
            <button type="submit" className="fill-sky-500 text-3xl">
              <FaArrowUp />
            </button>
          </form>
        </div>
        <div className="h-full w-full">
          <AddUserToSessionDataButtons
            sessiondata={sessiondata}
            trickers={summary?.trickers}
            updateTricker={updateTricker}
          />
        </div>
        <DeleteSessionDataButton sessiondata={sessiondata} />
      </div>
    </>
  );
};

export default UpdateComboShorthand;

const DeleteSessionDataButton = ({ sessiondata }) => {
  console.log(sessiondata);
  const { mutateAsync: deleteSessionData, isSuccess } =
    trpc.sessionsummaries.deleteSessionDataById.useMutation();
  const handleDelete = () => {
    if (!!deleteCheck) {
      deleteSessionData({ id: sessiondata.id });
    }
  };
  const [deleteCheck, setDeleteCheck] = useState(false);

  return (
    <>
      {deleteCheck ? (
        <div className="m-4 flex gap-2">
          <button
            onClick={() => handleDelete()}
            className="rounded-md bg-red-200 px-2 text-red-800"
            type="button"
          >
            Delete
          </button>
          <button
            onClick={() => setDeleteCheck(false)}
            className="rounded-md bg-emerald-200 px-2 text-emerald-800"
            type="button"
          >
            Just kidding.
          </button>
        </div>
      ) : (
        <button
          className="m-4 place-self-end rounded-md bg-red-200 px-2 text-red-800"
          onClick={() => setDeleteCheck(true)}
          type="button"
        >
          Delete
        </button>
      )}
    </>
  );
};

const AddUserToSessionDataButtons = ({
  trickers,
  sessiondata,
  updateTricker,
}) => {
  const { data: allUsers } = trpc.userDB.findAll.useQuery();
  const handleUpdateClick = (tricker) => {
    updateTricker({ tricker_id: tricker.uuid, sessiondataid: sessiondata.id });
  };
  const [seeAll, setSeeAll] = useState(false);
  return (
    <div className="flex flex-col justify-around gap-2 p-4">
      <div className="flex justify-around gap-2 p-4">
        {trickers?.length ? (
          trickers.map((tricker) => {
            return (
              <>
                <div className="flex flex-col place-items-center">
                  <div
                    onClick={() => handleUpdateClick(tricker)}
                    key={tricker.uuid}
                    style={{
                      backgroundColor: d3.interpolateRainbow(
                        tricker.id / trickers.length
                      ),
                    }}
                    className={`relative h-12 w-12 rounded-full`}
                  >
                    <img
                      src={
                        !tricker.profilePic
                          ? `/images/noimg.jpeg`
                          : `/images/${tricker.uuid}/${tricker.profilePic}`
                      }
                      alt={"profilePic"}
                      className={`h-12 w-12 rounded-full ${
                        !tricker.profilePic
                          ? " mix-blend-multiply contrast-150"
                          : ""
                      }`}
                    />
                  </div>
                  <p className="w-ful text-center text-xs text-zinc-300">
                    {tricker.username}
                  </p>
                </div>
              </>
            );
          })
        ) : (
          <p>No Trickers to Display</p>
        )}
      </div>
      <div className="grid w-full grid-cols-4 gap-2">
        {allUsers?.length &&
          seeAll &&
          allUsers.map((tricker) => {
            return (
              <>
                <div className="flex flex-col place-items-center">
                  <div
                    onClick={() => handleUpdateClick(tricker)}
                    key={tricker.uuid}
                    style={{
                      backgroundColor: d3.interpolateRainbow(
                        tricker.id / allUsers.length
                      ),
                    }}
                    className={`relative h-12 w-12 rounded-full`}
                  >
                    <img
                      src={
                        !tricker.profilePic
                          ? `/images/noimg.jpeg`
                          : `/images/${tricker.uuid}/${tricker.profilePic}`
                      }
                      alt={"profilePic"}
                      className={`h-12 w-12 rounded-full ${
                        !tricker.profilePic
                          ? " mix-blend-multiply contrast-150"
                          : ""
                      }`}
                    />
                  </div>
                  <p className="w-ful text-center text-xs text-zinc-300">
                    {tricker.username}
                  </p>
                </div>
              </>
            );
          })}
      </div>
      {!seeAll && (
        <button
          type="button"
          onClick={() => setSeeAll(true)}
          className="flex  place-self-center rounded-md bg-sky-400 p-4 text-xl text-sky-800"
        >
          See All Users
        </button>
      )}
    </div>
  );
};
