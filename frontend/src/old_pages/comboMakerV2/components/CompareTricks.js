import React, { useState } from "react";

const CompareTricks = ({ newCombo }) => {
  const [comboCompare, setComboCompare] = useState([]);
  return (
    <div className="no-scrollbar relative mb-10 h-[60vw] min-h-[80px] w-[85vw] overflow-y-scroll rounded-md bg-zinc-300 bg-opacity-[13%] p-2 text-zinc-300 backdrop-blur-xl">
      <div
        className="absolute top-[6vh]  right-2 h-fit font-titan text-4xl"
        onClick={() => setComboCompare((s) => s.slice(0, s.length - 1))}
      >
        -
      </div>
      <div
        className="absolute top-[0vh] right-2 h-fit font-titan text-4xl"
        onClick={() => setComboCompare((s) => [...s, [...newCombo]])}
      >
        +
      </div>
      <div>
        {comboCompare?.map((combo) => (
          <div className="no-scrollbar flex w-[92%] gap-2 overflow-hidden overflow-x-scroll">
            <div>{combo.reduce((sum, b) => sum + b.pointValue, 0)}</div>
            {combo?.map((ci, i) => (
              <div className="flex-shrink-0">{ci.name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareTricks;
