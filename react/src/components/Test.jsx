import React from 'react';
import '../css/Parallax.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';


const Test = () => {
  return (
    <div>
        <Parallax pages={2} style={{ top: '0', left: '0' }} className='animation'>
            <ParallaxLayer offset={0} speed={0.1}>
                <div className='animation_layer parallax opacity-80' id='Layer0'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={0.2}>
                <div className='animation_layer parallax opacity-25' id='Layer1'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={-0.05}>
                <div className='animation_layer parallax opacity-25' id='Layer2'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={0.05}>
                <div className='animation_layer parallax opacity-25' id='Layer3'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={-0.07}>
                <div className='animation_layer parallax opacity-25' id='Layer4'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={-0.02}>
                <div className='animation_layer parallax opacity-25' id='Layer5'></div>
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={-0.05}>
                <div className='animation_layer parallax opacity-25' id='Layer6'></div>
            </ParallaxLayer>
        </Parallax>
    </div>
  )
}

export default Test