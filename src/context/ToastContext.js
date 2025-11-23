import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'warning', 'info'
    duration: 6000
  });

  const showToast = (message, severity = 'success', duration = 6000) => {
    setToast({
      open: true,
      message,
      severity,
      duration
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(prev => ({ ...prev, open: false }));
  };

  const showSuccessToast = (message, duration = 6000) => {
    showToast(message, 'success', duration);
  };

  const showErrorToast = (message, duration = 6000) => {
    showToast(message, 'error', duration);
  };

  const showWarningToast = (message, duration = 6000) => {
    showToast(message, 'warning', duration);
  };

  const showInfoToast = (message, duration = 6000) => {
    showToast(message, 'info', duration);
  };

  const showRefreshToast = () => {
    showSuccessToast('Dashboard refreshed successfully!', 3000);
  };

  // New favorite toast methods
  const showFavoriteAddedToast = () => {
    showSuccessToast('Successfully added to favorites!', 3000);
  };

  const showFavoriteRemovedToast = () => {
    showInfoToast('Removed from favorites!', 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
        showRefreshToast,
        showFavoriteAddedToast,
        showFavoriteRemovedToast
      }}
    >
      {children}
      
      {/* MUI Snackbar Component - Top Center Position */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={toast.duration} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: '8px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
