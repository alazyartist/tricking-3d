// import logo from './logo.svg';
import './App.css';
import {Canvas} from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './TorqueLogo';
import {OrbitControls, Environment} from '@react-three/drei';
import { Camera } from 'three';



function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Canvas-container">
        <Canvas>
          <Suspense fallback= {null}>
          <Model/>
          <OrbitControls/>
          {/* <mesh  scale={4}>
          <boxGeometry/>
          <meshStandardMaterial color="hotpink"/>
          <ambientLight/>
           </mesh> */}
          </Suspense> 
        </Canvas>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
