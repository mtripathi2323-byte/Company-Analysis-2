import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = true }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_8px_12px_-4px_rgba(0,0,0,0.07)]
        p-6 border border-slate-100
        ${hoverEffect ? 'transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
