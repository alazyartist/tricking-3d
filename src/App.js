import './App.css';
import {Canvas} from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './TorqueLogo';
import {OrbitControls,} from '@react-three/drei';



function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Canvas-container">
        <Canvas>
          <Suspense fallback= {null}>
          <Model/>
          <ambientLight intensity={1}/>
          <OrbitControls/>
          </Suspense> 
        </Canvas>
        </div>
        <h1>
          An Interactive 3d Learning Experience
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered By Torque
        </a>
      </div>
    </div>
  );
}

export default App;
