// src/components/common/ThemeToggle.js - Optimized for instant response
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContextProvider';

const AppThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  // Enhanced click handler with animation coordination
  const handleToggle = () => {
    // Add visual feedback during transition
    const button = document.querySelector('[data-theme-toggle="true"]');
    if (button) {
      button.style.transform = 'scale(0.8)';
      button.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      // Reset button scale after animation starts
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 500);
    }
    
    toggleTheme();
  };

  return (
    <Tooltip 
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      // Faster tooltip transitions
      enterDelay={300}
      leaveDelay={100}
      TransitionProps={{
        timeout: 150
      }}
    >
      <IconButton
        onClick={handleToggle}
        sx={{
          ml: 1,
          color: muiTheme.palette.text.primary,
          bgcolor: 'transparent',
          // Optimized hover transitions with ultra-smooth easing
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'action.hover',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
            transition: 'transform 100ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          // Add subtle animation to the icon with ultra-smooth timing
          '& .MuiSvgIcon-root': {
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
              transform: 'rotate(180deg)',
            },
          },
        }}
        aria-label="toggle-theme"
        data-theme-toggle="true"
        // Add immediate visual feedback
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = '';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
        }}
      >
        {darkMode ? (
          <LightMode 
            sx={{ 
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              color: '#FFF59D' // Slight yellow tint for light mode icon
            }} 
          />
        ) : (
          <DarkMode 
            sx={{ 
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              color: '#424242' // Darker tint for dark mode icon
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default AppThemeToggle;