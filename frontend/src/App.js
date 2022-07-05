import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { Sandbox } from "./pages/sandbox/Sandbox";
import Contribute from "./pages/contribute/Contribute";
import ComingSoon from "./pages/ComingSoon";
import InstructionsPage from "./pages/instructrions/InstructionsPage";
import Theory from "./pages/contribute/components/Theory";
import Marketing from "./pages/contribute/components/Marketing";
import Code from "./pages/contribute/components/Code";
import Design from "./pages/contribute/components/Design";
import HelpWith3d from "./pages/contribute/components/HelpWith3d";
import AppBackground from "./components/layout/AppBackground";
import Header from "./components/layout/Header";
import TheoryPage from "./pages/theory/TheoryPage";
import AdvancedStanceCircle from "./components/theory/AdvancedStanceCircle";
import TheoryNavBar from "./pages/theory/components/TheoryNavBar";
import LearnMore from "./pages/LearnMore";
import AboutUs from "./pages/about/AboutUs";
import TrickList from "./pages/TrickList";
import AnatomyOfATrick from "./pages/theory/anatomy/AnatomyOfATrick";
import Setups from "./pages/theory/Setups";
import Transitions from "./pages/theory/transitions/Transitions";
import Grabs from "./pages/theory/Grabs";
import Shapes from "./pages/theory/Shapes";
import Rotations from "./pages/theory/Rotations";
import Kicks from "./pages/theory/Kicks";
import Touchdowns from "./pages/theory/Touchdowns";
import Singular from "./pages/theory/transitions/components/Singular";
import Sequential from "./pages/theory/transitions/components/Sequential";
import Unified from "./pages/theory/transitions/components/Unified";
import All from "./pages/theory/transitions/components/All";
import Yonder from "./pages/Yonder";
import { TransitionList } from "./pages/TransitionList";
import ComboMaker from "./pages/comboMaker/ComboMaker";
import TabBar from "./components/layout/TabBar";
import { animated, useTransition } from "react-spring";
import { useEffect, useState } from "react";
import TheoryTabBar from "./components/layout/TheoryTabBar";
import AnimationsNeeded from "./pages/AnimationsNeeded";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dash/Dashboard";
import RequireAuth from "./auth/RequireAuth";
import PersistLogin from "./auth/PersistLogin";
import UserIcon from "./components/layout/UserIcon";
import { useUserStore } from "./store/userStore";
import Axes from "./pages/theory/Axes";
function App() {
	const accessToken = useUserStore((s) => s.accessToken);
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
	const [isSandbox, setIsSandbox] = useState(false);
	useEffect(() => {
		location.pathname.includes("/theory") ? setTabBar(false) : setTabBar(true);
	}, [location.pathname]);
	useEffect(() => {
		location.pathname.includes("/sandbox")
			? setIsSandbox(true)
			: setIsSandbox(false);
	}, [location.pathname]);

	return (
		<>
			<AppBackground />
			{accessToken && <UserIcon />}
			<Header />
			{tabBar ? !isSandbox && <TabBar /> : !isSandbox && <TheoryTabBar />}

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
						<Route path='/' element={<Home />} />
						<Route path={"/register"} element={<Register />} />
						<Route element={<PersistLogin />}>
							<Route path={"/login"} element={<Login />} />

							<Route element={<RequireAuth />}>
								<Route path={"/dash"} element={<Dashboard />} />
							</Route>
						</Route>
						<Route path={"/home"} element={<Home />} />
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
							<Route path={"tricks"} element={<TrickList />} />
							<Route path={"axes"} element={<Axes />} />
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
