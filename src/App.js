import {Home} from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';

function App () {
  return (
    <Routes>
      <Route path={'/3d'} element={<Landing />} />
      <Route path={'/3d/home'} element={<Home />} />
    </Routes>
  );
}

export default App;

//test
