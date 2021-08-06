import React, {useEffect, useState} from 'react'
import './App.css'

export default function Button(props) {
    const [isPlaying, setIsPlaying] = useState(props.isPlaying);
    
    const toggle = () => {setIsPlaying(!props.isPlaying)};
    
//useEffect
    useEffect(() => {props.handlePlaying(isPlaying)
            }, [props.handlePlaying, isPlaying, props])

    return (
        <button className='Bkick' onClick={()=>{toggle()}}>
            Play/Pause
        </button>
    )
}

