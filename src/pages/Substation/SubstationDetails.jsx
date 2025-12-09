// src/pages/Substation/SubstationDetails.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubstationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample substation data (in real app, fetch from API based on id)
  const substationData = {
    id: 1,
    name: "Kolkata 400/220 kV Substation",
    code: "KOL-400-001",
    region: "Eastern Region",
    location: "Kolkata, West Bengal",
    coordinates: [22.5726, 88.3639],
    voltage: "400/220 kV",
    capacity: "2000 MW",
    currentLoad: "85%",
    status: "operational",
    lastInspection: "2024-01-15",
    nextMaintenance: "2024-04-15",
    commissioned: "2015-03-20",
    
    // Equipment
    transformers: [
      { id: 1, type: "400/220 kV", capacity: "500 MVA", status: "operational", lastService: "2024-01-10" },
      { id: 2, type: "400/220 kV", capacity: "500 MVA", status: "operational", lastService: "2024-01-12" },
      { id: 3, type: "220/132 kV", capacity: "250 MVA", status: "maintenance", lastService: "2023-12-20" },
    ],
    
    circuitBreakers: [
      { id: 1, type: "SF6", voltage: "400 kV", status: "operational", location: "Bay 1" },
      { id: 2, type: "SF6", voltage: "400 kV", status: "operational", location: "Bay 2" },
      { id: 3, type: "Vacuum", voltage: "220 kV", status: "warning", location: "Bay 3" },
    ],
    
    // Connections
    connections: [
      { to: "Patna Grid", voltage: "400 kV", distance: "450 km", status: "operational" },
      { to: "Bhubaneswar East", voltage: "220 kV", distance: "200 km", status: "operational" },
      { to: "Dhaka Interconnection", voltage: "400 kV", distance: "300 km", status: "operational" },
    ],
    
    // Recent Alerts
    alerts: [
      { id: 1, type: "warning", message: "Transformer temperature above normal", time: "2 hours ago", priority: "medium" },
      { id: 2, type: "info", message: "Scheduled maintenance in 3 days", time: "1 day ago", priority: "low" },
      { id: 3, type: "success", message: "Circuit breaker maintenance completed", time: "3 days ago", priority: "low" },
    ],
    
    // Statistics
    stats: {
      uptime: "99.8%",
      availability: "99.9%",
      energyTransmitted: "45,200 GWh",
      peakLoad: "1,850 MW",
      avgLoad: "1,550 MW",
      faultCount: 3,
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-4 border-blue-500 bg-blue-50';
      case 'success': return 'border-l-4 border-green-500 bg-green-50';
      default: return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <button
                onClick={() => navigate('/grid-map')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Map
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {substationData.name}
              </h1>
              <p className="text-gray-600">Substation Code: {substationData.code}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="fas fa-download mr-2"></i>
                Export Report
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                <i className="fas fa-edit mr-2"></i>
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Status Banner */}
        <div className={`mb-8 p-6 rounded-xl ${getStatusColor(substationData.status)}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                substationData.status === 'operational' ? 'bg-green-500' :
                substationData.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
              <div>
                <h3 className="font-bold text-lg">Status: {substationData.status.toUpperCase()}</h3>
                <p className="text-sm">
                  {substationData.status === 'operational' ? 'All systems functioning normally' :
                   substationData.status === 'warning' ? 'Minor issues detected' :
                   'Under maintenance - reduced capacity'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Load</p>
                <p className="text-2xl font-bold">{substationData.currentLoad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold">{substationData.stats.uptime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Inspection</p>
                <p className="text-lg font-bold">{substationData.lastInspection}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Maintenance</p>
                <p className="text-lg font-bold">{substationData.nextMaintenance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['overview', 'equipment', 'connections', 'alerts', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                      <p className="text-gray-900">{substationData.region}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <p className="text-gray-900">{substationData.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Voltage Level</label>
                      <p className="text-gray-900">{substationData.voltage}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Installed Capacity</label>
                      <p className="text-gray-900">{substationData.capacity}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Commissioned On</label>
                      <p className="text-gray-900">{substationData.commissioned}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Coordinates</label>
                      <p className="text-gray-900">{substationData.coordinates.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Performance Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Availability</p>
                      <p className="text-3xl font-bold text-blue-600">{substationData.stats.availability}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Energy Transmitted</p>
                      <p className="text-2xl font-bold text-green-600">{substationData.stats.energyTransmitted}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Peak Load</p>
                      <p className="text-2xl font-bold text-purple-600">{substationData.stats.peakLoad}</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600">Average Load</p>
                      <p className="text-2xl font-bold text-yellow-600">{substationData.stats.avgLoad}</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Faults (Last 30 days)</p>
                      <p className="text-3xl font-bold text-red-600">{substationData.stats.faultCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="space-y-6">
                {/* Transformers */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Power Transformers</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Service</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {substationData.transformers.map((transformer) => (
                          <tr key={transformer.id}>
                            <td className="px-4 py-3">{transformer.id}</td>
                            <td className="px-4 py-3">{transformer.type}</td>
                            <td className="px-4 py-3">{transformer.capacity}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(transformer.status)}`}>
                                {transformer.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{transformer.lastService}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Circuit Breakers */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Circuit Breakers</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voltage</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {substationData.circuitBreakers.map((cb) => (
                          <tr key={cb.id}>
                            <td className="px-4 py-3">{cb.id}</td>
                            <td className="px-4 py-3">{cb.type}</td>
                            <td className="px-4 py-3">{cb.voltage}</td>
                            <td className="px-4 py-3">{cb.location}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(cb.status)}`}>
                                {cb.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                {/* Recent Alerts */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Recent Alerts & Notifications</h3>
                  <div className="space-y-4">
                    {substationData.alerts.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg ${getAlertColor(alert.type)}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium mb-1">{alert.message}</h4>
                            <p className="text-sm text-gray-600">{alert.time}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.priority} priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                  <i className="fas fa-chart-line text-blue-600 mr-2"></i>
                  View Live Monitoring
                </button>
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                  <i className="fas fa-tools text-blue-600 mr-2"></i>
                  Schedule Maintenance
                </button>
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                  <i className="fas fa-file-alt text-blue-600 mr-2"></i>
                  Generate Health Report
                </button>
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                  <i className="fas fa-history text-blue-600 mr-2"></i>
                  View Historical Data
                </button>
              </div>
            </div>

            {/* Connections */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Grid Connections</h3>
              <div className="space-y-4">
                {substationData.connections.map((conn, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{conn.to}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        conn.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {conn.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{conn.voltage}</span>
                      <span>{conn.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Contact & Support</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-user text-gray-500 mr-3"></i>
                  <div>
                    <p className="font-medium">Station Manager</p>
                    <p className="text-sm text-gray-600">Rajesh Kumar</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-gray-500 mr-3"></i>
                  <div>
                    <p className="font-medium">Emergency Contact</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-gray-500 mr-3"></i>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">kol400@powergrid.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstationDetails;