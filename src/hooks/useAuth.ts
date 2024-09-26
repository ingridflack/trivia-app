import { useState } from "react";

interface UserData {
  name: string;
  avatar?: string;
  username: string;
  id: string;
}

interface UserData {
  token: string;
  user: UserData;
}

const useAuth = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  const saveUserData = (data: UserData) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    setToken(data.token);
    setUserData(data.user);
  };

  const clearUserData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
  };

  return { userData, token, saveUserData, clearUserData };
};

export default useAuth;
