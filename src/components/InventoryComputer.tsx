import React from 'react';
import { MenuItem } from '../types/game';
import { X, ShoppingCart } from 'lucide-react';
import { Translations } from '../types/language';

interface InventoryComputerProps {
  menuItems: MenuItem[];
  inventory: Record<string, number>;
  money: number;
  onBuyInventory: (menuItemId: string) => void;
  onClose: () => void;
  t: Translations;
  isRTL: boolean;
}

export const InventoryComputer: React.FC<InventoryComputerProps> = ({
  menuItems,
  inventory,
  money,
  onBuyInventory,
  onClose,
  t,
  isRTL
}) => {
  const getMenuItemName = (menuItemId: string) => {
    switch(menuItemId) {
      case 'hamburger': return t.hamburger;
      case 'chips': return t.chips;
      case 'sausage': return t.sausage;
      case 'juice': return t.juice;
      default: return menuItemId;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{t.inventoryTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold">{t.youHave} {money} {isRTL ? '₪' : '$'}</p>
        </div>
        
        <div className="space-y-3">
          {menuItems.map(menuItem => {
            const canBuy = money >= menuItem.buyCost;
            const currentInventory = inventory[menuItem.id] || 0;
            
            return (
              <div key={menuItem.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{menuItem.emoji}</span>
                    <div>
                      <p className="font-semibold">{getMenuItemName(menuItem.id)}</p>
                      <p className="text-sm text-gray-600">{t.inStock} {currentInventory}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">{menuItem.buyCost} {isRTL ? '₪' : '$'}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onBuyInventory(menuItem.id)}
                  disabled={!canBuy}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    canBuy
                      ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canBuy ? (
                    <div className="flex items-center justify-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span>{t.buy}</span>
                    </div>
                  ) : (
                    t.notEnoughMoney
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};