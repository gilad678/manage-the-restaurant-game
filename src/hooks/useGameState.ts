import { useState, useEffect, useCallback } from 'react';
import { GameState, Customer, MenuItem } from '../types/game';
import { menuItems, getMenuItem } from '../data/menuItems';
import { Translations } from '../types/language';

const INITIAL_MONEY = 100;
const INITIAL_SATISFACTION = 100;
const BASE_CUSTOMER_TIME_LIMIT = 20;
const SATISFACTION_PENALTY = 15;
const CUSTOMERS_PER_LEVEL = 10;
const SHOP_UPGRADE_COST = 550;
const AUTO_COOKING_COST = 600;

const initialInventory: Record<string, number> = {
  hamburger: 0,
  chips: 0,
  sausage: 0,
  juice: 0
};

export const useGameState = (t: Translations) => {
  const [gameState, setGameState] = useState<GameState>({
    restaurantName: '',
    money: INITIAL_MONEY,
    satisfaction: INITIAL_SATISFACTION,
    inventory: { ...initialInventory },
    customers: [],
    cookingItems: {},
    gameStarted: false,
    gameOver: false,
    currentLevel: 1,
    customersServedInLevel: 0,
    customersNeededForNextLevel: CUSTOMERS_PER_LEVEL,
    hasShopUpgrade: false,
    hasAutoCooking: false
  });

  const [readyItems, setReadyItems] = useState<string[]>([]);
  const [showInventory, setShowInventory] = useState(false);
  const [customerIdCounter, setCustomerIdCounter] = useState(1);

  // Level system functions
  const getMaxOrdersForLevel = (level: number): number => {
    if (level === 1) return 1;
    if (level === 2) return 2;
    return 3; // Levels 3-10
  };

  const getCustomerTimeForLevel = (level: number): number => {
    if (level <= 3) return BASE_CUSTOMER_TIME_LIMIT;
    // Level 4: 19s, Level 5: 18s, ..., Level 10: 13s
    return BASE_CUSTOMER_TIME_LIMIT - (level - 3);
  };

  // Customer spawning
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const spawnCustomer = () => {
      // Generate random number of orders (1-3 items)
      const maxOrders = getMaxOrdersForLevel(gameState.currentLevel);
      const numOrders = Math.floor(Math.random() * maxOrders) + 1;
      const orders: MenuItem[] = [];
      
      for (let i = 0; i < numOrders; i++) {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        orders.push(randomItem);
      }
      
      const newCustomer: Customer = {
        id: `customer-${customerIdCounter}`,
        orders: orders,
        servedItems: [],
        timeLeft: getCustomerTimeForLevel(gameState.currentLevel),
        isAngry: false
      };

      setGameState(prev => ({
        ...prev,
        customers: [...prev.customers, newCustomer]
      }));
      
      setCustomerIdCounter(prev => prev + 1);
    };

    // Don't spawn customers if game is over or at final level (10) and completed
    if (gameState.currentLevel <= 10) {
      const interval = setInterval(() => {
        if (gameState.customers.length < 3) {
          spawnCustomer();
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.customers.length, customerIdCounter, gameState.currentLevel]);

  // Customer timers
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const updatedCustomers = prev.customers.map(customer => {
          if (customer.timeLeft > 0) {
            const newTimeLeft = customer.timeLeft - 1;
            return {
              ...customer,
              timeLeft: newTimeLeft,
              isAngry: newTimeLeft <= 5
            };
          }
          return customer;
        });

        // Remove customers who ran out of time
        const remainingCustomers = updatedCustomers.filter(customer => customer.timeLeft > 0);
        const leftCustomers = updatedCustomers.filter(customer => customer.timeLeft <= 0);
        
        let newSatisfaction = prev.satisfaction;
        if (leftCustomers.length > 0) {
          newSatisfaction = Math.max(0, prev.satisfaction - (SATISFACTION_PENALTY * leftCustomers.length));
        }

        return {
          ...prev,
          customers: remainingCustomers,
          satisfaction: newSatisfaction
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.gameStarted, gameState.gameOver]);

  // Cooking timers
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        const updatedCookingItems = { ...prev.cookingItems };
        const newReadyItems = [...readyItems];

        Object.entries(updatedCookingItems).forEach(([itemId, timeLeft]) => {
          if (timeLeft > 0) {
            updatedCookingItems[itemId] = timeLeft - 1;
            if (timeLeft - 1 === 0) {
              newReadyItems.push(itemId);
              delete updatedCookingItems[itemId];
            }
          }
        });

        if (JSON.stringify(newReadyItems) !== JSON.stringify(readyItems)) {
          setReadyItems(newReadyItems);
        }

        return {
          ...prev,
          cookingItems: updatedCookingItems
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.gameStarted, gameState.gameOver, readyItems]);

  // Game over conditions
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const hasNoMoney = gameState.money <= 0;
    const hasNoInventory = Object.values(gameState.inventory).every(count => count === 0);
    const cannotBuyAnything = menuItems.every(item => gameState.money < item.buyCost);
    const satisfactionZero = gameState.satisfaction <= 0;

    if (satisfactionZero || (hasNoMoney && hasNoInventory && cannotBuyAnything)) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      
      setTimeout(() => {
        restartGame();
      }, 3000);
    }
  }, [gameState.money, gameState.inventory, gameState.satisfaction, gameState.gameStarted, gameState.gameOver, t]);

  const startGame = useCallback((restaurantName: string) => {
    setGameState(prev => ({
      ...prev,
      restaurantName,
      gameStarted: true
    }));
  }, []);

  const startCooking = useCallback((menuItemId: string) => {
    const menuItem = getMenuItem(menuItemId);
    if (!menuItem) return;

    setGameState(prev => {
      if (prev.inventory[menuItemId] <= 0 || prev.cookingItems[menuItemId] > 0) {
        return prev;
      }

      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          [menuItemId]: prev.inventory[menuItemId] - 1
        },
        cookingItems: {
          ...prev.cookingItems,
          [menuItemId]: menuItem.cookTime
        }
      };
    });
  }, []);

  const collectItem = useCallback((menuItemId: string) => {
    setReadyItems(prev => prev.filter(id => id !== menuItemId));
  }, []);

  const serveCustomer = useCallback((customerId: string, menuItemId: string) => {
    const customer = gameState.customers.find(c => c.id === customerId);
    const menuItem = getMenuItem(menuItemId);

    if (!customer || !menuItem || !readyItems.includes(menuItemId)) return;

    // Check if this item is needed by the customer
    const neededItem = customer.orders.find(order =>
      order.id === menuItemId && !customer.servedItems.includes(order.id)
    );

    if (neededItem) {
      const updatedServedItems = [...customer.servedItems, menuItemId];
      const isOrderComplete = customer.orders.every(order =>
        updatedServedItems.includes(order.id)
      );

      // If shop upgrade is purchased and order is complete, give random item
      let inventoryUpdate = {};
      if (isOrderComplete && gameState.hasShopUpgrade) {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        inventoryUpdate = {
          [randomItem.id]: (gameState.inventory[randomItem.id] || 0) + 1
        };
      }

      setGameState(prev => ({
        ...prev,
        customers: isOrderComplete
          ? prev.customers.filter(c => c.id !== customerId)
          : prev.customers.map(c =>
              c.id === customerId
                ? { ...c, servedItems: updatedServedItems, timeLeft: c.timeLeft + 3 }
                : c
            ),
        money: prev.money + menuItem.sellPrice,
        satisfaction: isOrderComplete
          ? Math.min(100, prev.satisfaction + (customer.isAngry ? 0 : 5))
          : prev.satisfaction,
        customersServedInLevel: isOrderComplete
          ? prev.customersServedInLevel + 1
          : prev.customersServedInLevel,
        inventory: {
          ...prev.inventory,
          ...inventoryUpdate
        }
      }));

      setReadyItems(prev => prev.filter(id => id !== menuItemId));
    }
  }, [gameState.customers, gameState.hasShopUpgrade, gameState.inventory, readyItems]);

  // Level progression
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    if (gameState.customersServedInLevel >= gameState.customersNeededForNextLevel) {
      if (gameState.currentLevel < 10) {
        // Advance to next level
        setGameState(prev => ({
          ...prev,
          currentLevel: prev.currentLevel + 1,
          customersServedInLevel: 0,
          customersNeededForNextLevel: CUSTOMERS_PER_LEVEL
        }));
      } else {
        // Game completed at level 10 - don't auto-restart
        setGameState(prev => ({ ...prev, gameOver: true }));
      }
    }
  }, [gameState.customersServedInLevel, gameState.customersNeededForNextLevel, gameState.currentLevel, gameState.gameStarted, gameState.gameOver]);

  const buyInventory = useCallback((menuItemId: string) => {
    const menuItem = getMenuItem(menuItemId);
    if (!menuItem || gameState.money < menuItem.buyCost) return;

    setGameState(prev => ({
      ...prev,
      money: prev.money - menuItem.buyCost,
      inventory: {
        ...prev.inventory,
        [menuItemId]: prev.inventory[menuItemId] + 1
      }
    }));
  }, [gameState.money]);

  const purchaseShopUpgrade = useCallback(() => {
    if (gameState.money >= SHOP_UPGRADE_COST && !gameState.hasShopUpgrade) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - SHOP_UPGRADE_COST,
        hasShopUpgrade: true
      }));
    }
  }, [gameState.money, gameState.hasShopUpgrade]);

  const purchaseAutoCooking = useCallback(() => {
    if (gameState.money >= AUTO_COOKING_COST && !gameState.hasAutoCooking) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - AUTO_COOKING_COST,
        hasAutoCooking: true
      }));
    }
  }, [gameState.money, gameState.hasAutoCooking]);

  // Auto-cooking effect - triggers when auto cooking is active
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || !gameState.hasAutoCooking) return;

    const itemIds = ['hamburger', 'chips', 'sausage', 'juice'];

    itemIds.forEach(itemId => {
      const hasInventory = gameState.inventory[itemId] > 0;
      const isAlreadyCooking = gameState.cookingItems[itemId] > 0;

      if (hasInventory && !isAlreadyCooking) {
        setGameState(prev => {
          const menuItem = getMenuItem(itemId);
          if (!menuItem || prev.inventory[itemId] <= 0) return prev;

          return {
            ...prev,
            inventory: {
              ...prev.inventory,
              [itemId]: prev.inventory[itemId] - 1
            },
            cookingItems: {
              ...prev.cookingItems,
              [itemId]: menuItem.cookTime
            }
          };
        });
      }
    });
  }, [gameState.hasAutoCooking, gameState.inventory, gameState.cookingItems, gameState.gameStarted, gameState.gameOver]);

  const restartGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      money: INITIAL_MONEY,
      satisfaction: INITIAL_SATISFACTION,
      inventory: { ...initialInventory },
      customers: [],
      cookingItems: {},
      gameOver: false,
      currentLevel: 1,
      customersServedInLevel: 0,
      customersNeededForNextLevel: CUSTOMERS_PER_LEVEL,
      hasShopUpgrade: false,
      hasAutoCooking: false
    }));
    setReadyItems([]);
    setShowInventory(false);
    setCustomerIdCounter(1);
  }, []);

  const toggleInventory = useCallback(() => {
    setShowInventory(prev => !prev);
  }, []);

  return {
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
  };
};