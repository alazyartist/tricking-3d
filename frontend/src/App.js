import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import { FullScreen } from "./pages/FullScreen";
import { TestPage } from "./pages/TestPage";
import { Sandbox } from "./pages/Sandbox";
import Contribute from "./pages/Contribute";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/login/RequireAuth";

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
		location.pathname.includes("/theory") ? setTabBar(false) : setTabBar(true);
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
						<Route path={"/register"} element={<Register />} />
						<Route path={"/login"} element={<Login />} />

						<Route element={<RequireAuth />}>
							<Route path={"/dash"} element={<Dashboard />} />
						</Route>
						<Route path={"/home"} element={<Home />} />
						<Route path={""} element={<FullScreen />} />
						<Route path={"/learnmore"} element={<LearnMore />} />
						<Route path={"/about"} element={<AboutUs />} />
						<Route path={"/yonder"} element={<Yonder />} />
						<Route path={"/sandbox"} element={<Sandbox />}>
							<Route path=':model'>
								<Route path=':trick' element={<Sandbox />} />
							</Route>
						</Route>
						<Route
							path={"/comboMaker"}
							element={
								<div className=' mt-14 flex h-full w-full place-content-center'>
									<ComboMaker />
								</div>
							}
						/>
						<Route path={"/need"} element={<AnimationsNeeded />} />
						<Route path={"/theory"} element={<TheoryPage />}>
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
							<Route
								path={"stances"}
								element={<AdvancedStanceCircle />}></Route>
							<Route index element={<TheoryNavBar />} />
						</Route>
						<Route path={"/comingsoon"} element={<ComingSoon />} />
						<Route path={"/contribute"} element={<Contribute />}>
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
						<Route path={"/instructions"} element={<InstructionsPage />} />
						<Route path={"/landing"} element={<Landing />} />

						<Route path={"/test"} element={<TestPage />}></Route>
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
