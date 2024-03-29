import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { PropsWithChildren } from "react";
import { useStore } from "@store/store";

interface DWProps {
  children: PropsWithChildren;
  drag_offset_limit: number;
}
export const DragableWrapper: React.FC<DWProps> = ({
  children,
  drag_offset_limit,
}) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const setSpeedControl = useStore((state) => state.setSpeedControl);
  const setTrimToggle = useStore((state) => state.setTrimToggle);
  const setTimescale = useStore((state) => state.setTimescale);
  const timescale = useStore((state) => state.timescale);
  // Local Functions
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
  const lerp = (start: number, end: number, amt: number) =>
    (1 - amt) * start + amt * end;

  // Set the drag hook and define component movement based on gesture data
  const bind: any = useDrag(
    ({ currentTarget, first, last, dragging, down, movement: [mx, my] }) => {
      setSpeedControl(first);
      setSpeedControl(!last);

      if (dragging) {
        my = 0;
        mx = clamp(mx, -drag_offset_limit, drag_offset_limit);
        setTimescale(
          lerp(0.01, 2, (mx + drag_offset_limit) / (drag_offset_limit * 2))
        );
      }

      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    }
  );

  // Bind it to a component
  return (
    <animated.div
      id={"animated DRAGABLE"}
      className={" h-fit w-fit"}
      {...bind()}
      style={{ x, y, touchAction: "none" }}
    >
      {children}
    </animated.div>
  );
};

export default DragableWrapper;
