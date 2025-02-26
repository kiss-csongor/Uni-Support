import axios from "axios";
import Cookies from "js-cookie";

export const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refresh_token');
    try {
      await axios.post(
        // 'https://uni-support.sytes.net/api/token-refresh/',
        'http://localhost:8000/api/token-refresh/',
        { refresh_token: refreshToken },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Token refresh failed', error);
      throw error;
    }
  };