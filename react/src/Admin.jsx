import ButtonGradient from './assets/svg/ButtonGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';

import React from 'react'

const Admin = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Header />
      <AdminPage />
      <Footer />
    </div>
    <ButtonGradient />
  </>
  )
}

export default Admin