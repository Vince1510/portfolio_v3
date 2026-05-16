import React, { createContext, useContext, useState, ReactNode } from "react";

// Local Imports
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
  translate: (key: string, variables?: Record<string, string | number>) => any;
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

  const translate = (keyPath: string, variables?: Record<string, string | number>) => {
    const keys = keyPath.split(".");
    let result: any = translations[language];

    for (const key of keys) {
      if (result && typeof result === "object" && key in result) {
        result = result[key];
      } else {
        return keyPath; // Fallback to key if not found
      }
    }

    if (typeof result === "string" && variables) {
      Object.entries(variables).forEach(([key, value]) => {
        result = result.split(`{{${key}}}`).join(String(value));
      });
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
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
