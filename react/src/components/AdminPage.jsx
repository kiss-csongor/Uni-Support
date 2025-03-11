import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { refreshAccessToken } from './RefreshAccessToken';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';

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

const AdminPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTicketId, setEditingTicketId] = useState(null); // Szerkesztés alatt lévő ticket ID
    const [editedTicket, setEditedTicket] = useState({}); // Szerkesztett ticket adatai
    const csrfToken = Cookies.get("csrftoken");
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const navigate = useNavigate();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
      const fetchTickets = async () => {
          try {
              const refreshTokenFunction = await refreshAccessToken(() => {
                  navigate('/signin');
              });
  
              if (refreshTokenFunction && refreshTokenFunction.err !== "") {
                  setError(refreshTokenFunction.err);
                  navigate("/signin");
              }
  
              const adminCheckResponse = await axios.get(
                  // `https://uni-support.sytes.net/api/get-is-superuser/`,
                  `http://localhost:8000/api/get-is-superuser/`,
                  { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
              );
  
              if (!adminCheckResponse.data.is_superuser) {
                  setError("Nincs jogosultságod megtekinteni az oldalt");
                  await sleep(5000);
                  navigate("/my-tickets");
              }
  
              const ticketsResponse = await axios.get(
                  // `https://uni-support.sytes.net/api/get-all-tickets/`,
                  `http://localhost:8000/api/get-all-tickets/`,
                  { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
              );
  
              setTickets(ticketsResponse.data);
          } catch (err) {
              console.error("Hiba történt", err);
              setError(err.response?.data?.error || "Hiba történt az adatok lekérésekor.");
          } finally {
              setLoading(false);
          }
      };
  
      fetchTickets();
  }, []);


    const handleEdit = (ticket) => {
        setEditingTicketId(ticket.id);
        setEditedTicket({ ...ticket });
    };

    const handleSave = async (ticketId) => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.put(      
                // `https://uni-support.sytes.net/api/update-ticket/`,
                `http://localhost:8000/api/update-ticket/`,
                editedTicket,
                { withCredentials: true, headers: { 'X-CSRFToken': csrfToken } }
            );

            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId ? response.data : ticket
                )
            );

            setEditingTicketId(null);
            setEditedTicket({});
            setSucces("Ticket sikeresen frissítve!");
            await sleep(4000);
            setSucces("");    
        } catch (err) {
            console.error("Ticket frissítése sikertelen", err);
            setError("Hiba történt a ticket frissítése során.");
            await sleep(4000);
            setError("");
        }
    };

    const handleInputChange = (e, field) => {
        setEditedTicket((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    if (loading) {
        return <div>Betöltés...</div>;
    }

    return (
        <Section>
            <div className="container relative z-2">
                <Heading className="md:max-w-md lg:max-w-2xl" title="Itt találhatóak az általad létrehozott hibajegyek" />

                <div className="flex flex-wrap gap-10 mb-10 justify-center">
                    {tickets.map((ticket) => {
                        const isEditing = editingTicketId === ticket.id;
                        const currentTicket = isEditing ? editedTicket : ticket;

                        return (
                            <div key={ticket.id} className="group block relative p-0.5 bg-no-repeat bg-[length:100%_100%] max-w-[24rem]" style={{ backgroundImage: `url(${getRandomBackgroundImage()})` }}>
                                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                                    <h5 className="h5 mb-5 min-w-80 max-w-96 break-words hyphens-auto">{ticket.title}</h5>
                                    <p className="body-1 mb-6 text-n-3 min-w-80 max-w-96 break-words hyphens-auto">{ticket.description}</p>

                                    <div className="flex items-center mb-4">
                                        <span className="text-sm font-bold text-n-2">Prioritás:</span>
                                        {isEditing ? (
                                            <select
                                                name="priority"
                                                value={currentTicket.priority}
                                                onChange={(e) => handleInputChange(e, 'priority')}
                                                className="ml-2 px-2 py-1 rounded-full text-xs font-bold"
                                            >
                                                <option value={1}>Alacsony</option>
                                                <option value={2}>Közepes</option>
                                                <option value={3}>Magas</option>
                                            </select>
                                        ) : (
                                            <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${ticket.priority === 1 ? 'bg-green-500 text-white' : ticket.priority === 2 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}>
                                                {translatePriority(ticket.priority)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Státusz szerkesztése */}
                                    <div className="flex items-center mb-4">
                                        <span className="text-sm font-bold text-n-2">Státusz:</span>
                                        {isEditing ? (
                                            <select
                                                name="status"
                                                value={currentTicket.status}
                                                onChange={(e) => handleInputChange(e, 'status')}
                                                className="ml-2 px-2 py-1 rounded-full text-xs font-bold"
                                            >
                                                <option value="open">Nyitott</option>
                                                <option value="accepted">Elfogadott</option>
                                                <option value="in_progress">Folyamatban lévő</option>
                                                <option value="closed">Lezárt</option>
                                            </select>
                                        ) : (
                                            <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${ticket.status === 'open' ? 'bg-white text-black' : ticket.status === 'accepted' ? 'bg-yellow-500 text-black' : ticket.status === 'in_progress' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {translateStatus(ticket.status)}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() =>
                                            isEditing
                                                ? handleSave(ticket.id)
                                                : handleEdit(ticket)
                                        }
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        {isEditing ? "Mentés" : "Szerkesztés"}
                                    </button>
                                </div>
                                {getCardIsLight() && <GradientLight />}
                                <div className="absolute inset-0.5 bg-n-8" style={{ clipPath: "url(#benefits)" }}>
                                    <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
                                        {ticket.imageUrl && (
                                            <img className="w-full h-full object-cover" src={ticket.imageUrl} width={380} height={362} alt={ticket.title} />
                                        )}
                                    </div>
                                </div>
                                <ClipPath />
                            </div>
                        );
                    })}
                </div>
            </div>
            {error && <ErrorAlert message={error} setError={setError} />}
            {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
        </Section>
    );
};

export default AdminPage;