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
import Test from "./Test.jsx";
import Test2 from "./Test2.jsx";
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
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>
);
