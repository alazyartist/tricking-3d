import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { useTransition, animated, a, useSpring } from "@react-spring/web";
import { useUserStore } from "@store/userStore";
import useClickOutside from "@hooks/useClickOutside";

interface Step {
  title: string;
  content: string | React.ReactNode;
  id: string;
}

interface GetStartedPopupprops {
  steps: Step[];
  setHelpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetStartedPopup: React.FC<GetStartedPopupprops> = ({
  steps,
  setHelpVisible,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const activeElementRef = useRef<DOMRect>();
  const [activeElement, setActiveElement] = useState<DOMRect>(null!);
  const previousElement = useRef<DOMRect>();
  const [measureRef, bounds] = useMeasure();

  const setWalkthroughSeen = useUserStore((s) => s.setWalkthroughSeen);
  useEffect(() => {
    const element = document.getElementById(
      steps[activeStep + 1 < steps.length ? activeStep + 1 : 0].id
    );
    const lastElement = document.getElementById(
      steps[activeStep > 0 ? activeStep : 0].id
    );
    const lastlastElement = document.getElementById(
      steps[activeStep - 1 >= 0 ? activeStep - 1 : 0].id
    );
    if (!element) return;
    if (lastElement) {
      lastElement.classList.add("border-2", "border-[#22DDFF]");
    }
    if (lastlastElement) {
      lastlastElement.classList.remove("border-2", "border-[#22DDFF]");
    }
    previousElement.current = activeElementRef.current;
    activeElementRef.current = element.getBoundingClientRect();
    setActiveElement(activeElementRef.current);

    return () => {
      element.classList.remove("border-2", "border-[#22DDFF]");
      lastElement?.classList.remove("border-2", "border-[22DDFF]");
    };
  }, [currentStep, activeStep]);
  const nextStep = () => {
    activeStep + 1 <= steps.length - 1
      ? setActiveStep(activeStep + 1)
      : closePopover();
  };

  const transitions = useTransition(currentStep, {
    from: previousElement.current
      ? {
          opacity: 0,
          left: previousElement.current.left,
          top: previousElement.current.top,
        }
      : {
          opacity: 0,
          left: activeElement?.left,
          top: activeElement?.top,
        },
    enter: activeElement
      ? {
          opacity: 1,
          left:
            activeElement?.left + bounds.width < window.innerWidth
              ? activeElement?.left - bounds.width < 0
                ? 35
                : activeElement.left
              : window.innerWidth - bounds.width - 35,
          top:
            activeElement?.top - bounds.height > 0
              ? activeElement?.top + bounds.height > window.innerHeight
                ? window.innerHeight - bounds.height - 129
                : activeElement.top - bounds.height
              : 45,
        }
      : { opacity: 1 },
    leave: activeElement
      ? {
          opacity: 0,
        }
      : { opacity: 0 },
  });
  const closePopover = () => {
    setHelpVisible(false);
    setActiveStep(0);
    setWalkthroughSeen({ home: true });
  };
  const ref = useClickOutside(() => closePopover());
  const setRefs = (node) => {
    ref.current = node;
    measureRef(node);
  };
  return (
    <div className="welcome-popover absolute z-[60] h-full max-h-[100vh] w-full max-w-[100vw] overflow-hidden font-inter">
      {/* <div className="absolute h-full w-full" onClick={() => closePopover()} /> */}
      {transitions(({ opacity, left, top }, item, i) => (
        <animated.div
          key={item.title + i}
          onClick={() => nextStep()}
          className={`absolute left-[50%] z-[100] m-2 flex h-fit w-fit max-w-[80vw] ${
            activeStep === 0 && "translate-x-[-50%]"
          } flex-col place-content-center place-items-center rounded-md bg-zinc-800 text-xl text-zinc-200`}
          style={{ opacity, left: left, top: top }}
          ref={setRefs}
        >
          <div className="p-8">
            <h3 className="">{item.title}</h3>
            <div className=" text-sm font-extralight">{item.content}</div>
          </div>
          <div className="flex w-full justify-around gap-2 pb-4">
            <button
              onClick={() => closePopover()}
              className="rounded-lg bg-red-500 p-2 py-1 text-sm"
            >
              {activeStep === steps.length - 1 ? "done" : "skip"}
            </button>
            {activeStep !== steps.length - 1 && (
              <button
                onClick={() => nextStep()}
                className="rounded-lg bg-zinc-700 p-2 py-1 text-sm"
              >
                next
              </button>
            )}
          </div>
        </animated.div>
      ))}
      {activeStep > 0 && activeElement && previousElement.current && (
        <Arrow from={bounds} to={previousElement.current} />
      )}
    </div>
  );
};

export default GetStartedPopup;

const Arrow = ({ from, to }) => {
  function calculateArrowStyle(from, to) {
    // Calculate center points of source and target elements
    const fromCenterX = from.left + from.width / 2;
    const fromCenterY = from.top + from.height / 2;
    const toCenterX = to.left + 5;
    const toCenterY = to.top + to.height - 5;

    // Calculate distance and angle between elements
    const deltaX = toCenterX - fromCenterX;
    const deltaY = toCenterY - fromCenterY;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return {
      position: "fixed",
      overflow: "hidden",
      width: `${length}px`,
      height: "8px", // adjust thickness of the arrow
      backgroundColor: "#d4d4d4", // arrow color
      transformOrigin: "0 0",
      transform: `translate(${fromCenterX}px, ${fromCenterY}px) rotate(${angle}deg)`,
      pointerEvents: "none", // ensure arrow doesn't interfere with other elements
      borderRadius: "80%",
      opacity: 0.62,
      filter: "blur(3px)",
    };
  }
  const animatedStyle = useSpring({
    to: calculateArrowStyle(from, to),
    from: {
      width: "0px",
    },
    config: {
      tension: 200,
      friction: 20,
    },
  });

  // const style = calculateArrowStyle(from, to);
  return <animated.div className="z-[80]" style={animatedStyle} />;
};
