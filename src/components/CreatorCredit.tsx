import React from 'react';
import { Translations } from '../types/language';

interface CreatorCreditProps {
  t: Translations;
}

export const CreatorCredit: React.FC<CreatorCreditProps> = ({ t }) => {
  return (
    <div 
      className="fixed top-2 left-2 z-50 bg-black/30 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm pointer-events-none select-none"
      style={{ 
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 9999
      }}
    >
      {t.creator}
    </div>
  );
};