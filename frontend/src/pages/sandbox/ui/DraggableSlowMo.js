import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useStore } from "../../../store/store.js";

export const DragableWrapper = ({ children, drag_offset_limit }) => {
	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);

	// Set the drag hook and define component movement based on gesture data
	const bind = useDrag(({ currentTarget, down, movement: [mx, my] }) => {
		my = 0;
		if (mx < -drag_offset_limit) {
			if (timescale > 0) setTimescale(timescale - 0.01);
			else setTimescale(timescale + 0.01);
			mx = -drag_offset_limit;
		}
		if (mx > drag_offset_limit) {
			if (timescale > 0) setTimescale(timescale + 0.01);
			else setTimescale(timescale - 0.01);
			mx = drag_offset_limit;
		}
		if (timescale <= 0) setTimescale(0.1);
		if (timescale > 2) setTimescale(2.0);
		mx = mx;

		api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
	});

	// Bind it to a component
	return (
		<animated.div
			id={"animated DRAGABLE"}
			className={" h-fit w-fit"}
			{...bind()}
			style={{ x, y, touchAction: "none" }}>
			{children}
		</animated.div>
	);
};

export default DragableWrapper;
