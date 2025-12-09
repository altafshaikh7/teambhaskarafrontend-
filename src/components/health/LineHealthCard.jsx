import React from 'react'
import { MapPin, Zap, Thermometer, AlertTriangle } from 'lucide-react'
import StatusBadge from '../common/StatusBadge'

const LineHealthCard = ({ 
  assetId, 
  name, 
  healthScore, 
  length, 
  capacity,
  onViewDetails,
  onMaintenanceLog
}) => {
  const getStatus = (score) => {
    if (score >= 85) return 'operational'
    if (score >= 70) return 'warning'
    return 'critical'
  }

  // Mock line parameters
  const parameters = [
    { name: 'Corrosion', value: 92 },
    { name: 'Sag', value: 88 },
    { name: 'Insulation', value: 85 },
    { name: 'Thermal Rating', value: 90 }
  ]

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails({ assetId, name, healthScore, length, capacity })
    } else {
      console.log('View details for:', { assetId, name, healthScore, length, capacity })
      // Default behavior - you can replace with modal or navigation
      alert(`Viewing details for ${name} (${assetId})`)
    }
  }

  const handleMaintenanceLog = () => {
    if (onMaintenanceLog) {
      onMaintenanceLog({ assetId, name })
    } else {
      console.log('Maintenance log for:', { assetId, name })
      // Default behavior
      alert(`Opening maintenance log for ${name}`)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{assetId}</p>
        </div>
        <StatusBadge status={getStatus(healthScore)}>
          {healthScore}%
        </StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-gray-400" />
          <span>{capacity}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="font-medium text-gray-900 text-sm">Condition Parameters</h4>
        {parameters.map((param) => (
          <div key={param.name} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{param.name}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    param.value >= 85 ? 'bg-green-500' : 
                    param.value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${param.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium w-8">{param.value}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <button 
          className="btn-primary text-sm flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button 
          className="btn-secondary text-sm flex-1"
          onClick={handleMaintenanceLog}
        >
          Maintenance Log
        </button>
      </div>

      {healthScore < 75 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Inspection recommended within 30 days
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LineHealthCard