import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useUserStore } from "../../../store/userStore";
import UpdateUserInfoForm from "../../../components/info/UpdateUserInfoForm";
import UpdateProfilePic from "../../../components/info/UpdateProfilePic";
import { OutOfCredits } from "@old_pages/sessions/AddSessionPage";

interface Props {
  src: string;
  edit: Boolean;
}

const UserCard: React.FC<Props> = (props) => {
  const userInfo = useUserStore((s) => s.userInfo);
  const [editingPhoto, setEditingPhoto] = useState(false);
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

  return (
    <>
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
            {userInfo.first_name + " " + userInfo.last_name}
          </p>
          <p className="text-xs">{userInfo.username}</p>
        </div>
      </div>
      {userInfo.SessionReviewCredits > 1 ? (
        <p>Credits: {userInfo.SessionReviewCredits}</p>
      ) : (
        <OutOfCredits />
      )}
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
