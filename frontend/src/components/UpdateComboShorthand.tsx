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
      <MdClose
        onClick={() => setShorthandOpen((prev) => !prev)}
        className={"absolute top-2 left-2 z-[2] text-2xl"}
      />
      <div className="absolute top-0 left-0 flex h-full w-full flex-col place-content-center place-items-center  bg-zinc-900 bg-opacity-90">
        <div
          className={
            "mt-6 flex max-w-[90vw] flex-col place-content-center place-items-center gap-2"
          }
        >
          <h1 className="text-xs md:text-lg">
            <div className="flex w-full flex-wrap gap-1 p-2">
              {combo.ClipLabel.comboArray.map((item, i) => (
                <div key={i + item.name}>
                  <span>{item.name}</span>
                  {i !== combo.ClipLabel.comboArray.length - 1 && (
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
            <button type="submit" className="">
              <FaArrowUp className="fill-sky-500 text-3xl" />
            </button>
          </form>
        </div>
        <div className="h-40 w-full">Testing</div>
      </div>
    </>
  );
};

export default UpdateComboShorthand;
