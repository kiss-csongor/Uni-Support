import { useState, useEffect } from "react";
import axios from "axios";
import '../css/Chatbot.css';
import Section from "./Section";
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';

const UserProfile = () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    neptun_code: "",
    birth_date: "",
    birth_place: "",
    mothers_name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const username = sessionStorage.getItem("user")?.replace(/['"]+/g, "");
      const token = sessionStorage.getItem("token");

      if (!username || !token) {
        setError("Nincs bejelentkezett felhasználó.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8000/api/get-user/`, 
          { username },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(response.data);
        setFormData({
          full_name: response.data.full_name,
          phone_number: response.data.phone_number,
          neptun_code: response.data.neptun_code,
          birth_date: response.data.birth_date,
          birth_place: response.data.birth_place,
          mothers_name: response.data.mothers_name,
        });
      } catch (err) {
        console.error("Felhasználói adatok lekérése sikertelen", err);
        setError(err.response?.data?.error || "Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleValidationError = async (message) => {
    setError(message);
    setIsButtonDisabled(true);  // Gomb letiltása
    await sleep(5000);  // Várakozás 5 másodpercig
    setError("");  // Hibaüzenet törlése
    setIsButtonDisabled(false);  // Gomb engedélyezése
  };

  const handleSaveClick = async () => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("user")?.replace(/['"]+/g, "");

    if (formData.full_name && formData.full_name> 60) {
      await handleValidationError("A neved nem lehet hosszabb 60 karakternél.")
      return;
    }

    const phoneRegex = /^\+?[0-9]{11}$/;
    if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
      await handleValidationError("A telefonszámnak a +36 előhívó szám után 9 egyedi számjegyből kell állnia.")
      return;
    }

    if (formData.neptun_code && formData.neptun_code.length > 6) {
      await handleValidationError("A Neptun-kód nem lehet hosszabb 6 karakternél.")
      return;
    }

    if (formData.mothers_name && formData.mothers_name > 60) {
      await handleValidationError("Anyja neve nem lehet hosszabb 60 karakternél.")
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      await handleValidationError("Hibás email formátum.")
      return;
    }

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (formData.birth_date && !birthDateRegex.test(formData.birth_date)) {
      await handleValidationError("Hibás születési dátum formátum. A helyes formátum: yyyy-mm-dd.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update-user/`,
        { ...formData, username },
        { headers: {Authorization: `Bearer ${token}`} }
      );
      setUser(response.data);
      setIsEditing(false);
      setError("");
    } catch (err) { 
        setError("Hiba történt az adatok frissítésekor.");
        await sleep(5000);
        setError("");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Betöltés...</p>;

  return (
    <Section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-ai-image">
      <div className="max-w-3xl mx-auto backdrop-blur-md rounded-lg shadow-xl">
        <div className="px-6 py-8 sm:p-10 border-solid border-[3px] rounded-[1rem]">
          <h2 className=" text-3xl font-extrabold text-gray-100 text-center mb-8">Felhasználói Profil</h2>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Név</p>
              {isEditing ? (
                <input
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Kiss Gyula"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.full_name ? "text-gray-900" : "text-gray-900/40"}`}>
                    {user?.full_name ? user.full_name : "Kiss Gyula"}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Telefonszám</p>
              {isEditing ? (
                <input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="+36301112233"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.phone_number ? "text-gray-900" : "text-gray-900/40"}`}>
                {   user?.phone_number ? user.phone_number : "+36301112233"}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Neptun kód</p>
              {isEditing ? (
                <input
                  id="neptun_code"
                  value={formData.neptun_code}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="AAA111"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.neptun_code ? "text-gray-900" : "text-gray-900/40"}`}>
                    {user?.neptun_code ? user.neptun_code : "AAA111"}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Anyja neve</p>
              {isEditing ? (
                <input
                  id="mothers_name"
                  value={formData.mothers_name}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Szabó Ilona"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.mothers_name ? "text-gray-900" : "text-gray-900/40"}`}>
                    {user?.mothers_name ? user.mothers_name : "Szabó Ilona"}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Születési dátum</p>
              {isEditing ? (
                <input
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="1999-09-19"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.birth_date ? "text-gray-900" : "text-gray-900/40"}`}>
                    {user?.birth_date ? user.birth_date : "1999-09-19"}
                </p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-md font-medium text-gray-500">Születési hely</p>
              {isEditing ? (
                <input
                  id="birth_place"
                  value={formData.birth_place}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                  placeholder="Doboz"
                />
              ) : (
                <p className={`mt-1 text-lg font-semibold ${user?.birth_date ? "text-gray-900" : "text-gray-900/40"}`}>
                    {user?.birth_date ? user.birth_date : "Doboz"}
                </p>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Adatok módosítása
                </button>
              ) : (
                <button
                  onClick={handleSaveClick}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  disabled={isButtonDisabled}
                >
                  Adatok mentése
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && <ErrorAlert message={error} setError={setError} />}
      {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
    </Section>
  );
};

export default UserProfile;