import React from 'react'
import BreakerHealthCard from '../../components/health/BreakerHealthCard'

const BreakerPanel = ({ onViewDetails, onMaintenanceLog }) => {
  const breakers = [
    {
      id: 'BREAKER_400_1',
      name: '400kV Circuit Breaker 1',
      type: 'SF6',
      ratedCurrent: '4000 A',
      year: 2019,
      healthScore: 89,
      operations: 1247,
      parameters: {
        contactWear: 85,
        gasPressure: 92,
        mechanism: 88,
        insulation: 91
      }
    },
    {
      id: 'BREAKER_400_2',
      name: '400kV Circuit Breaker 2',
      type: 'SF6',
      ratedCurrent: '4000 A',
      year: 2018,
      healthScore: 82,
      operations: 1985,
      parameters: {
        contactWear: 78,
        gasPressure: 85,
        mechanism: 83,
        insulation: 82
      }
    },
    {
      id: 'BREAKER_220_1',
      name: '220kV Circuit Breaker 1',
      type: 'Vacuum',
      ratedCurrent: '3150 A',
      year: 2020,
      healthScore: 94,
      operations: 876,
      parameters: {
        contactWear: 92,
        gasPressure: 96,
        mechanism: 93,
        insulation: 95
      }
    },
    {
      id: 'BREAKER_220_2',
      name: '220kV Circuit Breaker 2',
      type: 'Vacuum',
      ratedCurrent: '3150 A',
      year: 2017,
      healthScore: 76,
      operations: 2341,
      parameters: {
        contactWear: 72,
        gasPressure: 78,
        mechanism: 75,
        insulation: 79
      }
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {breakers.map((breaker) => (
        <BreakerHealthCard
          key={breaker.id}
          {...breaker}
          onViewDetails={onViewDetails}
          onMaintenanceLog={onMaintenanceLog}
        />
      ))}
    </div>
  )
}

export default BreakerPanel