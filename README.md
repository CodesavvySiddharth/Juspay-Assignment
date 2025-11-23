# 📊 Siddharth - Juspay Dashboard

![React](https://img.shields.io/badge/React-19.1+-blue.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-7.2+-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> A modern, responsive dashboard application built with React 19, Material-UI, and Tailwind CSS for visualizing payment analytics, revenue metrics, and business insights with animated data visualizations and comprehensive order management.

## 🌟 Live Demo

🚀 **[View Live Dashboard](https://CodesavvySiddharth.github.io/Juspay-Assignment-main/)**
 

![Dashboard Preview](./public/image.png) <!-- Add a screenshot of your dashboard here -->

## ✨ Key Features 

### 🎯 **Core Functionality**
- **Interactive Dashboard** - Modern interface with 6 animated analytics components
- **Order Management** - Comprehensive system with 100+ sample orders and advanced filtering
- **Animated Visualizations** - Smooth counting animations and bar chart animations
- **Advanced Search** - Real-time search across all dashboard components
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Theme Support** - Dark/Light mode with smooth transitions and persistent preferences

### 🎨 **Dashboard Components**
- **Stats Cards** - Animated counters (Customers, Orders, Revenue, Growth) with counting from 0
- **Projection Analytics** - Bar chart comparing projections vs actuals with bottom-up animations
- **Revenue Analytics** - Revenue trend visualization with interactive charts
- **Location Analytics** - Geographic revenue distribution by country
- **Product Sales Table** - Top selling products with sortable columns
- **Sales Analytics** - Pie chart showing sales distribution with hover tooltips

### 🔧 **Technical Features**
- **Performance Optimized** - Lazy loading, code splitting, and efficient animations
- **Modern React Patterns** - React 19 with Hooks, Context API, and functional components
- **Material-UI Integration** - Professional UI components with consistent theming
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Multiple Chart Libraries** - @mui/x-charts, @nivo, recharts, and chart.js integration
- **Mock Data System** - Comprehensive sample data for development and testing

### 📱 **User Experience**
- **Intuitive Navigation** - Easy-to-use interface with clear information hierarchy
- **Real-time Updates** - Live data updates without page refreshes
- **Interactive Maps** - Geographic data visualization with world countries
- **Error Handling** - Graceful error boundaries and 404 pages
- **Accessibility** - WCAG compliant design patterns

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React.js 19.1+, JavaScript ES6+ |
| **UI Framework** | Material-UI 7.2+, Tailwind CSS 3.4+ |
| **State Management** | React Context API, Custom Hooks |
| **Data Visualization** | @mui/x-charts, @nivo/*, recharts, chart.js, d3 |
| **Routing** | React Router DOM 5.3.4 |
| **Icons** | Lucide React, Material-UI Icons |
| **Build Tools** | Create React App, Webpack |
| **Package Manager** | npm |
| **Version Control** | Git, GitHub |

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 16.x or higher) - [Download here](https://nodejs.org/)
- **npm** (version 8.x or higher) - Comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodesavvySiddharth/Juspay-Assignment.git
   cd Juspay-Assignment-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
Siddharth - Juspay-Assignment-main/
├── 📁 public/                          # Static public assets
│   ├── index.html                      # Main HTML template
│   ├── logo.png                        # Application logo
│   ├── manifest.json                   # PWA manifest file
│   └── robots.txt                      # Search engine crawling rules

├── 📁 src/                             # Source code directory
│   ├── 📁 assets/                      # Static assets and resources
│   │   ├── images/                     # Image assets
│   │   └── icons/                      # Icon assets
│   │
│   ├── 📁 components/                  # Reusable UI components
│   │   ├── 📁 common/                  # Common components
│   │   │   ├── AppErrorBoundary.js    # Error boundary component
│   │   │   ├── LoadingSpinner.js      # Loading indicator
│   │   │   └── SearchBar.js           # Search functionality
│   │   ├── 📁 dashboard/               # Dashboard-specific components
│   │   │   ├── DashboardStats.js       # Animated statistics cards
│   │   │   ├── LocationAnalytics.js    # Geographic revenue visualization
│   │   │   ├── ProductSalesTable.js    # Top selling products table
│   │   │   ├── ProjectionAnalytics.js  # Projections vs actuals chart
│   │   │   ├── RevenueAnalytics.js     # Revenue trend chart
│   │   │   └── SalesAnalytics.js       # Sales distribution pie chart
│   │   ├── 📁 layout/                  # Layout components
│   │   │   ├── AppHeader.js            # Main header component
│   │   │   ├── AppRightSidebar.js      # Right sidebar component
│   │   │   └── AppSidebar.js           # Main sidebar component
│   │   └── 📁 orders/                  # Order management components
│   │       ├── OrderCard.js            # Order card component
│   │       └── OrderTable.js           # Orders table component
│   │
│   ├── 📁 context/                     # React Context providers
│   │   ├── SearchContext.js            # Global search state management
│   │   ├── ThemeContextProvider.js     # Theme switching (dark/light mode)
│   │   └── ToastContext.js             # Toast notification system
│   │
│   ├── 📁 data/                        # Data management and mock data
│   │   ├── mapData.js                  # Geographic mapping data
│   │   ├── mockData.js                 # Sample dashboard data
│   │   └── world_countries.json        # World countries geographic data
│   │
│   ├── 📁 pages/                       # Page components (Route components)
│   │   ├── DashboardView.js            # Main dashboard page
│   │   ├── NotFoundPage.js             # 404 error page
│   │   └── OrdersView.js               # Orders management page
│   │
│   ├── 📁 styles/                      # Styling files
│   │   └── index.css                   # Global styles and Tailwind imports
│   │
│   ├── 📁 utils/                       # Utility functions
│   │   ├── browserCompatibility.js     # Cross-browser compatibility utilities
│   │   └── toastUtils.js              # Toast notification helpers
│   │
│   ├── App.js                          # Main App component with routing and lazy loading
│   └── index.js                        # Application entry point

├── node_modules/                       # NPM dependencies (auto-generated)
├── .gitignore                          # Git ignore rules
├── package-lock.json                   # NPM lock file for consistent installs
├── package.json                        # NPM dependencies and scripts
├── README.md                           # Project documentation
└── tailwind.config.js                  # Tailwind CSS configuration
```

## 🎯 Core Components

### 📊 **Dashboard Features**
- **Animated Stats Cards** - Counting animations from 0 to target values (Customers: 3,781, Orders: 1,209, Revenue: $695, Growth: 30.1%)
- **Projection Analytics** - Bar chart with smooth bottom-up animations comparing projections vs actuals
- **Revenue Analytics** - Interactive revenue trend chart with Material-UI integration
- **Location Analytics** - Geographic revenue distribution with country-wise visualization
- **Product Sales Table** - Sortable table showing top selling products
- **Sales Analytics** - Interactive pie chart with hover tooltips showing sales distribution

### 🛒 **Order Management**
- **Comprehensive Order System** - 100+ sample orders with diverse data spanning multiple months
- **Advanced Search & Filter** - Real-time search across all order fields with status, date, and customer filtering
- **Order Details** - Complete order information including user details, project info, and addresses
- **Status Management** - Visual status indicators (Pending, In Progress, Complete, Approved, Rejected)
- **Pagination System** - Efficient handling of large datasets with customizable page sizes

### 🎨 **Theme System**
- **Dark/Light Mode** - Seamless theme switching with smooth transitions
- **Persistent Preferences** - Theme selection saved across sessions
- **Responsive Design** - Optimized layouts for mobile, tablet, and desktop
- **Material-UI Integration** - Professional components with consistent theming

## 📋 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload when you make changes, and you may see lint errors in the console.
   

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for best performance.\
The build is minified and filenames include hashes for caching.

### `npm run eject`
**Note: This is a one-way operation. Once you `eject`, you can't go back!**

If you need full control over the build configuration, you can `eject` the project. This copies all configuration files and dependencies into your project.

## 🔧 Configuration

### Tailwind CSS Setup
The project uses Tailwind CSS for styling. Configuration can be found in:
- `tailwind.config.js` - Tailwind configuration and customizations
- `src/styles/index.css` - Global styles and Tailwind directives


## 🌍 Data & Integration

### Mock Data
The application includes comprehensive mock data for development:
- **Dashboard Metrics** - Sample KPIs and statistics
- **Order Data** - Realistic order information with various statuses
- **Geographic Data** - World countries data for map visualizations
- **User Activity** - Sample user interactions and events

### API Integration Ready
The structure supports easy integration with real APIs:
- Centralized data management in `/src/data/`
- Context providers for state management
- Utility functions for data processing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### **Netlify**
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure build settings if using continuous deployment

#### **Vercel**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Deploy automatically on push to main branch

#### **GitHub Pages**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deployment script to `package.json`:
   ```json
   "homepage": "https://github.com/CodesavvySiddharth/Juspay-Assignment",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## 🔍 Features Walkthrough

### 🏠 **Dashboard Page**
- **Overview Cards** - Key metrics at a glance
- **Interactive Charts** - Revenue, growth, and performance trends
- **World Map** - Geographic distribution of data
- **Recent Activity** - Latest system updates and transactions

### 📦 **Orders Page**
- **Order List** - Comprehensive table with sorting and filtering
- **Search Functionality** - Real-time search across all order fields
- **Status Management** - Visual status indicators and bulk updates
- **Pagination** - Efficient handling of large datasets

### 🎨 **Theme System**
- **Seamless Switching** - Instant theme changes without page reload
- **System Preference** - Automatic detection of user's system theme
- **Consistent Experience** - All components adapt to theme changes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### 📋 Contribution Guidelines
- Follow the existing code style and patterns
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Keep commits focused and descriptive

## 🐛 Issues and Support

If you encounter any issues or have suggestions:

1. **Check existing issues** - Your question might already be answered
2. **Create a new issue** - Use our issue templates for bug reports or feature requests
3. **Provide details** - Include screenshots, error messages, and steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Siddharth**
- GitHub: [@CodesavvySiddharth](https://github.com/CodesavvySiddharth)
- Project: Juspay Dashboard Assignment 

## 🙏 Acknowledgments

- **React Community** - For excellent documentation and ecosystem
- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Create React App** - For providing the initial project structure
- **Open Source Community** - For inspiration and best practices

## 📈 Future Enhancements

- [ ] **Real API Integration** - Connect with actual payment gateway APIs
- [ ] **Advanced Analytics** - More detailed charts and reporting features
- [ ] **User Authentication** - Login/logout functionality with role-based access
- [ ] **Export Features** - PDF and Excel export for dashboard reports and order data
- [ ] **Real-time Notifications** - WebSocket integration for live order updates
- [ ] **Enhanced Animations** - More sophisticated chart animations and transitions
- [ ] **Dashboard Customization** - User-configurable dashboard widgets and layouts
- [ ] **Mobile App** - React Native version for mobile platforms
- [ ] **Advanced Filtering** - More granular filtering options for orders and analytics
- [ ] **Data Persistence** - Local storage for user preferences and custom settings

---

⭐ **If you found this project helpful, please give it a star on GitHub!**

*Last updated: November 2025*
