import { MenuItem } from '../types/game';

export const menuItems: MenuItem[] = [
  {
    id: 'hamburger',
    name: 'המבורגר',
    emoji: '🍔',
    cookTime: 5,
    buyCost: 8,
    sellPrice: 15
  },
  {
    id: 'chips',
    name: 'צ\'יפס',
    emoji: '🍟',
    cookTime: 3,
    buyCost: 5,
    sellPrice: 10
  },
  {
    id: 'sausage',
    name: 'נקניקיה בלחמניה',
    emoji: '🌭',
    cookTime: 4,
    buyCost: 7,
    sellPrice: 12
  },
  {
    id: 'juice',
    name: 'מיץ',
    emoji: '🧃',
    cookTime: 1,
    buyCost: 3,
    sellPrice: 6
  }
];

export const getMenuItem = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};