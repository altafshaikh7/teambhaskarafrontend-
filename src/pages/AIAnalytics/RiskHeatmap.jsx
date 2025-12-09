import React from 'react'
import FaultProbabilityHeatmap from '../../components/ai/FaultProbabilityHeatmap'

const RiskHeatmap = () => {
  const riskData = [
    { asset: 'XFMR_400_1', risk: 'Low', probability: '15%' },
    { asset: 'XFMR_400_2', risk: 'Medium', probability: '45%' },
    { asset: 'BREAKER_400_1', risk: 'Low', probability: '20%' },
    { asset: 'BREAKER_400_2', risk: 'High', probability: '65%' },
    { asset: 'LINE_400_1', risk: 'Medium', probability: '35%' },
    { asset: 'LINE_400_2', risk: 'Low', probability: '25%' },
    { asset: 'BUS_400_1', risk: 'Low', probability: '10%' },
    { asset: 'BUS_220_1', risk: 'Medium', probability: '40%' },
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Assessment Heatmap</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Fault Probability by Asset</h4>
          <div className="space-y-3">
            {riskData.map((item) => (
              <div key={item.asset} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{item.asset}</span>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(item.risk)}`}>
                    {item.risk}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{item.probability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Spatial Risk Distribution</h4>
          <FaultProbabilityHeatmap />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">Risk Mitigation Recommendations</h5>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Schedule maintenance for BREAKER_400_2 (High risk - 65%)</li>
          <li>Monitor XFMR_400_2 temperature trends closely</li>
          <li>Consider load redistribution from BUS_220_1</li>
        </ul>
      </div>
    </div>
  )
}

export default RiskHeatmap