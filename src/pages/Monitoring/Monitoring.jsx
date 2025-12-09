import React from 'react'
import SensorGrid from './SensorGrid'
import RealTimeCharts from './RealTimeCharts'
import EquipmentMonitor from './EquipmentMonitor'
import PerformanceAnalytics from './PerformanceAnalytics'

const Monitoring = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Real-time Monitoring</h1>
        <div className="text-sm text-gray-500">
          Live SCADA Data & Equipment Status
        </div>
      </div>

      <SensorGrid />
      <RealTimeCharts />
      <EquipmentMonitor />
      <PerformanceAnalytics />
    </div>
  )
}

export default Monitoring