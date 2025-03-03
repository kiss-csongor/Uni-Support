import ButtonGradient from './assets/svg/ButtonGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowTickets from './components/ShowTickets';

import React from 'react'

const MyTickets = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Header />
      <ShowTickets />
      <Footer />
    </div>
    <ButtonGradient />
  </>
  )
}

export default MyTickets