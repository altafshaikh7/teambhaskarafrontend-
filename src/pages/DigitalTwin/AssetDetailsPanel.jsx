import React from 'react'
import { useSocket } from '../../contexts/SocketContext'
import StatusBadge from '../../components/common/StatusBadge'

const AssetDetailsPanel = ({ asset }) => {
  const { sensorData } = useSocket()

  if (!asset) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Details</h3>
        <div className="text-center py-8 text-gray-500">
          <p>Select an asset to view details</p>
        </div>
      </div>
    )
  }

  const assetData = sensorData[asset.id] || {}
  const getHealthScore = () => {
    if (assetData.temperature?.value > 85) return 65
    if (assetData.voltage?.value > 420) return 75
    return 92
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Details</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">{asset.id}</h4>
          <p className="text-sm text-gray-500 capitalize">{asset.type}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <StatusBadge status="operational" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Health Score</span>
          <span className="text-sm font-medium text-green-600">{getHealthScore()}%</span>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Real-time Data</h5>
          <div className="space-y-2">
            {Object.entries(assetData).map(([sensorType, data]) => (
              <div key={sensorType} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{sensorType.replace('_', ' ')}</span>
                <span className="font-medium">
                  {data.value} {data.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {assetData.temperature?.value > 80 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> High temperature detected
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssetDetailsPanel