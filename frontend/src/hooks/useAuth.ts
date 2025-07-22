import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/validate-token`, {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.success);
          setRoles(data.roles || []);
        } else {
          setIsAuthenticated(false);
          setRoles([]);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setRoles([]);
      }
    };

    checkAuth();
  }, []);

  // ✅ Cerrar sesión
  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "GET", // o "GET" si tu backend lo usa así
      credentials: "include",
    });

    localStorage.clear(); // si guardas algo
    setIsAuthenticated(false);
    setRoles([]);
    window.location.href = "/login"; // o usa useNavigate
  };

  return { isAuthenticated, roles, logout };
};
