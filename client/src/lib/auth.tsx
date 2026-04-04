import { createContext, useContext, useEffect, useState } from "react";
import { ClientAuthResponse, ClientAuthUser, DetailResponse, fetchJson, postJson } from "@/lib/api";

const TOKEN_KEY = "mitranesia_client_token";

type AuthContextValue = {
  token: string | null;
  user: ClientAuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { full_name: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadMe(token: string) {
  const response = await fetchJson<DetailResponse<ClientAuthUser>>("/api/client/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<ClientAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await loadMe(token);
        setUser(me);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, [token]);

  async function handleAuthResponse(response: ClientAuthResponse) {
    localStorage.setItem(TOKEN_KEY, response.access_token);
    setToken(response.access_token);
    setUser(response.user);
  }

  async function login(email: string, password: string) {
    const response = await postJson<ClientAuthResponse>("/api/client/auth/login", { email, password });
    await handleAuthResponse(response);
  }

  async function register(payload: { full_name: string; email: string; phone: string; password: string }) {
    const response = await postJson<ClientAuthResponse>("/api/client/auth/register", payload);
    await handleAuthResponse(response);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
