import ButtonGradient from './assets/svg/ButtonGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateTicket from './components/CreateTicket';
import React from 'react'

const NewTicket = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] bg-n-11/40'>
      <Header />
      <CreateTicket />
      <Footer />
    </div>
    <ButtonGradient />
  </>
  )
}

export default NewTicket