import Home from "./pages/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import { FullScreen } from "./pages/FullScreen";
import { TestPage } from "./pages/TestPage";
import { Sandbox } from "./pages/Sandbox";
import Contribute from "./pages/Contribute";
import DiscordLink from "./components/info/DiscordLink";
import ComingSoon from "./pages/ComingSoon";
import InstructionsPage from "./pages/InstructionsPage";
import Theory from "./components/contribute/Theory";
import Marketing from "./components/contribute/Marketing";
import Code from "./components/contribute/Code";
import Design from "./components/contribute/Design";
import HelpWith3d from "./components/contribute/HelpWith3d";
import AppBackground from "./components/AppBackground";
import Header from "./components/Header";
import TheoryPage from "./pages/TheoryPage";
import AdvancedStanceCircle from "./components/theory/AdvancedStanceCircle";
import TheoryNavBar from "./components/theory/TheoryNavBar";
import StanceInfo from "./components/theory/stances/StanceInfo";
import LearnMore from "./pages/LearnMore";
import AboutUs from "./pages/AboutUs";
import TrickList from "./pages/TrickList";
import AnatomyOfATrick from "./pages/Theory/AnatomyOfATrick";
import Setups from "./pages/Theory/Setups";
import Transitions from "./pages/Theory/Transitions";
import Grabs from "./pages/Theory/Grabs";
import Shapes from "./pages/Theory/Shapes";
import Rotations from "./pages/Theory/Rotations";
import Kicks from "./pages/Theory/Kicks";
import Touchdowns from "./pages/Theory/Touchdowns";
import Singular from "./components/theory/transitions/Singular";
import Sequential from "./components/theory/transitions/Sequential";
import Unified from "./components/theory/transitions/Unified";
import All from "./components/theory/transitions/All";
import Yonder from "./pages/Yonder";
import { TransitionList } from "./pages/TransitionList";
import ComboMaker from "./components/theory/ComboMaker";
import TabBar from "./components/TabBar";
import { animated, useTransition } from "react-spring";
import { useEffect, useState } from "react";
import TheoryTabBar from "./components/theory/TheoryTabBar";
import AnimationsNeeded from "./pages/AnimationsNeeded";

function App() {
	const location = useLocation();
	const transitions = useTransition(location, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		exitBeforeEnter: true,
		config: {
			duration: 100,
			tension: 140,
			friction: 80,
		},
	});

	const [tabBar, setTabBar] = useState(true);
	useEffect(() => {
		location.pathname.includes("/3d/theory")
			? setTabBar(false)
			: setTabBar(true);
	}, [location.pathname]);

	return (
		<>
			<AppBackground />
			<Header />
			{tabBar ? <TabBar /> : <TheoryTabBar />}

			{transitions(({ opacity }, curLocation) => (
				<animated.div style={{ opacity }}>
					<Routes location={curLocation}>
						<Route
							path='*'
							element={
								<ComingSoon />
								// <Navigate replace to='/3d/sandbox' />
							}
						/>
						<Route path={"/3d/home"} element={<Home />} />
						<Route path={"/3d"} element={<FullScreen />} />
						<Route path={"/3d/learnmore"} element={<LearnMore />} />
						<Route path={"/3d/about"} element={<AboutUs />} />
						<Route path={"/3d/yonder"} element={<Yonder />} />
						<Route path={"/3d/sandbox"} element={<Sandbox />}>
							<Route path=':model'>
								<Route path=':trick' element={<Sandbox />} />
							</Route>
						</Route>
						<Route
							path={"/3d/comboMaker"}
							element={
								<div className=' mt-14 flex h-full w-full place-content-center'>
									<ComboMaker />
								</div>
							}
						/>
						<Route path={"/3d/need"} element={<AnimationsNeeded />} />
						<Route path={"/3d/theory"} element={<TheoryPage />}>
							<Route path={"transitionlist"} element={<TransitionList />} />
							<Route path={"tricklist"} element={<TrickList />} />
							<Route path={"anatomy"} element={<AnatomyOfATrick />} />
							<Route path={"setups"} element={<Setups />} />
							<Route path={"transitions"} element={<Transitions />}>
								<Route index element={<All />} />
								<Route path='all' element={<All />} />
								<Route path='singular' element={<Singular />} />
								<Route path='sequential' element={<Sequential />} />
								<Route path='unified' element={<Unified />} />
							</Route>
							<Route path={"grabs"} element={<Grabs />} />
							<Route path={"shapes"} element={<Shapes />} />
							<Route path={"rotations"} element={<Rotations />} />
							<Route path={"kicks"} element={<Kicks />} />
							<Route path={"touchdowns"} element={<Touchdowns />} />
							<Route path={"stances"} element={<AdvancedStanceCircle />}>
								{/* <Route path=':stance' element={<StanceInfo />} /> */}
								{/* <Route
							path={"FrontsideSemi"}
							element={<StanceInfo stance='FrontsideSemi' />}
						/>
						<Route
							path={"FrontsideMega"}
							element={<StanceInfo stance='FrontsideMega' />}
						/>
						<Route
							path={"InsideMega"}
							element={<StanceInfo stance='InsideMega' />}
						/>
						<Route
							path={"InsideHyper"}
							element={<StanceInfo stance='InsideHyper' />}
						/>
						<Route
						path={"BacksideHyper"}
						element={<StanceInfo stance='BacksideHyper' />}
						/>
						<Route
							path={"BacksideComplete"}
							element={<StanceInfo stance='BacksideComplete' />}
						/>
						<Route
							path={"OutsideComplete"}
							element={<StanceInfo stance='OutsideComplete' />}
						/>
						<Route
							path={"OutsideSemi"}
							element={<StanceInfo stance='OutsideSemi' />}
						/> */}
							</Route>
							<Route index element={<TheoryNavBar />} />
						</Route>
						<Route path={"/3d/comingsoon"} element={<ComingSoon />} />
						<Route path={"/3d/contribute"} element={<Contribute />}>
							<Route path={"design"} element={<Design />} />
							<Route path={"code"} element={<Code />} />
							<Route path={"marketing"} element={<Marketing />} />
							<Route path={"theory"} element={<Theory />} />
							<Route path={"3d"} element={<HelpWith3d />} />
							<Route
								index
								element={
									<div className='text-center'>What can you help with?</div>
								}
							/>
						</Route>
						<Route path={"/3d/instructions"} element={<InstructionsPage />} />
						<Route path={"/3d/landing"} element={<Landing />} />

						<Route path={"/3d/test"} element={<TestPage />}></Route>
					</Routes>
				</animated.div>
			))}
		</>
	);
}

export default App;

//test
//DEV PUSH CHECK
// 8=D
//set time out on the landing
//tivo's test to push to dev check
