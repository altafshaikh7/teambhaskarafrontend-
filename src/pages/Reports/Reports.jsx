import React, { useState, useEffect } from 'react';
import FaultLogs from './FaultLogs';
import DailyReport from './DailyReport';
import MaintenanceSchedule from './MaintenanceSchedule';
import { 
  BarChart3, AlertTriangle, CalendarCheck, FileText, 
  ChevronRight, Download, RefreshCw, TrendingUp, 
  Activity, Shield, Zap, Clock, Filter, Search, 
  Database, Cpu, Battery, Thermometer
} from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('faults');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const tabs = [
    { 
      id: 'faults', 
      name: 'Fault Logs', 
      icon: <AlertTriangle className="h-4 w-4" />,
      description: 'Monitor and analyze system faults',
      count: 5,
      color: 'red'
    },
    { 
      id: 'daily', 
      name: 'Daily Reports', 
      icon: <FileText className="h-4 w-4" />,
      description: 'Daily performance metrics and analytics',
      count: null,
      color: 'blue'
    },
    { 
      id: 'maintenance', 
      name: 'Maintenance', 
      icon: <CalendarCheck className="h-4 w-4" />,
      description: 'Schedule and track maintenance tasks',
      count: 3,
      color: 'orange'
    },
  ];

  const quickStats = [
    {
      title: 'System Availability',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      color: 'green',
      icon: <Battery className="h-5 w-5" />
    },
    {
      title: 'Active Alerts',
      value: '2',
      change: '-1 from yesterday',
      trend: 'down',
      color: 'red',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      title: 'Energy Generated',
      value: '2.45 GWh',
      change: "Today's total",
      trend: 'neutral',
      color: 'blue',
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: 'Pending Tasks',
      value: '3',
      change: 'Next: Jan 18',
      trend: 'neutral',
      color: 'orange',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  // Simulate auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Real-time insights and historical analysis for 400/220 kV Substation</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Live Data Streaming</span>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white border rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => {
              if (stat.color === 'red') setActiveTab('faults');
              if (stat.color === 'orange') setActiveTab('maintenance');
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold mt-1 ${
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'blue' ? 'text-blue-600' :
                  'text-orange-600'
                }`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-2.5 rounded-lg group-hover:scale-110 transition-transform ${
                stat.color === 'red' ? 'bg-red-50 text-red-600' :
                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                {stat.icon}
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {stat.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : stat.trend === 'down' ? (
                <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
              ) : (
                <Activity className="h-3 w-3 text-gray-400" />
              )}
              <span>{stat.change}</span>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-gray-600">
                Click to view details
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 pt-5 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Analytics Modules</h2>
              <p className="text-sm text-gray-600 mt-1">Select a module to view detailed analysis</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 relative
                  ${activeTab === tab.id
                    ? `text-${tab.color}-700 bg-white border border-${tab.color}-200 shadow-sm`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                  }
                `}
              >
                <div className={`p-2 rounded ${
                  activeTab === tab.id 
                    ? `bg-${tab.color}-50` 
                    : 'bg-gray-100'
                }`}>
                  {React.cloneElement(tab.icon, {
                    className: `h-4 w-4 ${
                      activeTab === tab.id 
                        ? `text-${tab.color}-600` 
                        : 'text-gray-500'
                    }`
                  })}
                </div>
                <span>{tab.name}</span>
                {tab.count && (
                  <span className={`
                    inline-flex items-center justify-center w-6 h-6 text-xs rounded-full font-medium
                    ${activeTab === tab.id
                      ? `bg-${tab.color}-100 text-${tab.color}-700`
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className={`absolute -bottom-0.5 left-0 right-0 h-0.5 bg-${tab.color}-500 rounded-full`}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-1 bg-gray-50/50">
          <div className="bg-white rounded-lg shadow-sm min-h-[400px]">
            {activeTab === 'faults' && <FaultLogs />}
            {activeTab === 'daily' && <DailyReport />}
            {activeTab === 'maintenance' && <MaintenanceSchedule />}
          </div>
        </div>
      </div>

      {/* Help & Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2.5 rounded-lg">
              <span className="text-blue-600 text-lg">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Dashboard Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-600">Click on any metric card to view detailed analytics</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-600">Use date filters to analyze historical trends and patterns</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-600">Export reports in PDF/CSV format for offline review</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm text-gray-600">Set up custom alerts for critical thresholds in settings</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 min-w-[200px]">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2.5 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Export All Data
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-700 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;