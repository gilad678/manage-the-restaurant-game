import React from 'react';
import { Globe } from 'lucide-react';
import { Language, translations } from '../types/language';

interface LanguageSelectionProps {
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelectLanguage }) => {
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'he', name: translations.he.hebrew, flag: '🇮🇱' },
    { code: 'en', name: translations.en.english, flag: '🇺🇸' },
    { code: 'ar', name: translations.ar.arabic, flag: '🇸🇦' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <Globe className="w-20 h-20 mx-auto text-indigo-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌍</h1>
          <p className="text-gray-600 text-lg">Select Language / בחר שפה / اختر اللغة</p>
        </div>
        
        <div className="space-y-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onSelectLanguage(language.code)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 text-lg flex items-center justify-center space-x-3"
              dir={language.code === 'ar' ? 'rtl' : 'ltr'}
            >
              <span className="text-2xl">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};