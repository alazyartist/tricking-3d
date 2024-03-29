import React, { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import { useUserStore } from "../../../store/userStore";
import UpdateUserInfoForm from "../../../components/info/UpdateUserInfoForm";
import UpdateProfilePic from "../../../components/info/UpdateProfilePic";
import { OutOfCredits } from "@old_pages/sessions/AddSessionPage";
import Link from "next/link";
import { trpc } from "@utils/trpc";

interface Props {
  src: string;
  edit: Boolean;
  first_name: string;
  last_name: string;
  username: string;
}

const UserCard: React.FC<Props> = (props) => {
  const userInfo = useUserStore((s) => s.userInfo);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const { data: SessionReviewCredits, refetch } =
    trpc.userDB.getCurrentCredits.useQuery();
  const [editing, setEditing] = useState(false);
  const editMenu = useTransition(editing, {
    from: { opacity: 0, top: "-40vw" },
    enter: { opacity: 1, top: "0" },
    leave: { opacity: 0, top: "-40vw" },
    reverse: editing,
    delay: 100,
    config: { durration: 1200, tension: 280, friction: 40 },
    // onRest: () => setediting(!editing),
  });
  const [showCreditPacks, setShowCreditPacks] = useState(false);

  return (
    <>
      <Link href={`userProfile/${userInfo.uuid}`}>
        <div className="mx-2 flex w-[70vw] place-items-center justify-between rounded-xl bg-zinc-800 px-4 sm:w-[50vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw]">
          <div className="flex flex-col place-items-center">
            <img src={props.src} className="m-2 h-20 w-20 rounded-full" />
            {/* {props.edit && (
            <div
              onClick={() => {
                setEditing(!editing);
              }}
              className="flex place-self-center text-xs"
            >
              Edit Info
            </div>
          )} */}
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">
              {props.first_name + " " + props.last_name}
            </p>
            <p className="text-xs">{props.username}</p>
          </div>
        </div>
      </Link>
      <div className="flex w-full flex-col place-items-center gap-2">
        {(typeof SessionReviewCredits === "number" &&
          SessionReviewCredits < 1) ||
        showCreditPacks ? (
          <OutOfCredits
            setShowCreditPacks={setShowCreditPacks}
            closePopover={() => setShowCreditPacks(false)}
          />
        ) : (
          <button
            className="rounded-xl bg-gradient-to-b from-teal-400 to-emerald-500 p-2 text-zinc-900 drop-shadow-md"
            onClick={() => {
              setShowCreditPacks((prev) => !prev);
              refetch();
            }}
          >
            Credits: {SessionReviewCredits}
          </button>
        )}
      </div>
      {/* {editing && (
				<div className='mt-4 h-10 w-[70vw] rounded-xl bg-zinc-800'>
					<UpdateUserInfoForm />
				</div>
			)} */}
      {editMenu(
        (styles, editing) =>
          editing && (
            <animated.div
              className="relative z-20 mt-4 h-10 w-[70vw] rounded-xl"
              style={styles}
            >
              <UpdateProfilePic />
              <UpdateUserInfoForm setEditing={setEditing} />
            </animated.div>
          )
      )}
    </>
  );
};

export default UserCard;
