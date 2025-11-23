// src/components/layout/Sidebar.js
import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContextProvider';
import {
  BarChart3, FolderOpen, User, CreditCard, Globe, FileText, MessageSquare, ChevronDown, ChevronRight, ShoppingBag, GraduationCap, Building, ChartPie, FolderClosed, BookOpen, ContactRound, Users, MessagesSquare, X, Megaphone, Users2
} from 'lucide-react';
// Import SVG images
import userProfileIcon from '../../assets/images/uploaded/user-profile.svg';
import accountIcon from '../../assets/images/uploaded/IdentificationCard.svg';
import corporateIcon from '../../assets/images/uploaded/corporate.svg';
import blogIcon from '../../assets/images/uploaded/blogs.svg';
import socialIcon from '../../assets/images/uploaded/social.svg';
import defaultIcon from '../../assets/images/uploaded/ChartPieSlice.svg';
import ecommerceIcon from '../../assets/images/uploaded/ShoppingBagOpen.svg';
import projectsIcon from '../../assets/images/uploaded/FolderNotch.svg';
import onlineCoursesIcon from '../../assets/images/uploaded/BookOpen.svg';

// Inter font style
const interFont = {
  fontFamily: 'Inter',
  fontWeight: 400
};

// FavoriteItem component for proper hook usage
const FavoriteItem = ({ item, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 8,
        background: isHovered ? (darkMode ? '#1f2937' : '#f3f4f6') : 'transparent',
        color: darkMode ? '#cfcfcf' : '#374151',
        border: 'none',
        textAlign: 'left',
        position: 'relative',
        ...interFont
      }}
    >
      {item.isActive && (
        <span style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 28, borderRadius: 8, background: darkMode ? '#C6C7F8' : '#111827' }} />
      )}
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d1d5db', marginLeft: item.isActive ? 8 : 0 }} />
      <span style={{ paddingLeft: item.isActive ? 8 : 0 }}>{item.label}</span>
    </button>
  );
};

// SubMenuItem component for proper hook usage
const SubMenuItem = ({ item, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={item.onClick} 
      disabled={item.disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        borderRadius: 8,
        textAlign: 'left',
        background: isHovered ? (darkMode ? '#1f2937' : '#f3f4f6') : 'transparent',
        color: item.disabled ? (darkMode ? '#4b5563' : '#9ca3af') : (darkMode ? '#cfcfcf' : '#374151'),
        border: 'none',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? 0.5 : 1,
        ...interFont
      }}
    >
      {item.isActive && (
        <span style={{ position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', width: 6, height: 28, borderRadius: 8, background: darkMode ? '#C6C7F8' : '#111827' }} />
      )}
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'transparent' }} />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
    </button>
  );
};

const CollapsibleMenuItem = ({
  icon: Icon,
  imageSrc,
  label,
  subItems = [],
  isExpanded,
  onToggle,
  hasIcon = true,
  onClick,
  darkMode,
  isMobile,
  isActive
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (subItems.length > 0) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors text-left relative`}
        aria-expanded={!!isExpanded}
        style={{ 
          background: isHovered ? (darkMode ? '#1f2937' : '#f3f4f6') : 'transparent',
          ...interFont
        }}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {isActive ? (
            <span aria-hidden style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 28, borderRadius: 8, background: darkMode ? '#C6C7F8' : '#111827' }} />
          ) : null}

          {/* Arrow moved to the left side */}
          <div className="flex-shrink-0" style={{ width: isMobile ? 12 : 16 }}>
            {subItems.length > 0 ? (
              isExpanded ? <ChevronDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <ChevronRight className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            ) : null}
          </div>

          {hasIcon && (
            imageSrc ? (
              <img 
                src={imageSrc} 
                alt={label}
                className={`flex-shrink-0 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`}
                style={{ 
                  objectFit: 'cover',
                  filter: darkMode ? 'invert(1)' : 'none'
                }}
              />
            ) : (
              Icon && <Icon className={`flex-shrink-0 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden />
            )
          )}

          <span className={`truncate ${isMobile ? 'text-sm' : 'text-base'}`} style={{ 
            paddingLeft: isActive ? 8 : 0, 
            color: darkMode ? '#cfcfcf' : '#374151'
          }}>
            {label}
          </span>
        </div>
      </button>

      {subItems.length > 0 && (
        <div style={{ overflow: 'hidden', transition: 'all 300ms ease', maxHeight: isExpanded ? 240 : 0, opacity: isExpanded ? 1 : 0 }}>
          <div style={{ marginLeft: isMobile ? 24 : 32 }}>
            {subItems.map(item => (
              <SubMenuItem
                key={item.id}
                item={item}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AppSidebar = ({ isVisible, isMobile = false, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const [expandedSections, setExpandedSections] = useState({
    userProfile: false,
    default: false,
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  const handleNavigation = (path) => {
    history.push(path);
    if (isMobile && onClose) onClose();
  };

  const isActive = (path) => location.pathname === path;

  // Updated toggle function to close other sections when one is opened
  const toggleSection = (name) => {
    setExpandedSections(prev => {
      const newState = {};
      // Close all sections first
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Then open the clicked one if it was closed
      newState[name] = !prev[name];
      return newState;
    });
  };

  // Updated User Profile sub-items with all 5 components
  const userProfileSubItems = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/profile/overview'), isActive: isActive('/profile/overview'), disabled: false },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/profile/projects'), isActive: isActive('/profile/projects'), disabled: false },
    { id: 'campaigns', label: 'Campaigns', onClick: () => handleNavigation('/profile/campaigns'), isActive: isActive('/profile/campaigns'), disabled: false },
    { id: 'documents', label: 'Documents', onClick: () => handleNavigation('/profile/documents'), isActive: isActive('/profile/documents'), disabled: false },
    { id: 'followers', label: 'Followers', onClick: () => handleNavigation('/profile/followers'), isActive: isActive('/profile/followers'), disabled: false }
  ];

  // Added dropdown sub-items for dashboard sections
  const defaultSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const ecommerceSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const projectsSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const onlineCoursesSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const accountSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const corporateSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const blogSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const socialSubItems = [
    { id: 'no-content', label: 'No content available', onClick: () => {}, isActive: false, disabled: true }
  ];

  const favoritesList = [
    { id: 'overview', label: 'Overview', onClick: () => handleNavigation('/overview'), isActive: isActive('/overview') },
    { id: 'projects', label: 'Projects', onClick: () => handleNavigation('/projects'), isActive: isActive('/projects') }
  ];

  const containerStyle = {
    backgroundColor: darkMode ? '#000000' : '#ffffff',
    borderRight: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : '#e5e7eb'}`,
    width: isVisible ? 256 : 0,
    transition: 'all 300ms ease',
    height: '100%',
    overflow: 'hidden'
  };

  return (
    <aside style={containerStyle}>
      <div style={{ width: 256, display: isVisible ? 'block' : 'none', height: '100%', flexDirection: 'column' }}>
        <div style={{ padding: isMobile ? 16 : 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img 
                src="/logo.png" 
                alt="ByeWind Logo" 
                style={{ 
                  width: isMobile ? 24 : 32, 
                  height: isMobile ? 24 : 32, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#111827', ...interFont }}>ByeWind</span>
            </div>

            {isMobile && onClose && (
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: darkMode ? '#cfcfcf' : '#6b7280' }}>
                <X />
              </button>
            )}
          </div>
        </div>

        <nav style={{ padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 12, height: 'calc(100% - 96px)', overflowY: 'auto', ...interFont }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 400, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280', ...interFont }}>FAVORITES</div>
            <button onClick={() => handleNavigation('/recently')} style={{ 
              fontSize: 12, 
              fontWeight: 400, 
              letterSpacing: 1.5, 
              color: darkMode ? '#9ca3af' : '#6b7280', 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              ...interFont
            }}>
              RECENTLY
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favoritesList.map(item => (
              <FavoriteItem
                key={item.id}
                item={item}
                darkMode={darkMode}
              />
            ))}
          </div>

          <div style={{ marginTop: 12, fontSize: 12, fontWeight: 400, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280', ...interFont }}>DASHBOARDS</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem 
              label="Default" 
              imageSrc={defaultIcon}
              subItems={defaultSubItems} 
              isExpanded={expandedSections.default} 
              onToggle={() => toggleSection('default')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={isActive('/')} 
            />
            <CollapsibleMenuItem 
              label="eCommerce" 
              imageSrc={ecommerceIcon}
              subItems={ecommerceSubItems} 
              isExpanded={expandedSections.ecommerce} 
              onToggle={() => toggleSection('ecommerce')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={isActive('/orders')} 
            />
            <CollapsibleMenuItem 
              label="Projects" 
              imageSrc={projectsIcon}
              subItems={projectsSubItems} 
              isExpanded={expandedSections.projects} 
              onToggle={() => toggleSection('projects')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              label="Online Courses" 
              imageSrc={onlineCoursesIcon}
              subItems={onlineCoursesSubItems} 
              isExpanded={expandedSections.onlineCourses} 
              onToggle={() => toggleSection('onlineCourses')} 
              hasIcon 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
          </div>

          <div style={{ marginTop: 20, fontSize: 12, fontWeight: 400, letterSpacing: 1.5, color: darkMode ? '#9ca3af' : '#6b7280', ...interFont }}>PAGES</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CollapsibleMenuItem 
              imageSrc={userProfileIcon} 
              label="User Profile" 
              subItems={userProfileSubItems} 
              isExpanded={expandedSections.userProfile} 
              onToggle={() => toggleSection('userProfile')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              imageSrc={accountIcon} 
              label="Account" 
              subItems={accountSubItems} 
              isExpanded={expandedSections.account} 
              onToggle={() => toggleSection('account')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              imageSrc={corporateIcon} 
              label="Corporate" 
              subItems={corporateSubItems} 
              isExpanded={expandedSections.corporate} 
              onToggle={() => toggleSection('corporate')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              imageSrc={blogIcon} 
              label="Blog" 
              subItems={blogSubItems} 
              isExpanded={expandedSections.blog} 
              onToggle={() => toggleSection('blog')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
            <CollapsibleMenuItem 
              imageSrc={socialIcon} 
              label="Social" 
              subItems={socialSubItems} 
              isExpanded={expandedSections.social} 
              onToggle={() => toggleSection('social')} 
              darkMode={darkMode} 
              isMobile={isMobile} 
              isActive={false} 
            />
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;