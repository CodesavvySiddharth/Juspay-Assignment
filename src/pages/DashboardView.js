import React, { useContext } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ProjectionAnalytics from '../components/dashboard/ProjectionAnalytics';
import RevenueAnalytics from '../components/dashboard/RevenueAnalytics';
import LocationAnalytics from '../components/dashboard/LocationAnalytics';
import ProductSalesTable from '../components/dashboard/ProductSalesTable';
import SalesAnalytics from '../components/dashboard/SalesAnalytics';
import { ThemeContext } from '../context/ThemeContextProvider';
import { useSearch } from '../context/SearchContext';
import { X } from 'lucide-react';

const DashboardView = ({ refreshKey = 0, isMobile = false, isTablet = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const { shouldShowCard, hasActiveSearch, searchQuery, clearSearch, updateSearch } = useSearch();

  const surfaceBg = darkMode ? '#000000' : '#ffffff';
  const cardBg = darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : 'var(--Primary-Light, #F7F9FB)';
  const statsCardBg = darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff';
  const borderColor = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.1)';
  const textColor = darkMode ? '#FFFFFF' : '#111827';

  // Check if any cards should be shown
  const hasVisibleCards = shouldShowCard('Customers') || shouldShowCard('Orders') || 
                         shouldShowCard('Revenue') || shouldShowCard('Growth') || 
                         shouldShowCard('Projections vs Actuals') || shouldShowCard('Revenue Chart') || 
                         shouldShowCard('Revenue by Location') || shouldShowCard('Top Selling Products') || 
                         shouldShowCard('Total Sales');

  return (
    <div 
      className="w-full max-w-none space-y-4 sm:space-y-6 lg:space-y-8" 
      key={refreshKey}
      style={{ backgroundColor: surfaceBg, minHeight: '100vh' }}
    >
      {/* Page Title with search indicator */}
      <div className="flex justify-between items-center">
        <h1
          className="text-lg sm:text-xl lg:text-2xl font-semibold"
          style={{ color: textColor }}
        >
          eCommerce
        </h1>
        {hasActiveSearch && (
          <div className="flex items-center space-x-2">
            <span 
              className="text-sm px-3 py-1 rounded-full flex items-center space-x-2"
              style={{ 
                color: darkMode ? '#90caf9' : '#1976d2',
                backgroundColor: darkMode ? 'rgba(144, 202, 249, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                border: `1px solid ${darkMode ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.2)'}`
              }}
            >
              <span>Searching: "{searchQuery}"</span>
              <button
                onClick={clearSearch}
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'inherit' }}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards and Projections Chart */}
      {(shouldShowCard('Customers') || shouldShowCard('Orders') || shouldShowCard('Revenue') || shouldShowCard('Growth') || shouldShowCard('Projections vs Actuals')) && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
          {/* Stats Cards */}
          {(shouldShowCard('Customers') || shouldShowCard('Orders') || shouldShowCard('Revenue') || shouldShowCard('Growth')) && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full order-1 min-h-[200px] sm:min-h-[252px]"
              style={{ 
                background: statsCardBg,
                border: 'none',
                boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full">
                <DashboardStats key={`stats-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

          {/* Projections Chart */}
          {shouldShowCard('Projections vs Actuals') && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full order-2 min-h-[200px] sm:min-h-[252px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full">
                <ProjectionAnalytics key={`projections-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revenue Chart and Revenue by Location */}
      {(shouldShowCard('Revenue Chart') || shouldShowCard('Revenue by Location') || shouldShowCard('Revenue')) && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
          {(shouldShowCard('Revenue Chart') || shouldShowCard('Revenue')) && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full min-w-0 order-1 min-h-[200px] sm:min-h-[318px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full min-w-[320px] overflow-x-auto">
                <RevenueAnalytics key={`revenue-chart-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

          {shouldShowCard('Revenue by Location') && (
            <div className="flex justify-center xl:justify-start order-2">
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 min-h-[200px] sm:min-h-[318px] w-full"
                style={{ 
                  background: cardBg, 
                  border: `1px solid ${borderColor}`,
                  boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                  opacity: hasActiveSearch ? 0.98 : 1
                }}
              >
                <div className="w-full h-full">
                  <LocationAnalytics key={`revenue-location-${refreshKey}`} isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Selling Products and Total Sales */}
      {(shouldShowCard('Top Selling Products') || shouldShowCard('Total Sales')) && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
          {shouldShowCard('Top Selling Products') && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full min-w-0 order-1 min-h-[200px] sm:min-h-[264px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="min-w-[300px] overflow-x-auto">
                <ProductSalesTable key={`top-products-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

      

          {shouldShowCard('Total Sales') && (
            <div className="flex justify-center xl:justify-start order-2">
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 min-h-[200px] sm:min-h-[318px] w-full"
                style={{ 
                  background: cardBg, 
                  border: `1px solid ${borderColor}`,
                  boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                  opacity: hasActiveSearch ? 0.98 : 1
                }}
              >
                <div className="w-full h-full">
                  <SalesAnalytics key={`total-sales-${refreshKey}`} isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results Message */}
      {hasActiveSearch && !hasVisibleCards && (
        <div 
          className="text-center py-16 rounded-xl"
          style={{ 
            backgroundColor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            border: `1px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
          }}
        >
          <div className="max-w-md mx-auto">
            <div 
              className="text-4xl mb-4"
              style={{ opacity: 0.5 }}
            >
              🔍
            </div>
            <div 
              className="text-xl font-medium mb-3"
              style={{ color: darkMode ? '#E5E7EB' : '#374151' }}
            >
              No cards found for "{searchQuery}"
            </div>
            <div 
              className="text-sm mb-6"
              style={{ color: darkMode ? '#9CA3AF' : '#6B7280' }}
            >
              Try searching for one of these terms:
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs mb-6">
              {['Revenue', 'Sales', 'Products', 'Customers', 'Orders', 'Growth', 'Projections', 'Location'].map(term => (
                <button 
                  key={term}
                  className="px-3 py-2 rounded-full cursor-pointer transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    color: darkMode ? '#E5E7EB' : '#374151',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`
                  }}
                  onClick={() => updateSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>
            <button
              onClick={clearSearch}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
                color: darkMode ? '#e5e7eb' : '#374151',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
              }}
            >
              Show all cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;