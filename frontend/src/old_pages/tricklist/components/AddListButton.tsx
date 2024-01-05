import React from "react";
import MakeNewTrickList from "./MakeNewTrickList";

const AddListButton = ({ setOpen, open }) => {
  return (
    <>
      {!open && (
        <button
          className=" 
					fit neumorphic active:neumorphicIn flex
					h-[7vh] max-h-[80px] w-[60vw] max-w-[500px] flex-row items-center justify-center rounded-full bg-zinc-800 font-inter text-lg font-semibold text-zinc-400
					"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Add New Trick List
        </button>
      )}
      {open && <MakeNewTrickList setOpen={setOpen} />}
    </>
  );
};

export default AddListButton;
