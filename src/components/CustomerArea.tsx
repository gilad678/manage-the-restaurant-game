import React from 'react';
import { Customer } from '../types/game';
import { CustomerCard } from './CustomerCard';
import { Translations } from '../types/language';

interface CustomerAreaProps {
  customers: Customer[];
  onServeCustomer: (customerId: string, menuItemId: string) => void;
  readyItems: string[];
  t: Translations;
  isRTL: boolean;
}

export const CustomerArea: React.FC<CustomerAreaProps> = ({ 
  customers, 
  onServeCustomer, 
  readyItems,
  t,
  isRTL
}) => {
  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{t.customerArea}</h2>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {customers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">😴</div>
            <p>{t.noCustomers}</p>
          </div>
        ) : (
          customers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onServe={onServeCustomer}
              canServe={(() => {
                const nextUnservedItem = customer.orders.find(order => 
                  !customer.servedItems.includes(order.id)
                );
                return nextUnservedItem ? readyItems.includes(nextUnservedItem.id) : false;
              })()}
              t={t}
              isRTL={isRTL}
            />
          ))
        )}
      </div>
    </div>
  );
};