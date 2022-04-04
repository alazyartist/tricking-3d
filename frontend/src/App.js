import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import { FullScreen } from "./pages/FullScreen";
import { TestPage } from "./pages/TestPage";
import { Sandbox } from "./pages/Sandbox";
import Contribute from "./pages/Contribute";
import DiscordLink from "./components/info/DiscordLink";
import ComingSoon from "./components/ComingSoon";
import InstructionsPage from "./pages/InstructionsPage";
import Theory from "./components/contribute/Theory";
import Marketing from "./components/contribute/Marketing";
import Code from "./components/contribute/Code";
import Design from "./components/contribute/Design";
function App() {
	return (
		<>
			<Routes>
				{/* <Route
				path='*'
				element={
					<Sandbox />
					// <Navigate replace to='/3d/sandbox' />
				}
			/> */}
				<Route path={"/3d/home"} element={<Home />} />
				<Route path={"/3d"} element={<FullScreen />} />
				<Route path={"/3d/sandbox"} element={<Sandbox />}>
					<Route path=':model'>
						<Route path=':trick' element={<Sandbox />} />
					</Route>
				</Route>
				<Route path={"/3d/comingsoon"} element={<ComingSoon />} />
				<Route path={"/3d/contribute"} element={<Contribute />}>
					<Route path={"design"} element={<Design />} />
					<Route path={"code"} element={<Code />} />
					<Route path={"marketing"} element={<Marketing />} />
					<Route path={"theory"} element={<Theory />} />
					<Route index element={<div>What can you help with?</div>} />
				</Route>
				<Route path={"/3d/instructions"} element={<InstructionsPage />} />
				<Route path={"/3d/landing"} element={<Landing />} />

				<Route path={"/3d/test"} element={<TestPage />}>
					<Route
						path={"testoutlet"}
						element={
							<div className=''>
								<div className='rounded-xl bg-gray-900 text-center text-zinc-300'>
									Test Outlet
								</div>
								<img
									className='w-2/3 place-self-center rounded-3xl'
									alt='some image'
									src='https://source.unsplash.com/KwsSAotVIRc'
									width='500'
									heith='500'></img>
							</div>
						}
					/>
					<Route
						path={"testoutlet2"}
						element={
							<div className='flex flex-col'>
								<div className='rounded-xl bg-gray-900 text-center text-zinc-300'>
									Test Outlet 2
								</div>
								<img
									className='w-2/3 place-self-center rounded-3xl'
									alt='some image'
									src='https://source.unsplash.com/Geu-i5VvI1A'
									height='500'
									width='500'></img>
							</div>
						}
					/>
					<Route
						path={"testoutlet3"}
						element={
							<div className='flex flex-col'>
								<div className='rounded-xl bg-gray-900 text-center text-zinc-300'>
									Test Outlet 3
								</div>
								<img
									className='w-2/3 place-self-center rounded-3xl'
									alt='some image'
									src='https://source.unsplash.com/U2TjtLJe4Z0'
									height='500'></img>
							</div>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;

//test
//DEV PUSH CHECK
// 8=D
//set time out on the landing
//tivo's test to push to dev check
