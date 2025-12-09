import React, { useState } from 'react'
import { Save, Bell, Mail, MessageCircle } from 'lucide-react'

const AlertsConfig = () => {
  const [alertsConfig, setAlertsConfig] = useState({
    emailAlerts: {
      enabled: true,
      critical: true,
      warning: true,
      info: false,
      recipients: ['operator@substation.com', 'supervisor@substation.com']
    },
    smsAlerts: {
      enabled: false,
      critical: true,
      warning: false,
      info: false,
      recipients: ['+1234567890']
    },
    pushAlerts: {
      enabled: true,
      critical: true,
      warning: true,
      info: true
    },
    thresholds: {
      voltage: {
        critical: { min: 380, max: 420 },
        warning: { min: 390, max: 410 }
      },
      temperature: {
        critical: 85,
        warning: 75
      },
      current: {
        critical: 1800,
        warning: 1500
      }
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '06:00'
    }
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      console.log('Alerts configuration saved:', alertsConfig)
    }, 2000)
  }

  const handleConfigChange = (section, key, value) => {
    setAlertsConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleThresholdChange = (parameter, level, field, value) => {
    setAlertsConfig(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [parameter]: {
          ...prev.thresholds[parameter],
          [level]: {
            ...prev.thresholds[parameter][level],
            [field]: parseFloat(value)
          }
        }
      }
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Alerts */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Email Alerts</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable Email Alerts</span>
              <input
                type="checkbox"
                checked={alertsConfig.emailAlerts.enabled}
                onChange={(e) => handleConfigChange('emailAlerts', 'enabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Alert Levels</label>
              <div className="space-y-2">
                {['critical', 'warning', 'info'].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={alertsConfig.emailAlerts[level]}
                      onChange={(e) => handleConfigChange('emailAlerts', level, e.target.checked)}
                      disabled={!alertsConfig.emailAlerts.enabled}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{level} Alerts</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Recipients</label>
              <textarea
                value={alertsConfig.emailAlerts.recipients.join('\n')}
                onChange={(e) => handleConfigChange('emailAlerts', 'recipients', e.target.value.split('\n'))}
                disabled={!alertsConfig.emailAlerts.enabled}
                rows={3}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
                placeholder="Enter email addresses, one per line"
              />
            </div>
          </div>
        </div>

        {/* SMS Alerts */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <span>SMS Alerts</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable SMS Alerts</span>
              <input
                type="checkbox"
                checked={alertsConfig.smsAlerts.enabled}
                onChange={(e) => handleConfigChange('smsAlerts', 'enabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Alert Levels</label>
              <div className="space-y-2">
                {['critical', 'warning', 'info'].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={alertsConfig.smsAlerts[level]}
                      onChange={(e) => handleConfigChange('smsAlerts', level, e.target.checked)}
                      disabled={!alertsConfig.smsAlerts.enabled}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{level} Alerts</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Numbers</label>
              <textarea
                value={alertsConfig.smsAlerts.recipients.join('\n')}
                onChange={(e) => handleConfigChange('smsAlerts', 'recipients', e.target.value.split('\n'))}
                disabled={!alertsConfig.smsAlerts.enabled}
                rows={3}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
                placeholder="Enter phone numbers, one per line"
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-600" />
            <span>Push Notifications</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable Push Notifications</span>
              <input
                type="checkbox"
                checked={alertsConfig.pushAlerts.enabled}
                onChange={(e) => handleConfigChange('pushAlerts', 'enabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Alert Levels</label>
              <div className="space-y-2">
                {['critical', 'warning', 'info'].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={alertsConfig.pushAlerts[level]}
                      onChange={(e) => handleConfigChange('pushAlerts', level, e.target.checked)}
                      disabled={!alertsConfig.pushAlerts.enabled}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 capitalize">{level} Alerts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="card lg:col-span-2">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Alert Thresholds</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Voltage Thresholds */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Voltage (kV)</h5>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Critical Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={alertsConfig.thresholds.voltage.critical.min}
                      onChange={(e) => handleThresholdChange('voltage', 'critical', 'min', e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                    <span className="flex items-center">to</span>
                    <input
                      type="number"
                      value={alertsConfig.thresholds.voltage.critical.max}
                      onChange={(e) => handleThresholdChange('voltage', 'critical', 'max', e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Warning Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={alertsConfig.thresholds.voltage.warning.min}
                      onChange={(e) => handleThresholdChange('voltage', 'warning', 'min', e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                    <span className="flex items-center">to</span>
                    <input
                      type="number"
                      value={alertsConfig.thresholds.voltage.warning.max}
                      onChange={(e) => handleThresholdChange('voltage', 'warning', 'max', e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature Thresholds */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Temperature (°C)</h5>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Critical</label>
                  <input
                    type="number"
                    value={alertsConfig.thresholds.temperature.critical}
                    onChange={(e) => handleConfigChange('thresholds', 'temperature', { ...alertsConfig.thresholds.temperature, critical: parseFloat(e.target.value) })}
                    className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Warning</label>
                  <input
                    type="number"
                    value={alertsConfig.thresholds.temperature.warning}
                    onChange={(e) => handleConfigChange('thresholds', 'temperature', { ...alertsConfig.thresholds.temperature, warning: parseFloat(e.target.value) })}
                    className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Current Thresholds */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Current (A)</h5>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Critical</label>
                  <input
                    type="number"
                    value={alertsConfig.thresholds.current.critical}
                    onChange={(e) => handleConfigChange('thresholds', 'current', { ...alertsConfig.thresholds.current, critical: parseFloat(e.target.value) })}
                    className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Warning</label>
                  <input
                    type="number"
                    value={alertsConfig.thresholds.current.warning}
                    onChange={(e) => handleConfigChange('thresholds', 'current', { ...alertsConfig.thresholds.current, warning: parseFloat(e.target.value) })}
                    className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Quiet Hours</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable Quiet Hours</span>
              <input
                type="checkbox"
                checked={alertsConfig.quietHours.enabled}
                onChange={(e) => handleConfigChange('quietHours', 'enabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Start Time</label>
                <input
                  type="time"
                  value={alertsConfig.quietHours.start}
                  onChange={(e) => handleConfigChange('quietHours', 'start', e.target.value)}
                  disabled={!alertsConfig.quietHours.enabled}
                  className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">End Time</label>
                <input
                  type="time"
                  value={alertsConfig.quietHours.end}
                  onChange={(e) => handleConfigChange('quietHours', 'end', e.target.value)}
                  disabled={!alertsConfig.quietHours.enabled}
                  className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertsConfig