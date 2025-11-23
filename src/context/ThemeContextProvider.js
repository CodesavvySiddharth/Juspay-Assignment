// src/context/ThemeContextProvider.js - Optimized for faster transitions
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

const ThemeContextProvider = ({ children }) => {
  // Initialize theme from localStorage immediately, with fallback to system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Check system preference if no saved theme
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default to light mode for SSR
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Load theme preference from localStorage on mount (for SSR compatibility)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setDarkMode(isDark);
    } else {
      // Check system preference and save it
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Save theme preference to localStorage and apply theme with animation
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Create animated theme transition
    const animateThemeTransition = (isDarkMode) => {
      // Create overlay element for animation
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${isDarkMode ? '#000000' : '#fafafa'};
        z-index: 9999;
        pointer-events: none;
        transform-origin: ${isDarkMode ? 'top' : 'bottom'};
        transform: scaleY(0);
        transition: transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
      
      document.body.appendChild(overlay);
      
      // Force reflow to ensure animation starts
      void overlay.offsetHeight;
      
      // Start animation with slight delay for smoother feel
      requestAnimationFrame(() => {
        setTimeout(() => {
          overlay.style.transform = 'scaleY(1)';
        }, 50);
      });
      
      // Apply theme classes and body color at the midpoint of animation
      setTimeout(() => {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#000000';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.style.backgroundColor = '#fafafa';
        }
      }, 1250); // Midpoint of 2.5s animation
      
      // Remove overlay after animation completes
      setTimeout(() => {
        overlay.style.transform = `scaleY(0)`;
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 2500);
      }, 300); // Small delay before starting exit animation
    };
    
    // Use animation for theme changes, but not on initial load
    if (typeof window !== 'undefined' && window.__themeInitialized) {
      animateThemeTransition(darkMode);
    } else {
      // Initial load - apply theme immediately without animation
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#000000';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.backgroundColor = '#fafafa';
      }
      // Mark as initialized for future changes
      if (typeof window !== 'undefined') {
        window.__themeInitialized = true;
      }
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Create MUI theme based on darkMode (dark = black) - Optimized transitions
  const muiTheme = useMemo(() => {
    const isDark = darkMode === true;

    return createTheme({
      // Add fast transition configuration globally
      transitions: {
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 150, // Reduced from default 300ms
          complex: 200,  // Reduced from default 375ms
          enteringScreen: 200, // Reduced from default 225ms
          leavingScreen: 150,  // Reduced from default 195ms
        },
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
          easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
      },
      
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: isDark ? '#90caf9' : '#1976d2',
        },
        secondary: {
          main: isDark ? '#ce93d8' : '#dc004e',
        },
        background: {
          // full black page background
          default: isDark ? '#000000' : '#fafafa',
          // slightly off-black for cards / surfaces so elements have a subtle separation
          paper: isDark ? '#0a0a0a' : '#ffffff',
        },
        text: {
          primary: isDark ? '#FFFFFF' : '#111827',
          secondary: isDark ? '#cfcfcf' : '#6b7280',
        },
        divider: isDark ? 'rgba(255,255,255,0.06)' : '#e0e0e0',
      },

      // component overrides with optimized transitions
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: isDark ? '#000000' : '#fafafa',
              // Add smooth transition for body background
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
            // Optimize all elements transition
            '*': {
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) !important',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            paper: {
              backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
              boxShadow: isDark ? '0 6px 24px rgba(0,0,0,0.6)' : undefined,
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDark ? '#111111' : undefined,
              color: isDark ? '#FFFFFF' : undefined,
              boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.6)' : undefined,
              fontSize: '0.75rem',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
            arrow: {
              color: isDark ? '#111111' : undefined,
              transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
          defaultProps: {
            PopperProps: {
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: false,
                  },
                },
              ],
            },
          },
        },
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        // Optimize button transitions
        MuiButton: {
          styleOverrides: {
            root: {
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
      },

      // global z-index guidance (optional — you can tune to your layout)
      zIndex: {
        appBar: 1300,
        drawer: 1200,
        modal: 1400,
        tooltip: 2000, // ensure tooltips are above sidebars
      },
    });
  }, [darkMode]);

  const value = {
    darkMode,
    isDarkMode: darkMode, // backward compatibility
    toggleTheme,
    muiTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;