import React, { createContext, useState } from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = [ThemeType, () => void];

export const ThemeContext = createContext<ThemeContextType>(["dark", () => {}]);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
