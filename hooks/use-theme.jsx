"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [resolvedTheme, setResolvedTheme] = useState("dark");

  useEffect(() => {
    // Force dark mode
    setTheme("dark");
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing theme classes and force dark mode
    root.classList.remove("light", "dark");
    root.classList.add("dark");
    setResolvedTheme("dark");
  }, [theme]);





  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

