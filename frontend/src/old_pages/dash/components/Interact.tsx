import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useUserStore } from "@store/userStore";
import { useStore } from "@store/store";
import { useInteraction } from "../../../api/useInteractions";

const Interact = () => {
  const { userInfo, accessToken } = useUserStore();
  const { uuid } = userInfo;
  const [content, setContent] = useState<undefined | any[] | any>();
  const trick_id = useStore((s) => s.trick_id);

  const { mutate: comment } = useInteraction();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("trying interact");
      comment({
        accessToken: accessToken,
        uuid: uuid as string,
        trick_id: trick_id,
        type: "comment",
        content: content,
      });
      // const newInteract = await apiPrivate.post("/user/interact", {
      // });
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    trick_id && (
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex place-content-center gap-2 font-inter text-zinc-800"
        >
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="z-[1020]
                    w-[80vw] rounded-xl p-1"
            type="text"
          />
          <button
            type="submit"
            value="Submit"
            className="w-fit p-4 text-zinc-300 "
          >
            <FaArrowUp />
          </button>
        </form>
      </div>
    )
  );
};

export default Interact;
