// src/components/layout/RightSidebar.js - Fixed mobile visibility and width issues
import React, { useContext } from 'react';
import { activities, contacts } from '../../data/mockData';
import { Bug, User, Radio, X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

// Import SVG images
import bugBeetleIcon from '../../assets/images/uploaded/BugBeetle.svg';
import userIcon from '../../assets/images/uploaded/User.svg';
import broadcastIcon from '../../assets/images/uploaded/Broadcast.svg';

// Inter font style for paragraphs
const interParagraphFont = {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontStyle: 'Regular',
  fontSize: '14px',
  leadingTrim: 'NONE',
  lineHeight: '20px',
  letterSpacing: '0%'
};

/**
 * IconWithBg
 * - container size matches activity avatars: 32x32 (w-8 h-8)
 * - circular background to match avatar style
 * - background: var(--Primary-Blue, #E3F5FF)
 * - no badge
 * - includes data-property attribute for testability
 */
const IconWithBg = ({ children, property = '' , style = {}, isSvg = false, darkMode = false }) => {
  return (
    <div
      data-property={property}
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        minWidth: 32,
        minHeight: 32,
        display: 'inline-grid',
        placeItems: 'center',
        borderRadius: '9999px', // rounded-full
        background: 'var(--Primary-Blue, #E3F5FF)',
        flexShrink: 0,
        ...style
      }}
    >
      {isSvg ? (
        <img 
          src={children} 
          alt={property}
          style={{ 
            width: 18, 
            height: 18,
            filter: darkMode ? 'invert(1)' : 'none' // Apply dark mode filter
          }} 
        />
      ) : (
        children
      )}
    </div>
  );
};

const AppRightSidebar = ({ isVisible, isMobile = false, isTablet = false, onClose }) => {
  const { darkMode } = useContext(ThemeContext);

  const desktopStyle = {
    backgroundColor: darkMode ? '#0a0a0a' : '#ffffff',
    borderLeft: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(229,231,235,1)'
  };

  const mobileStyle = {
    backgroundColor: darkMode ? '#000000' : '#ffffff',
    borderLeft: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(229,231,235,1)'
  };

  // Timeline line color - cyan for dark mode, subtle gray for light mode
  const timelineLineColor = darkMode ? 'var(--Secondary-Cyan, #A8C5DA)' : 'rgba(0,0,0,0.1)';

  // For desktop/tablet
  if (!isMobile && !isTablet) {
    return (
      <aside aria-hidden={!isVisible} className={`${isVisible ? 'w-80 opacity-100' : 'w-0 opacity-0'} transition-all duration-300 ease-in-out border-l p-0 overflow-hidden h-full`} style={desktopStyle}>
        <div className="w-80 p-6 h-full flex flex-col" style={{ minWidth: 0 }}>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Notifications</h3>
              <div className="space-y-3">
                {/* Notification item 1 */}
                <div className="flex items-start space-x-3">
                  <IconWithBg property="BugBeetle" isSvg={true} >
                    {bugBeetleIcon}
                  </IconWithBg>

                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>You have a bug that needs...</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>Just now</p>
                  </div>
                </div>

                {/* Notification item 2 */}
                <div className="flex items-start space-x-3">
                  <IconWithBg property="UserRegistered" isSvg={true}>
                    {userIcon}
                  </IconWithBg>

                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>New user registered</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>59 minutes ago</p>
                  </div>
                </div>

                {/* Notification item 3 */}
                <div className="flex items-start space-x-3">
                  <IconWithBg property="BugBeetle" isSvg={true}>
                    {bugBeetleIcon}
                  </IconWithBg>

                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>You have a bug that needs...</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>12 hours ago</p>
                  </div>
                </div>

                {/* Notification item 4 - REPLACED as requested */}
                <div className="flex items-start space-x-3">
                  <IconWithBg property="Subscribed" isSvg={true}>
                    {broadcastIcon}
                  </IconWithBg>

                  <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                    <p style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>Andi Lane Subscribed to you</p>
                    <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>Today, 11:59 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Activities</h3>
              <div style={{ position: 'relative' }}>
                {/* Timeline vertical line with cyan color for dark mode */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '16px', // Center of the 32px avatar (16px from left)
                    top: '16px', // Start from first avatar center
                    bottom: '16px', // End at last avatar center
                    width: '1px',
                    backgroundColor: timelineLineColor,
                    zIndex: 0
                  }}
                />
                
                <div className="space-y-4 relative z-10">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 relative">
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={activity.avatar} 
                          alt={activity.user}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            border: `2px solid ${darkMode ? '#0a0a0a' : '#ffffff'}` // Border to hide line behind avatar
                          }}
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0" 
                          style={{ 
                            backgroundColor: darkMode ? '#111111' : '#f3f4f6',
                            color: darkMode ? '#ffffff' : '#111827',
                            display: 'none', // Hidden by default, shown if image fails
                            position: 'relative',
                            zIndex: 2,
                            border: `2px solid ${darkMode ? '#0a0a0a' : '#ffffff'}`
                          }}
                        >
                          {activity.user.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div style={{ color: darkMode ? '#cfcfcf' : '#111827' }}>
                        <p style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>{activity.user} {activity.action}</p>
                        <p style={{ fontSize: 12, color: darkMode ? '#9CA3AF' : '#6b7280' }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: darkMode ? '#fff' : '#111827' }}>Contacts</h3>
              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" 
                      style={{ 
                        backgroundColor: darkMode ? '#071029' : '#e6f0ff', 
                        color: darkMode ? '#60a5fa' : '#1e40af',
                        display: 'none' // Hidden by default, shown if image fails
                      }}
                    >
                      {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                    </div>
                    <span style={{ color: darkMode ? '#fff' : '#111827', ...interParagraphFont }}>{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // FIXED: Mobile/Tablet overlay version with responsive width
  return (
    <div 
      role="dialog" 
      aria-hidden={!isVisible} 
      className={`fixed top-0 right-0 h-full transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{
        ...mobileStyle,
        zIndex: 55, // Higher than mobile search overlay
        width: isMobile ? 'min(320px, 90vw)' : '320px', // Responsive width for mobile
        maxWidth: '90vw' // Ensure it doesn't exceed viewport width
      }}
    >
      <div className="h-full flex flex-col" style={{ 
        width: '100%',
        padding: isMobile ? '1rem' : '1.5rem'
      }}>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ 
            fontWeight: 600, 
            color: darkMode ? '#fff' : '#111827',
            fontSize: isMobile ? '1.125rem' : '1.25rem'
          }}>
            Activity
          </h2>
          {onClose && (
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg transition-colors touch-target"
              style={{ 
                color: darkMode ? '#cfcfcf' : '#6b7280',
                minHeight: '44px', // Better touch target
                minWidth: '44px'
              }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          <div>
            <h3 style={{ 
              fontSize: isMobile ? 14 : 16, 
              fontWeight: 600, 
              color: darkMode ? '#fff' : '#111827',
              marginBottom: 12
            }}>
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <IconWithBg property="BugBeetle" isSvg={true} darkMode={darkMode}>
                  {bugBeetleIcon}
                </IconWithBg>
                <div className="min-w-0 flex-1">
                  <p style={{ 
                    color: darkMode ? '#fff' : '#111827',
                    ...interParagraphFont
                  }}>
                    You have a bug that needs...
                  </p>
                  <p style={{ 
                    fontSize: 12, 
                    color: darkMode ? '#9CA3AF' : '#6b7280',
                    marginTop: 4
                  }}>
                    12 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <IconWithBg property="UserRegistered" isSvg={true} darkMode={darkMode}>
                  {userIcon}
                </IconWithBg>
                <div className="min-w-0 flex-1">
                  <p style={{ 
                    color: darkMode ? '#fff' : '#111827',
                    ...interParagraphFont
                  }}>
                    New user registered
                  </p>
                  <p style={{ 
                    fontSize: 12, 
                    color: darkMode ? '#9CA3AF' : '#6b7280',
                    marginTop: 4
                  }}>
                    59 minutes ago
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <IconWithBg property="Subscribed">
                  <Radio size={16} color={darkMode ? '#0b1220' : '#0b1220'} />
                </IconWithBg>
                <div className="min-w-0 flex-1">
                  <p style={{ 
                    color: darkMode ? '#fff' : '#111827',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    lineHeight: '1.4'
                  }}>
                    Andi Lane Subscribed to you
                  </p>
                  <p style={{ 
                    fontSize: 12, 
                    color: darkMode ? '#9CA3AF' : '#6b7280',
                    marginTop: 4
                  }}>
                    Today, 11:59 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: isMobile ? 14 : 16, 
              fontWeight: 600, 
              color: darkMode ? '#fff' : '#111827',
              marginBottom: 12
            }}>
              Activities
            </h3>
            <div style={{ position: 'relative' }}>
              {/* Timeline vertical line for mobile with cyan color for dark mode */}
              <div 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '16px',
                  bottom: '16px',
                  width: '1px',
                  backgroundColor: timelineLineColor,
                  zIndex: 0
                }}
              />
              
              <div className="space-y-4 relative z-10">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 relative">
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={activity.avatar} 
                        alt={activity.user}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          border: `2px solid ${darkMode ? '#000000' : '#ffffff'}`
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0" 
                        style={{ 
                          backgroundColor: darkMode ? '#111111' : '#f3f4f6',
                          color: darkMode ? '#ffffff' : '#111827',
                          display: 'none',
                          position: 'relative',
                          zIndex: 2,
                          border: `2px solid ${darkMode ? '#000000' : '#ffffff'}`
                        }}
                      >
                        {activity.user.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p style={{ 
                        color: darkMode ? '#fff' : '#111827',
                        ...interParagraphFont
                      }}>
                        {activity.user} {activity.action}
                      </p>
                      <p style={{ 
                        fontSize: 12, 
                        color: darkMode ? '#9CA3AF' : '#6b7280',
                        marginTop: 4
                      }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ 
              fontSize: isMobile ? 14 : 16, 
              fontWeight: 600, 
              color: darkMode ? '#fff' : '#111827',
              marginBottom: 12
            }}>
              Contacts
            </h3>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" 
                    style={{ 
                      backgroundColor: darkMode ? '#071029' : '#e6f0ff', 
                      color: darkMode ? '#60a5fa' : '#1e40af',
                      display: 'none'
                    }}
                  >
                    {contact.name.split(' ').map(n => n.charAt(0)).join('')}
                  </div>
                  <span style={{ 
                    color: darkMode ? '#fff' : '#111827',
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ...interParagraphFont
                  }}>
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRightSidebar;