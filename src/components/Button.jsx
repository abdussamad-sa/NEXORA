import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const base = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles = {
    primary: 'bg-accent hover:bg-accent/90 text-white focus:ring-accent/40',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-400',
    outline: 'border border-accent text-accent hover:bg-accent/10',
  }[variant];
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
