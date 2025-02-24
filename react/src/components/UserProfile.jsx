import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        console.error("Felhasználói adatok lekérése sikertelen", err);
        setError(err.response?.data?.error || "Hiba történt az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Felhasználói Profil</h2>
      <p>Név: {user?.full_name}</p>
      <p>Telefonszám: {user?.phone_number}</p>
      <p>Neptun kód: {user?.neptun_code}</p>
      <p>Születési dátum: {user?.birth_date}</p>
    </div>
  );
};

export default UserProfile;
