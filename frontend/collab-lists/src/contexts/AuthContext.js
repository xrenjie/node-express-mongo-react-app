import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  //check if user is already logged in on refresh
  useEffect(() => {
    const currentUser = window.localStorage.getItem("user");
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  //logout and clear local storage
  function logout() {
    setUser(null);
    window.localStorage.removeItem("user");
  }

  const value = {
    user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
