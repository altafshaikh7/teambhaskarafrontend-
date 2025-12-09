// src/pages/Settings/Settings.jsx
import React, { useState } from 'react'
import SCADAConfig from './SCADAConfig'
import IoTConfig from './IoTConfig'
import ThresholdConfig from './ThresholdConfig'
import AlertsConfig from './AlertsConfig'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('scada')

  const tabs = [
    { id: 'scada', name: 'SCADA Configuration' },
    { id: 'iot', name: 'IoT Devices' },
    { id: 'thresholds', name: 'Thresholds' },
    { id: 'alerts', name: 'Alerts & Notifications' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <div className="text-sm text-gray-500">
          Configure system parameters and preferences
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'scada' && <SCADAConfig />}
        {activeTab === 'iot' && <IoTConfig />}
        {activeTab === 'thresholds' && <ThresholdConfig />}
        {activeTab === 'alerts' && <AlertsConfig />}
      </div>
    </div>
  )
}

export { Settings }
export default Settings