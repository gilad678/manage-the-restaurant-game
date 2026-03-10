import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { Translations } from '../types/language';

interface StartScreenProps {
  onStartGame: (restaurantName: string) => void;
  t: Translations;
  isRTL: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, t, isRTL }) => {
  const [restaurantName, setRestaurantName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurantName.trim()) {
      onStartGame(restaurantName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-8">
          <ChefHat className="w-20 h-20 mx-auto text-orange-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.gameTitle}</h1>
          <p className="text-gray-600">{t.gameSubtitle}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="restaurantName" className="block text-lg font-semibold text-gray-700 mb-3" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.restaurantNameLabel}
            </label>
            <input
              type="text"
              id="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 text-center"
              placeholder={t.restaurantNamePlaceholder}
              maxLength={30}
            />
          </div>
          
          <button
            type="submit"
            disabled={!restaurantName.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
          >
            {t.startButton}
          </button>
        </form>
      </div>
    </div>
  );
};