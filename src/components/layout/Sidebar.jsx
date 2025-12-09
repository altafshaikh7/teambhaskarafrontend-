// src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Monitor, 
  Square, 
  Heart, 
  Brain, 
  Play, 
  FileText,
  Settings,
  X,
  Zap
} from 'lucide-react'

// Import your logo image - make sure this path is correct
import logo from '/logo.png'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Monitoring', href: '/monitoring', icon: Monitor },
  { name: 'Digital Twin', href: '/digital-twin', icon: Square },
  { name: 'Asset Health', href: '/asset-health', icon: Heart },
  { name: 'AI Analytics', href: '/ai-analytics', icon: Brain },
  { name: 'Simulator', href: '/simulator', icon: Play },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${open ? 'fixed inset-0 z-40' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setOpen(false)}
        />
        <div className="flex items-center space-x-2">
  {/* Logo Image - BADA */}
  <div className="w-16 h-16 rounded-lg flex items-center justify-center">
  <img 
  src="/logo.png" 
  alt="Logo" 
  className="h-16 w-48 object-contain"
/>
  </div>
  <a href="/">
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-900">
        EHV Digital Twin
      </h1>
      <span className="text-xs text-gray-500">Control System</span>
    </div>
  </a>
</div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 px-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              {/* Logo Image */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="EHV Digital Twin Logo" 
                  className="h-6 w-auto object-contain"
                />
              </div>
              <a href="/">
                <h1 className="text-lg font-bold text-gray-900">
                  EHV Digital Twin
                </h1>
              </a>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:translate-x-1 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                style={{animationDelay: `${index * 0.05}s`}}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`mr-3 h-5 w-5 transition-transform duration-300 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar