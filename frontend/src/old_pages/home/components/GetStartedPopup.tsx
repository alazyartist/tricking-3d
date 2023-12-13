import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { useTransition, animated, a, useSpring } from "@react-spring/web";

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

  useEffect(() => {
    const element = document.getElementById(
      steps[activeStep + 1 < steps.length ? activeStep + 1 : 0].id
    );
    if (!element) return;
    previousElement.current = activeElementRef.current;
    activeElementRef.current = element.getBoundingClientRect();
    setActiveElement(activeElementRef.current);
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
    console.log(previousElement, activeElement);
  }, [currentStep, activeStep]);

  const transitions = useTransition(currentStep, {
    from: previousElement.current
      ? {
          opacity: 0,
          left: wasOutOfBounds
            ? previousElement.current.left - bounds.width / 2
            : previousElement.current.left,
          top: wasOutOfBounds
            ? previousElement.current.top + bounds.height / 2
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
            ? activeElement?.left - bounds.width / 2
            : activeElement?.left,
          top: isOutOfBounds
            ? activeElement?.top + bounds.height / 2
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
  };
  return (
    <div className="welcome-popover font-inter">
      {transitions(({ opacity, left, top }, item, i) => (
        <animated.div
          key={item.title + i}
          className="absolute left-[50%] z-[100] flex h-fit w-fit translate-x-[-50%] flex-col place-content-center place-items-center rounded-md bg-zinc-800 p-8 text-xl text-zinc-200"
          style={{ opacity, left: left, top: top }}
          ref={measureRef}
        >
          <h3 className="">{item.title}</h3>
          <p className=" text-sm font-extralight">{item.content}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setHelpVisible(false)}
              className="rounded-3xl bg-red-500 p-2 py-1 text-sm"
            >
              dismiss
            </button>
            {activeStep != steps.length - 1 && (
              <button
                onClick={() =>
                  activeStep + 1 <= steps.length
                    ? setActiveStep(activeStep + 1)
                    : closePopover()
                }
                className="rounded-3xl bg-zinc-700 p-2 py-1 text-sm"
              >
                next
              </button>
            )}
          </div>
        </animated.div>
      ))}
      {activeStep > 0 && activeElement && previousElement && (
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
    const toCenterX = to.left - 5;
    const toCenterY = to.top + to.height - 5;

    // Calculate distance and angle between elements
    const deltaX = toCenterX - fromCenterX;
    const deltaY = toCenterY - fromCenterY;
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return {
      position: "absolute",
      width: `${length}px`,
      height: "8px", // adjust thickness of the arrow
      backgroundColor: "white", // arrow color
      transformOrigin: "0 0",
      transform: `translate(${fromCenterX}px, ${fromCenterY}px) rotate(${angle}deg)`,
      pointerEvents: "none", // ensure arrow doesn't interfere with other elements
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
