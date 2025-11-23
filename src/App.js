// src/App.js - Simplified but effective lazy loading implementation
import React, { useContext, useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Critical components - Load immediately (above the fold)
import AppHeader from './components/layout/AppHeader';
import AppErrorBoundary from './components/common/AppErrorBoundary';

// Context Providers - Load immediately
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContextProvider";
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';

// Lazy load components with better error handling
const AppSidebar = lazy(() => 
  import('./components/layout/AppSidebar').catch(() => ({
    default: () => <div className="w-64 h-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
  }))
);

const AppRightSidebar = lazy(() => 
  import('./components/layout/AppRightSidebar').catch(() => ({
    default: () => <div className="w-80 h-full bg-gray-100 dark:bg-gray-900 animate-pulse" />
  }))
);

const DashboardView = lazy(() => 
  import('./pages/DashboardView').catch(() => ({
    default: () => (
      <div className="p-6">
        <div className="text-center">
          <h2>Error loading dashboard</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    )
  }))
);

const OrdersView = lazy(() => 
  import('./pages/OrdersView').catch(() => ({
    default: () => (
      <div className="p-6">
        <div className="text-center">
          <h2>Error loading orders</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    )
  }))
);

const NotFoundPage = lazy(() => 
  import('./pages/NotFoundPage').catch(() => ({
    default: () => (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    )
  }))
);

// Loading Components
const LoadingSpinner = ({ message = 'Loading...' }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div 
          className="w-8 h-8 border-4 border-solid rounded-full animate-spin"
          style={{
            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderTopColor: darkMode ? '#90caf9' : '#1976d2',
          }}
        />
        <p 
          className="text-sm"
          style={{ color: darkMode ? '#FFFFFF' : '#111827' }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

const SidebarSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="w-64 h-full flex flex-col space-y-4 p-4"
      style={{
        backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
        borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : '#e0e0e0'}`,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo skeleton */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Navigation skeleton */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center space-x-3 p-2">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
      
      {/* User section skeleton */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="flex flex-col space-y-1">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RightSidebarSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="w-80 h-full flex flex-col space-y-4 p-4"
      style={{
        backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
        borderLeft: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : '#e0e0e0'}`,
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Header skeleton */}
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
      
      {/* Cards skeleton */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

const PageSkeleton = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
      
      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div 
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{
              backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
              transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Progressive loading hook
const useProgressiveLoading = () => {
  const [loadedComponents, setLoadedComponents] = useState({
    sidebar: false,
    rightSidebar: false,
    mainContent: false,
  });

  useEffect(() => {
    // Load components progressively with staggered timing
    const timer1 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, sidebar: true }));
    }, 100);

    const timer2 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, rightSidebar: true }));
    }, 200);

    const timer3 = setTimeout(() => {
      setLoadedComponents(prev => ({ ...prev, mainContent: true }));
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return loadedComponents;
};

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const loadedComponents = useProgressiveLoading();

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1280 : true);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < 1024) {
        setLeftSidebarVisible(false);
      }
      if (width < 1280) {
        setRightSidebarVisible(false);
      }

      if (width >= 1024 && width < 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(false);
      }
      if (width >= 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload components on user interaction
  useEffect(() => {
    // Preload components after initial render
    const preloadTimer = setTimeout(() => {
      import('./components/layout/AppSidebar');
      import('./components/layout/AppRightSidebar');
      import('./pages/DashboardView');
      import('./pages/OrdersView');
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, []);

  // Toggle functions
  const toggleLeftSidebar = () => setLeftSidebarVisible(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarVisible(prev => !prev);

  // Dashboard refresh
  const handleDashboardRefresh = useCallback(() => {
    setDashboardRefreshKey(prev => prev + 1);
  }, []);

  // Close sidebars when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (windowWidth < 1024) setLeftSidebarVisible(false);
    if (windowWidth < 1280) setRightSidebarVisible(false);
  };

  // App-level styles
  const appBg = darkMode ? '#000000' : '#ffffff';
  const textColor = darkMode ? '#FFFFFF' : '#111827';

  const fastTransitionStyle = {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div style={{ 
      background: appBg, 
      color: textColor, 
      minHeight: '100vh',
      ...fastTransitionStyle 
    }}>
      <div
        className="min-h-screen flex relative overflow-hidden"
        style={{
          background: appBg,
          color: textColor,
          transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Mobile/Tablet Overlay */}
        {((leftSidebarVisible && windowWidth < 1024) || (rightSidebarVisible && windowWidth < 1280)) && (
          <div
            onClick={handleOverlayClick}
            role="button"
            aria-label="Close overlays"
            tabIndex={0}
            className="fixed inset-0 z-30"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}

        {/* Left Sidebar with Progressive Loading */}
        <div
          className={`
            ${windowWidth < 1024 ? 'fixed' : 'relative'}
            inset-y-0 left-0 z-40
            transform 
            ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
            ${windowWidth >= 1024 ? (leftSidebarVisible ? 'block' : 'hidden') : ''}
          `}
          style={{
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <AppErrorBoundary fallback={<SidebarSkeleton />}>
            {loadedComponents.sidebar ? (
              <Suspense fallback={<SidebarSkeleton />}>
                <AppSidebar
                  isVisible={leftSidebarVisible}
                  isMobile={windowWidth < 1024}
                  onClose={() => setLeftSidebarVisible(false)}
                />
              </Suspense>
            ) : (
              <SidebarSkeleton />
            )}
          </AppErrorBoundary>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header loads immediately */}
          <AppHeader
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            onRefreshDashboard={handleDashboardRefresh}
            isMobile={windowWidth < 1024}
            isTablet={windowWidth < 1280}
          />

          <main 
            className="flex-1 overflow-x-hidden overflow-y-auto"
            style={fastTransitionStyle}
          >
            <div 
              className="p-3 sm:p-4 lg:p-6" 
              style={{ 
                background: 'transparent',
                ...fastTransitionStyle 
              }}
            >
              <AppErrorBoundary fallback={<PageSkeleton />}>
                {loadedComponents.mainContent ? (
                  <Suspense fallback={<PageSkeleton />}>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={() => (
                          <DashboardView
                            refreshKey={dashboardRefreshKey}
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        )}
                      />
                      
                      <Route
                        path="/overview"
                        render={() => (
                          <OrdersView
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        )}
                      />
                      
                      <Route
                        path="/projects"
                        render={() => (
                          <DashboardView
                            refreshKey={dashboardRefreshKey}
                            isMobile={windowWidth < 768}
                            isTablet={windowWidth < 1024}
                          />
                        )}
                      />

                      {/* Profile Routes */}
                      <Route path="/profile/overview" render={() => <NotFoundPage />} />
                      <Route path="/profile/projects" render={() => <NotFoundPage />} />
                      <Route path="/profile/campaigns" render={() => <NotFoundPage />} />
                      <Route path="/profile/documents" render={() => <NotFoundPage />} />
                      <Route path="/profile/followers" render={() => <NotFoundPage />} />
                      
                      <Route path="/recently" render={() => <NotFoundPage />} />
                      <Route render={() => <NotFoundPage />} />
                    </Switch>
                  </Suspense>
                ) : (
                  <PageSkeleton />
                )}
              </AppErrorBoundary>
            </div>
          </main>
        </div>

        {/* Right Sidebar with Progressive Loading */}
        <div
          className={`
            ${windowWidth < 1280 ? 'fixed' : 'relative'}
            inset-y-0 right-0 z-40
            transform
            ${rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'}
            ${windowWidth >= 1280 ? (rightSidebarVisible ? 'block' : 'hidden') : ''}
          `}
          style={{
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <AppErrorBoundary fallback={<RightSidebarSkeleton />}>
            {loadedComponents.rightSidebar ? (
              <Suspense fallback={<RightSidebarSkeleton />}>
                <AppRightSidebar
                  isVisible={rightSidebarVisible}
                  isMobile={windowWidth < 1024}
                  onClose={() => setRightSidebarVisible(false)}
                />
              </Suspense>
            ) : (
              <RightSidebarSkeleton />
            )}
          </AppErrorBoundary>
        </div>
      </div>
    </div>
  );
};

const MainApp = () => {
  useEffect(() => {
    // Performance optimization styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      :root {
        --theme-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), 
                           color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                           border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      * {
        transition: var(--theme-transition) !important;
      }
      
      /* Loading animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .fade-in {
        animation: fadeIn 300ms ease-out;
      }
      
      /* Performance optimizations */
      .transform {
        will-change: transform;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <SearchProvider>
      <ThemeContextProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </ThemeContextProvider>
    </SearchProvider>
  );
};

export default MainApp;