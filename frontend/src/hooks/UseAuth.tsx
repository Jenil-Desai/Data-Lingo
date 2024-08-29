import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./UseLocalStorage";

const AuthContext = createContext({ user: null, login: (data: string) => Promise.resolve(), logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useLocalStorage({ keyName: "user", defaultValue: null });
  const navigate = useNavigate();

  const login = async (data: string) => {
    setUser(data);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
