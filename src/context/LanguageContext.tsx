import React, { createContext, useContext, useState, ReactNode } from "react";
import nl from "../locales/nl.json";
import en from "../locales/en.json";

type Language = "nl" | "en";

interface Translations {
  [key: string]: any;
}

const translations: Record<Language, Translations> = {
  nl,
  en,
};

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language.toLowerCase().startsWith("nl") ? "nl" : "en";
  }
  return "en";
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "nl" ? "en" : "nl"));
  };

  const t = (keyPath: string) => {
    const keys = keyPath.split(".");
    let result = translations[language];

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return keyPath; // Fallback to key if not found
      }
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
