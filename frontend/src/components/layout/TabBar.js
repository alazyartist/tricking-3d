import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ComboMakerBlueprint } from "../../data/ComboMakerBlueprint.svg";
import { animated, useSpring, useTransition } from "react-spring";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "../../store/userStore";
import TheoryCap from "../../data/icons/TheoryCap";
import HamburgerMenu from "../../data/icons/HamburgerMenu";
import HomeIcon from "../../data/icons/HomeIcon";
import AdminLockIcon from "../../data/icons/AdminLockIcon";

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
								<AdminLockIcon />
							</Link>
						)}
						<Link onClick={() => setOpenHamburger(false)} to='/home'>
							<HomeIcon />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/comboMaker'>
							<ComboMakerBlueprint className='h-10 w-10' fill='#ffffff' />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/sandbox'>
							<BiCube />
						</Link>
						<Link onClick={() => setOpenHamburger(false)} to='/theory'>
							<TheoryCap />
						</Link>
						<HamburgerMenu onClick={() => setOpenHamburger(!openHamburger)} />
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

function BiCube(props) {
	return (
		<svg
			{...props}
			stroke='currentColor'
			fill='currentColor'
			stroke-width='0'
			viewBox='0 0 24 24'
			height='1em'
			width='1em'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='m21.406 6.086-9-4a1.001 1.001 0 0 0-.813 0l-9 4c-.02.009-.034.024-.054.035-.028.014-.058.023-.084.04-.022.015-.039.034-.06.05a.87.87 0 0 0-.19.194c-.02.028-.041.053-.059.081a1.119 1.119 0 0 0-.076.165c-.009.027-.023.052-.031.079A1.013 1.013 0 0 0 2 7v10c0 .396.232.753.594.914l9 4c.13.058.268.086.406.086a.997.997 0 0 0 .402-.096l.004.01 9-4A.999.999 0 0 0 22 17V7a.999.999 0 0 0-.594-.914zM12 4.095 18.538 7 12 9.905l-1.308-.581L5.463 7 12 4.095zM4 16.351V8.539l7 3.111v7.811l-7-3.11zm9 3.11V11.65l7-3.111v7.812l-7 3.11z'></path>
		</svg>
	);
}
