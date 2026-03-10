import React from 'react';
import { Settings, Pause, Play, RotateCcw, X } from 'lucide-react';
import { Translations } from '../types/language';

interface SettingsMenuProps {
  isOpen: boolean;
  isPaused: boolean;
  volume: number;
  onToggleSettings: () => void;
  onTogglePause: () => void;
  onRestart: () => void;
  onVolumeChange: (volume: number) => void;
  t: Translations;
  isRTL: boolean;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  isPaused,
  volume,
  onToggleSettings,
  onTogglePause,
  onRestart,
  onVolumeChange,
  t,
  isRTL
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(e.target.value));
  };

  const handleTogglePause = () => {
    onTogglePause();
    if (!isPaused) {
      onToggleSettings();
    }
  };

  return (
    <>
      <button
        onClick={onToggleSettings}
        className="fixed top-4 right-4 z-50 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label={t.settings}
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={onToggleSettings}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {t.settings}
            </h2>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={handleTogglePause}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5" />
                    {t.resume}
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    {t.pause}
                  </>
                )}
              </button>

              <button
                onClick={onRestart}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                {t.restart}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-gray-700">
                  {t.volume}
                </label>
                <span className="text-lg font-bold text-blue-600">
                  {volume}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
