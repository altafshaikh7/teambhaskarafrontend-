import React, { useState } from 'react'
import { Save, Wifi, Cpu, RefreshCw, Plus, Trash2 } from 'lucide-react'

const IoTConfig = () => {
  const [iotConfig, setIotConfig] = useState({
    devices: [
      {
        id: 'sensor_400_1',
        name: '400kV Bay 1 Sensor',
        type: 'voltage_sensor',
        status: 'online',
        location: '400kV Switchyard',
        lastSeen: '2024-01-15 14:30:45',
        battery: 85,
        signal: 'excellent'
      },
      {
        id: 'sensor_400_2',
        name: '400kV Bay 2 Sensor',
        type: 'current_sensor',
        status: 'online',
        location: '400kV Switchyard',
        lastSeen: '2024-01-15 14:28:12',
        battery: 92,
        signal: 'good'
      },
      {
        id: 'sensor_xfmr_1',
        name: 'Transformer Temp Sensor',
        type: 'temperature_sensor',
        status: 'offline',
        location: 'Transformer Bay 1',
        lastSeen: '2024-01-14 18:45:30',
        battery: 45,
        signal: 'poor'
      },
      {
        id: 'gateway_1',
        name: 'Main IoT Gateway',
        type: 'gateway',
        status: 'online',
        location: 'Control Room',
        lastSeen: '2024-01-15 14:31:02',
        battery: 100,
        signal: 'excellent'
      }
    ],
    network: {
      protocol: 'LoRaWAN',
      frequency: '868 MHz',
      dataRate: 'SF7',
      power: 14,
      retries: 3
    },
    polling: {
      interval: 30,
      timeout: 10,
      batchSize: 50
    }
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showAddDevice, setShowAddDevice] = useState(false)
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'voltage_sensor',
    location: ''
  })

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      console.log('IoT configuration saved:', iotConfig)
    }, 2000)
  }

  const handleNetworkChange = (key, value) => {
    setIotConfig(prev => ({
      ...prev,
      network: {
        ...prev.network,
        [key]: value
      }
    }))
  }

  const handlePollingChange = (key, value) => {
    setIotConfig(prev => ({
      ...prev,
      polling: {
        ...prev.polling,
        [key]: parseInt(value)
      }
    }))
  }

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.location) return

    const device = {
      id: `sensor_${Date.now()}`,
      name: newDevice.name,
      type: newDevice.type,
      status: 'offline',
      location: newDevice.location,
      lastSeen: new Date().toISOString().slice(0, 19).replace('T', ' '),
      battery: 100,
      signal: 'unknown'
    }

    setIotConfig(prev => ({
      ...prev,
      devices: [...prev.devices, device]
    }))

    setNewDevice({ name: '', type: 'voltage_sensor', location: '' })
    setShowAddDevice(false)
  }

  const handleRemoveDevice = (deviceId) => {
    setIotConfig(prev => ({
      ...prev,
      devices: prev.devices.filter(device => device.id !== deviceId)
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800'
      case 'offline': return 'bg-red-100 text-red-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'fair': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">IoT Device Configuration</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddDevice(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Device</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Add IoT Device</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter device name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type
                </label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, type: e.target.value }))}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="voltage_sensor">Voltage Sensor</option>
                  <option value="current_sensor">Current Sensor</option>
                  <option value="temperature_sensor">Temperature Sensor</option>
                  <option value="humidity_sensor">Humidity Sensor</option>
                  <option value="gateway">Gateway</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newDevice.location}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, location: e.target.value }))}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter device location"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddDevice(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                className="btn-primary"
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Settings */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-blue-600" />
            <span>Network Configuration</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Communication Protocol
              </label>
              <select
                value={iotConfig.network.protocol}
                onChange={(e) => handleNetworkChange('protocol', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="LoRaWAN">LoRaWAN</option>
                <option value="NB-IoT">NB-IoT</option>
                <option value="WiFi">WiFi</option>
                <option value="Ethernet">Ethernet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency Band
              </label>
              <select
                value={iotConfig.network.frequency}
                onChange={(e) => handleNetworkChange('frequency', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="868 MHz">868 MHz (EU)</option>
                <option value="915 MHz">915 MHz (US)</option>
                <option value="433 MHz">433 MHz</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Rate
              </label>
              <select
                value={iotConfig.network.dataRate}
                onChange={(e) => handleNetworkChange('dataRate', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="SF7">SF7 (Fastest)</option>
                <option value="SF8">SF8</option>
                <option value="SF9">SF9</option>
                <option value="SF10">SF10</option>
                <option value="SF11">SF11</option>
                <option value="SF12">SF12 (Slowest)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transmission Power (dBm)
              </label>
              <input
                type="number"
                min="2"
                max="20"
                value={iotConfig.network.power}
                onChange={(e) => handleNetworkChange('power', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retry Attempts
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={iotConfig.network.retries}
                onChange={(e) => handleNetworkChange('retries', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Polling Settings */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-green-600" />
            <span>Data Polling</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Polling Interval (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={iotConfig.polling.interval}
                onChange={(e) => handlePollingChange('interval', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Request Timeout (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={iotConfig.polling.timeout}
                onChange={(e) => handlePollingChange('timeout', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Size
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={iotConfig.polling.batchSize}
                onChange={(e) => handlePollingChange('batchSize', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Device List */}
        <div className="card lg:col-span-2">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-purple-600" />
            <span>Connected Devices</span>
          </h4>
          
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Seen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {iotConfig.devices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{device.name}</div>
                      <div className="text-sm text-gray-500">{device.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {device.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {device.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              device.battery >= 60 ? 'bg-green-500' : 
                              device.battery >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{device.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getSignalColor(device.signal)}`}>
                        {device.signal}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {device.lastSeen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {iotConfig.devices.length} devices
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IoTConfig