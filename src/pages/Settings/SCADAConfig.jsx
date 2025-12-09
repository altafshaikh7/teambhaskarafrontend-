import React, { useState } from 'react'
import { Save, RefreshCw, Database } from 'lucide-react'

const SCADAConfig = () => {
  const [config, setConfig] = useState({
    dataInterval: 2,
    retentionPeriod: 30,
    maxConnections: 100,
    timeout: 30,
    compression: true,
    encryption: true,
    backupEnabled: true,
    backupInterval: 24
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      console.log('Configuration saved:', config)
    }, 2000)
  }

  const handleReset = () => {
    setConfig({
      dataInterval: 2,
      retentionPeriod: 30,
      maxConnections: 100,
      timeout: 30,
      compression: true,
      encryption: true,
      backupEnabled: true,
      backupInterval: 24
    })
  }

  const handleChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">SCADA System Configuration</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Collection */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Database className="h-5 w-5 text-blue-600" />
            <span>Data Collection</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Collection Interval (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={config.dataInterval}
                onChange={(e) => handleChange('dataInterval', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={config.retentionPeriod}
                onChange={(e) => handleChange('retentionPeriod', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="compression"
                checked={config.compression}
                onChange={(e) => handleChange('compression', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="compression" className="text-sm text-gray-700">
                Enable data compression
              </label>
            </div>
          </div>
        </div>

        {/* Connection Settings */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Connection Settings</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Connections
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={config.maxConnections}
                onChange={(e) => handleChange('maxConnections', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Connection Timeout (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={config.timeout}
                onChange={(e) => handleChange('timeout', parseInt(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="encryption"
                checked={config.encryption}
                onChange={(e) => handleChange('encryption', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="encryption" className="text-sm text-gray-700">
                Enable data encryption
              </label>
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Backup Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="backupEnabled"
                checked={config.backupEnabled}
                onChange={(e) => handleChange('backupEnabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="backupEnabled" className="text-sm text-gray-700">
                Enable automatic backups
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Backup Interval (hours)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={config.backupInterval}
                onChange={(e) => handleChange('backupInterval', parseInt(e.target.value))}
                disabled={!config.backupEnabled}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4">System Status</h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">SCADA Server</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Running
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Data Points</span>
              <span className="text-sm font-medium text-gray-900">1,247</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Alarms</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-gray-900">45 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SCADAConfig