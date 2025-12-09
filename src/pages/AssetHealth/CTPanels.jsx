import React from 'react'
import CTHealthCard from '../../components/health/CTHealthCard'

const CTPanels = ({ onViewDetails, onMaintenanceLog }) => {
  const currentTransformers = [
    {
      id: 'CT_400_1',
      name: '400kV CT Bay 1',
      ratio: '2000/1 A',
      accuracy: '0.2S',
      year: 2019,
      healthScore: 91,
      parameters: {
        accuracy: 94,
        insulation: 89,
        burden: 90,
        thermal: 92
      }
    },
    {
      id: 'CT_400_2',
      name: '400kV CT Bay 2',
      ratio: '2000/1 A',
      accuracy: '0.2S',
      year: 2018,
      healthScore: 85,
      parameters: {
        accuracy: 87,
        insulation: 83,
        burden: 86,
        thermal: 84
      }
    },
    {
      id: 'CT_220_1',
      name: '220kV CT Bay 1',
      ratio: '1500/1 A',
      accuracy: '0.5S',
      year: 2020,
      healthScore: 96,
      parameters: {
        accuracy: 97,
        insulation: 95,
        burden: 96,
        thermal: 96
      }
    },
    {
      id: 'CT_220_2',
      name: '220kV CT Bay 2',
      ratio: '1500/1 A',
      accuracy: '0.5S',
      year: 2017,
      healthScore: 78,
      parameters: {
        accuracy: 80,
        insulation: 76,
        burden: 77,
        thermal: 79
      }
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {currentTransformers.map((ct) => (
        <CTHealthCard
          key={ct.id}
          {...ct}
          onViewDetails={onViewDetails}
          onMaintenanceLog={onMaintenanceLog}
        />
      ))}
    </div>
  )
}

export default CTPanels