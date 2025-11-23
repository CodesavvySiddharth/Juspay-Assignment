// src/components/layout/LayoutWrapper.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const AppLayoutWrapper = ({ children, title, subtitle }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div style={{
      padding: '1.5rem',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: '2rem' }}>
          {title && (
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: subtitle ? '0.5rem' : '0',
              color: darkMode ? '#ffffff' : '#111827'
            }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p style={{
              fontSize: '1rem',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div style={{
        backgroundColor: darkMode ? '#111827' : '#ffffff',
        borderRadius: '0.75rem',
        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
        minHeight: '400px',
        padding: '1.5rem'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AppLayoutWrapper;