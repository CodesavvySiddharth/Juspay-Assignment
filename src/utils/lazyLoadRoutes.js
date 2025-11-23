import { lazy } from 'react';

// Create lazy-loaded route components with better error handling
export const createLazyRoute = (importFn, chunkName) => {
  return lazy(() => 
    importFn()
      .then(module => ({
        default: module.default
      }))
      .catch(error => {
        console.error(`Failed to load chunk: ${chunkName}`, error);
        // Return a fallback component
        return {
          default: () => (
            <div className="p-8 text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">
                Failed to load page
              </h2>
              <p className="text-gray-600">
                Please refresh the page to try again.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Refresh Page
              </button>
            </div>
          )
        };
      })
  );
};

// Route definitions with progressive loading priorities
export const routes = {
  // High priority - Load immediately after initial render
  dashboard: createLazyRoute(
    () => import('../pages/DashboardView'),
    'dashboard'
  ),
  
  // Medium priority - Load after user interaction or delay
  orders: createLazyRoute(
    () => import('../pages/OrdersView'),
    'orders'  
  ),
  
  // Low priority - Load on demand
  pageNotFound: createLazyRoute(
    () => import('../pages/NotFoundPage'),
    'pageNotFound'
  ),
  
  // Layout components with staggered loading
  sidebar: createLazyRoute(
    () => import('../components/layout/AppSidebar'),
    'sidebar'
  ),
  
  rightSidebar: createLazyRoute(
    () => import('../components/layout/AppRightSidebar'),
    'rightSidebar'
  )
};

// Progressive loading manager
export class ProgressiveLoader {
  constructor() {
    this.loadQueue = [];
    this.loaded = new Set();
    this.loading = new Set();
  }

  // Add component to load queue with priority
  enqueue(componentName, priority = 'medium', delay = 0) {
    if (this.loaded.has(componentName) || this.loading.has(componentName)) {
      return;
    }

    this.loadQueue.push({ componentName, priority, delay, timestamp: Date.now() });
    this.loadQueue.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    this.processQueue();
  }

  // Process the loading queue
  async processQueue() {
    if (this.loadQueue.length === 0) return;

    const { componentName, delay } = this.loadQueue.shift();
    
    if (this.loading.has(componentName)) return;
    
    this.loading.add(componentName);

    try {
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      if (routes[componentName]) {
        // Preload the component
        await routes[componentName]._payload._result;
      }

      this.loaded.add(componentName);
      this.loading.delete(componentName);
      
      // Continue processing queue
      if (this.loadQueue.length > 0) {
        requestIdleCallback(() => this.processQueue());
      }
    } catch (error) {
      console.error(`Failed to preload component: ${componentName}`, error);
      this.loading.delete(componentName);
    }
  }

  // Check if component is loaded
  isLoaded(componentName) {
    return this.loaded.has(componentName);
  }

  // Preload critical components
  preloadCritical() {
    this.enqueue('dashboard', 'high', 0);
    this.enqueue('sidebar', 'high', 100);
    this.enqueue('rightSidebar', 'medium', 200);
  }

  // Preload on user interaction
  preloadOnHover(componentNames) {
    componentNames.forEach(name => {
      this.enqueue(name, 'medium', 0);
    });
  }
}

// Create singleton instance
export const progressiveLoader = new ProgressiveLoader();

// Preload strategy based on connection speed
export const getPreloadStrategy = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    const effectiveType = connection.effectiveType;

    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return {
          preloadDelay: 2000,
          batchSize: 1,
          enablePrefetch: false
        };
      case '3g':
        return {
          preloadDelay: 1000,
          batchSize: 2,
          enablePrefetch: true
        };
      case '4g':
      default:
        return {
          preloadDelay: 500,
          batchSize: 3,
          enablePrefetch: true
        };
    }
  }

  // Fallback for browsers without connection API
  return {
    preloadDelay: 1000,
    batchSize: 2,
    enablePrefetch: true
  };
};

// Enhanced skeleton components with better animations
export const SkeletonComponents = {
  Card: ({ width = '100%', height = '200px', className = '' }) => (
    <div 
      className={`skeleton rounded-lg ${className}`}
      style={{ width, height }}
    >
      <div className="animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent h-full rounded-lg"></div>
    </div>
  ),

  Text: ({ lines = 3, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className="skeleton h-4 rounded"
          style={{ 
            width: i === lines - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  ),

  Avatar: ({ size = '40px', className = '' }) => (
    <div 
      className={`skeleton rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  ),

  Button: ({ width = '100px', height = '40px', className = '' }) => (
    <div 
      className={`skeleton rounded-lg ${className}`}
      style={{ width, height }}
    />
  ),

  Chart: ({ height = '300px', className = '' }) => (
    <div className={`skeleton rounded-lg ${className}`} style={{ height }}>
      <div className="flex items-end justify-center h-full p-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i}
            className="skeleton-bar mx-1 rounded-t"
            style={{ 
              height: `${Math.random() * 80 + 20}%`,
              width: '20px'
            }}
          />
        ))}
      </div>
    </div>
  )
};