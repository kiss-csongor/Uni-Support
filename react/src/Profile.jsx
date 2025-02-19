import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';

import React from 'react'

const Profile = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Header />
      <p>Profil</p>
    </div>
    <ButtonGradient />
  </>
  )
}

export default Profile