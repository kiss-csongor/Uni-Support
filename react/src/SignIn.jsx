import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <ButtonGradient />
        <Login />
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
