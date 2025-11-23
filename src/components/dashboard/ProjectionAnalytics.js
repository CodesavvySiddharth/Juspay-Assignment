import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const ProjectionAnalytics = () => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yAxisValues = ['30M', '20M', '10M', '0'];
  const maxValue = 30;

  const chartData = [
    { month: 'Jan', projection: 25, actual: 18 },
    { month: 'Feb', projection: 21, actual: 16 },
    { month: 'Mar', projection: 28, actual: 24 },
    { month: 'Apr', projection: 20, actual: 10 },
    { month: 'May', projection: 18, actual: 15 },
    { month: 'Jun', projection: 20, actual: 22 }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const { offsetWidth } = chartRef.current;
        const height = Math.max(180, Math.min(280, offsetWidth * 0.4));
        setChartDimensions({ width: offsetWidth, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Animation effect for bars
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimationProgress(easeOutQuart);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation when component mounts
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300); // Small delay to ensure component is mounted
    
    return () => clearTimeout(timer);
  }, []);

  const isMobile = chartDimensions.width < 480;
  const isTablet = chartDimensions.width >= 480 && chartDimensions.width < 768;
  const chartHeight = Math.max(160, chartDimensions.height - 40);
  const barWidth = isMobile ? 'w-6' : isTablet ? 'w-7' : 'w-8';
  const barSpacing = isMobile ? 'space-x-2' : isTablet ? 'space-x-3' : 'space-x-4';

  // Helper function to get colors for complete and incomplete portions
  const getBarColors = () => {
    if (darkMode) {
      return {
        complete: 'var(--Secondary-Cyan, #A8C5DA)', // Completed portion - current cyan color
        incomplete: 'rgba(168, 197, 218, 0.3)' // Incomplete portion - lighter version (30% opacity)
      };
    } else {
      return {
        complete: 'var(--Secondary-Cyan, #A8C5DA)', // Completed portion - same cyan
        incomplete: 'rgba(0, 0, 0, 0.08)' // Incomplete portion - original light mode color
      };
    }
  };

  const barColors = getBarColors();

  return (
    <div className="h-full w-full flex flex-col" ref={chartRef} style={{ position: 'relative' }}>
      <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Projections vs Actuals
      </h3>
      <div
        className="flex w-full mt-auto"
        style={{
          height: `${Math.max(200, chartDimensions.height || 200)}px`,
          minHeight: '180px'
        }}
      >
        {/* Y-axis */}
        <div
          className={`flex flex-col justify-between items-end py-2 ${
            isMobile ? 'pr-2' : 'pr-3'
          }`}
          style={{
            height: `${chartHeight}px`,
            minWidth: isMobile ? '35px' : '45px'
          }}
        >
          {yAxisValues.map((value) => (
            <span
              key={value}
              className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Bars container */}
          <div
            className={`flex items-end justify-between ${barSpacing} border-l border-b relative overflow-visible`}
            style={{
              height: `${chartHeight}px`,
              borderLeft: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`,
              borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`
            }}
          >
            {/* Horizontal grid lines - Lower z-index so bars hide them */}
            {yAxisValues.map((value, index) => {
              const positionFromBottom = (chartHeight - 1) * (index / (yAxisValues.length - 1));
              return (
                <div
                  key={value}
                  className="absolute left-0 w-full"
                  style={{
                    bottom: `${positionFromBottom}px`,
                    opacity: 0.6,
                    borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                    zIndex: 1 // Lower z-index so bars appear above grid lines
                  }}
                />
              );
            })}

            {/* Bars - Higher z-index to appear above grid lines */}
            {chartData.map((data) => {
              const availableHeight = chartHeight - 20;
              const projectionHeight = Math.min((data.projection / maxValue) * availableHeight, availableHeight);
              const actualHeight = Math.min((data.actual / maxValue) * availableHeight, availableHeight);
              
              // Apply animation progress
              const animatedProjectionHeight = Math.max(projectionHeight - actualHeight, 0) * animationProgress;
              const animatedActualHeight = actualHeight * animationProgress;

              return (
                <div
                  key={data.month}
                  className="flex items-end h-full flex-1 min-w-0"
                  style={{ zIndex: 10, position: 'relative' }} // Higher z-index for bars
                >
                  <div className={`flex flex-col mx-auto ${barWidth} min-w-[16px] max-w-[40px]`}>
                    {/* Incomplete/Projection portion - Lighter color in dark mode */}
                    <div
                      className="w-full transition-colors"
                      style={{
                        height: `${animatedProjectionHeight}px`,
                        minHeight: animatedProjectionHeight > 0 ? '2px' : '0px',
                        background: barColors.incomplete,
                        borderRadius: animatedProjectionHeight > 0 ? '6px 6px 0 0' : '0',
                        position: 'relative',
                        zIndex: 2, // Ensure bar portion is above grid lines
                        transform: 'translateY(0)', // Start from bottom
                        transition: 'none' // Disable CSS transitions to use JS animation
                      }}
                    />
                    {/* Completed/Actual portion - Full cyan color */}
                    <div
                      className="w-full transition-colors"
                      style={{
                        height: `${animatedActualHeight}px`,
                        minHeight: animatedActualHeight > 0 ? '2px' : '0px',
                        background: barColors.complete,
                        borderRadius: projectionHeight - actualHeight <= 0 && actualHeight > 0 ? '6px 6px 0 0' : '0',
                        position: 'relative',
                        zIndex: 2, // Ensure bar portion is above grid lines
                        transform: 'translateY(0)', // Start from bottom
                        transition: 'none' // Disable CSS transitions to use JS animation
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className={`flex justify-between ${barSpacing} mt-2 px-1 overflow-hidden`}>
            {months.map((month) => (
              <span
                key={month}
                className={`${
                  isMobile ? 'text-xs' : 'text-xs sm:text-sm'
                } text-center flex-1 min-w-0 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {isMobile && month.length > 3 ? month.slice(0, 3) : month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionAnalytics;