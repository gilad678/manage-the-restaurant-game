import React from 'react';
import { AlertTriangle, RefreshCw, Trophy } from 'lucide-react';
import { Translations } from '../types/language';

interface GameOverScreenProps {
  reason: string;
  isGameComplete?: boolean;
  onRestart: () => void;
  t: Translations;
  isRTL: boolean;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ reason, isGameComplete = false, onRestart, t, isRTL }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="mb-6">
          {isGameComplete ? (
            <>
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-4xl font-bold text-green-600 mb-2">{t.congratulations}</h2>
              <p className="text-2xl text-gray-700 font-semibold">{t.gameCompleted}</p>
            </>
          ) : (
            <>
              <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-3xl font-bold text-red-600 mb-2">{t.gameOver}</h2>
              <p className="text-gray-600 text-lg">{reason}</p>
            </>
          )}
        </div>

        {!isGameComplete && (
          <div className="mb-6 p-4 rounded-xl bg-red-50">
            <p className="text-red-700 font-semibold">{t.gameRestarting}</p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 text-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>{isGameComplete ? t.playAgain : t.restart}</span>
          </div>
        </button>
      </div>
    </div>
  );
};