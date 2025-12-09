import React from 'react'
import TransformerHealthCard from '../../components/health/TransformerHealthCard'

const TransformerPanel = ({ onViewDetails, onMaintenanceLog }) => {
  const transformers = [
    {
      id: 'XFMR_400_1',
      name: '400/220kV Transformer 1',
      mvaRating: '500 MVA',
      cooling: 'OFWF',
      year: 2018,
      healthScore: 92,
      parameters: {
        temperature: 72,
        oilQuality: 95,
        windingCondition: 88,
        bushingCondition: 91,
        loadFactor: 78
      }
    },
    {
      id: 'XFMR_400_2',
      name: '400/220kV Transformer 2',
      mvaRating: '500 MVA',
      cooling: 'OFWF',
      year: 2019,
      healthScore: 87,
      parameters: {
        temperature: 68,
        oilQuality: 92,
        windingCondition: 85,
        bushingCondition: 89,
        loadFactor: 82
      }
    },
    {
      id: 'XFMR_220_1',
      name: '220/132kV Transformer 1',
      mvaRating: '250 MVA',
      cooling: 'ONAN',
      year: 2017,
      healthScore: 79,
      parameters: {
        temperature: 75,
        oilQuality: 88,
        windingCondition: 76,
        bushingCondition: 82,
        loadFactor: 85
      }
    },
    {
      id: 'XFMR_220_2',
      name: '220/132kV Transformer 2',
      mvaRating: '250 MVA',
      cooling: 'ONAN',
      year: 2020,
      healthScore: 95,
      parameters: {
        temperature: 65,
        oilQuality: 97,
        windingCondition: 93,
        bushingCondition: 96,
        loadFactor: 72
      }
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {transformers.map((transformer) => (
        <TransformerHealthCard
          key={transformer.id}
          {...transformer}
          onViewDetails={onViewDetails}
          onMaintenanceLog={onMaintenanceLog}
        />
      ))}
    </div>
  )
}

export default TransformerPanel