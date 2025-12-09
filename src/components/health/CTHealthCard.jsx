import React from 'react'
import { Gauge, Shield, Thermometer, Activity } from 'lucide-react'
import StatusBadge from '../common/StatusBadge'

const CTHealthCard = ({ 
  id, 
  name, 
  ratio, 
  accuracy, 
  year, 
  healthScore, 
  parameters,
  onViewDetails,
  onMaintenanceLog
}) => {
  const getStatus = (score) => {
    if (score >= 85) return 'operational'
    if (score >= 70) return 'warning'
    return 'critical'
  }

  const parameterIcons = {
    accuracy: Gauge,
    insulation: Shield,
    burden: Activity,
    thermal: Thermometer
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails({ id, name, ratio, accuracy, healthScore })
    } else {
      console.log('View details for CT:', { id, name })
      alert(`Viewing details for ${name} (${id})`)
    }
  }

  const handleMaintenanceLog = () => {
    if (onMaintenanceLog) {
      onMaintenanceLog({ id, name })
    } else {
      console.log('Maintenance log for CT:', { id, name })
      alert(`Opening maintenance log for ${name}`)
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
        <StatusBadge status={getStatus(healthScore)}>
          {healthScore}%
        </StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-600">Ratio:</span>
          <span className="ml-2 font-medium">{ratio}</span>
        </div>
        <div>
          <span className="text-gray-600">Accuracy:</span>
          <span className="ml-2 font-medium">{accuracy}</span>
        </div>
        <div>
          <span className="text-gray-600">Year:</span>
          <span className="ml-2 font-medium">{year}</span>
        </div>
        <div>
          <span className="text-gray-600">Health:</span>
          <span className="ml-2 font-medium">{healthScore}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 text-sm">Performance Parameters</h4>
        {Object.entries(parameters).map(([key, value]) => {
          const IconComponent = parameterIcons[key]
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {IconComponent && <IconComponent className="h-4 w-4 text-gray-400" />}
                <span className="text-sm text-gray-600 capitalize">
                  {key}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      value >= 90 ? 'bg-green-500' : 
                      value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-8">{value}%</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Added buttons section */}
      <div className="flex space-x-2 mt-4">
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

      {parameters.accuracy < 85 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Accuracy Warning:</strong> Consider calibration for {name}
          </p>
        </div>
      )}
    </div>
  )
}

export default CTHealthCard