import './App.css';
import {Canvas} from '@react-three/fiber';
import { Suspense, useCallback, useState } from 'react';
import {TorqueScene} from './Scene';
import Button from './Button';
// import Model from './TorqueLogo';
// import {OrbitControls,Environment,PerspectiveCamera} from '@react-three/drei';

export function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  //callback
  const _setIsPlaying = useCallback(value=>{setIsPlaying(value)},[setIsPlaying])
   
  
  return( 
    <div className="App">
    <div className="App-header">
      <div className="Canvas-container">
      <Canvas>
        <Suspense fallback= {null}>
        <TorqueScene playing={isPlaying}/>
        </Suspense> 
      </Canvas>
      </div>
      <h1>
        An Interactive 3d Learning Experience
      </h1>
      <div className="btn-container">
        <button className='Bkick'>animation</button>
        <button className='Bkick'>animation2</button>
        <Button isPlaying={isPlaying} handlePlaying={_setIsPlaying}/>
      </div>
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