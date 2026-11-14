import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg bg-card p-4 shadow-md ${className}`}>{children}</div>
);

export default Card;
