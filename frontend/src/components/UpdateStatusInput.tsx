import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useUpdateStatus } from "../api/useUpdateStatus";
import { useUserStore } from "../store/userStore";

const UpdateStatusInput = () => {
  const { mutate: updateStatus } = useUpdateStatus();
  const [status, setStatus] = useState<string>();
  const uuid = useUserStore((s) => s.userInfo.uuid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateStatus({ status, user_id: uuid as string });
    setStatus("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex place-content-center gap-2 font-inter text-zinc-800"
    >
      <div className="text-xs text-zinc-400">
        update
        <br />
        status
      </div>
      <input
        value={status}
        className="w-full rounded-xl bg-zinc-400 p-1 text-sm"
        type={"text"}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      />
      <button type="submit" value="Submit" className="w-fit p-2 text-zinc-300 ">
        <FaArrowUp />
      </button>
    </form>
  );
};

export default UpdateStatusInput;
