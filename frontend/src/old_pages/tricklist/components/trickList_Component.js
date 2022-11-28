import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useStore } from "../../../store/store";
import { useDeleteTricklist, useDeleteCombo } from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";
import Claimed from "./Claimed.js";

const TrickList_Component = ({ data, open, date, last, fn, drag_offset }) => {
  const selected = useStore((s) => s.selected_TrickList);
  const setSelected = useStore((s) => s.setSelected_TrickList);
  const userInfo = useUserStore((s) => s.userInfo);
  const [selectorColor, setSelectorColor] = useState();
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  const left = {
    bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
    offset: "90%",
  };
  const right = {
    bg: `linear-gradient(120deg, #96fbc4 0%, #a9f586 100%)`,
    offset: "5%",
  };
  const [{ x, bg, scale, offset }, api] = useSpring(() => ({ x: 0, scale: 1 }));
  const { mutate: deleteTricklist } = useDeleteTricklist(
    selected?.tricklist_id
  );
  const { mutate: deleteCombo } = useDeleteCombo();

  const swipe_left = () => {
    data.type ? deleteCombo(selected?.Tricklist_Combos) : deleteTricklist();
    setSelected(undefined);
  };
  const swipe_right = () => {
    console.log("Swiped to the right: ", selected);
  };

  const _getStyle = () => {
    let _style =
      "h-[5vh] break-all w-full p-2 font-inter text-sm font-semibold text-zinc-200";
    switch (data.type) {
      default:
        _style = _style.concat(" bg-zinc-900");
        if (open) _style = _style.concat(" rounded-t-lg h-[5vh]");
        else _style = _style.concat(" rounded-lg h-[6vh]");
        break;
      case "Combo":
        _style = _style.concat(" bg-zinc-700");
        if (open) _style = _style.concat(" h-[6vh]");
        else {
          _style = _style.concat(" h-[5vh]");
          if (last) _style = _style.concat(" rounded-b-lg");
          else
            _style = _style = _style.concat(
              " border-zinc-800 border-dotted border-b-2"
            );
        }
        break;
      case "Trick":
        _style = _style.concat(" h-[5vh] bg-zinc-500");
        if (open) _style = _style.concat(" bg-zinc-600");
        else _style = _style.concat("");
        if (last) _style = _style.concat(" rounded-b-lg");
        else
          _style = _style = _style.concat(
            " border-zinc-700 border-dashed border-b-2"
          );
        break;
    }
    return _style.concat(" ");
  };

  const bind = useDrag(
    ({ first, initial, active, dragging, movement: [x] }) => {
      if (dragging) {
        x = clamp(x, -drag_offset, drag_offset);
        setSelectorColor("white");
        if (x > drag_offset * 0.8) setSelectorColor(left.bg);
        else if (x < -drag_offset * 0.8) setSelectorColor(right.bg);
      }
      // Release Touch
      else {
        if (x > drag_offset * 0.8) {
          swipe_right();
        } else if (x < -drag_offset * 0.8) {
          swipe_left();
        }
      }

      api.start({
        x: active ? x : 0,
        scale: active ? 1.1 : 1,
        ...(x < 0 ? left : right),
        immediate: (name) => active && name === "x",
      });
    }
  );

  const avSize = x.to({
    map: Math.abs,
    range: [50, 200],
    output: [1, 2],
    extrapolate: "clamp",
  });

  let label = "";
  if (data.name) {
    label = data.name;
    if (data.type === undefined) label = label.concat(" : ", date);
  }

  return (
    /* BACKGROUND */
    <animated.div
      {...bind()}
      className={`relative rounded-xl`}
      style={{ background: bg, touchAction: "none" }}
    >
      {/* FLOATING BALL */}
      <animated.div
        className="absolute left-[50%] flex h-full flex-col justify-center"
        style={{ left: offset }}
      >
        <animated.div
          className={`
					relative h-4
					w-4 rounded-full 
					bg-white 
				`}
          style={{ scale: avSize, background: selectorColor }}
        />
      </animated.div>

      {/* MAIN ELEMENT */}
      <animated.div
        className={
          "relative flex h-full w-full flex-row items-center justify-center"
        }
        {...bind()}
        style={{ x, touchAction: "none" }}
      >
        <button
          onClick={() => {
            fn();
          }}
          className={_getStyle()}
        >
          {label}
          {data.type === "Combo" && (
            <Claimed
              user_id={userInfo.uuid}
              combo_id={data?.combo_id}
              combo={data}
            />
          )}
        </button>
      </animated.div>
    </animated.div>
  );
};

export default TrickList_Component;
