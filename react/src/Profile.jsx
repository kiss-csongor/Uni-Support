import ButtonGradient from './assets/svg/ButtonGradient';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import React from 'react'

const Profile = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] bg-n-11/40'>
      <Header />
      <UserProfile />
      <Footer />
    </div>
    <ButtonGradient />
  </>
  );
};

export default Profile;