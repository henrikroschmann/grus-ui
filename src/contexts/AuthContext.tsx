import React, { createContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
