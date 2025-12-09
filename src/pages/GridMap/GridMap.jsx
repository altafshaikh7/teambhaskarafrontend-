// src/pages/GridMap/GridMap.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const GridMap = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedVoltage, setSelectedVoltage] = useState('all');
  const [hoveredSubstation, setHoveredSubstation] = useState(null);
  const [mapData, setMapData] = useState({
    center: [20.5937, 78.9629], // India center coordinates
    zoom: 5,
  });

  // Sample substation data
  const substations = [
    {
      id: 1,
      name: "Kolkata 400/220 kV",
      region: "Eastern",
      voltage: "400/220",
      coordinates: [22.5726, 88.3639],
      status: "operational",
      capacity: "2000 MW",
      load: "85%",
      assets: 45,
      lastInspection: "2024-01-15"
    },
    {
      id: 2,
      name: "Delhi North 400 kV",
      region: "Northern",
      voltage: "400",
      coordinates: [28.7041, 77.1025],
      status: "operational",
      capacity: "2500 MW",
      load: "92%",
      assets: 52,
      lastInspection: "2024-01-10"
    },
    {
      id: 3,
      name: "Mumbai West 400/220 kV",
      region: "Western",
      voltage: "400/220",
      coordinates: [19.0760, 72.8777],
      status: "maintenance",
      capacity: "1800 MW",
      load: "78%",
      assets: 38,
      lastInspection: "2024-01-05"
    },
    {
      id: 4,
      name: "Chennai South 400 kV",
      region: "Southern",
      voltage: "400",
      coordinates: [13.0827, 80.2707],
      status: "operational",
      capacity: "1500 MW",
      load: "88%",
      assets: 42,
      lastInspection: "2024-01-12"
    },
    {
      id: 5,
      name: "Bangalore East 220 kV",
      region: "Southern",
      voltage: "220",
      coordinates: [12.9716, 77.5946],
      status: "operational",
      capacity: "1200 MW",
      load: "95%",
      assets: 35,
      lastInspection: "2024-01-08"
    },
    {
      id: 6,
      name: "Hyderabad Central 400/220 kV",
      region: "Southern",
      voltage: "400/220",
      coordinates: [17.3850, 78.4867],
      status: "warning",
      capacity: "1600 MW",
      load: "82%",
      assets: 40,
      lastInspection: "2024-01-14"
    },
    {
      id: 7,
      name: "Ahmedabad North 400 kV",
      region: "Western",
      voltage: "400",
      coordinates: [23.0225, 72.5714],
      status: "operational",
      capacity: "1400 MW",
      load: "75%",
      assets: 36,
      lastInspection: "2024-01-03"
    },
    {
      id: 8,
      name: "Pune Industrial 220 kV",
      region: "Western",
      voltage: "220",
      coordinates: [18.5204, 73.8567],
      status: "operational",
      capacity: "1000 MW",
      load: "90%",
      assets: 32,
      lastInspection: "2024-01-07"
    },
    {
      id: 9,
      name: "Jaipur South 400 kV",
      region: "Northern",
      voltage: "400",
      coordinates: [26.9124, 75.7873],
      status: "operational",
      capacity: "1300 MW",
      load: "80%",
      assets: 34,
      lastInspection: "2024-01-09"
    },
    {
      id: 10,
      name: "Lucknow Central 220 kV",
      region: "Northern",
      voltage: "220",
      coordinates: [26.8467, 80.9462],
      status: "maintenance",
      capacity: "900 MW",
      load: "65%",
      assets: 28,
      lastInspection: "2024-01-02"
    },
    {
      id: 11,
      name: "Patna Grid 400/220 kV",
      region: "Eastern",
      voltage: "400/220",
      coordinates: [25.5941, 85.1376],
      status: "operational",
      capacity: "1100 MW",
      load: "88%",
      assets: 33,
      lastInspection: "2024-01-11"
    },
    {
      id: 12,
      name: "Bhubaneswar East 220 kV",
      region: "Eastern",
      voltage: "220",
      coordinates: [20.2961, 85.8245],
      status: "warning",
      capacity: "800 MW",
      load: "92%",
      assets: 30,
      lastInspection: "2024-01-06"
    }
  ];

  // Transmission lines data
  const transmissionLines = [
    { from: 1, to: 4, voltage: "400", length: "1200 km", status: "operational" },
    { from: 2, to: 3, voltage: "400", length: "1400 km", status: "operational" },
    { from: 2, to: 9, voltage: "400", length: "250 km", status: "operational" },
    { from: 3, to: 6, voltage: "400", length: "700 km", status: "operational" },
    { from: 4, to: 5, voltage: "220", length: "300 km", status: "operational" },
    { from: 4, to: 6, voltage: "400", length: "600 km", status: "operational" },
    { from: 6, to: 8, voltage: "220", length: "500 km", status: "operational" },
    { from: 7, to: 8, voltage: "220", length: "150 km", status: "operational" },
    { from: 9, to: 10, voltage: "220", length: "350 km", status: "maintenance" },
    { from: 1, to: 11, voltage: "400", length: "450 km", status: "operational" },
    { from: 11, to: 12, voltage: "220", length: "200 km", status: "operational" }
  ];

  // Filter substations based on selections
  const filteredSubstations = substations.filter(sub => {
    if (selectedRegion !== 'all' && sub.region !== selectedRegion) return false;
    if (selectedVoltage !== 'all' && sub.voltage !== selectedVoltage) return false;
    return true;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Get status class for Tailwind
  const getStatusClass = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Custom marker icon using divIcon
  const createCustomIcon = (status) => {
    const color = getStatusColor(status);
    return L.divIcon({
      html: `<div style="background: white; width: 24px; height: 24px; border-radius: 50%; border: 3px solid ${color}; display: flex; align-items: center; justify-content: center;">
        <div style="width: 12px; height: 12px; border-radius: 50%; background: ${color};"></div>
      </div>`,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Calculate grid statistics
  const gridStats = {
    totalSubstations: substations.length,
    operational: substations.filter(s => s.status === 'operational').length,
    underMaintenance: substations.filter(s => s.status === 'maintenance').length,
    warnings: substations.filter(s => s.status === 'warning').length,
    totalCapacity: substations.reduce((sum, s) => sum + parseInt(s.capacity), 0) + ' MW',
    avgLoad: Math.round(substations.reduce((sum, s) => sum + parseInt(s.load), 0) / substations.length) + '%'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back
              </button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                National Power Grid Map
              </h1>
              <p className="text-gray-600">Interactive visualization of 400/220 kV transmission network</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="fas fa-download mr-2"></i>
                Export Data
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                <i className="fas fa-print mr-2"></i>
                Print
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Controls Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Filter by Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Regions</option>
                    <option value="Northern">Northern Region</option>
                    <option value="Southern">Southern Region</option>
                    <option value="Eastern">Eastern Region</option>
                    <option value="Western">Western Region</option>
                  </select>
                </div>

                {/* Voltage Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-bolt mr-2"></i>
                    Filter by Voltage
                  </label>
                  <select
                    value={selectedVoltage}
                    onChange={(e) => setSelectedVoltage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Voltages</option>
                    <option value="400">400 kV</option>
                    <option value="220">220 kV</option>
                    <option value="400/220">400/220 kV</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-chart-line mr-2"></i>
                    View Statistics
                  </label>
                  <button className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 hover:bg-gray-100">
                    <i className="fas fa-filter mr-2"></i>
                    Advanced Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Grid Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Substations</span>
                <span className="font-bold">{gridStats.totalSubstations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Operational</span>
                <span className="text-green-600 font-bold">{gridStats.operational}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Under Maintenance</span>
                <span className="text-red-600 font-bold">{gridStats.underMaintenance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Capacity</span>
                <span className="font-bold">{gridStats.totalCapacity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Map Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Live Grid Network</h3>
                    <p className="text-sm text-blue-200">Real-time substation monitoring</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Operational</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Warning</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[600px] relative">
                <MapContainer
                  center={mapData.center}
                  zoom={mapData.zoom}
                  className="h-full w-full"
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Transmission Lines */}
                  {transmissionLines.map((line, idx) => {
                    const fromStation = substations.find(s => s.id === line.from);
                    const toStation = substations.find(s => s.id === line.to);
                    
                    if (!fromStation || !toStation) return null;
                    
                    const lineColor = line.status === 'operational' ? '#10B981' : 
                                    line.status === 'maintenance' ? '#EF4444' : '#F59E0B';
                    
                    return (
                      <Polyline
                        key={idx}
                        positions={[fromStation.coordinates, toStation.coordinates]}
                        color={lineColor}
                        weight={2}
                        opacity={0.8}
                      />
                    );
                  })}

                  {/* Substation Markers */}
                  {filteredSubstations.map((station) => (
                    <Marker
                      key={station.id}
                      position={station.coordinates}
                      icon={createCustomIcon(station.status)}
                      eventHandlers={{
                        mouseover: () => setHoveredSubstation(station.id),
                        mouseout: () => setHoveredSubstation(null),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[250px]">
                          <h4 className="font-bold text-lg mb-2">{station.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <i className="fas fa-map-marker-alt text-gray-500 mr-2 w-5"></i>
                              <span>Region: {station.region}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-bolt text-yellow-500 mr-2 w-5"></i>
                              <span>Voltage: {station.voltage} kV</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-chart-line text-blue-500 mr-2 w-5"></i>
                              <span>Capacity: {station.capacity}</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-percentage text-green-500 mr-2 w-5"></i>
                              <span>Current Load: {station.load}</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${getStatusClass(station.status).split(' ')[0]}`}></div>
                              <span className="capitalize">Status: {station.status}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => navigate(`/substation/${station.id}`)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                          >
                            View Details
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    onClick={() => setMapData({ ...mapData, zoom: mapData.zoom + 1 })}
                    className="bg-white w-10 h-10 rounded-lg shadow flex items-center justify-center hover:bg-gray-50"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <button
                    onClick={() => setMapData({ ...mapData, zoom: mapData.zoom - 1 })}
                    className="bg-white w-10 h-10 rounded-lg shadow flex items-center justify-center hover:bg-gray-50"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <button
                    onClick={() => setMapData({ center: [20.5937, 78.9629], zoom: 5 })}
                    className="bg-white w-10 h-10 rounded-lg shadow flex items-center justify-center hover:bg-gray-50"
                  >
                    <i className="fas fa-home"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel - Substation List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm h-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4">
                <h3 className="font-bold">Substation List</h3>
                <p className="text-sm text-blue-200">{filteredSubstations.length} substations found</p>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[540px]">
                {filteredSubstations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-map-marker-alt text-4xl mb-4"></i>
                    <p>No substations match your filters</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSubstations.map((station) => (
                      <div
                        key={station.id}
                        className={`border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-all ${
                          hoveredSubstation === station.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onMouseEnter={() => setHoveredSubstation(station.id)}
                        onMouseLeave={() => setHoveredSubstation(null)}
                        onClick={() => {
                          // Center map on this station
                          setMapData({
                            center: station.coordinates,
                            zoom: 7
                          });
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{station.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(station.status)}`}>
                            {station.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                            <span>{station.voltage} kV</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                            <span>{station.region}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-chart-line text-green-500 mr-2"></i>
                            <span>{station.capacity}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-percentage text-purple-500 mr-2"></i>
                            <span>Load: {station.load}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            <i className="fas fa-calendar-alt mr-1"></i>
                            Last inspection: {station.lastInspection}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/substation/${station.id}`);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-info-circle text-blue-600 mr-2"></i>
              Map Legend
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                <span>Operational Substation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
                <span>Warning/Alert</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                <span>Under Maintenance</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-1 bg-green-500 mr-3"></div>
                <span>400 kV Transmission Line</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-1 bg-blue-500 mr-3"></div>
                <span>220 kV Transmission Line</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-chart-bar text-blue-600 mr-2"></i>
              Regional Distribution
            </h4>
            <div className="space-y-4">
              {['Northern', 'Southern', 'Eastern', 'Western'].map(region => {
                const count = substations.filter(s => s.region === region).length;
                const percentage = Math.round((count / substations.length) * 100);
                return (
                  <div key={region}>
                    <div className="flex justify-between mb-1">
                      <span>{region} Region</span>
                      <span>{count} substations ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-bolt text-blue-600 mr-2"></i>
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                <i className="fas fa-download text-blue-600 mr-2"></i>
                Download Grid Data (CSV)
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                <i className="fas fa-print text-blue-600 mr-2"></i>
                Print Network Map
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors">
                <i className="fas fa-share-alt text-blue-600 mr-2"></i>
                Share Map View
              </button>
              <button 
                onClick={() => navigate('/reports')}
                className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors"
              >
                <i className="fas fa-file-alt text-blue-600 mr-2"></i>
                Generate Network Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridMap;