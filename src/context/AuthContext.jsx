import { createContext, useContext, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() => localStorage.getItem("username"));

  function persistSession(auth) {
    localStorage.setItem("token", auth.token);
    localStorage.setItem("username", auth.username);
    setToken(auth.token);
    setUsername(auth.username);
  }

  async function login(user, password) {
    const auth = await loginRequest(user, password);
    persistSession(auth);
  }

  async function register(user, password) {
    const auth = await registerRequest(user, password);
    persistSession(auth);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, username, isAuthenticated: Boolean(token), login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
