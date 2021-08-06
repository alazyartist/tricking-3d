import React from 'react'
import {OrbitControls,Environment,PerspectiveCamera} from '@react-three/drei';
import TorqueLogo from './TorqueLogo'
import { Fred } from './AnimatingTest';


export function TorqueScene(props) {
    console.log(props.playing)
    return (
       
        <PerspectiveCamera position={[0,-2,-1]}>
        {/* <TorqueLogo scale={2}/> */}
        <Fred playing={props.playing} scale={3}/>
        <ambientLight intensity={1}/>
        <spotLight position={[0,-3, -3]}/>
        <Environment preset="park"/>
        <OrbitControls/>
        </PerspectiveCamera>  
        
    )
}

