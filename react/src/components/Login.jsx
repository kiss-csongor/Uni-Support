import React, { useState } from "react";
import '../css/Login.css'
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles, Gradient } from "./design/Hero";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios HTTP kliens importálása

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("https://uni-support.sytes.net/api/login/", {
        username: username,
        password: password
      });

      // Sikeres bejelentkezés, átirányítás
      if (response.status === 200) {
        console.log('gratula'); // Példa: átirányítás a főoldalra
      }
    } catch (err) {
      // Hibakezelés
      setError("Hibás felhasználónév vagy jelszó");
    }
  };

  return (
    <Section>
    <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 max-h-screen max-sm:mt-10 sm:mt-10">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem]">
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
          <div className="rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] max-sm:aspect-[320/450] sm:aspect-[320/450]">
            <div className="mx-auto mt-5 mb-5 text-center items-center">
              <p className="text-2xl rounded-b-md rounded-t-md mx-auto mb-10 max-w-64 font-extrabold">Bejelentkezés</p>
              <form onSubmit={handleLogin}>
              <div className="mb-5">
                <p className="mb-2">Felhasználónév</p>
                <div className="username group mx-auto max-md:w-60 md:w-80">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-n-8 focus:bg-n-6 focus:outline-none rounded-xl text-center max-md:w-60 sm:w-80" type="text" placeholder="John Doe" maxLength={25} />
                    <div className="group-focus-within:hidden username-line" />
                </div>
              </div>
              <div className="mb-10">
                <p className="mb-2" id='password'>Jelszó</p>
                <div className="password group mx-auto max-md:w-60 md:w-80">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-n-8 focus:bg-n-6 focus:outline-none rounded-xl text-center max-md:w-60 sm:w-80" type="password" placeholder="Password123" maxLength={25} />
                    <div className="group-focus-within:hidden password-line" />
                </div>
              </div>
              <div className="button hidden text-n-1/50 transition-colors hover:text-n-1 lg:block mb-1">
                    <Link >Elfelejtett jelszó</Link>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Bejelentkezés</Button>
              </form>
            </div>
          </div>
        </div>

        <Gradient />
      </div>

      <BackgroundCircles></BackgroundCircles>
    </div>
    </Section>
  );
};

export default Register;
