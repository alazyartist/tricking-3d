import { animated, useSpring } from "@react-spring/web";

export const MovingBackground = () => {
  const anim = useSpring({
    loop: true,

    to: [
      { o1: 0.8, o2: 0.8, o3: 0.8, l1: "40vw", l2: "60vw", l3: "40vw" },
      { o1: 0.5, o2: 0.45, o3: 0.8, l1: "40vw", l2: "20vw", l3: "40vw" },

      { o1: 0.8, o2: 0.75, o3: 0.5, l1: "80vw", l2: "40vw", l3: "20vw" },
      { o1: 0.8, o2: 0.8, o3: 0.8, l1: "40vw", l2: "20vw", l3: "60vw" },
    ],
    from: { o1: 1, o2: 1, o3: 1, l1: "40vw", l2: "20vw", l3: "60vw" },
    config: { bounce: 10, tension: 25, mass: 1.2, friction: 25 },
    // onRest: () => setOpenHamburger(!openHamburger),
  });
  return (
    <div className="fixed top-0 -z-10 h-[50vh] w-[100vw]">
      <animated.div
        style={{ opacity: anim.o1, top: anim.l1, left: anim.l3 }}
        className={`absolute top-[55vh] left-[60vw] -z-10 h-[369px] w-[369px] translate-x-[-50%] rounded-full bg-teal-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
      />
      <animated.div
        style={{ opacity: anim.o2, left: anim.l2, top: anim.l3 }}
        className={`absolute top-[35vh] left-[20vw] -z-10 h-[469px] w-[469px] translate-x-[-50%] rounded-full bg-sky-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
      />
      <animated.div
        style={{ opacity: anim.o3, top: anim.l3, left: anim.l1 }}
        className={`absolute top-[15vh] left-[60vw] -z-10 h-[369px] w-[369px] translate-x-[-50%] rounded-full bg-emerald-300 blur-3xl md:h-[60vw] md:w-[60vw]`}
      />
    </div>
  );
};
export default MovingBackground;
