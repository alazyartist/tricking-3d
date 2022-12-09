import { MdClose } from "@data/icons/MdIcons";
import { useUpdateComboShorthand } from "api/useGetCombos";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const UpdateComboShorthand = ({ combo, setShorthandOpen }) => {
  const { data: comboShorthand, mutate: updateShorthand } =
    useUpdateComboShorthand();
  const [shorthand, setShorthand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateShorthand({ combo_id: combo.ClipLabel.combo_id, shorthand });
    setShorthandOpen((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex h-full w-full place-content-center place-items-center bg-zinc-900 bg-opacity-90">
        <div
          className={
            "flex max-w-[90vw] flex-col place-content-center place-items-center gap-2"
          }
        >
          <h1 className="text-xs md:text-lg">
            <div>{combo.ClipLabel.name.slice(0, 40)}</div>
            <div>{combo.ClipLabel.name.slice(40, 80)}</div>
            <div>{combo.ClipLabel.name.slice(80, 120)}</div>
            <div>{combo.ClipLabel.name.slice(90, 120)}</div>
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
            <button type="submit" className="">
              <FaArrowUp className="fill-sky-500 text-3xl" />
            </button>
          </form>
        </div>
      </div>
      <MdClose
        onClick={() => setShorthandOpen((prev) => !prev)}
        className={"absolute top-5 right-5 text-2xl"}
      />
    </>
  );
};

export default UpdateComboShorthand;
