import { useEffect, useState } from "react";
import { api } from "../lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await api.get("/user");
      setUser(userData);
    } catch (err) {
      console.error("Auth verify failed, clearing token", err);
      localStorage.removeItem("auth_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    
    // Simple custom event listener to reload user state on login/logout
    window.addEventListener("auth-state-change", fetchUser);
    return () => window.removeEventListener("auth-state-change", fetchUser);
  }, []);

  return { 
    user, 
    loading,
    isAuthenticated: !!user,
    reload: fetchUser 
  };
}
