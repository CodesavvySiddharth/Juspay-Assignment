import React, { Suspense } from 'react';
import { useLazyLoading } from '../../hooks/useLazyLoading';
import AppLoadingSpinner from './AppLoadingSpinner';

const AppLazyComponent = ({ 
  children, 
  fallback, 
  height = '200px',
  delay = 0,
  className = '',
  loadingMessage = 'Loading component...'
}) => {
  const { elementRef, hasLoaded } = useLazyLoading({ delay, triggerOnce: true });

  return (
    <div 
      ref={elementRef} 
      className={`lazy-component ${className}`}
      style={{ minHeight: height }}
    >
      {hasLoaded ? (
        <Suspense fallback={fallback || <AppLoadingSpinner message={loadingMessage} />}>
          {children}
        </Suspense>
      ) : (
        <div 
          className="flex items-center justify-center"
          style={{ height }}
        >
          <div className="skeleton w-full h-full rounded-lg"></div>
        </div>
      )}
    </div>
  );
};

export default AppLazyComponent;