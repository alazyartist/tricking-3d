import React, { useState } from "react";
import TrickList_Component from "./trickList_Component";
import TrickList_Next from "./trickList";
import { useStore } from "../../../store/store";

const Tricklist: React.FC<any> = ({
  data,
  date,
  last,
  drag_offset,
  swipe_left,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const innerArray = data.combos
    ? data.combos.map((c) => c.combo)
    : data.comboArray;

  const setSelected = useStore((s) => s.setSelected_TrickList);

  const _toggleOpen = () => {
    setSelected(isOpen ? undefined : data);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {
        <TrickList_Component
          data={data}
          open={isOpen}
          date={date}
          last={last}
          fn={() => {
            _toggleOpen();
          }}
          drag_offset={drag_offset}
        />
      }
      {isOpen &&
        Array.isArray(innerArray) &&
        innerArray.length > 0 &&
        innerArray.map((combo, j) => {
          return (
            <>
              {
                <TrickList_Next
                  key={combo.id}
                  data={combo}
                  date={date}
                  last={j === innerArray.length - 1}
                  drag_offset={drag_offset}
                />
              }
            </>
          );
        })}
    </>
  );
};

export default Tricklist;
