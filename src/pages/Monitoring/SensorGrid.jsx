import React from 'react'
import { useSocket } from '../../contexts/SocketContext'
import VoltageCard from '../../components/monitoring/VoltageCard'
import CurrentCard from '../../components/monitoring/CurrentCard'
import TemperatureCard from '../../components/monitoring/TemperatureCard'
import FrequencyCard from '../../components/monitoring/FrequencyCard'
import BreakerStatus from '../../components/monitoring/BreakerStatus'

const SensorGrid = () => {
  const { sensorData } = useSocket()

  const assets = [
    { id: 'BUS_400_1', name: '400kV Bus 1', type: 'busbar' },
    { id: 'BUS_220_1', name: '220kV Bus 1', type: 'busbar' },
    { id: 'XFMR_400_1', name: '400/220kV Transformer 1', type: 'transformer' },
    { id: 'BREAKER_400_1', name: '400kV Breaker 1', type: 'breaker' },
    { id: 'LINE_400_1', name: '400kV Line 1', type: 'transmission_line' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {assets.map(asset => (
        <div key={asset.id} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{asset.name}</h3>
          
          <div className="space-y-3">
            {sensorData[asset.id]?.voltage && (
              <VoltageCard data={sensorData[asset.id].voltage} />
            )}
            
            {sensorData[asset.id]?.current && (
              <CurrentCard data={sensorData[asset.id].current} />
            )}
            
            {sensorData[asset.id]?.temperature && (
              <TemperatureCard data={sensorData[asset.id].temperature} />
            )}
            
            {sensorData[asset.id]?.frequency && (
              <FrequencyCard data={sensorData[asset.id].frequency} />
            )}
            
            {sensorData[asset.id]?.breaker_state && (
              <BreakerStatus data={sensorData[asset.id].breaker_state} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SensorGrid