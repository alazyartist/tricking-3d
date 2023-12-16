import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { useTransition, animated, a, useSpring } from "@react-spring/web";
import { useUserStore } from "@store/userStore";

interface Step {
  title: string;
  content: string;
  id: string;
}

interface GetStartedPopupprops {
  steps: Step[];
  helpVisible: boolean;
  setHelpVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetStartedPopup: React.FC<GetStartedPopupprops> = ({
  steps,
  helpVisible,
  setHelpVisible,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const activeElementRef = useRef<DOMRect>();
  const [activeElement, setActiveElement] = useState<DOMRect>(null!);
  const previousElement = useRef<DOMRect>();
  const [measureRef, bounds] = useMeasure();
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);
  const [wasOutOfBounds, setWasOutOfBounds] = useState(false);
  const setWalkthroughSeen = useUserStore((s) => s.setWalkthroughSeen);
  useEffect(() => {
    const element = document.getElementById(
      steps[activeStep + 1 < steps.length ? activeStep + 1 : 0].id
    );
    const lastElement = document.getElementById(
      steps[activeStep >= 0 ? activeStep : 0].id
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
    console.log(activeElementRef.current);
    console.log(previousElement.current);
    if (
      activeElementRef.current.left + bounds.width > window.innerWidth ||
      activeElementRef.current.top - bounds.height < window.innerHeight
    ) {
      setIsOutOfBounds(true);
    } else {
      setIsOutOfBounds(false);
    }
    if (previousElement.current) {
      if (
        previousElement.current.left + bounds.width > window.innerWidth ||
        previousElement.current.top - bounds.height < window.innerHeight
      ) {
        setWasOutOfBounds(true);
      } else {
        setWasOutOfBounds(false);
      }
    }
    return () => {
      element.classList.remove("border-2", "border-red-500");
      lastElement?.classList.remove("border-2", "border-red-500");
    };
  }, [currentStep, activeStep]);
  const nextStep = () => {
    activeStep + 1 <= steps.length
      ? setActiveStep(activeStep + 1)
      : closePopover();
  };

  const transitions = useTransition(currentStep, {
    from: previousElement.current
      ? {
          opacity: 0,
          left: wasOutOfBounds
            ? previousElement.current.left - bounds.width / 2 > 0
              ? previousElement.current.left - bounds.width / 2
              : 0
            : previousElement.current.left,
          top: wasOutOfBounds
            ? previousElement.current.top - bounds.height / 2
            : previousElement.current.top,
        }
      : {
          opacity: 0,
          left: activeElement?.left,
          top: activeElement?.top,
        },
    enter: activeElement
      ? {
          opacity: 1,
          left: isOutOfBounds
            ? activeElement.left - bounds.width > 0
              ? activeElement.left - bounds.width / 2
              : activeElement.left
            : activeElement?.left,
          top: isOutOfBounds
            ? activeElement?.top + bounds.height / 2 > window.innerHeight
              ? window.innerHeight - 1.5 * bounds.height
              : activeElement?.top + bounds.height / 2
            : activeElement?.top,
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
  return (
    <div className="welcome-popover absolute z-[60] h-full max-h-[100vh] w-full max-w-[100vw] overflow-hidden font-inter">
      <div className="absolute h-full w-full" onClick={() => closePopover()} />
      {transitions(({ opacity, left, top }, item, i) => (
        <animated.div
          key={item.title + i}
          className={`absolute left-[50%] z-[100] flex h-fit w-fit max-w-[90vw] ${
            activeStep === 0 && "translate-x-[-50%]"
          } flex-col place-content-center place-items-center rounded-md bg-zinc-800 text-xl text-zinc-200`}
          style={{ opacity, left: left, top: top }}
          ref={measureRef}
        >
          <div className="p-8">
            <h3 className="">{item.title}</h3>
            <p className=" text-sm font-extralight">{item.content}</p>
          </div>
          <div className="flex w-full justify-around gap-2 pb-4">
            <button
              onClick={() => closePopover()}
              className="rounded-lg bg-red-500 p-2 py-1 text-sm"
            >
              skip
            </button>
            {activeStep != steps.length - 1 && (
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
