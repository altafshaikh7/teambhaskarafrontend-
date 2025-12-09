import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

const WarningAlerts = ({ anomalies }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'high': return 'bg-orange-50 border-orange-200'
      case 'medium': return 'bg-yellow-50 border-yellow-200'
      default: return 'bg-blue-50 border-blue-200'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      default: return 'text-blue-600'
    }
  }

  if (anomalies.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>No active alerts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
      
      <div className="space-y-3">
        {anomalies.map((anomaly, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getSeverityColor(anomaly.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${getSeverityIcon(anomaly.severity)}`} />
                <div>
                  <div className="font-medium text-gray-900">
                    {anomaly.asset_id} - {anomaly.severity.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {anomaly.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Score: {(anomaly.anomaly_score * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WarningAlerts