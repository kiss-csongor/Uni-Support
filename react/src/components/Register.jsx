import React, { useRef } from "react";
import Section from "./Section";
import Button from "./Button";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { curve } from "../assets";
import hero from "../assets/own/hero.jpg";
import heroBackground from "../assets/own/heroBackground.png";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";

const Register = () => {
  return (
    <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 md:mt-10">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem]">
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
          <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/690]">
            <div className="mx-auto mt-5 mb-5 text-center items-center ">
              <p className="text-2xl bg-n-5/90 rounded-b-md rounded-t-md mx-auto mb-10 max-w-64">Regisztráció</p>
              <div className="mb-5" id="username">
                <p className="">Felhasználónév</p>
                <input className="bg-n-5 rounded-md text-center" type="text" />
              </div>
              <div>
                <p className="">Email cím</p>
                <input className="bg-n-5 rounded-md text-center mb-5" type="text" />
              </div>
              <div>
                <p className="">Jelszó</p>
                <input className="bg-n-5 rounded-md text-center mb-5" type="text" />
              </div>
              <div>
                <p className="">Jelszó megerősítés</p>
                <input className="bg-n-5 rounded-md text-center mb-5" type="text" />
              </div>
              <Button className="">Regisztráció</Button>
            </div>
          </div>
        </div>

        <Gradient />
      </div>

      <BackgroundCircles></BackgroundCircles>
    </div>
  );
};

export default Register;
