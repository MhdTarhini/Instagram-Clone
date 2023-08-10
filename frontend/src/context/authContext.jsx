import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (data) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/guest/login",
      data
    );
    setUserData(response.data.data);
  };
  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/login");
    setUserData(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
