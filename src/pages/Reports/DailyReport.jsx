import React, { useState } from 'react'
import { Calendar, Download, Printer, TrendingUp, TrendingDown } from 'lucide-react'

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')

  // Simplified stats data
  const dailyStats = [
    { 
      key: 'availability', 
      value: '99.8%', 
      label: 'Availability',
      trend: '+0.2%',
      trendUp: true
    },
    { 
      key: 'energyGenerated', 
      value: '2450 MWh', 
      label: 'Energy',
      trend: '+5%',
      trendUp: true
    },
    { 
      key: 'peakLoad', 
      value: '1850 MW', 
      label: 'Peak Load',
      trend: '-2%',
      trendUp: false
    },
    { 
      key: 'faults', 
      value: '2', 
      label: 'Faults',
      trend: '-1',
      trendUp: true
    }
  ]

  // Simplified load data
  const loadData = [
    { hour: '00:00', load: 1250 },
    { hour: '02:00', load: 1150 },
    { hour: '04:00', load: 1050 },
    { hour: '06:00', load: 1350 },
    { hour: '08:00', load: 1650 },
    { hour: '10:00', load: 1750 },
    { hour: '12:00', load: 1850 },
    { hour: '14:00', load: 1800 },
    { hour: '16:00', load: 1750 },
    { hour: '18:00', load: 1650 },
    { hour: '20:00', load: 1550 },
    { hour: '22:00', load: 1350 },
  ]

  // Simplified equipment data
  const equipmentPerformance = [
    { asset: 'XFMR_400_1', availability: '100%', load: '78%', status: 'Normal' },
    { asset: 'XFMR_400_2', availability: '100%', load: '82%', status: 'Normal' },
    { asset: 'BREAKER_400_1', availability: '100%', operations: 12, status: 'Normal' },
    { asset: 'BREAKER_400_2', availability: '95%', operations: 8, status: 'Maintenance' },
    { asset: 'LINE_400_1', availability: '100%', load: '65%', status: 'Normal' },
  ]

  // Find max load for scaling
  const maxLoad = Math.max(...loadData.map(d => d.load))

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Daily Report</h1>
            <p className="text-sm text-gray-600 mt-1">Performance summary for {selectedDate}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dailyStats.map((stat) => (
          <div key={stat.key} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl font-bold ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.value}
              </div>
              <div className="flex items-center gap-1">
                {stat.trendUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Load Profile */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Load Profile</h2>
          
          <div className="space-y-3">
            {loadData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600">{data.hour}</div>
                
                <div className="flex-1">
                  <div className="relative h-6 bg-gray-100 rounded">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                      style={{ width: `${(data.load / maxLoad) * 100}%` }}
                    >
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                        {data.load} MW
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm font-medium text-gray-800">
                  {data.load} MW
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Peak load: 1850 MW at 12:00
          </div>
        </div>

        {/* Equipment Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Equipment Status</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Asset</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Availability</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {equipmentPerformance.map((equipment) => (
                  <tr key={equipment.asset} className="border-b border-gray-100 last:border-0">
                    <td className="py-3">
                      <div className="text-sm font-medium text-gray-800">{equipment.asset}</div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          equipment.availability === '100%' ? 'bg-green-500' :
                          equipment.availability === '95%' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="text-sm text-gray-700">{equipment.availability}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs rounded ${
                        equipment.status === 'Normal' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {equipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            4/5 equipment operating normally
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Summary</h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <div className="font-medium text-green-800">Normal Operations</div>
              <div className="text-sm text-green-700">All systems operating within normal parameters</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="font-medium text-yellow-800">Scheduled Maintenance</div>
              <div className="text-sm text-yellow-700">BREAKER_400_2 maintenance completed at 16:00</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-medium text-blue-800">Energy Production</div>
              <div className="text-sm text-blue-700">2450 MWh generated, 5% above target</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Report generated: Today, 16:30
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyReport