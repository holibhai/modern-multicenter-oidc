import React, { createContext, useContext } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const AuthContext = createContext();

export const AppAuthProvider = ({ children }) => {
  const asgardeoAuth = useAuthContext();

  return (
    <AuthContext.Provider value={asgardeoAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
