import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import useMakeTricklist from "../../../api/useMakeTricklist";
import { useUserStore } from "../../../store/userStore";

const MakeNewTrickList = ({ setOpen }) => {
  const [name, setName] = useState("");
  const { uuid } = useUserStore((s) => s.userInfo);
  const { mutate: makeNewTricklist } = useMakeTricklist();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit new Tricklist");
    makeNewTricklist({ uuid, name });

    setOpen(false);
  };
  const handleClick = (e) => {
    if (e.target.nodeName === "DIV") {
      setOpen(false);
    }
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className=" h-full w-full rounded-xl bg-zinc-800 bg-opacity-40 p-2 "
    >
      <label
        className="flex place-items-center gap-4 text-2xl md:left-[35%] lg:left-[45%]"
        htmlFor="name-input"
      >
        <div onClick={() => setOpen(false)}>
          <IoIosArrowBack />
        </div>
        <div>Name your Tricklist</div>
      </label>
      <div className=" top-[50vh] flex w-full flex-col p-2 ">
        <form
          onSubmit={handleSubmit}
          className="flex place-content-center gap-2"
        >
          <input
            id={"name-input"}
            className="neumorphicIn rounded-xl p-1 pl-2 text-zinc-400"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={"Tricklist Name"}
            value={name}
            type={"text"}
          />
          <button className=" w-fit rounded-xl bg-emerald-600 p-2 text-zinc-300">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeNewTrickList;
