import { useState, useEffect } from "react";
import axios from "axios";
import '../css/UserProfile.css';
import Section from "./Section";
import ErrorAlert from './ErrorAlert';
import SuccesAlert from './SuccesAlert';
import UserData from './UserData';
import LoginData from "./LoginData";
import { CSSTransition } from 'react-transition-group';
import Cookies from "js-cookie";
import { refreshAccessToken } from "./RefreshAccessToken";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [dataVisualized, setDataVisualized] = useState("profileData");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken")
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    neptun_code: "",
    birth_date: "",
    birth_place: "",
    mothers_name: "",
    username: "",
    email:"",
    password: "",
  });

  const [authData, setAuthData] = useState({
    new_password:"",
    password_again: "",
    old_password: "",
  });
  const [authDataCorrect, setAuthDataCorrect] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const refreshTokenFunction = await refreshAccessToken(logout, navigate);
        if (refreshTokenFunction && refreshTokenFunction.err !== "") {
          setError(refreshTokenFunction.err)
          await sleep(5000)
          navigate("/signin")
          return
        }
        

        const response = await axios.get(
          `https://uni-support.sytes.net/api/get-user/`,
          // `http://localhost:8000/api/get-user/`,
          { withCredentials: true, headers: {'X-CSRFToken': csrfToken,}, },
        );

        setUser(response.data);
        setFormData({
          full_name: response.data.full_name,
          phone_number: response.data.phone_number,
          neptun_code: response.data.neptun_code,
          birth_date: response.data.birth_date,
          birth_place: response.data.birth_place,
          mothers_name: response.data.mothers_name,
          username: response.data.user.username,
          email: response.data.user.email,
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
    setIsButtonDisabled(true);
    await sleep(5000);
    setError("");
    setIsButtonDisabled(false);
  };

  const handleUserDataValidation = async () => {
    if (formData.full_name && formData.full_name.length > 30) {
      await handleValidationError("A neved nem lehet hosszabb 30 karakternél.")
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

    if (formData.mothers_name && formData.mothers_name.length > 30) {
      await handleValidationError("Anyja neve nem lehet hosszabb 30 karakternél.")
      return;
    }

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (formData.birth_date && !birthDateRegex.test(formData.birth_date)) {
      await handleValidationError("Hibás születési dátum formátum. A helyes formátum: yyyy-mm-dd.");
      return;
    }

    if (formData.birth_place && formData.birth_place.length > 30) {
      await handleValidationError("A születési helyének neve nem lehet hosszabb 30 karakternél.")
      return;
    }
    handleDataSave();
  }

  const handleLoginDataValidation = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      await handleValidationError("Hibás email formátum.")
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,60}$/;
    if (authData.new_password && !passwordRegex.test(authData.new_password)) {
      await handleValidationError("Helytelen jelszó formátum (legalább 1 nagybetű, 1 speciális karakter és 1 szám. Min. 8 és Max. 60 karakter).");
      return;
    }
    if (authData.new_password !== authData.password_again) {
      await handleValidationError("Az általad megadott jelszavak nem egyeznek meg.");
      return;
    }
    setAuthDataCorrect(true)
  }

  const handlePasswordValidation = async () => {
    const password = authData.old_password

    try {
      await refreshAccessToken();

      const response = await axios.post(
        `https://uni-support.sytes.net/api/validate-user/`,
        // `http://localhost:8000/api/validate-user/`,
        { password },
        { withCredentials: true, headers: {'X-CSRFToken': csrfToken,}, },
      );
      if (response.status === 200) {
        setFormData({ password: authData.new_password });
        handleLoginDataSave()
      }
    } catch (err) { 
        setError("Hibás autentikációs adatok.");
        await sleep(5000);
        setError("");
    }
  }

  const handleLoginDataSave = async () => {
    try {
      await refreshAccessToken();

      const response = await axios.put(
        `https://uni-support.sytes.net/api/update-user/`,
        // `http://localhost:8000/api/update-user/`,
        { ...formData },
        { withCredentials: true, headers: {'X-CSRFToken': csrfToken,}, },
      );
      setError("");
      setSucces("Adatait sikeresen frissítettük.")
      await sleep(5000);
      window.location.reload()
    } catch (err) { 
        setError("Hiba történt az adatok frissítésekor.");
        await sleep(5000);
        setError("");
    }
  };

  const handleDataSave = async () => {

    try {
      await refreshAccessToken();

      const response = await axios.put(
        `https://uni-support.sytes.net/api/update-user-profile/`,
        // `http://localhost:8000/api/update-user-profile/`,
        { ...formData },
        { withCredentials: true, headers: {'X-CSRFToken': csrfToken,}, },
      );
      setUser(response.data);
      setIsEditing(false);
      setError("");
      setSucces("Adatait sikeresen frissítettük.")
      await sleep(5000);
      window.location.reload()
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
  const handleAuthChange = (e) => {
    const { id, value } = e.target;
    setAuthData((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return (
      <div>
        <p className="text-center text-xl lg:mb-[600px] text-gray-700">Betöltés...</p>
        {error && <ErrorAlert message={error} setError={setError} />}
        {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
      </div>
    );
  }

  return (
    <Section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="justify-center flex mb-10">
        <button
          onClick={() => setDataVisualized(dataVisualized === "profileData" ? "loginData" : "profileData")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {dataVisualized === "profileData" ? "Bejelentkezési adatok megjelenítése" : "Profil adatok megjelenítése"}
        </button>
      </div>

      <CSSTransition
        in={dataVisualized === "profileData"}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <UserData 
          user={user}
          formData={formData}
          isEditing={isEditing}
          isButtonDisabled={isButtonDisabled}
          handleEditClick={handleEditClick}
          handleChange={handleChange}
          handleUserDataValidation={handleUserDataValidation}
        />
      </CSSTransition>

      <CSSTransition
        in={dataVisualized === "loginData"}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <LoginData 
          user={user}
          formData={formData}
          authData={authData}
          isEditing={isEditing}
          isButtonDisabled={isButtonDisabled}
          handleEditClick={handleEditClick}
          handleChange={handleChange}
          handleAuthChange={handleAuthChange}
          authDataCorrect={authDataCorrect}
          handleLoginDataValidation={handleLoginDataValidation}
          handlePasswordValidation={handlePasswordValidation}
        />
      </CSSTransition>

      {error && <ErrorAlert message={error} setError={setError} />}
      {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
    </Section>
  );
};

export default UserProfile;