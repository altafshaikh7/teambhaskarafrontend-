import React from 'react'

const FaultLocationSelector = ({ selectedLocation, onLocationSelect }) => {
  const locations = [
    {
      id: 'bus_400_1',
      name: '400kV Bus 1',
      voltage: '400 kV',
      type: 'busbar'
    },
    {
      id: 'bus_220_1',
      name: '220kV Bus 1',
      voltage: '220 kV',
      type: 'busbar'
    },
    {
      id: 'xfmr_400_1',
      name: '400/220kV Transformer 1',
      voltage: '400/220 kV',
      type: 'transformer'
    },
    {
      id: 'line_400_1',
      name: '400kV Line 1',
      voltage: '400 kV',
      type: 'transmission_line'
    },
    {
      id: 'breaker_400_1',
      name: '400kV Breaker 1',
      voltage: '400 kV',
      type: 'breaker'
    },
    {
      id: 'ct_400_1',
      name: '400kV CT Bay 1',
      voltage: '400 kV',
      type: 'transformer'
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fault Location</h3>
      
      <div className="space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => onLocationSelect(location.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedLocation === location.id
                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div>
              <h4 className="font-medium text-gray-900">{location.name}</h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                <span>{location.voltage}</span>
                <span className="capitalize">{location.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaultLocationSelector