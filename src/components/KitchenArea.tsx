import React from 'react';
import { MenuItem } from '../types/game';
import { CookingStation } from './CookingStation';
import { InventoryComputer } from './InventoryComputer';
import { Translations } from '../types/language';

interface KitchenAreaProps {
  menuItems: MenuItem[];
  inventory: Record<string, number>;
  cookingItems: Record<string, number>;
  readyItems: string[];
  money: number;
  onStartCooking: (menuItemId: string) => void;
  onCollectItem: (menuItemId: string) => void;
  onBuyInventory: (menuItemId: string) => void;
  showInventory: boolean;
  onToggleInventory: () => void;
  t: Translations;
  isRTL: boolean;
}

export const KitchenArea: React.FC<KitchenAreaProps> = ({
  menuItems,
  inventory,
  cookingItems,
  readyItems,
  money,
  onStartCooking,
  onCollectItem,
  onBuyInventory,
  showInventory,
  onToggleInventory,
  t,
  isRTL
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t.kitchen}</h2>
        <button
          onClick={onToggleInventory}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
        >
          {t.inventoryComputer}
        </button>
      </div>
      
      {showInventory && (
        <InventoryComputer
          menuItems={menuItems}
          inventory={inventory}
          money={money}
          onBuyInventory={onBuyInventory}
          onClose={onToggleInventory}
          t={t}
          isRTL={isRTL}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map(menuItem => (
          <CookingStation
            key={menuItem.id}
            menuItem={menuItem}
            inventory={inventory[menuItem.id] || 0}
            cookingTime={cookingItems[menuItem.id] || 0}
            isReady={readyItems.includes(menuItem.id)}
            onStartCooking={onStartCooking}
            onCollectItem={onCollectItem}
            t={t}
            isRTL={isRTL}
          />
        ))}
      </div>
    </div>
  );
};