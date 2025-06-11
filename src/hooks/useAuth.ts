import { useState } from "react";
import api from "../Utils/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/users/signup", userData);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/users/login", credentials);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/users/logout");
      return res.data;
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return { signup, login, logout, loading, error };
};
