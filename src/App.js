import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
	return (
		<Routes>
			<Route path='*' element={<Home />} />
			<Route path={"/3d/home"} element={<Home />} />
			<Route path={"/3d/landing"} element={<Landing />} />
		</Routes>
	);
}

export default App;

//test
//DEV PUSH CHECK

//set time out on the landing
//
