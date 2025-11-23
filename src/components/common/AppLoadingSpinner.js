import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const AppLoadingSpinner = ({ size = 'md', message = 'Loading...', fullScreen = false }) => {
  const { darkMode } = useContext(ThemeContext);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinnerStyle = {
    borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    borderTopColor: darkMode ? '#90caf9' : '#1976d2',
  };

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{
          backgroundColor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`${sizeClasses[size]} border-4 border-solid rounded-full animate-spin`}
            style={spinnerStyle}
          />
          <p 
            className="text-sm font-medium"
            style={{ color: darkMode ? '#FFFFFF' : '#111827' }}
          >
            {message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-2">
        <div 
          className={`${sizeClasses[size]} border-4 border-solid rounded-full animate-spin`}
          style={spinnerStyle}
        />
        <p 
          className="text-xs text-gray-500"
          style={{ color: darkMode ? '#cfcfcf' : '#6b7280' }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default AppLoadingSpinner;