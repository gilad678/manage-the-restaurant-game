import React from 'react';
import { MenuItem } from '../types/game';
import { Timer, CheckCircle } from 'lucide-react';
import { Translations } from '../types/language';

interface CookingStationProps {
  menuItem: MenuItem;
  inventory: number;
  cookingTime: number;
  isReady: boolean;
  onStartCooking: (menuItemId: string) => void;
  onCollectItem: (menuItemId: string) => void;
  t: Translations;
  isRTL: boolean;
}

export const CookingStation: React.FC<CookingStationProps> = ({
  menuItem,
  inventory,
  cookingTime,
  isReady,
  onStartCooking,
  onCollectItem,
  t,
  isRTL
}) => {
  const canCook = inventory > 0 && cookingTime === 0 && !isReady;
  const isCooking = cookingTime > 0;
  
  const handleAction = () => {
    if (isReady) {
      onCollectItem(menuItem.id);
    } else if (canCook) {
      onStartCooking(menuItem.id);
    }
  };

  const getProgressPercentage = () => {
    if (cookingTime === 0) return 0;
    return ((menuItem.cookTime - cookingTime) / menuItem.cookTime) * 100;
  };

  const getMenuItemName = (menuItemId: string) => {
    switch(menuItemId) {
      case 'hamburger': return t.hamburger;
      case 'chips': return t.chips;
      case 'sausage': return t.sausage;
      case 'juice': return t.juice;
      default: return menuItem.name;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gray-200 hover:border-orange-300 transition-all duration-200" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center mb-3">
        <div className="text-4xl mb-2">{menuItem.emoji}</div>
        <h3 className="font-bold text-lg">{getMenuItemName(menuItem.id)}</h3>
        <p className="text-sm text-gray-600">{t.inStock} {inventory}</p>
      </div>
      
      {isCooking && (
        <div className="mb-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Timer className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold">{t.cooking} {cookingTime}{t.seconds}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}
      
      <button
        onClick={handleAction}
        disabled={!canCook && !isReady}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isReady
            ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
            : canCook
            ? 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isReady ? (
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{t.collect}</span>
          </div>
        ) : isCooking ? (
          t.cooking
        ) : canCook ? (
          t.cook
        ) : inventory === 0 ? (
          t.noStock
        ) : (
          t.busy
        )}
      </button>
    </div>
  );
};