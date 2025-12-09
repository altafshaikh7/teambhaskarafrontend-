// src/components/layout/Header.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Menu, Bell, User, Settings, LogOut, Mail, Check, Zap } from 'lucide-react'
import { useSocket } from '../../contexts/SocketContext'
import { useNavigate } from 'react-router-dom'

const Header = ({ onMenuClick }) => {
  const { isConnected, anomalies } = useSocket()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const criticalAlerts = anomalies.filter(a => a.severity === 'critical' && !a.acknowledged).length

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'High Temperature Alert',
      message: 'Transformer XFMR_400_1 temperature exceeded 85°C',
      timestamp: '2 min ago',
      read: false,
      severity: 'critical'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance Scheduled',
      message: 'Preventive maintenance for BREAKER_400_2 scheduled for tomorrow',
      timestamp: '1 hour ago',
      read: false,
      severity: 'info'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New firmware update available for IoT sensors',
      timestamp: '3 hours ago',
      read: true,
      severity: 'info'
    }
  ])

  // Mock user data
  const user = {
    name: 'John Operator',
    email: 'john.operator@ehvsubstation.com',
    role: 'Senior Operator',
    department: 'Operations',
    lastLogin: '2024-01-15 14:30',
    avatar: null
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
    setShowNotifications(false)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const handleProfileClick = () => {
    setShowProfile(false)
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    setShowProfile(false)
    navigate('/settings')
  }

  const handleLogout = () => {
    console.log('Logging out...')
    setShowProfile(false)
    // Add your logout logic here
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500'
      case 'warning': return 'bg-amber-500'
      case 'info': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 animate-fade-in">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0 space-x-3">
            {/* Connection Status */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isConnected 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {/* Critical Alerts Badge */}
            {criticalAlerts > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">{criticalAlerts} Critical Alert{criticalAlerts > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 group"
            >
              <Bell className="h-5 w-5 transition-transform group-hover:animate-bounce" />
              {(criticalAlerts > 0 || unreadNotifications > 0) && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {criticalAlerts > 0 ? criticalAlerts : unreadNotifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-slide-in">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    {unreadNotifications > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-600 font-medium hover:text-blue-700"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="stagger-animate">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-all duration-300 ${
                            !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex space-x-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${getSeverityColor(notification.severity)}`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>No notifications</p>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-semibold text-gray-700 block">
                  {user.name.split(' ')[0]}
                </span>
                <span className="text-xs text-gray-500 block">
                  {user.role}
                </span>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-slide-in">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {user.department}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 w-full px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={handleSettingsClick}
                    className="flex items-center space-x-2 w-full px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header