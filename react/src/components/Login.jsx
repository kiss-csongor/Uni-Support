import React, { useState } from "react";
import '../css/Login-Register.css'
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles,  GradientBottom, GradientTop } from "./design/Hero";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:8000/api/login/",
        "https://uni-support.sytes.net/api/login/",
        { 
          username,
          password,
        },
          { withCredentials: true }
      );
      if (response.status === 200) {
        setSucces("Sikeresen bejelentkezett!");
        login()
        await sleep(3000);
        navigate('/');
      } 
    } catch(err) {
      setError("Hiba bejelentkezés során");
    }
  };

  return (
    <Section className='bg-image'>
    <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 max-h-screen max-sm:mt-10 sm:mt-10">
      <div className="relative z-1 p-0.5 rounded-2xl">
      <GradientTop />
        <div className="relative rounded-[1rem] border-solid border-[2px] backdrop-blur-sm">
          <div/>
          <div className="rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] max-sm:aspect-[400/450] sm:aspect-[400/450]">
            <div className="mx-auto mt-5 mb-5 text-center items-center">
              <p className="text-2xl rounded-b-md rounded-t-md mx-auto max-md:mb-14 md:mb-[90px] max-w-64 font-extrabold uppercase">Bejelentkezés</p>
              <form onSubmit={handleLogin}>
              <div className="mb-12">
                <div className="username group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="username" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${username ? "-translate-y-6" : "-translate-y-0"}`}>Felhasználónév</label>
                    <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="text" maxLength={40} />
                    <div className="line" />
                </div>
              </div>
              <div className="mb-10">
              <div className="password group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="password" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${password ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó</label>
                    <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`text-n-1/80 p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80`} type="password" maxLength={40} />
                    <span 
                      className="text-2xl absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                      onMouseEnter={(e) => e.target.previousSibling.type = "text"}
                      onMouseLeave={(e) => e.target.previousSibling.type = "password"}
                    >
                      🔒
                    </span>
                    <div className="line" />
                </div>
              </div>
              <div className="button mb-1">
                  <Link className="text-n-3 transition-colors hover:text-n-1" >Elfelejtett jelszó</Link>
              </div>
              <div className="button block mb-1">
                  <Button white type="submit">Bejelentkezés</Button>
              </div>
              <div className="button mb-1">
                  <Link to="/signup" className="text-n-3 transition-colors hover:text-n-1" >Még nincs fiókod?</Link>
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

export default Login;
