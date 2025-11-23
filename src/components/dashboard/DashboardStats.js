// src/components/dashboard/StatsCards.js
import React, { useContext, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const StatCard = ({ title, value, trend, change, isMobile }) => {
  const { darkMode } = useContext(ThemeContext);
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animation effect
  useEffect(() => {
    // Parse the target value (handle both numbers and currency)
    let targetValue;
    if (typeof value === 'string') {
      // Check if it's a percentage with decimal
      if (value.includes('%')) {
        // Extract the number part, preserving decimals
        const numberPart = value.replace(/[^0-9.-]/g, '');
        targetValue = parseFloat(numberPart);
      } else {
        // Regular currency or number
        targetValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      }
    } else {
      targetValue = value;
    }
    
    // If no valid number, just show the original value
    if (isNaN(targetValue)) {
      setAnimatedValue(value);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;
    const increment = targetValue / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const currentValue = increment * currentStep;
      
      if (currentStep >= steps) {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(currentValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  // Format the animated value for display
  const formatAnimatedValue = (val) => {
    if (typeof value === 'string' && value.includes('$')) {
      return `$${val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    } else if (typeof value === 'string' && value.includes('%')) {
      // For percentages, preserve decimal places
      return `${val.toFixed(1)}%`;
    } else if (typeof value === 'string' && value.includes(',')) {
      return val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return val.toFixed(0);
    }
  };

  // Determine card type
  const isCustomers = title === 'Customers';
  const isGrowth = title === 'Growth';
  const isOrders = title === 'Orders';
  const isRevenue = title === 'Revenue';

  // Backgrounds
  let background;
  if (isCustomers) {
    background = 'var(--Primary-Blue, #E3F5FF)';
  } else if (isGrowth) {
    background = 'var(--Primary-Purple, #E5ECF6)';
  } else if (isOrders || isRevenue) {
    background = darkMode
      ? 'var(--Primary-Light, #FFFFFF0D)'
      : 'var(--Primary-Light, #F7F9FB)';
  } else {
    background = darkMode
      ? 'var(--Primary-Light, #FFFFFF0D)'
      : '#ffffff';
  }

  // Text color logic
  let titleColor, valueColor;
  if (darkMode) {
    if (isCustomers || isGrowth) {
      titleColor = '#111827'; // black text on light special cards
      valueColor = '#111827';
    } else {
      titleColor = '#FFFFFF'; // white text on dark backgrounds
      valueColor = '#FFFFFF';
    }
  } else {
    titleColor = '#111827'; // black text in light mode
    valueColor = '#111827';
  }

  // Arrow/percentage color
  let arrowAndPercentColor;
  if (darkMode) {
    if (isCustomers || isGrowth) {
      arrowAndPercentColor = '#111827'; // black on light special cards
    } else {
      arrowAndPercentColor = '#FFFFFF'; // white on dark cards
    }
  } else {
    arrowAndPercentColor = '#111827'; // black in light mode
  }

  const cardStyle = {
    background,
    border: darkMode
      ? '1px solid rgba(255,255,255,0.04)'
      : '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    padding: 24,
    height: isMobile ? 100 : 112,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  };

  return (
    <div className="w-full shadow-sm transition-colors" style={cardStyle}>
      <div className="flex-shrink-0 mb-2">
        <p
          className="font-semibold truncate"
          style={{
            fontSize: isMobile ? 14 : 16,
            color: titleColor,
          }}
        >
          {title}
        </p>
      </div>

      <div className="flex-1 flex justify-end flex-col">
        <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
          <div className="flex-shrink-0">
            <h3
              className="font-bold leading-none"
              style={{
                fontSize: isMobile ? 20 : 24,
                whiteSpace: 'nowrap',
                color: valueColor,
              }}
            >
              {typeof animatedValue === 'number' ? formatAnimatedValue(animatedValue) : value}
            </h3>
          </div>

          {trend && change && (
            <div
              className="flex items-center gap-1 font-medium flex-shrink-0"
              style={{
                color: arrowAndPercentColor,
                fontSize: 12,
              }}
            >
              <span className="whitespace-nowrap">{change}</span>
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown
                  className="w-3 h-3"
                  style={{ transform: title === 'Orders' ? 'scaleX(-1)' : 'none' }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ isMobile = false }) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-4 h-full">
        <StatCard
          title="Customers"
          value="3,781"
          trend="up"
          change="+11.01%"
          isMobile={isMobile}
        />
        <StatCard
          title="Orders"
          value="1,209"
          trend="down"
          change="-0.03%"
          isMobile={isMobile}
        />
        <StatCard
          title="Revenue"
          value="$695"
          trend="up"
          change="+15.03%"
          isMobile={isMobile}
        />
        <StatCard
          title="Growth"
          value="30.1%"
          trend="up"
          change="+6.08%"
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
