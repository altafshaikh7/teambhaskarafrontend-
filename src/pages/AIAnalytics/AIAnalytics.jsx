import React from 'react'
import PredictionPanel from './PredictionPanel'
import AnomalyDetection from './AnomalyDetection'
import RiskHeatmap from './RiskHeatmap'
import RULCard from '../../components/ai/RULCard'

const AIAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">AI Analytics & Predictions</h1>
        <div className="text-sm text-gray-500">
          Machine Learning powered insights
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RULCard 
          assetId="XFMR_400_1"
          assetName="400/220kV Transformer 1"
          currentRUL="8.2 years"
          confidence={85}
          trend="stable"
        />
        <RULCard 
          assetId="BREAKER_400_1"
          assetName="400kV Circuit Breaker 1"
          currentRUL="5.1 years"
          confidence={78}
          trend="decreasing"
        />
      </div>

      <PredictionPanel />
      <AnomalyDetection />
      <RiskHeatmap />
    </div>
  )
}

export default AIAnalytics