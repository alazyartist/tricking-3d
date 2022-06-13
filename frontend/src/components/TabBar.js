import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FaGraduationCap, FaToolbox } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { animated, config, useSpring, useTransition } from "react-spring";

function TabBar() {
	const [openHamburger, setOpenHamburger] = useState();
	const hamburger = useTransition(openHamburger, {
		from: { opacity: 0, right: "-40vw" },
		enter: { opacity: 1, right: "0" },
		leave: { opacity: 0, right: "-40vw" },
		reverse: openHamburger,
		delay: 100,
		config: { durration: 1200, tension: 280, friction: 40 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});

	return (
		<>
			<div className='fixed bottom-0 left-0 flex h-12 w-full place-content-center place-items-center gap-8 rounded-t-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300'>
				<Link onClick={() => setOpenHamburger(false)} to='/home'>
					<AiOutlineHome />
				</Link>
				<Link onClick={() => setOpenHamburger(false)} to='/comboMaker'>
					<FaToolbox />
				</Link>
				<Link onClick={() => setOpenHamburger(false)} to='/sandbox'>
					<BiCube />
				</Link>
				<Link onClick={() => setOpenHamburger(false)} to='/theory'>
					<FaGraduationCap />
				</Link>

				<GiHamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
			</div>
			{/* Open Hamburger Menu Display */}
			{hamburger(
				(styles, hamburgerMenu) =>
					hamburgerMenu && (
						<animated.div
							style={styles}
							onClick={() => setOpenHamburger(!openHamburger)}
							className='fixed bottom-14 rounded-l-xl'>
							<animated.div className=' flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white'>
								<Link to='/about'>About</Link>
								<Link to='/contribute'>Contibute</Link>
								<Link to='/learnMore'>Learn More</Link>
							</animated.div>
						</animated.div>
					)
			)}
		</>
	);
}

export default TabBar;
