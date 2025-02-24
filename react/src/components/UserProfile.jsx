import { useState, useEffect } from "react";
import axios from "axios";
import '../css/Chatbot.css';
import Section from "./Section";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    neptun_code: "",
    birth_date: "",
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
        const response = await axios.post(`http://localhost:8000/api/user/`, 
          { username },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(response.data);
        setFormData({
          full_name: response.data.full_name,
          phone_number: response.data.phone_number,
          neptun_code: response.data.neptun_code,
          birth_date: response.data.birth_date,
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

  const handleSaveClick = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error("Felhasználói adatok frissítése sikertelen", err);
      setError(err.response?.data?.error || "Hiba történt az adatok frissítésekor.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Betöltés...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <Section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-ai-image">
      <div className="max-w-3xl mx-auto bg-white backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Felhasználói Profil</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Név</p>
              {isEditing ? (
                <input
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-gray-900">{user?.full_name}</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Telefonszám</p>
              {isEditing ? (
                <input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-gray-900">{user?.phone_number}</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Neptun kód</p>
              {isEditing ? (
                <input
                  id="neptun_code"
                  value={formData.neptun_code}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-gray-900">{user?.neptun_code}</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Születési dátum</p>
              {isEditing ? (
                <input
                  id="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="mt-1 text-lg font-semibold text-gray-900 w-full bg-transparent focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-lg font-semibold text-gray-900">{user?.birth_date}</p>
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
                >
                  Adatok mentése
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default UserProfile;