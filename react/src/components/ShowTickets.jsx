import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { refreshAccessToken } from './RefreshAccessToken';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const backgroundImages = [
    "src/assets/benefits/card-1.svg",
    "src/assets/benefits/card-2.svg",
    "src/assets/benefits/card-3.svg",
];

const cardIsLight = [
    true, false
];

const getRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
};

const getCardIsLight = () => {
    const randomIndex = Math.floor(Math.random() * cardIsLight.length);
    return cardIsLight[randomIndex];
};

const translateStatus = (status) => {
    switch (status) {
        case 'open':
            return 'Nyitott';
        case 'accepted':
            return 'Elfogadott';
        case 'in_progress':
            return 'Folyamatban lévő';
        case 'closed':
            return 'Lezárt';
        default:
            return status;
    }
};

const translatePriority = (priority) => {
    switch (priority) {
        case 1:
            return 'Alacsony';
        case 2:
            return 'Közepes';
        case 3:
            return 'Magas';
        default:
            return priority;
    }
};

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-blue-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const EyeIcon = ({ onClick, isRead }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 cursor-pointer ${isRead ? 'text-green-500' : 'text-gray-500'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    onClick={onClick}
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ShowTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Kiválasztott hibajegy ID
  const [messages, setMessages] = useState([]); // Üzenetek az adott hibajegyhez
  const csrfToken = Cookies.get("csrftoken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const refreshTokenFunction = await refreshAccessToken(() => {
          navigate('/signin');
        });

        if (refreshTokenFunction && refreshTokenFunction.err !== "") {
          setError(refreshTokenFunction.err);
          await sleep(5000);
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          // `https://uni-support.sytes.net/api/get-self-tickets/`,
          `http://localhost:8000/api/get-self-tickets/`,
          { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
        );

        setTickets(response.data);
      } catch (err) {
        console.error("Ticketek lekérése sikertelen", err);
        setError(err.response?.data?.error || "Hiba történt a ticketek lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const markMessageAsRead = async (messageId) => {
    try {
      const message = messages.find((msg) => msg.id === messageId);
      const newReadStatus = !message.read;
  
      const response = await axios.put(
        // `https://uni-support.sytes.net/api/mark-message-read/`,
        `http://localhost:8000/api/mark-message-read/`,
        { messageId, read: newReadStatus },
        { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
      );
  
      // Frissítsük az üzenetek állapotát a válasz alapján
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId ? { ...message, read: newReadStatus } : message
        )
      );
    } catch (err) {
      console.error("Üzenet állapotának frissítése sikertelen", err);
      setError(err.response?.data?.error || "Hiba történt az üzenet frissítésekor.");
    }
  };

  const fetchMessages = async (ticketId) => {
    try {
      const response = await axios.post(
        //`https://uni-support.sytes.net/api/get-ticket-messages/`,
        `http://localhost:8000/api/get-ticket-messages/`,
        {ticketId},
        { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Üzenetek lekérése sikertelen", err);
      setError(err.response?.data?.error || "Hiba történt az üzenetek lekérésekor.");
    }
  };

  // "Megtekint" gombra kattintás
  const handleViewMessages = (ticketId) => {
    setSelectedTicketId(ticketId);
    fetchMessages(ticketId);
  };

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div>Hiba: {error}</div>;
  }

  return (
    <Section>
      <div className="container relative z-2">
        <Heading className="md:max-w-md lg:max-w-2xl" title="Itt találhatóak az általad létrehozott hibajegyek" />

        <div className="flex flex-wrap gap-10 mb-10 justify-center">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="group block relative p-0.5 bg-no-repeat bg-[length:100%_100%] max-w-[24rem]" style={{ backgroundImage: `url(${getRandomBackgroundImage()})` }}>
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                <h5 className="h5 mb-5 min-w-80 max-w-96 break-words hyphens-auto">{ticket.title}</h5>
                <p className="body-1 mb-6 text-n-3 min-w-80 max-w-96 break-words h-48 hyphens-auto overflow-y-auto">{ticket.description}</p>

                <div className="flex items-center mb-4">
                  <span className="text-sm font-bold text-n-2">Létrehozva:</span>
                  <span className="ml-2 text-sm text-n-3">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-sm font-bold text-n-2">Prioritás:</span>
                  <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    ticket.priority === 1 ? 'bg-green-500 text-white' :
                    ticket.priority === 2 ? 'bg-yellow-500 text-black' :
                    'bg-red-500 text-white'
                  }`}>
                    {translatePriority(ticket.priority)}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-sm font-bold text-n-2">Státusz:</span>
                  <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    ticket.status === 'open' ? 'bg-white text-black' :
                    ticket.status === 'accepted' ? 'bg-yellow-500 text-black' :
                    ticket.status === 'in_progress' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {translateStatus(ticket.status)}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                    <span className="text-sm font-bold text-n-2">Címkék:</span>
                    <div className="flex flex-wrap gap-1 ml-2">
                        {ticket.tags && ticket.tags.length > 0 ? (
                            ticket.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="px-2 py-1 rounded-full text-xs font-bold bg-purple-500 text-white"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-n-3">Nincsenek címkék</span>
                        )}
                    </div>
                </div>

                {/* Üzenetek száma és boríték ikon */}
                <div className="flex items-center mt-4">
                  <EnvelopeIcon />
                  <sup className="ml-1 text-xs text-blue-500">{ticket.message_count}</sup>
                </div>

                {/* "Megtekint" gomb */}
                <button
                  onClick={() => handleViewMessages(ticket.id)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Üzenetek
                </button>
              </div>

              {getCardIsLight() && <GradientLight />}

              <div className="absolute inset-0.5 bg-n-8" style={{ clipPath: "url(#benefits)" }}>
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10 pointer-events-none">
                  {ticket.imageUrl && (
                    <img className="w-full h-full object-cover" src={ticket.imageUrl} width={380} height={362} alt={ticket.title} />
                  )}
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>

        {/* Üzenetek megjelenítése */}
        {selectedTicketId && (
          <div className="fixed top-15 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-n-6/95 p-8 rounded-lg shadow-lg w-[30rem] max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-white">Üzenetek</h2>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message.id} className="mb-4 p-4 bg-n-7 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-400 break-words h-24 hyphens-auto overflow-y-auto">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-sm mt-4 text-gray-400">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                    <EyeIcon
                        onClick={() => markMessageAsRead(message.id)}
                        isRead={message.read}
                      />
                  </div>
                ))
              ) : (
                <p className="text-gray-300">Nincsenek még üzenetek a hibajegyhez.</p>
              )}
              <button
                onClick={() => setSelectedTicketId(null)}
                className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Bezár
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default ShowTickets;