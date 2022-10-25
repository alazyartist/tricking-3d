import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ComboMakerBlueprint } from "../../data/ComboMakerBlueprint.svg";
import { animated, useSpring, useTransition } from "react-spring";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "../../store/userStore";

function TabBar() {
	const [openHamburger, setOpenHamburger] = useState();
	const [openNav, setOpenNav] = useState(true);
	const logout = useLogout();
	const nav = useNavigate();
	const location = useLocation();
	const userInfo = useUserStore((s) => s.userInfo);

	const hamburger = useTransition(openHamburger, {
		from: { opacity: 0, right: "-40vw" },
		enter: { opacity: 1, right: "0" },
		leave: { opacity: 0, right: "-40vw" },
		reverse: openHamburger,
		delay: 100,
		config: { tension: 280, friction: 40 },
		// onRest: () => setOpenHamburger(!openHamburger),
	});

	const navToggle = useSpring({
		from: { bottom: "-38px" },
		to: { bottom: "0px" },
		reverse: openNav,
		config: {
			config: { tension: 40, friction: 12 },
		},
	});

	return (
		<>
			<div className='absolute bottom-0 w-[100%] overflow-hidden'>
				<animated.div style={navToggle} className='relative'>
					<button
						style={navToggle}
						className='relative left-0 z-[999] flex h-4 w-[100%] place-content-center place-items-center'
						onClick={() => setOpenNav(!openNav)}></button>
					<div
						style={navToggle}
						className='relative left-0 z-[100] flex h-12 w-full place-content-center place-items-center gap-8 rounded-t-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-2xl text-zinc-300'>
						{(userInfo?.uuid === "admin696-8c94-4ca7-b163-9alazyartist" ||
							userInfo?.uuid === "admin696-8c94-4ca7-b163-969420Tohzt") && (
							<Link onClick={() => setOpenHamburger(false)} to='/admin'>
								<RiAdminLine />
							</Link>
						)}
						<Link onClick={() => setOpenHamburger(false)} to='/home'>
							<AiOutlineHome />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/comboMaker'>
							<ComboMakerBlueprint className='h-10 w-10' fill='#ffffff' />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/sandbox'>
							<BiCube />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/theory'>
							<FaGraduationCap />
						</Link>
						<GiHamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
					</div>
				</animated.div>
			</div>

			{/* Open Hamburger Menu Display */}
			{hamburger(
				(styles, hamburgerMenu) =>
					hamburgerMenu && (
						<animated.div
							id='side-Menu'
							style={styles}
							onClick={() => setOpenHamburger(!openHamburger)}
							className='fixed bottom-14 z-[100] rounded-l-xl'>
							<animated.div className='flex h-[40vh] max-w-[40vw] flex-col gap-3 rounded-l-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 text-sm text-white'>
								<Link to='/about'>About</Link>
								<Link to='/contribute'>Contibute</Link>
								<Link to='/learnMore'>Learn More</Link>
								<Link
									to='/userSettings'
									state={{ from: location }}
									replace={true}>
									User Settings
								</Link>
								<Link to='/dash' state={{ from: location }} replace={true}>
									Dashboard
								</Link>
								<button
									className='absolute bottom-2 left-3'
									onClick={() => {
										logout();
										nav("/home");
									}}>
									Logout
								</button>
							</animated.div>
						</animated.div>
					)
			)}
		</>
	);
}

export default TabBar;
