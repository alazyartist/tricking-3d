import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { animated, useTransition } from "react-spring";
import { TestPage } from "./pages/TestPage";
import UserIcon from "./components/layout/UserIcon";
import TabBar from "./components/layout/TabBar";
import TheoryTabBar from "./components/layout/TheoryTabBar";
import { useUserStore } from "./store/userStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { TransitionList } from "./pages/TransitionList";
import LandingPage from "./pages/landing/LandingPage";
const AddSessionPage = lazy(() => import("./pages/sessions/AddSessionPage"));
const Contribute = lazy(() => import("./pages/contribute/Contribute"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const InstructionsPage = lazy(() =>
	import("./pages/instructrions/InstructionsPage")
);
const Theory = lazy(() => import("./pages/contribute/components/Theory"));
const Marketing = lazy(() => import("./pages/contribute/components/Marketing"));
const Code = lazy(() => import("./pages/contribute/components/Code"));
const Design = lazy(() => import("./pages/contribute/components/Design"));
const HelpWith3d = lazy(() =>
	import("./pages/contribute/components/HelpWith3d")
);
const AppBackground = lazy(() => import("./components/layout/AppBackground"));
const Header = lazy(() => import("./components/layout/Header"));
const TheoryPage = lazy(() => import("./pages/theory/TheoryPage"));
const AdvancedStanceCircle = lazy(() =>
	import("./components/theory/AdvancedStanceCircle")
);
const LearnMore = lazy(() => import("./pages/learnmore/LearnMore"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const AllTrickDisplay = lazy(() => import("./pages/AllTrickDisplay"));
const AnatomyOfATrick = lazy(() =>
	import("./pages/theory/anatomy/AnatomyOfATrick")
);
const Setups = lazy(() => import("./pages/theory/Setups"));
const Transitions = lazy(() =>
	import("./pages/theory/transitions/Transitions")
);
const Grabs = lazy(() => import("./pages/theory/grabs/Grabs"));
const Shapes = lazy(() => import("./pages/theory/shapes/Shapes"));
const Rotations = lazy(() => import("./pages/theory/rotations/Rotations"));
const Kicks = lazy(() => import("./pages/theory/kicks/Kicks"));
const Touchdowns = lazy(() => import("./pages/theory/touchdowns/Touchdowns"));
const Singular = lazy(() =>
	import("./pages/theory/transitions/components/Singular")
);
const Sequential = lazy(() =>
	import("./pages/theory/transitions/components/Sequential")
);
const Unified = lazy(() =>
	import("./pages/theory/transitions/components/Unified")
);
const All = lazy(() => import("./pages/theory/transitions/components/All"));
const AnimationsNeeded = lazy(() => import("./pages/AnimationsNeeded"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Dashboard = lazy(() => import("./pages/dash/Dashboard"));
const RequireAuth = lazy(() => import("./auth/RequireAuth"));
const PersistLogin = lazy(() => import("./auth/PersistLogin"));
const Axes = lazy(() => import("./pages/theory/axes/Axes"));

const Home = lazy(() => import("./pages/home/Home"));
const TheoryIndexInstructions = lazy(() =>
	import("./pages/theory/TheoryIndexInstructions")
);
const TestSections = lazy(() => import("./pages/TestSections"));
const AdminIndex = lazy(() => import("./admin/AdminIndex"));
const UserSettings = lazy(() => import("./pages/userSettings/UserSettings"));
const TorqueScene = lazy(() => import("./scenes/TorqueScene"));
const PointsPage = lazy(() => import("./pages/pppoints/PointsPage"));
const SessionPage = lazy(() => import("./pages/pppoints/SessionPage"));
const SessionRoomStats = lazy(() =>
	import("./pages/pppoints/components/BattleroomStats")
);
const UserProfile = lazy(() => import("./pages/userProfile/userProfile"));
const Sandbox = lazy(() => import("./pages/sandbox/Sandbox"));
const ComboMakerV2 = lazy(() => import("./pages/comboMakerV2/ComboMakerV2"));
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
	const [isUserProfile, setIsUserProfile] = useState(false);
	useEffect(() => {
		location.pathname.includes("/theory") ? setTabBar(false) : setTabBar(true);
	}, [location.pathname]);
	useEffect(() => {
		location.pathname.includes("/sandbox")
			? setIsSandbox(false)
			: setIsSandbox(false);
		location.pathname.includes("/sandbox")
			? setIsUserProfile(true)
			: setIsUserProfile(false);
	}, [location.pathname]);
	const queryClient = new QueryClient();
	return (
		<>
			<Suspense>
				<QueryClientProvider client={queryClient}>
					{/* <ReactQueryDevtools initialIsOpen /> */}
					<AppBackground />
					{!location.pathname.includes("/admin") &&
						!location.pathname.includes("/pppoints") && <UserIcon />}
					{!location.pathname.includes("/home") &&
						!location.pathname.includes("/admin") &&
						!location.pathname.includes("/pppoints") &&
						location.pathname !== "/" && <Header />}
					{tabBar
						? (!isSandbox || !isUserProfile) && <TabBar />
						: !isSandbox && <TheoryTabBar />}

					{transitions(({ opacity }, curLocation) => (
						<animated.div style={{ opacity }}>
							<Suspense fallback={<Loading />}>
								<Routes location={curLocation}>
									<Route path='*' element={<ComingSoon />} />
									<Route
										path='/'
										element={
											<Suspense fallback={<Loading />}>
												<LandingPage />
											</Suspense>
										}
									/>

									<Route
										path='/admin'
										element={
											<Suspense fallback={<Loading />}>
												<AdminIndex />
											</Suspense>
										}
									/>
									<Route
										path={"/register"}
										element={
											<Suspense fallback={<Loading />}>
												<Register />
											</Suspense>
										}
									/>
									<Route
										path={"/pppoints"}
										element={
											<Suspense fallback={<Loading />}>
												<PointsPage />
											</Suspense>
										}
									/>
									<Route
										path={"/addSession"}
										element={
											<Suspense fallback={<Loading />}>
												<AddSessionPage />
											</Suspense>
										}
									/>
									<Route
										path={"/pppoints/stats/:sessionID"}
										element={
											<Suspense fallback={<Loading />}>
												<SessionRoomStats />
											</Suspense>
										}
									/>
									<Route
										path={"/pppoints/:sessionID"}
										element={
											<Suspense fallback={<Loading />}>
												<SessionPage />
											</Suspense>
										}
									/>
									<Route
										element={
											<Suspense fallback={<Loading />}>
												<PersistLogin />
											</Suspense>
										}>
										<Route path={"/login"} element={<Login />} />

										<Route
											element={
												<Suspense fallback={<Loading />}>
													<RequireAuth />
												</Suspense>
											}>
											<Route
												path={"/dash"}
												element={
													<Suspense fallback={<Loading />}>
														<Dashboard />
													</Suspense>
												}
											/>
										</Route>
									</Route>
									<Route
										path={"/home"}
										element={
											<Suspense fallback={<Loading />}>
												<Home />
											</Suspense>
										}
									/>
									<Route
										path={"/userProfile/:uuid"}
										element={
											<Suspense fallback={<Loading />}>
												<UserProfile />
											</Suspense>
										}
									/>
									<Route
										path={"/userSettings"}
										element={
											<Suspense fallback={<Loading />}>
												<UserSettings />
											</Suspense>
										}
									/>
									<Route
										path={"/learnmore"}
										element={
											<Suspense fallback={<Loading />}>
												<LearnMore />
											</Suspense>
										}
									/>
									<Route
										path={"/about"}
										element={
											<Suspense fallback={<Loading />}>
												<AboutUs />
											</Suspense>
										}
									/>

									<Route
										path={"/sandbox"}
										element={
											<Suspense>
												<Sandbox />
											</Suspense>
										}>
										<Route
											path=':model/:trick'
											element={
												<Suspense>
													<TorqueScene />
												</Suspense>
											}
										/>
										<Route
											index
											element={
												<Suspense>
													<TorqueScene />
												</Suspense>
											}
										/>
									</Route>
									<Route
										path={"/comboMaker"}
										element={
											<div className=' mt-14 flex h-full w-full place-content-center'>
												<Suspense fallback={<Loading />}>
													<ComboMakerV2 />
												</Suspense>
											</div>
										}
									/>

									<Route
										path={"/test"}
										element={
											<Suspense fallback={<Loading />}>
												<TestSections />
											</Suspense>
										}
									/>
									<Route
										path={"/need"}
										element={
											<Suspense fallback={<Loading />}>
												<AnimationsNeeded />
											</Suspense>
										}
									/>
									<Route
										path={"/theory"}
										element={
											<Suspense fallback={<Loading />}>
												<TheoryPage />
											</Suspense>
										}>
										<Route
											path={"transitionlist"}
											element={
												<Suspense fallback={<Loading />}>
													<TransitionList />
												</Suspense>
											}
										/>
										<Route
											path={"tricks"}
											element={
												<Suspense fallback={<Loading />}>
													<AllTrickDisplay />
												</Suspense>
											}
										/>
										<Route
											path={"axes"}
											element={
												<Suspense fallback={<Loading />}>
													<Axes />
												</Suspense>
											}
										/>
										<Route
											path={"anatomy"}
											element={
												<Suspense fallback={<Loading />}>
													<AnatomyOfATrick />
												</Suspense>
											}
										/>
										<Route
											path={"setups"}
											element={
												<Suspense fallback={<Loading />}>
													<Setups />
												</Suspense>
											}
										/>
										<Route
											path={"transitions"}
											element={
												<Suspense fallback={<Loading />}>
													<Transitions />
												</Suspense>
											}>
											<Route
												index
												element={
													<Suspense fallback={<Loading />}>
														<All />
													</Suspense>
												}
											/>
											<Route
												path='all'
												element={
													<Suspense fallback={<Loading />}>
														<All />
													</Suspense>
												}
											/>
											<Route
												path='singular'
												element={
													<Suspense fallback={<Loading />}>
														<Singular />
													</Suspense>
												}
											/>
											<Route
												path='sequential'
												element={
													<Suspense fallback={<Loading />}>
														<Sequential />
													</Suspense>
												}
											/>
											<Route
												path='unified'
												element={
													<Suspense fallback={<Loading />}>
														<Unified />
													</Suspense>
												}
											/>
										</Route>
										<Route
											path={"grabs"}
											element={
												<Suspense fallback={<Loading />}>
													<Grabs />
												</Suspense>
											}
										/>
										<Route
											path={"shapes"}
											element={
												<Suspense fallback={<Loading />}>
													<Shapes />
												</Suspense>
											}
										/>
										<Route
											path={"rotations"}
											element={
												<Suspense fallback={<Loading />}>
													<Rotations />
												</Suspense>
											}
										/>
										<Route
											path={"kicks"}
											element={
												<Suspense fallback={<Loading />}>
													<Kicks />
												</Suspense>
											}
										/>
										<Route
											path={"touchdowns"}
											element={
												<Suspense fallback={<Loading />}>
													<Touchdowns />
												</Suspense>
											}
										/>
										<Route
											path={"stances"}
											element={
												<Suspense fallback={<Loading />}>
													<AdvancedStanceCircle />
												</Suspense>
											}></Route>
										<Route
											index
											element={
												<Suspense fallback={<Loading />}>
													<TheoryIndexInstructions />
												</Suspense>
											}
										/>
									</Route>
									<Route
										path={"/comingsoon"}
										element={
											<Suspense fallback={<Loading />}>
												<ComingSoon />
											</Suspense>
										}
									/>
									<Route
										path={"/contribute"}
										element={
											<Suspense fallback={<Loading />}>
												<Contribute />
											</Suspense>
										}>
										<Route
											path={"design"}
											element={
												<Suspense fallback={<Loading />}>
													<Design />
												</Suspense>
											}
										/>
										<Route
											path={"code"}
											element={
												<Suspense fallback={<Loading />}>
													<Code />
												</Suspense>
											}
										/>
										<Route
											path={"marketing"}
											element={
												<Suspense fallback={<Loading />}>
													<Marketing />
												</Suspense>
											}
										/>
										<Route
											path={"theory"}
											element={
												<Suspense fallback={<Loading />}>
													<Theory />
												</Suspense>
											}
										/>
										<Route
											path={"3d"}
											element={
												<Suspense fallback={<Loading />}>
													<HelpWith3d />
												</Suspense>
											}
										/>
										<Route
											index
											element={
												<div className='text-center'>
													What can you help with?
												</div>
											}
										/>
									</Route>
									<Route
										path={"/instructions"}
										element={
											<Suspense fallback={<Loading />}>
												<InstructionsPage />
											</Suspense>
										}
									/>
								</Routes>
							</Suspense>
						</animated.div>
					))}
				</QueryClientProvider>
			</Suspense>
		</>
	);
}

export default App;

// 8=D
const Loading = () => {
	return (
		<div className='h-screen w-screen font-titan text-xl font-black text-zinc-300'>
			Loading...
		</div>
	);
};
