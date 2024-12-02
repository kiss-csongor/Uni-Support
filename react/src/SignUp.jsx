import ButtonGradient from "./assets/svg/ButtonGradient";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";


import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <ButtonGradient />
        <Register />
        <Footer />
      </div>

    </>
  );
};

export default SignUp;
