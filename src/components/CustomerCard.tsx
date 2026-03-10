import React from 'react';
import { Customer } from '../types/game';
import { Clock } from 'lucide-react';
import { Translations } from '../types/language';

interface CustomerCardProps {
  customer: Customer;
  onServe: (customerId: string, menuItemId: string) => void;
  canServe: boolean;
  t: Translations;
  isRTL: boolean;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ 
  customer, 
  onServe, 
  canServe,
  t,
  isRTL
}) => {
  const timePercentage = (customer.timeLeft / 20) * 100;
  
  const getTimerColor = () => {
    if (timePercentage > 60) return 'bg-green-500';
    if (timePercentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleServe = () => {
    if (canServe) {
      // Find the first unserved item that we can serve
      const unservedOrder = customer.orders.find(order => 
        !customer.servedItems.includes(order.id)
      );
      if (unservedOrder) {
        onServe(customer.id, unservedOrder.id);
      }
    }
  };

  const getOrderName = (orderId: string): string => {
    switch(orderId) {
      case 'hamburger': return t.hamburger;
      case 'chips': return t.chips;
      case 'sausage': return t.sausage;
      case 'juice': return t.juice;
      default: return orderId;
    }
  };

  const getNextUnservedItem = () => {
    return customer.orders.find(order => 
      !customer.servedItems.includes(order.id)
    );
  };

  const nextItem = getNextUnservedItem();
  const completedItems = customer.servedItems.length;
  const totalItems = customer.orders.length;
  const isOrderComplete = completedItems === totalItems;

  return (
    <div className={`bg-white rounded-xl p-4 shadow-md border-2 ${
      customer.isAngry ? 'border-red-500 bg-red-50' : 'border-gray-200'
    } transform hover:scale-105 transition-all duration-200`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">
            {isOrderComplete ? '✅' : customer.isAngry ? '😡' : '😊'}
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">
              {completedItems}/{totalItems} {isRTL ? 'הושלמו' : 'completed'}
            </div>
            <div className="flex flex-wrap gap-1">
              {customer.orders.map((order, index) => (
                <div 
                  key={`${order.id}-${index}`}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm ${
                    customer.servedItems.includes(order.id)
                      ? 'bg-green-100 text-green-800 line-through'
                      : nextItem?.id === order.id
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <span>{order.emoji}</span>
                  <span className="font-medium">{getOrderName(order.id)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-mono text-sm">{customer.timeLeft}{t.seconds}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>
      
      <button
        onClick={handleServe}
        disabled={!canServe || isOrderComplete}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isOrderComplete
            ? 'bg-green-500 text-white cursor-default'
          : canServe 
            ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isOrderComplete 
          ? '✅ ' + (isRTL ? 'הושלם' : 'Complete')
          : canServe 
          ? `${t.serve} ${nextItem ? nextItem.emoji : ''}`
          : t.notReady
        }
      </button>
    </div>
  );
};