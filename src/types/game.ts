export interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  cookTime: number;
  buyCost: number;
  sellPrice: number;
}

export interface Customer {
  id: string;
  orders: MenuItem[];
  servedItems: string[];
  timeLeft: number;
  isAngry: boolean;
}

export interface GameState {
  restaurantName: string;
  money: number;
  satisfaction: number;
  inventory: Record<string, number>;
  customers: Customer[];
  cookingItems: Record<string, number>;
  gameStarted: boolean;
  gameOver: boolean;
  currentLevel: number;
  customersServedInLevel: number;
  customersNeededForNextLevel: number;
  hasShopUpgrade: boolean;
  hasAutoCooking: boolean;
}

export interface CookingItem {
  id: string;
  menuItem: MenuItem;
  timeLeft: number;
  isReady: boolean;
}