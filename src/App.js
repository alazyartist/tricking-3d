import {Home} from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';

function App () {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path={'/3d'} element={<Landing />} />
      <Route path={'*'} element={<Home />} />
    </Routes>
  );
}

export default App;

//test

//set time out on the landing
//
