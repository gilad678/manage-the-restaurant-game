import React from 'react';
import { DollarSign, Heart, Package } from 'lucide-react';
import { Translations } from '../types/language';

interface StatusBarProps {
  money: number;
  satisfaction: number;
  inventory: Record<string, number>;
  restaurantName: string;
  currentLevel: number;
  customersServedInLevel: number;
  customersNeededForNextLevel: number;
  t: Translations;
  isRTL: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  money, 
  satisfaction, 
  inventory, 
  restaurantName,
  currentLevel,
  customersServedInLevel,
  customersNeededForNextLevel,
  t,
  isRTL
}) => {
  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 80) return 'text-green-600';
    if (satisfaction >= 50) return 'text-yellow-600';
    if (satisfaction >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">🏪 {restaurantName}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="font-semibold">{t.money}</span>
            </div>
            <div className="text-2xl font-bold text-center">{money} {isRTL ? '₪' : '$'}</div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-6 h-6" />
              <span className="font-semibold">{t.satisfaction}</span>
            </div>
            <div className={`text-2xl font-bold text-center ${getSatisfactionColor(satisfaction)}`}>
              {satisfaction}%
            </div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Package className="w-6 h-6" />
              <span className="font-semibold">{t.inventory}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div>🍔 {inventory.hamburger || 0}</div>
              <div>🍟 {inventory.chips || 0}</div>
              <div>🌭 {inventory.sausage || 0}</div>
              <div>🧃 {inventory.juice || 0}</div>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-xl">🎯</span>
              <span className="font-semibold">{t.level}</span>
            </div>
            <div className="text-2xl font-bold text-center">{currentLevel}/10</div>
            <div className="text-xs text-center mt-1">
              {customersServedInLevel}/{customersNeededForNextLevel}
            </div>
          </div>
        </div>
      </div>
  );
};