import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("@fluidcode:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("@fluidcode:token");
    localStorage.removeItem("@fluidcode:user");
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@fluidcode:token");

    if (!token) {
      return;
    }

    api.get("/profile")
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("@fluidcode:user", JSON.stringify(data));
      })
      .catch(() => {
        logout();
      });
  }, [logout]);

  const persistSession = useCallback(({ token, user: sessionUser }) => {
    localStorage.setItem("@fluidcode:token", token);
    localStorage.setItem("@fluidcode:user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  }, []);

  const login = useCallback(async (email, senha) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, senha });
      persistSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, [persistSession]);

  const register = useCallback(async (nome, email, senha) => {
    setLoading(true);
    try {
      const { data } = await api.post("/register", { nome, email, senha });
      persistSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, [persistSession]);

  const value = useMemo(() => ({
    user,
    signed: Boolean(user),
    loading,
    login,
    register,
    logout
  }), [user, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
