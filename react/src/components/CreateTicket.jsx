import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "./Section";
import ErrorAlert from "./ErrorAlert";
import SuccesAlert from "./SuccesAlert";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./RefreshAccessToken";

const CreateTicket = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    const validateNeptunCode = async () => {
      try {
        const refreshTokenFunction = await refreshAccessToken(logout, navigate);
        if (refreshTokenFunction && refreshTokenFunction.err !== "") {
          setError(refreshTokenFunction.err);
          await sleep(5000);
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          `https://uni-support.sytes.net/api/validate-neptun-code/`,
          // `http://localhost:8000/api/validate-neptun-code/`,
          { withCredentials: true, headers: { "X-CSRFToken": csrfToken } }
        );

        const getTags = await axios.get(
          `https://uni-support.sytes.net/api/get-tags/`,
          // `http://localhost:8000/api/get-tags/`,
          { withCredentials: true, headers: { "X-CSRFToken": csrfToken } }
        );

        setTags(getTags.data)

      } catch (err) {
        setError(err.response?.data?.error || "Hiba történt az adatok lekérésekor." );
        await sleep(5000)
        if (err.response.status === 400) {
            navigate("/profile")
          }
        if (err.response.status === 401) {
            navigate("/signin")
          }
      }
    };
    validateNeptunCode();
  }, []);

  const handleTicketCreate = async () => {
    try {
      await refreshAccessToken();

      if (formData.title.length > 50 || formData.title.length < 10) {
        await handleError("A hibajegyed címének hosszúsága minimum 10 és maximum 50 karakter leghet.")
        return;
      }

      if (formData.description.length > 300 || formData.description.length < 30) {
        await handleError("A hibajegyed leírásának hosszúsága minimum 30 és maximum 300 karakter leghet.")
        return;
      }

      const response = await axios.post(
        `https://uni-support.sytes.net/api/create-tickets/`,
        // `http://localhost:8000/api/create-tickets/`,
        { ...formData },
        { withCredentials: true, headers: {'X-CSRFToken': csrfToken,}, },
      );

      setSucces(response.data.success);
      await sleep(5000);
      navigate("/my-tickets")
    } catch (err) { 
        setError(err.response.data.error);
        await sleep(5000);
        setError("");
    }
  };

  const handleError = async (message) => {
    setError(message);
    await sleep(5000);
    setError("");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
      <Section>
        <div className="max-w-3xl mx-auto  backdrop-blur-md rounded-lg shadow-xl">
        <div className="px-6 py-8 sm:p-10 border-solid border-[3px] rounded-[1rem]">
          <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">
            Hibajegy létrehozása
          </h2>
          <div className="space-y-6">
            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Cím</p>
              <textarea
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none resize-none"
                placeholder="Adja meg a hibajegy címét"
                rows={2}
              />
            </div>

            <div className="bg-white/75 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Leírás</p>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                placeholder="Adja meg a hiba részletes leírását"
                rows={4}
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleTicketCreate}
              >
                Hibajegy létrehozása
              </button>
            </div>
          </div>
        </div>
        {error && <ErrorAlert message={error} setError={setError} />}
        {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
        </div>
      </Section>
  );
};

export default CreateTicket;
