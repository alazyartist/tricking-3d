import './App.css';
import {Canvas} from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './TorqueLogo';
import {OrbitControls,Environment,PerspectiveCamera} from '@react-three/drei';

export function TorqueT() {
   return( 
    <div className="App">
    <div className="App-header">
      <div className="Canvas-container">
      <Canvas>
        <Suspense fallback= {null}>
        <PerspectiveCamera position={[0,-2,-1]}>
        <Model scale={2}/>
        <ambientLight intensity={1}/>
        {/* <spotLight position={[0,5,1j0]}/> */}
        <Environment preset="lobby"/>
        <OrbitControls/>
        </PerspectiveCamera>
        </Suspense> 
      </Canvas>
      </div>
      <h1>
        An Interactive 3d Learning Experience
      </h1>
      <a
        className="App-link"
        href="https://torquetricking.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered By Torque
      </a>
    </div>
  </div>
   )
}