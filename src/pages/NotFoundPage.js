// src/pages/PageNotFound.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/');
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      {/* Error Icon */}
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        borderRadius: '50%',
        backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
        border: `2px solid ${darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'}`
      }}>
        <AlertTriangle 
          size={48} 
          style={{ 
            color: darkMode ? '#ef4444' : '#dc2626' 
          }} 
        />
      </div>

      {/* Error Message */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: darkMode ? '#ffffff' : '#111827'
      }}>
        Sorry, this page does not exist
      </h1>

      <p style={{
        fontSize: '1.125rem',
        marginBottom: '2rem',
        color: darkMode ? '#9ca3af' : '#6b7280',
        maxWidth: '32rem'
      }}>
        The page you're looking for might have been moved, deleted, or you entered the wrong URL.
      </p>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleGoBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            border: `1px solid ${darkMode ? '#374151' : '#d1d5db'}`,
            borderRadius: '0.5rem',
            color: darkMode ? '#ffffff' : '#374151',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode ? '#1f2937' : '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        <button
          onClick={handleGoHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: darkMode ? '#3b82f6' : '#2563eb',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode ? '#2563eb' : '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = darkMode ? '#3b82f6' : '#2563eb';
          }}
        >
          <Home size={16} />
          Go to Homepage
        </button>
      </div>

      {/* Additional Help */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.5)',
        borderRadius: '0.75rem',
        maxWidth: '32rem'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: darkMode ? '#ffffff' : '#111827'
        }}>
          Need help?
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: darkMode ? '#9ca3af' : '#6b7280',
          lineHeight: '1.5'
        }}>
          If you believe this is an error, please check the URL or contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;