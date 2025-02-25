import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import { useAuth } from "./context/AuthContext";
import React from 'react'
import './css/UserProfile.css'

const Profile = () => {
  const { user } = useAuth();

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