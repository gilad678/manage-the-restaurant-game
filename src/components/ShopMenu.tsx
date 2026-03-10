import React from 'react';
import { Store, X } from 'lucide-react';
import { Translations } from '../types/language';

interface ShopMenuProps {
  isOpen: boolean;
  hasUpgrade: boolean;
  hasAutoCooking: boolean;
  hasFasterCooking: boolean;
  money: number;
  onToggleShop: () => void;
  onPurchaseUpgrade: () => void;
  onPurchaseAutoCooking: () => void;
  onPurchaseFasterCooking: () => void;
  t: Translations;
  isRTL: boolean;
}

export const ShopMenu: React.FC<ShopMenuProps> = ({
  isOpen,
  hasUpgrade,
  hasAutoCooking,
  hasFasterCooking,
  money,
  onToggleShop,
  onPurchaseUpgrade,
  onPurchaseAutoCooking,
  onPurchaseFasterCooking,
  t,
  isRTL
}) => {
  const UPGRADE_COST = 300;
  const AUTO_COOKING_COST = 600;
  const FASTER_COOKING_COST = 250;

  const canAffordUpgrade = money >= UPGRADE_COST;
  const canAffordAutoCooking = money >= AUTO_COOKING_COST;
  const canAffordFasterCooking = money >= FASTER_COOKING_COST;

  return (
    <>
      <button
        onClick={onToggleShop}
        className="fixed top-4 right-20 z-50 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label={t.shop}
      >
        <Store className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative">
            <button
              onClick={onToggleShop}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-3 mb-8">
              <Store className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-center text-gray-800">
                {t.shop}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t.randomProduct}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {t.shopUpgradeDescription}
                  </p>

                  <div className="flex justify-center gap-1 text-xl mb-4">
                    <span>🍔</span>
                    <span>🍟</span>
                    <span>🌭</span>
                    <span>🧃</span>
                  </div>

                  {hasUpgrade ? (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 w-full text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="font-bold text-green-700">
                          {t.shopUpgradePurchased}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={onPurchaseUpgrade}
                      disabled={!canAffordUpgrade}
                      className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                        canAffordUpgrade
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-105 shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {t.randomProductBuy}
                    </button>
                  )}

                  {!canAffordUpgrade && !hasUpgrade && (
                    <p className="text-red-600 text-xs font-semibold mt-2">
                      {t.notEnoughMoney}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">🍳</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t.autoCooking}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {t.autoCookingDescription}
                  </p>

                  {hasAutoCooking ? (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 w-full text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="font-bold text-green-700">
                          {t.shopUpgradePurchased}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={onPurchaseAutoCooking}
                      disabled={!canAffordAutoCooking}
                      className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                        canAffordAutoCooking
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {t.autoCookingBuy}
                    </button>
                  )}

                  {!canAffordAutoCooking && !hasAutoCooking && (
                    <p className="text-red-600 text-xs font-semibold mt-2">
                      {t.notEnoughMoney}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t.fasterCooking}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {t.fasterCookingDescription}
                  </p>

                  {hasFasterCooking ? (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 w-full text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="font-bold text-green-700">
                          {t.shopUpgradePurchased}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={onPurchaseFasterCooking}
                      disabled={!canAffordFasterCooking}
                      className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                        canAffordFasterCooking
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white hover:scale-105 shadow-lg'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {t.fasterCookingBuy}
                    </button>
                  )}

                  {!canAffordFasterCooking && !hasFasterCooking && (
                    <p className="text-red-600 text-xs font-semibold mt-2">
                      {t.notEnoughMoney}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
