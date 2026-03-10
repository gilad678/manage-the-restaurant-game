import { useState } from 'react';
import { Language, translations } from '../types/language';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  const t = currentLanguage ? translations[currentLanguage] : translations.he;
  const isRTL = currentLanguage === 'he' || currentLanguage === 'ar';

  const selectLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return {
    currentLanguage,
    t,
    isRTL,
    selectLanguage,
  };
};