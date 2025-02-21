import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import MyTickets from "./MyTickets.jsx";
import NewTicket from "./NewTicket.jsx";
import FAQ from "./FAQ.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import Profile from "./Profile.jsx";
import Test from "./components/Test.jsx";
import Chatbot from "./Chatbot.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/new-ticket" element={<NewTicket />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
