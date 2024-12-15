import React, { useState } from "react";
import '../css/Login-Register.css'
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles,  GradientBottom, GradientTop } from "./design/Hero";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios HTTP kliens importálása
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoggedIn } = useAuth(); // Auth állapot kezelése
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://uni-support.sytes.net/api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        login();
        navigate('/new-ticket')
      }
    } catch {
      setError("Hibás felhasználónév vagy jelszó!");
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
              <p className="text-2xl rounded-b-md rounded-t-md mx-auto max-md:mb-14 md:mb-20 max-w-64 font-extrabold uppercase">Bejelentkezés</p>
              <form onSubmit={handleLogin}>
              <div className="mb-12">
                <div className="username group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="username" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${username ? "-translate-y-6" : "-translate-y-0"}`}>Felhasználónév</label>
                    <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={`p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80 ${username ? "cursor-text pointer-events-auto" : "cursor-default pointer-events-none"}`} type="text" maxLength={25} />
                    <div className="username-line" />
                </div>
              </div>
              <div className="mb-10">
              <div className="password group mx-auto max-md:w-60 md:w-80 text-left relative">
                    <label htmlFor="password" className={`font-bold uppercase absolute transition-all duration-150 transform cursor-pointer group-focus-within:-translate-y-6 ${password ? "-translate-y-6" : "-translate-y-0"}`}>Jelszó</label>
                    <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`p-1 bg-transparent group-focus-within:outline-none max-md:w-60 sm:w-80 ${password ? "cursor-text pointer-events-auto" : "cursor-default pointer-events-none"}`} type="password" maxLength={25} />
                    <div className="password-line" />
                </div>
              </div>
              <div className="button hidden lg:block mb-1">
                  <Link className="text-n-1/50 transition-colors hover:text-n-1" >Elfelejtett jelszó</Link>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="button block mb-1">
                  <Button type="submit">Bejelentkezés</Button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <GradientBottom />
      </div>
      <BackgroundCircles />
    </div>
    </Section>
  );
};

export default Login;
