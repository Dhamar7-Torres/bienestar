import React from 'react';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizes[size]}`}>
      </div>
    </div>
  );
};

export const LoadingPage = ({ message = 'Cargando...' }) => (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <LoadingSpinner size="lg" />
    <p className="mt-4 text-gray-600">{message}</p>
  </div>
);