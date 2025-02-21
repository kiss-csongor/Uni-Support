import React, { useState } from "react";
import Section from "./Section";
import Button from "./Button";
import { BackgroundCircles, GradientBottom, GradientTop } from "./design/Hero";
import axios from "axios";
import '../css/Chatbot.css';

const Chat = () => {
  const [input, setInput] = useState(""); // Felhasználó bemenete
  const [messages, setMessages] = useState([]); // Üzenetek tárolása

  // Gemini API hívása
  const sendMessage = async () => {
    if (!input.trim()) return; // Üres üzenet ellenőrzése

    // Felhasználó üzenet hozzáadása
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Input mező törlése

    try {
      // Gemini API hívása
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", // Gemini API endpoint
        {
          contents: [
            {
              parts: [
                {
                  text: input, // Felhasználó üzenete
                },
              ],
            },
          ],
        },
        {
          params: {
            key: "AIzaSyBBZqJUQKQWNP2BPhtD0t5VIKYtsBfWA2I", // Helyettesítsd a saját API kulcsoddal
          },
        }
      );

      // Gemini válaszának kinyerése
      const botResponse = response.data.candidates[0].content.parts[0].text;

      // Bot üzenet hozzáadása
      const botMessage = { text: botResponse, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Hiba történt a Gemini API hívás során:", error);
      const errorMessage = { text: "Hiba történt a válasz küldése során.", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <Section className='bg-ai-image'>
      <div className="relative max-w-[25rem] mx-auto md:max-w-2xl xl:mb-24 max-h-screen max-sm:mt-10 sm:mt-10">
        <div className="relative z-1 p-0.5 rounded-2xl">
          <GradientTop />
          <div className="relative rounded-[1rem] border-solid border-[2px] backdrop-blur-md">
            <div />
            <div className="rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] max-sm:aspect-[320/450] sm:aspect-[320/450]">
              <div className="mx-auto mt-5 mb-5 text-center items-center">
                <p className="text-2xl rounded-b-md rounded-t-md mx-auto max-w-64 font-extrabold uppercase bg-white/5">Uni-Chatbot</p>
                {/* Chatmező */}
                <div className="flex flex-col md:h-[418px] sm:h-[498px] max-sm:h-[438px] rounded-lg p-4">
                  {/* Üzenetek */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`${
                            message.sender === "user"
                              ? "bg-green-600/80 text-white p-3 rounded-lg max-w-[70%]" // Felhasználó üzenetei jobb oldalon
                              : "w-full text-white p-3" // AI válasza faltól falig
                          }`}
                        >
                          <p className="text-left">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Beviteli mező */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Írd ide az üzeneted..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 p-2 rounded-lg text-white focus:outline-none bg-black/40"
                    />
                    <Button type="submit" onClick={sendMessage}>
                      Küldés
                    </Button>
                  </div>
                </div>
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

export default Chat;