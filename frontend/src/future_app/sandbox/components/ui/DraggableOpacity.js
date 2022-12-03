import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useVideoStore } from "../videoOverlay/useVideoStore.js";

export const DraggableOpacity = ({ children, drag_offset_limit, canvas }) => {
	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const setVideoOpacity = useVideoStore((s) => s.setVideoOpacity);
	const setCanvasOpacity = useVideoStore((s) => s.setCanvasOpacity);
	// Local Functions
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
	const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

	// Set the drag hook and define component movement based on gesture data
	const bind = useDrag(
		({ currentTarget, first, last, dragging, down, movement: [mx, my] }) => {
			if (dragging && !canvas) {
				my = clamp(my, -drag_offset_limit, drag_offset_limit);
				mx = 0;
				setVideoOpacity(
					lerp(1, 0, (my + drag_offset_limit) / (drag_offset_limit * 2))
				);
			}
			if (dragging && canvas) {
				my = clamp(my, -drag_offset_limit, drag_offset_limit);
				mx = 0;
				setCanvasOpacity(
					lerp(1, 0, (my + drag_offset_limit) / (drag_offset_limit * 2))
				);
			}

			api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
		}
	);

	// Bind it to a component
	return (
		<animated.div
			id={"animated DRAGABLE opacity"}
			className={" h-fit w-fit"}
			{...bind()}
			style={{ x, y, touchAction: "none" }}>
			{children}
		</animated.div>
	);
};

export default DraggableOpacity;
