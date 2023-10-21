import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const accessToken = localStorage.getItem("accessToken") ?? undefined;

if (accessToken) {
  axiosInstance.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    const decodedToken = accessToken && jwt_decode(accessToken);
    const currentDate = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      try {
        const res = await axios.get(`${BASE_URL}` + "/api/auth/refresh-token", {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
      } catch (error) {
        console.log(error);
      }
    }
    return config;
  });
}

export default axiosInstance;
