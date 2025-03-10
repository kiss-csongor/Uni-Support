import axios from "axios";
import Cookies from "js-cookie";

export const refreshAccessToken = async (logout, navigate) => {
  const refreshToken = Cookies.get("refresh_token");
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  if (!refreshToken) {
    console.warn("Nincs refresh token, kijelentkezés...");
    logout();
    return { err: "Jelentkezzen be az oldal használatához" };
  }

  try {
    await axios.post(
      // "https://uni-support.sytes.net/api/token-refresh/",
      "http://localhost:8000/api/token-refresh/",
      { refresh_token: refreshToken },
      { withCredentials: true }
    );
    return { err: "" };
  } catch (error) {
    console.error("Token refresh failed", error);
    if (error.response && error.response.status === 401) {
      try {
        await axios.post(
          "https://uni-support.sytes.net/api/logout/",
          // "http://localhost:8000/api/logout/",
        {}, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        });
      } catch (error) {
      }
      logout();
      return { err: "Munkamenete lejárt, kérjük, jelentkezzen be újra!" };
    }

    throw error;
  }
};
