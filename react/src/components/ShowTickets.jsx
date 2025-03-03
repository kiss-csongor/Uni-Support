import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from 'react-router-dom';
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
        return priority; // Ha ismeretlen az érték, visszaadjuk az eredetit
    }
  };

const ShowTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const csrfToken = Cookies.get("csrftoken");
  const [error, setError] = useState(null);
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
          // `https://uni-support.sytes.net/api/get-tickets/`,
          `http://localhost:8000/api/get-tickets/`,
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
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{ticket.title}</h5>
                <p className="body-1 mb-6 text-n-3 min-w-96">{ticket.description}</p>
                

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
                  <span className="text-sm font-bold text-n-2">Létrehozva:</span>
                  <span className="ml-2 text-sm text-n-3">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-sm font-bold text-n-2">Státusz</span>
                  <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    ticket.status === 'open' ? 'bg-white text-black' :
                    ticket.status === 'accepted' ? 'bg-yellow-500 text-black' :
                    ticket.status === 'in_progress' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {translateStatus(ticket.status)}
                  </div>
                </div>
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
      </div>
    </Section>
  );
};

export default ShowTickets;