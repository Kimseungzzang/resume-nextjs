import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

export type Lang = 'ko' | 'en';

const STORAGE_KEY = 'resume-lang';
const DEFAULT_LANG: Lang = 'ko';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  toggleLang: () => undefined,
});

export function LanguageProvider({ children }: PropsWithChildren<{}>) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ko' || stored === 'en') {
      setLang(stored);
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === 'ko' ? 'en' : 'ko';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
