import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransformerPanel from './TransformerPanel'
import BreakerPanel from './BreakerPanel'
import CTPanels from './CTPanels'
import LineHealthCard from '../../components/health/LineHealthCard'

const AssetHealth = () => {
  const [activeTab, setActiveTab] = useState('transformers')
  const navigate = useNavigate()

  const tabs = [
    { id: 'transformers', name: 'Transformers' },
    { id: 'breakers', name: 'Circuit Breakers' },
    { id: 'cts', name: 'Current Transformers' },
    { id: 'lines', name: 'Transmission Lines' },
  ]

  // Navigation handlers
  const handleViewDetails = (asset) => {
    console.log('Viewing details for:', asset)
    navigate('/asset-details', { state: { asset } })
  }

  const handleMaintenanceLog = (asset) => {
    console.log('Opening maintenance log for:', asset)
    navigate('/maintenance-log', { state: { asset } })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Asset Health Monitoring</h1>
        <div className="text-sm text-gray-500">
          Real-time equipment condition assessment
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
        {activeTab === 'transformers' && (
          <TransformerPanel 
            onViewDetails={handleViewDetails}
            onMaintenanceLog={handleMaintenanceLog}
          />
        )}
        {activeTab === 'breakers' && (
          <BreakerPanel 
            onViewDetails={handleViewDetails}
            onMaintenanceLog={handleMaintenanceLog}
          />
        )}
        {activeTab === 'cts' && (
          <CTPanels 
            onViewDetails={handleViewDetails}
            onMaintenanceLog={handleMaintenanceLog}
          />
        )}
        {activeTab === 'lines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineHealthCard 
              assetId="LINE_400_1"
              name="400kV Line 1"
              healthScore={88}
              length="150 km"
              capacity="2000 A"
              onViewDetails={handleViewDetails}
              onMaintenanceLog={handleMaintenanceLog}
            />
            <LineHealthCard 
              assetId="LINE_400_2"
              name="400kV Line 2"
              healthScore={92}
              length="120 km"
              capacity="2000 A"
              onViewDetails={handleViewDetails}
              onMaintenanceLog={handleMaintenanceLog}
            />
            <LineHealthCard 
              assetId="LINE_220_1"
              name="220kV Line 1"
              healthScore={76}
              length="80 km"
              capacity="1500 A"
              onViewDetails={handleViewDetails}
              onMaintenanceLog={handleMaintenanceLog}
            />
            <LineHealthCard 
              assetId="LINE_220_2"
              name="220kV Line 2"
              healthScore={85}
              length="95 km"
              capacity="1500 A"
              onViewDetails={handleViewDetails}
              onMaintenanceLog={handleMaintenanceLog}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetHealth