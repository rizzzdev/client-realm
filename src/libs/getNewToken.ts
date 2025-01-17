import { jwtDecode } from "jwt-decode";
import axiosIns from "./axiosIns";

const getNewToken = async (currentToken: string) => {
  const { exp } = jwtDecode(currentToken);
  if (exp! * 1000 < Date.now()) {
    const result = await axiosIns.get<{
      refreshToken: string;
      accessToken: string;
    }>("/token");
    return result.data.accessToken;
  }
  return currentToken;
};

export default getNewToken;
