import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const RULCard = ({ assetId, assetName, currentRUL, confidence, trend }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600'
      case 'decreasing':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{assetName}</h3>
          <p className="text-sm text-gray-500">{assetId}</p>
        </div>
        <div className="flex items-center space-x-1">
          {getTrendIcon(trend)}
          <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
            {trend}
          </span>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-2">{currentRUL}</div>
        <div className="text-sm text-gray-600">Remaining Useful Life</div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Prediction Confidence</span>
            <span className="font-medium">{confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">12.5 years</div>
            <div className="text-gray-600">Initial RUL</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-semibold text-gray-900">4.3 years</div>
            <div className="text-gray-600">Age</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Next Maintenance:</strong> Recommended in 2.1 years
        </p>
      </div>
    </div>
  )
}

export default RULCard