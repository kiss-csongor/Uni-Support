import React, { useState, useEffect } from "react";
import '../css/Login-Register.css';
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles, GradientBottom, GradientTop } from "./design/Hero";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';

const Register = () => {
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  })
  const navigate = useNavigate();
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const handleError = async (message) => {
    setError(message);
    await sleep(5000);
    setError("");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async () => {
    if (formData.username.length > 30 || formData.username.length < 5) {
      await handleError("A neved minimum 5, maximum 30 karakter lehet.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      await handleError("Hibás email formátum.")
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,60}$/;
    if (!passwordRegex.test(formData.password)) {
      await handleError("Helytelen jelszó formátum (legalább 1 nagybetű, 1 speciális karakter és 1 szám. Min. 8 és Max. 60 karakter).");
      return;
    }
    if (formData.password !== formData.passwordAgain) {
      handleError("A mezőbe írt jelszó páros nem egyezik meg.")
      return;      
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        // "https://uni-support.sytes.net/api/register/",
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        setSucces('Sikeres regisztráció.');
        await sleep(2000);
        navigate('/signin'); 
      }
    } catch (err) {
      setError(err.response?.data?.non_field_errors || 'Hiba történt a regisztráció során.');
    }

    
  };

  return (
    <Section className='bg-image'>
      <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 max-h-screen max-sm:mt-10 sm:mt-10">
        <div className="relative z-1 p-0.5 rounded-2xl">
          <GradientTop />
          <div className="relative rounded-[1rem] border-solid border-[2px] backdrop-blur-sm">
            <div />
            <div className="rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] max-sm:aspect-[320/450] sm:aspect-[320/450]">
              <div className="mx-auto mt-5 mb-5 text-center items-center">
                <p className="text-2xl rounded-b-md rounded-t-md mx-auto max-sm:mb-12 mb-14 max-w-64 font-extrabold uppercase">Regisztráció</p>
                  <div className="mb-10 username group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="username" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${formData.username ? "-translate-y-6" : "-translate-y-0"}`}>Felhasználónév</label>
                    <input
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`}
                      type="text"
                      maxLength={40}
                    />
                    <div className="line" />
                  </div>
                  <div className="mb-10 email group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="email" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${formData.email ? "-translate-y-6" : "-translate-y-0"}`}>Email cím</label>
                    <input
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`}
                      type="email"
                      maxLength={40}
                    />
                    <div className="line" />
                  </div>
                  <div className="mb-10 password group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="password" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${formData.password ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó</label>
                    <input
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`}
                      type="password"
                      maxLength={40}
                    />
                    <span 
                      className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                      onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                      onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                    >
                      🔒
                    </span>
                    <div className="line" />
                  </div>
                  <div className="mb-6 passwordAgain group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="passwordAgain" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${formData.passwordAgain ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó megerősítés</label>
                    <input
                      id="passwordAgain"
                      value={formData.passwordAgain}
                      onChange={handleChange}
                      className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`}
                      type="password"
                      maxLength={40}
                    />
                    <span 
                      className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                      onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                      onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                    >
                      🔒
                    </span>                    
                    <div className="line" />
                  </div>
                  <div className="button block mb-1">
                    <Button type="submit" onClick={handleRegister}>Fiók létrehozása</Button>
                  </div>
                  <div className="button mb-1">
                    <Link to="/signin" className="text-n-2 transition-colors hover:text-n-1">Van már fiókod?</Link>
                  </div>
              </div>
            </div>
          </div>
          <GradientBottom />
        </div>
        <BackgroundCircles />
      </div>
      {error && <ErrorAlert message={error} />}
      {succes && <SuccesAlert message={succes} />}
    </Section>
  );
};

export default Register;
