"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { en, es } from "../utilities/keysTranslator";

const Language = createContext();

export const LanguageProvider = ({ children }) => {
  const [lan, setLan] = useState("en");
  const [key, setKey] = useState(en);

  const setLanguage = (language) => {
    setLan(language);
    if (language === "es") {
      setKey(es);
    } else if (language === "en") {
      setKey(en);
    }
  };

  useEffect(() => {}, [lan, key]);

  return (
    <Language.Provider value={{ lan, setLanguage, setLan, key }}>
      {children}
    </Language.Provider>
  );
};

export const useLanguage = () => useContext(Language);
