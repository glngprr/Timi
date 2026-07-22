import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyle = 'flex items-center justify-center font-medium rounded-xl px-6 transition-all duration-150 cursor-pointer select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  // Height 48px matching design system (h-12)
  const heightStyle = 'h-12';
  
  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle = 'bg-primary hover:bg-primary-hover active:bg-primary-active text-white border-none shadow-light-sm dark:shadow-none';
  } else if (variant === 'secondary') {
    variantStyle = 'bg-transparent hover:bg-card-hover border border-border-default text-text-primary';
  } else if (variant === 'ghost') {
    variantStyle = 'bg-transparent hover:bg-card-hover border-none text-text-secondary hover:text-text-primary';
  }

  return (
    <button
      className={`${baseStyle} ${heightStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
