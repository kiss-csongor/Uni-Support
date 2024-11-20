import React from 'react'
import Section from './Section'
import Button from './Button'
import { curve } from '../assets'
import hero  from '../assets/own/hero.png'
import heroBackground from '../assets/own/heroBackground.jpg'

const Hero = () => {
  return (
    <Section className="pt-[20rem] -mt-[8.25]" crosses crossesOffset="lg:translate-y-[5.25]" customPaddings id="hero">
        <div className='container relative'>
            <div className='relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]'>
                <h1 className='h1 mb-6'>
                    Fedezze fel a <span className='text-n-5'>Széchenyi István Egyetem</span> új&nbsp;
                    <span className='inline-block relative text-n-4'>UniSupport<img src={curve} className='absolute top-full left-0 w-full xl:-mt-2' width={624} height={28} alt='Curve' /></span>
                    &nbsp;IT helpdesk rendszerét
                </h1>
                <p className='body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>Segítségre van szükséged? Egyszerűsítsd az IT problémáid kezelését és kövesd nyomon a folyamatokat az UniSupport átlátható és könnyen használható rendszerével.</p>
                <Button href="/register" white>
                    Kezdjünk bele
                </Button> 
                </div>
                <div className='relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24 '>
                    <div className='relative z-1 p-0.5 rounded-2xl bg-conic-gradient'>
                        <div className='relative bg-n-8 rounded-[1rem]'>
                            <div className='h-[1.4rem] bg-n-10 rounded-t-[0.9rem]' />
                            <div className='aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]'>
                                <img src={hero} className='w-full' width={1024} height={490} />
                            </div>
                        </div>
                    </div>
                <div className='absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]' >
                    <img src={heroBackground} className='w-full' width={1440} height={1800} />
                </div>
            </div>
        </div>
    </Section>
  )
}

export default Hero