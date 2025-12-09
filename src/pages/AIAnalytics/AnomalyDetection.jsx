import React from 'react'
import AnomalyGraph from '../../components/ai/AnomalyGraph'

const AnomalyDetection = () => {
  const anomalyStats = [
    { period: 'Last 24h', count: 12, severity: 'medium' },
    { period: 'Last 7d', count: 45, severity: 'high' },
    { period: 'Last 30d', count: 156, severity: 'medium' },
  ]

  const recentAnomalies = [
    { id: 'A001', asset: 'XFMR_400_1', type: 'Temperature Spike', severity: 'high', timestamp: '2024-01-15 14:23' },
    { id: 'A002', asset: 'LINE_400_1', type: 'Current Fluctuation', severity: 'medium', timestamp: '2024-01-15 13:45' },
    { id: 'A003', asset: 'BREAKER_400_2', type: 'Operation Delay', severity: 'low', timestamp: '2024-01-15 12:18' },
    { id: 'A004', asset: 'BUS_400_1', type: 'Voltage Dip', severity: 'medium', timestamp: '2024-01-15 11:32' },
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Anomaly Detection</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Detection Statistics</h4>
          <div className="space-y-3">
            {anomalyStats.map((stat) => (
              <div key={stat.period} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{stat.period}</div>
                  <div className={`text-sm px-2 py-1 rounded-full inline-block mt-1 ${getSeverityColor(stat.severity)}`}>
                    {stat.count} anomalies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h4 className="text-md font-medium text-gray-700 mb-4">Anomaly Trends</h4>
          <AnomalyGraph />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Recent Anomalies</h4>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAnomalies.map((anomaly) => (
                <tr key={anomaly.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {anomaly.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anomaly.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anomaly.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {anomaly.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnomalyDetection