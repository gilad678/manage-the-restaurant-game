import React, { useState, useEffect } from 'react';
import { LanguageSelection } from './components/LanguageSelection';
import { CreatorCredit } from './components/CreatorCredit';
import { StartScreen } from './components/StartScreen';
import { StatusBar } from './components/StatusBar';
import { CustomerArea } from './components/CustomerArea';
import { KitchenArea } from './components/KitchenArea';
import { GameOverScreen } from './components/GameOverScreen';
import { SettingsMenu } from './components/SettingsMenu';
import { ShopMenu } from './components/ShopMenu';
import { useGameState } from './hooks/useGameState';
import { useLanguage } from './hooks/useLanguage';
import { useAudio } from './hooks/useAudio';
import { menuItems } from './data/menuItems';

function App() {
  const { currentLanguage, t, isRTL, selectLanguage } = useLanguage();
  const {
    gameState,
    readyItems,
    showInventory,
    startGame,
    startCooking,
    collectItem,
    serveCustomer,
    buyInventory,
    purchaseShopUpgrade,
    purchaseAutoCooking,
    restartGame,
    toggleInventory
  } = useGameState(t);
  const { volume, play, pause, changeVolume } = useAudio();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      play();
    }
  }, [gameState.gameStarted, gameState.gameOver, play]);

  const handleToggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      pause();
    } else {
      play();
    }
  };

  const handleToggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  const handlePurchaseUpgrade = () => {
    purchaseShopUpgrade();
  };

  const handlePurchaseAutoCooking = () => {
    purchaseAutoCooking();
  };

  const handleRestart = () => {
    restartGame();
    setIsSettingsOpen(false);
    setIsShopOpen(false);
    setIsPaused(false);
    play();
  };

  if (!currentLanguage) {
    return <LanguageSelection onSelectLanguage={selectLanguage} />;
  }

  if (!gameState.gameStarted) {
    return (
      <>
        <CreatorCredit t={t} />
        <StartScreen onStartGame={startGame} t={t} isRTL={isRTL} />
      </>
    );
  }

  const isGameComplete = gameState.gameOver && gameState.currentLevel === 10;
  const gameOverReason = gameState.satisfaction <= 0
    ? t.satisfactionZero
    : t.noMoneyNoStock;

  return (
    <>
      <CreatorCredit t={t} />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <StatusBar
            money={gameState.money}
            satisfaction={gameState.satisfaction}
            inventory={gameState.inventory}
            restaurantName={gameState.restaurantName}
            currentLevel={gameState.currentLevel}
            customersServedInLevel={gameState.customersServedInLevel}
            customersNeededForNextLevel={gameState.customersNeededForNextLevel}
            t={t}
            isRTL={isRTL}
          />

          {!isPaused && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomerArea
                customers={gameState.customers}
                onServeCustomer={serveCustomer}
                readyItems={readyItems}
                t={t}
                isRTL={isRTL}
              />

              <KitchenArea
                menuItems={menuItems}
                inventory={gameState.inventory}
                cookingItems={gameState.cookingItems}
                readyItems={readyItems}
                money={gameState.money}
                onStartCooking={startCooking}
                onCollectItem={collectItem}
                onBuyInventory={buyInventory}
                showInventory={showInventory}
                onToggleInventory={toggleInventory}
                t={t}
                isRTL={isRTL}
              />
            </div>
          )}
        </div>

        <SettingsMenu
          isOpen={isSettingsOpen}
          isPaused={isPaused}
          volume={volume}
          onToggleSettings={handleToggleSettings}
          onTogglePause={handleTogglePause}
          onRestart={handleRestart}
          onVolumeChange={changeVolume}
          t={t}
          isRTL={isRTL}
        />

        <ShopMenu
          isOpen={isShopOpen}
          hasUpgrade={gameState.hasShopUpgrade}
          hasAutoCooking={gameState.hasAutoCooking}
          money={gameState.money}
          onToggleShop={handleToggleShop}
          onPurchaseUpgrade={handlePurchaseUpgrade}
          onPurchaseAutoCooking={handlePurchaseAutoCooking}
          t={t}
          isRTL={isRTL}
        />

        {gameState.gameOver && (
          <GameOverScreen
            reason={isGameComplete ? '' : gameOverReason}
            isGameComplete={isGameComplete}
            onRestart={handleRestart}
            t={t}
            isRTL={isRTL}
          />
        )}
      </div>
    </>
  );
}

export default App;