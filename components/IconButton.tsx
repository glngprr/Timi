import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  ariaLabel: string;
}

export function IconButton({ children, variant = 'secondary', ariaLabel, className = '', ...props }: IconButtonProps) {
  const baseStyle = 'flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer select-none active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  // Design system specifies square 44x44
  const sizeStyle = 'w-11 h-11'; 
  
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
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
