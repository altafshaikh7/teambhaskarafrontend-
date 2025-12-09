import React from 'react'

const FaultSelector = ({ selectedFault, onFaultSelect }) => {
  const faultTypes = [
    {
      id: 'short_circuit',
      name: 'Short Circuit',
      description: 'Phase-to-phase or phase-to-ground fault',
      severity: 'high',
      color: 'bg-red-100 border-red-300'
    },
    {
      id: 'ground_fault',
      name: 'Ground Fault',
      description: 'Single phase to ground connection',
      severity: 'medium',
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      id: 'over_voltage',
      name: 'Over Voltage',
      description: 'Voltage exceeds normal operating limits',
      severity: 'medium',
      color: 'bg-orange-100 border-orange-300'
    },
    {
      id: 'under_voltage',
      name: 'Under Voltage',
      description: 'Voltage drops below normal limits',
      severity: 'low',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: 'transformer_fault',
      name: 'Transformer Fault',
      description: 'Internal transformer winding or core fault',
      severity: 'high',
      color: 'bg-red-100 border-red-300'
    },
    {
      id: 'line_fault',
      name: 'Line Fault',
      description: 'Transmission line conductor failure',
      severity: 'high',
      color: 'bg-red-100 border-red-300'
    }
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fault Type</h3>
      
      <div className="space-y-3">
        {faultTypes.map((fault) => (
          <div
            key={fault.id}
            onClick={() => onFaultSelect(fault.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedFault === fault.id
                ? `${fault.color} border-blue-500 ring-2 ring-blue-200`
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{fault.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{fault.description}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                fault.severity === 'high' ? 'bg-red-500' :
                fault.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaultSelector