import React, { useState } from 'react';
import { 
  Download, Filter, Search, AlertTriangle, 
  Clock, Activity, Zap, Thermometer, 
  ChevronLeft, ChevronRight, ExternalLink,
  BarChart3, Eye, DownloadCloud, Calendar,
  TrendingUp, TrendingDown, Shield, Info
} from 'lucide-react';

const FaultLogs = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFault, setSelectedFault] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const faultLogs = [
    {
      id: 'F001',
      timestamp: '2024-01-15 14:23:45',
      asset: 'XFMR_400_1',
      assetType: 'Transformer',
      faultType: 'Over Temperature',
      severity: 'High',
      duration: '2.5 min',
      action: 'Auto Shutdown',
      status: 'Resolved',
      temperature: '85°C',
      current: '1250A',
      voltage: '398kV',
      description: 'Winding temperature exceeded safe limit. System initiated automatic shutdown.'
    },
    {
      id: 'F002',
      timestamp: '2024-01-15 12:15:30',
      asset: 'LINE_400_1',
      assetType: 'Transmission Line',
      faultType: 'Phase Loss',
      severity: 'Critical',
      duration: '45 sec',
      action: 'Breaker Trip',
      status: 'Resolved',
      temperature: '45°C',
      current: '0A',
      voltage: '0kV',
      description: 'Phase loss detected on Line 1. Protection relay triggered breaker trip.'
    },
    {
      id: 'F003',
      timestamp: '2024-01-14 18:45:12',
      asset: 'BREAKER_400_2',
      assetType: 'Circuit Breaker',
      faultType: 'Mechanical Failure',
      severity: 'High',
      duration: '15 min',
      action: 'Manual Intervention',
      status: 'Under Maintenance',
      temperature: '65°C',
      current: 'N/A',
      voltage: 'N/A',
      description: 'Mechanical linkage failure detected. Breaker failed to trip automatically.'
    },
    {
      id: 'F004',
      timestamp: '2024-01-14 09:30:22',
      asset: 'BUS_400_1',
      assetType: 'Busbar',
      faultType: 'Voltage Dip',
      severity: 'Medium',
      duration: '30 sec',
      action: 'Auto Recovery',
      status: 'Resolved',
      temperature: '55°C',
      current: '1350A',
      voltage: '380kV',
      description: 'Voltage dip detected. Automatic voltage regulation system engaged.'
    },
    {
      id: 'F005',
      timestamp: '2024-01-13 22:10:05',
      asset: 'XFMR_400_2',
      assetType: 'Transformer',
      faultType: 'Oil Level Low',
      severity: 'Medium',
      duration: '5 min',
      action: 'Alarm Only',
      status: 'Resolved',
      temperature: '70°C',
      current: '1100A',
      voltage: '395kV',
      description: 'Transformer oil level dropped below threshold. Warning alarm triggered.'
    },
    {
      id: 'F006',
      timestamp: '2024-01-13 15:20:18',
      asset: 'CT_400_1',
      assetType: 'Current Transformer',
      faultType: 'Calibration Drift',
      severity: 'Low',
      duration: '10 min',
      action: 'Alarm Only',
      status: 'Resolved',
      temperature: '40°C',
      current: 'N/A',
      voltage: 'N/A',
      description: 'CT calibration out of tolerance. Scheduled for recalibration.'
    },
    {
      id: 'F007',
      timestamp: '2024-01-12 08:45:33',
      asset: 'CVT_400_1',
      assetType: 'Capacitor VT',
      faultType: 'Capacitance Loss',
      severity: 'Medium',
      duration: '2 min',
      action: 'Auto Bypass',
      status: 'Resolved',
      temperature: '50°C',
      current: 'N/A',
      voltage: 'N/A',
      description: 'Partial capacitance loss detected. Backup system engaged.'
    },
    {
      id: 'F008',
      timestamp: '2024-01-11 21:30:47',
      asset: 'REACTOR_400_1',
      assetType: 'Reactor',
      faultType: 'Over Current',
      severity: 'High',
      duration: '1.5 min',
      action: 'Load Shedding',
      status: 'Resolved',
      temperature: '75°C',
      current: '1500A',
      voltage: '400kV',
      description: 'Reactor current exceeded rated capacity. Load shedding initiated.'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500' };
      case 'High': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', dot: 'bg-orange-500' };
      case 'Medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-500' };
      case 'Low': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', dot: 'bg-gray-500' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Under Maintenance': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Investigating': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAssetIcon = (assetType) => {
    switch (assetType) {
      case 'Transformer': return <Zap className="h-4 w-4" />;
      case 'Circuit Breaker': return <Activity className="h-4 w-4" />;
      case 'Transmission Line': return <TrendingUp className="h-4 w-4" />;
      case 'Busbar': return <BarChart3 className="h-4 w-4" />;
      case 'Current Transformer': return <Activity className="h-4 w-4" />;
      case 'Capacitor VT': return <Zap className="h-4 w-4" />;
      case 'Reactor': return <Activity className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  // Filter logs
  const filteredLogs = faultLogs.filter(log => {
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesSearch = searchQuery === '' || 
      log.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.faultType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  // Pagination
  const logsPerPage = 5;
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const severityStats = {
    Critical: faultLogs.filter(log => log.severity === 'Critical').length,
    High: faultLogs.filter(log => log.severity === 'High').length,
    Medium: faultLogs.filter(log => log.severity === 'Medium').length,
    Low: faultLogs.filter(log => log.severity === 'Low').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Fault Logs & Analytics
            </h2>
            <p className="text-sm text-gray-600 mt-1">Monitor, analyze, and manage system fault events</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Activity className="h-4 w-4" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <DownloadCloud className="h-4 w-4" />
              Export All
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-400" />
              <select 
                value={severityFilter}
                onChange={(e) => {
                  setSeverityFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
              >
                <option value="all">All Severity</option>
                <option value="Critical">Critical Only</option>
                <option value="High">High & Above</option>
                <option value="Medium">Medium & Above</option>
                <option value="Low">All Faults</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>{filteredLogs.length} faults found</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search faults, assets, or types..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Severity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(severityStats).map(([severity, count]) => {
          const color = getSeverityColor(severity);
          return (
            <div 
              key={severity}
              className={`bg-white border ${color.border} rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${
                selectedFault?.severity === severity ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSeverityFilter(severityFilter === severity ? 'all' : severity)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className={`text-sm font-medium ${color.text}`}>{severity} Faults</div>
                </div>
                <div className={`p-2 rounded-lg ${color.bg}`}>
                  <div className={`w-3 h-3 rounded-full ${color.dot}`}></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {severityFilter === severity ? 'Click to clear filter' : 'Click to filter'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fault Logs Table/Grid */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Fault Events</h3>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fault ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fault Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => {
                  const severityColor = getSeverityColor(log.severity);
                  const statusColor = getStatusColor(log.status);
                  
                  return (
                    <tr 
                      key={log.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedFault(selectedFault?.id === log.id ? null : log)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${severityColor.dot}`}></div>
                          <div className="text-sm font-medium text-gray-900">{log.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-100 rounded">
                            {getAssetIcon(log.assetType)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.asset}</div>
                            <div className="text-xs text-gray-500">{log.assetType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.faultType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${severityColor.bg} ${severityColor.text} ${severityColor.border}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFault(selectedFault?.id === log.id ? null : log);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {paginatedLogs.map((log) => {
              const severityColor = getSeverityColor(log.severity);
              const statusColor = getStatusColor(log.status);
              
              return (
                <div 
                  key={log.id}
                  className={`border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${
                    selectedFault?.id === log.id ? 'ring-2 ring-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedFault(selectedFault?.id === log.id ? null : log)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${severityColor.bg}`}>
                        <div className={`w-3 h-3 rounded-full ${severityColor.dot}`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{log.id}</div>
                        <div className="text-xs text-gray-500">{log.timestamp}</div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                      {log.status}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-gray-100 rounded">
                        {getAssetIcon(log.assetType)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{log.asset}</div>
                        <div className="text-xs text-gray-500">{log.assetType}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">{log.faultType}</div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{log.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        <span>{log.action}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${severityColor.bg} ${severityColor.text} ${severityColor.border}`}>
                      {log.severity}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} faults
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Fault Details */}
      {selectedFault && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Fault Details: {selectedFault.id}</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed analysis and parameters</p>
            </div>
            <button
              onClick={() => setSelectedFault(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="text-sm">Close</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{selectedFault.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Temperature</div>
                  <div className="text-sm font-medium text-gray-900">{selectedFault.temperature}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Current</div>
                  <div className="text-sm font-medium text-gray-900">{selectedFault.current}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">Voltage</div>
                  <div className="text-sm font-medium text-gray-900">{selectedFault.voltage}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Download Report
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Create Maintenance Ticket
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Add to Watchlist
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Related Faults</h4>
                <div className="space-y-2">
                  {faultLogs
                    .filter(log => log.asset === selectedFault.asset && log.id !== selectedFault.id)
                    .slice(0, 2)
                    .map(log => (
                      <div key={log.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{log.faultType}</span>
                        <span className="text-gray-500">{log.timestamp.split(' ')[0]}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Fault Analysis Summary</h4>
              <p className="text-sm text-gray-600">
                Total {filteredLogs.length} faults recorded in selected period. 
                <span className="text-green-600 font-medium"> 85% resolved within target timeframe.</span> 
                Most common issue: Transformer temperature anomalies.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Export Analysis
            </button>
            <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-white transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaultLogs;