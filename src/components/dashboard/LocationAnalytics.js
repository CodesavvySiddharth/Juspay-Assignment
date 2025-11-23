// RevenueByLocation.js - Image-only approach (no Nivo Geo)
import React, { useContext, useRef, useEffect, useState } from 'react';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';
import worldMapImage from '../../assets/images/world-map.png';

// Inter font style
const interFont = {
  fontFamily: 'Inter',
  fontWeight: 400
};

const LocationAnalytics = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = worldMapImage;
  }, []);

  const formatShort = (val) => {
    if (val == null) return '-';
    if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}K`;
    return `${val}`;
  };

  const maxRevenue = Math.max(...revenueByLocation.map((l) => l.amount), 1);

  const getDarkerBackground = () => {
    if (darkMode) {
      return 'rgba(255, 255, 255, 0.08)';
    } else {
      return 'rgba(0, 0, 0, 0.08)';
    }
  };

  // Render the world map image
  const renderMapContent = () => {
    if (imageLoaded) {
      return (
        <div 
          className="w-full h-full rounded-lg overflow-hidden"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
            border: darkMode ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src={worldMapImage} 
            alt="World Revenue Map"
            className="max-w-full max-h-full object-contain"
            style={{
              filter: darkMode ? 'brightness(0.85) contrast(1.1)' : 'brightness(1) contrast(1)',
              opacity: darkMode ? 0.9 : 1
            }}
            onError={() => setImageLoaded(false)}
          />
          
          {/* Optional subtle overlay for better visibility in dark mode */}
          {darkMode && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                mixBlendMode: 'overlay'
              }}
            />
          )}
        </div>
      );
    }

    // Fallback when image is not available
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: darkMode ? '#9CA3AF' : '#6B7280',
          fontSize: '13px',
          border: darkMode ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(0,0,0,0.02)',
        }}
      >
        Map not available
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex flex-col"
    >
      <h3
        style={{
          color: darkMode ? '#F9FAFB' : '#111827',
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'Semi Bold',
          fontSize: '16px',
          leadingTrim: 'NONE',
          lineHeight: '20px',
          letterSpacing: '0%',
        }}
      >
        Revenue by Location
      </h3>

      {/* Map area - matching Total Sales proportions */}
      <div className="flex justify-center mb-6 flex-1">
        <div style={{ width: '100%', maxWidth: isMobile ? '140px' : '180px', aspectRatio: '1', position: 'relative' }}>
          {renderMapContent()}
        </div>
      </div>

      {/* List section - matching Total Sales spacing */}
      <div className="space-y-3">
        {revenueByLocation.map((location) => {
          // amount is already a percentage out of 100
          const percentage = Math.max(0, Math.min(100, location.amount));
          const displayAmount = `${percentage}K`;

          return (
            <div key={location.city} className="space-y-2">
              <div className="flex items-center justify-between">
                <div 
                  className={`${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{ color: darkMode ? '#E5E7EB' : '#374151', ...interFont }}
                >
                  {location.city}
                </div>
                <div 
                  className={`${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{ color: darkMode ? '#F9FAFB' : '#111827', ...interFont }}
                >
                  {displayAmount}
                </div>
              </div>

              <div 
                className="w-full bg-gray-200 rounded-full overflow-hidden"
                style={{ height: '6px', background: getDarkerBackground() }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'var(--Secondary-Cyan, #A8C5DA)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default LocationAnalytics;