import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState(new Set());

  const updateSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredCards(new Set());
      return;
    }

    // Define all available card titles and their aliases
    const cardMappings = {
      'Customers': ['customers', 'customer', 'users', 'user'],
      'Orders': ['orders', 'order', 'purchases', 'purchase'],
      'Revenue': ['revenue', 'money', 'income', 'earnings'],
      'Growth': ['growth', 'grow', 'increase', 'percent'],
      'Projections vs Actuals': ['projections', 'projection', 'actual', 'actuals', 'vs', 'forecast', 'predict'],
      'Revenue Chart': ['revenue chart', 'chart', 'line chart', 'revenue line'],
      'Revenue by Location': ['revenue by location', 'location', 'geography', 'geo', 'map', 'regions', 'countries'],
      'Top Selling Products': ['top selling products', 'products', 'product', 'selling', 'top', 'items', 'merchandise'],
      'Total Sales': ['total sales', 'sales', 'sale', 'donut', 'pie chart', 'breakdown']
    };

    // Filter cards based on search query
    const filtered = Object.keys(cardMappings).filter(cardTitle => {
      const searchLower = query.toLowerCase();
      const titleMatch = cardTitle.toLowerCase().includes(searchLower);
      const aliasMatch = cardMappings[cardTitle].some(alias => 
        alias.toLowerCase().includes(searchLower) || 
        searchLower.includes(alias.toLowerCase())
      );
      return titleMatch || aliasMatch;
    });

    setFilteredCards(new Set(filtered));
  };

  const shouldShowCard = (cardTitle) => {
    if (!searchQuery.trim()) return true;
    return filteredCards.has(cardTitle);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCards(new Set());
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      updateSearch, 
      shouldShowCard,
      clearSearch,
      hasActiveSearch: searchQuery.trim().length > 0,
      filteredCards
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};