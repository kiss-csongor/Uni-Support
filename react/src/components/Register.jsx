import React, { useState } from "react";
import '../css/Login-Register.css'
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles,  GradientBottom, GradientTop } from "./design/Hero";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios HTTP kliens importálása
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  const { login } = useAuth(); // Auth állapot kezelése
  const navigate = useNavigate();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://uni-support.sytes.net/api/register/", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSucces('Sikeresen regisztráció.')
        await sleep(2000)
        const response = await axios.post("http://localhost:8000/api/login/", {
          username,
          password,
        });

        if (response.status === 200) {
          login();
          setSucces('Sikeresen bejelentkezés.')
          await sleep(3000)
          navigate('/')
        } 
      }
    } catch(err) {
      setError(err.response.data.non_field_errors);
    }
  };

  return (
    <Section className='bg-image'>
    <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 max-h-screen max-sm:mt-10 sm:mt-10">
      <div className="relative z-1 p-0.5 rounded-2xl">
      <GradientTop />
        <div className="relative rounded-[1rem] border-solid border-[2px] backdrop-blur-sm">
          <div/>
          <div className="rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] max-sm:aspect-[320/450] sm:aspect-[320/450]">
            <div className="mx-auto mt-5 mb-5 text-center items-center">
              <p className="text-2xl rounded-b-md rounded-t-md mx-auto max-sm:mb-12 mb-14 max-w-64 font-extrabold uppercase">Regisztráció</p>
              <form onSubmit={handleLogin}>
                <div className="mb-10 username group mx-auto max-md:w-60 md:w-80 text-left relative">
                  <label htmlFor="username" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${username ? "-translate-y-6" : "-translate-y-0"}`}>Felhasználónév</label>
                  <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="text" maxLength={25} />
                  <div className="line" />
              </div>
              <div className="mb-10 email group mx-auto max-md:w-60 md:w-80 text-left relative">
                  <label htmlFor="email" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${email ? "-translate-y-6" : "-translate-y-0"}`}>Email cím</label>
                  <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="email" maxLength={25} />
                  <div className="line" />
              </div>
              <div className="mb-10 password group mx-auto max-md:w-60 md:w-80 text-left relative">
                  <label htmlFor="password" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${password ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó</label>
                  <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="password" maxLength={25} />
                  <div className="line" />
              </div>
              <div className="mb-6 passwordAgain group mx-auto max-md:w-60 md:w-80 text-left relative">
                  <label htmlFor="passwordAgain" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${passwordAgain ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó megerősítés</label>
                  <input id="passwordAgain" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="password" maxLength={25} />
                  <div className="line" />
              </div>
              <div className="button block mb-1">
                  <Button type="submit">Fiók létrehozása</Button>
              </div>
              <div className="button mb-1">
                  <Link to="/signin" className="text-n-2 transition-colors hover:text-n-1" >Van már fiókod?</Link>
              </div>
              </form>
            </div>
          </div>
        </div>
        <GradientBottom />
      </div>
      <BackgroundCircles />
    </div>
    {error && <ErrorAlert message={error} setError={setError} />}
    {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
    </Section>
  );
};

export default Register;
