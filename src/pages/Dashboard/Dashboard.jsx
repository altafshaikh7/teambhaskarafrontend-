// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import OverviewCards from './OverviewCards'
import RealTimeCharts from '../Monitoring/RealTimeCharts'
import WarningAlerts from '../../components/monitoring/WarningAlerts'
import { useSocket } from '../../contexts/SocketContext'

const Dashboard = () => {
  const { anomalies } = useSocket()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading-dots text-3xl mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 font-medium">Initializing Grid Monitoring System...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section - Text visibility ensured */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Grid Operations Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              400/220 kV Transmission Substation - Real-time Monitoring
            </p>
          </div>
          <div className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded border border-green-200">
            <span className="font-semibold">System Status:</span> OPERATIONAL
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
        <OverviewCards />
      </div>

      {/* Charts and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Grid Parameters</h2>
            <RealTimeCharts />
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Alerts</h2>
            <WarningAlerts anomalies={anomalies.slice(0, 8)} />
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Grid Station Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-blue-50 rounded border border-blue-200">
            <div className="text-2xl font-bold text-blue-700 mb-1">400/220 kV</div>
            <div className="text-gray-600">Transformation Capacity</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded border border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">24/7</div>
            <div className="text-gray-600">Operational Hours</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded border border-purple-200">
            <div className="text-2xl font-bold text-purple-700 mb-1">99.8%</div>
            <div className="text-gray-600">System Availability</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard