import axios from "axios";

const axiosIns = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosIns;
