import React from 'react'

const FaultProbabilityHeatmap = () => {
  const zones = [
    { id: 'A1', risk: 'low', name: '400kV Switchyard' },
    { id: 'A2', risk: 'medium', name: 'Transformer Bay 1' },
    { id: 'A3', risk: 'high', name: 'Transformer Bay 2' },
    { id: 'B1', risk: 'low', name: '220kV Switchyard' },
    { id: 'B2', risk: 'medium', name: 'Control Building' },
    { id: 'B3', risk: 'low', name: 'Auxiliary Systems' },
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="grid grid-cols-3 gap-2 aspect-square max-w-md mx-auto">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`${getRiskColor(zone.risk)} rounded-lg flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity`}
            title={`${zone.name} - ${zone.risk.toUpperCase()} risk`}
          >
            {zone.id}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Low Risk</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  )
}

export default FaultProbabilityHeatmap