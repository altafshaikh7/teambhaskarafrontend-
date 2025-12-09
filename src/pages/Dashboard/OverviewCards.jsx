// src/pages/Dashboard/OverviewCards.jsx
import React from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { 
  Zap, 
  Thermometer, 
  Gauge, 
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const OverviewCards = () => {
  const { sensorData } = useSocket()

  const getLatestValue = (assetId, sensorType) => {
    return sensorData[assetId]?.[sensorType]?.value || 0
  }

  const cards = [
    {
      title: '400kV Bus Voltage',
      value: `${getLatestValue('BUS_400_1', 'voltage').toFixed(1)} kV`,
      icon: Zap,
      status: getLatestValue('BUS_400_1', 'voltage') > 420 ? 'warning' : 'normal',
      change: '+0.2%',
      trend: 'up',
      standard: '400 kV ±5%',
      color: 'blue'
    },
    {
      title: 'Transformer Temperature',
      value: `${getLatestValue('XFMR_400_1', 'temperature').toFixed(1)} °C`,
      icon: Thermometer,
      status: getLatestValue('XFMR_400_1', 'temperature') > 85 ? 'critical' : 'normal',
      change: '+1.5°C',
      trend: 'up',
      standard: 'Max: 85°C',
      color: 'orange'
    },
    {
      title: 'Line Current Load',
      value: `${getLatestValue('LINE_400_1', 'current').toFixed(0)} A`,
      icon: Activity,
      status: 'normal',
      change: '-0.3%',
      trend: 'down',
      standard: 'Capacity: 2000A',
      color: 'green'
    },
    {
      title: 'System Frequency',
      value: `${getLatestValue('BUS_400_1', 'frequency').toFixed(2)} Hz`,
      icon: Gauge,
      status: 'normal',
      change: '0.0%',
      trend: 'stable',
      standard: '50.00 Hz ±0.5',
      color: 'purple'
    }
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600'
      case 'orange': return 'bg-orange-100 text-orange-600'
      case 'green': return 'bg-green-100 text-green-600'
      case 'purple': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{card.title}</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {card.standard}
              </span>
            </div>
            <div className={`p-2 rounded-lg ${getColorClasses(card.color)}`}>
              <card.icon className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <div className="flex items-center space-x-2">
                {getTrendIcon(card.trend)}
                <span className={`text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 
                  card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {card.change}
                </span>
              </div>
            </div>
          </div>
          
          {card.status !== 'normal' && (
            <div className={`flex items-center mt-3 p-2 rounded border-l-4 ${
              card.status === 'critical' ? 'border-red-500 bg-red-50' : 'border-amber-500 bg-amber-50'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                card.status === 'critical' ? 'text-red-500' : 'text-amber-500'
              } mr-2`} />
              <span className={`text-sm font-semibold ${
                card.status === 'critical' ? 'text-red-700' : 'text-amber-700'
              }`}>
                {card.status === 'critical' ? 'CRITICAL ALERT' : 'WARNING'}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default OverviewCards