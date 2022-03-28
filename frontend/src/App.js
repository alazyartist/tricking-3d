import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import { FullScreen } from "./pages/FullScreen";
import { TestPage } from "./pages/TestPage";
import AnimationsDropwdown from "./components/ui/AnimationsDropwdown";
import Kerwood40 from "./animations/Kerwood40";
import Andrew from "./animations/Andrew";
import { Frank } from "./animations/Frank";
import CanvasComponent from "./components/panels/CanvasComponent";
import { TorqueScene } from "./scenes/TorqueScene";
import { Sandbox } from "./pages/Sandbox";
function App() {
	return (
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
			<Route path={"/3d/landing"} element={<Landing />} />
			<Route path={"/3d/test"} element={<TestPage />} />
		</Routes>
	);
}

export default App;

//test
//DEV PUSH CHECK
// 8=D
//set time out on the landing
//tivo's test to push to dev check
