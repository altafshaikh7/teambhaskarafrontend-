import React from 'react'
import StatusBadge from '../../components/common/StatusBadge'

const EquipmentMonitor = () => {
  const equipment = [
    { id: 'XFMR_400_1', name: '400/220kV Transformer 1', type: 'Transformer', status: 'operational', health: 95 },
    { id: 'XFMR_400_2', name: '400/220kV Transformer 2', type: 'Transformer', status: 'operational', health: 88 },
    { id: 'BREAKER_400_1', name: '400kV Circuit Breaker 1', type: 'Breaker', status: 'operational', health: 92 },
    { id: 'BREAKER_400_2', name: '400kV Circuit Breaker 2', type: 'Breaker', status: 'maintenance', health: 45 },
    { id: 'ISOLATOR_400_1', name: '400kV Isolator 1', type: 'Isolator', status: 'operational', health: 78 },
    { id: 'LINE_400_1', name: '400kV Transmission Line 1', type: 'Line', status: 'warning', health: 65 },
  ]

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-600'
    if (health >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Equipment Status</h3>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipment.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className={`h-2 rounded-full ${getHealthColor(item.health)}`}
                        style={{ width: `${item.health}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getHealthColor(item.health)}`}>
                      {item.health}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EquipmentMonitor