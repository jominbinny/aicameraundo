// Language context — Malayalam-first i18n with English fallback.
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import translations from "@/i18n/translations.json";

const STORAGE_KEY = "aicu-lang";
const LanguageContext = createContext(/** @type {any} */ (null));

function getInitialLang() {
  if (typeof window === "undefined") return "ml";
  return window.localStorage.getItem(STORAGE_KEY) || "ml";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  const setLanguage = useCallback((next) => {
    setLang(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === "ml" ? "en" : "ml");
  }, [lang, setLanguage]);

  const t = useCallback(
    (key, vars) => {
      const dict = translations[lang] || translations.ml;
      let value = dict[key] ?? translations.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, v);
        });
      }
      return value;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t }),
    [lang, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
