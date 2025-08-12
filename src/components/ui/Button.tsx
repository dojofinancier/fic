import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-[#10ac69] text-white hover:bg-[#0e9558] focus:ring-[#10ac69]': variant === 'primary',
          'bg-gray-100 text-[#3b3b3b] hover:bg-gray-200 focus:ring-gray-500': variant === 'secondary',
          'border-2 border-[#10ac69] text-[#10ac69] hover:bg-[#10ac69] hover:text-white focus:ring-[#10ac69]': variant === 'outline',
          'text-[#3b3b3b] hover:bg-gray-100 focus:ring-gray-500': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};