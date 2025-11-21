import { useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("session");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return null;
    }
  });

  const login = (name, password) => {
    if (name === "admin" && password === "1234") {
      const session = { name };
      setUser(session);
        sessionStorage.setItem("session", JSON.stringify(session));
      return true;
    }
    return false;
  };

const logout = () => {
  sessionStorage.removeItem("session");
  setUser(null);
  toast.info("Sesión cerrada exitosamente");
};

return (
  <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>
);
};