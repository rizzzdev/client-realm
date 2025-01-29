import axios from "axios";

const env = process.env.NEXT_PUBLIC_ENV || "DEV";
const devUrl = process.env.NEXT_PUBLIC_API_URL_DEV;
const prodUrl = process.env.NEXT_PUBLIC_API_URL_PROD;

const axiosIns = axios.create({
  withCredentials: true,
  baseURL: env === "DEV" ? devUrl : prodUrl,
});

export default axiosIns;
