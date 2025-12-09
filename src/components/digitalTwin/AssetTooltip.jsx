import React from 'react'
import StatusBadge from '../common/StatusBadge'

const AssetTooltip = ({ asset, data, position }) => {
  if (!asset || !data) return null

  const getHealthScore = () => {
    if (data.temperature?.value > 85) return 65
    if (data.voltage?.value > 420) return 75
    return 92
  }

  return (
    <div 
      className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{asset.id}</h4>
        <StatusBadge status="operational" />
      </div>
      
      <p className="text-sm text-gray-600 mb-3 capitalize">{asset.type}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Health Score:</span>
          <span className="font-medium text-green-600">{getHealthScore()}%</span>
        </div>
        
        {Object.entries(data).map(([sensorType, sensorData]) => (
          <div key={sensorType} className="flex justify-between">
            <span className="text-gray-600 capitalize">{sensorType.replace('_', ' ')}:</span>
            <span className="font-medium">
              {sensorData.value} {sensorData.unit}
            </span>
          </div>
        ))}
      </div>
      
      {data.temperature?.value > 80 && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          High temperature warning
        </div>
      )}
    </div>
  )
}

export default AssetTooltip