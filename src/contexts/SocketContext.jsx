// src/contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [sensorData, setSensorData] = useState({})
  const [anomalies, setAnomalies] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(null)

  useEffect(() => {
    // Always use mock data in development for now
    const isDevelopment = import.meta.env.DEV
    
    if (isDevelopment) {
      console.log('🔧 Development mode: Using mock data')
      setupMockData()
      return
    }

    // Only attempt real connection in production
    const socketUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8000'
    
    console.log('Attempting to connect to WebSocket:', socketUrl)
    
    try {
      const newSocket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        timeout: 5000,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      })

      newSocket.on('connect', () => {
        console.log('✅ Connected to WebSocket')
        setIsConnected(true)
        setConnectionError(null)
      })

      newSocket.on('disconnect', (reason) => {
        console.log('❌ Disconnected from WebSocket:', reason)
        setIsConnected(false)
        setConnectionError(`Disconnected: ${reason}`)
      })

      newSocket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error)
        setIsConnected(false)
        setConnectionError(`Connection failed: ${error.message}`)
        
        // Fallback to mock data
        console.log('🔄 Falling back to mock data due to connection error')
        setupMockData()
      })

      newSocket.on('sensor_data', (data) => {
        console.log('Received sensor data:', data)
        setSensorData(prev => ({
          ...prev,
          [data.data.asset_id]: {
            ...prev[data.data.asset_id],
            [data.data.sensor_type]: data.data
          }
        }))
      })

      newSocket.on('anomaly_detected', (data) => {
        console.log('Anomaly detected:', data)
        setAnomalies(prev => [data.data, ...prev.slice(0, 49)])
      })

      setSocket(newSocket)

      return () => {
        console.log('Cleaning up WebSocket connection')
        if (newSocket) {
          newSocket.close()
        }
      }
    } catch (error) {
      console.error('Error setting up WebSocket:', error)
      setIsConnected(false)
      setConnectionError(`Setup error: ${error.message}`)
      setupMockData()
    }
  }, [])

  // Mock data setup function
  const setupMockData = () => {
    console.log('🔄 Setting up mock data for development')
    
    // Initial mock data
    const initialMockData = {
      'BUS_400_1': {
        voltage: { value: 401.2, unit: 'kV', timestamp: new Date().toISOString() },
        frequency: { value: 50.01, unit: 'Hz', timestamp: new Date().toISOString() }
      },
      'BUS_220_1': {
        voltage: { value: 221.5, unit: 'kV', timestamp: new Date().toISOString() },
        frequency: { value: 50.02, unit: 'Hz', timestamp: new Date().toISOString() }
      },
      'XFMR_400_1': {
        temperature: { value: 72.5, unit: '°C', timestamp: new Date().toISOString() },
        current: { value: 850, unit: 'A', timestamp: new Date().toISOString() },
        oilQuality: { value: 95, unit: '%', timestamp: new Date().toISOString() }
      },
      'XFMR_400_2': {
        temperature: { value: 68.2, unit: '°C', timestamp: new Date().toISOString() },
        current: { value: 920, unit: 'A', timestamp: new Date().toISOString() },
        oilQuality: { value: 92, unit: '%', timestamp: new Date().toISOString() }
      },
      'LINE_400_1': {
        current: { value: 1200, unit: 'A', timestamp: new Date().toISOString() },
        temperature: { value: 45.5, unit: '°C', timestamp: new Date().toISOString() }
      },
      'BREAKER_400_1': {
        breaker_state: { value: 1, unit: 'status', timestamp: new Date().toISOString() }
      },
      'BREAKER_400_2': {
        breaker_state: { value: 1, unit: 'status', timestamp: new Date().toISOString() }
      }
    }

    setSensorData(initialMockData)
    setIsConnected(true) // Mock connection as connected

    // Simulate real-time updates
    const mockInterval = setInterval(() => {
      setSensorData(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(assetId => {
          Object.keys(updated[assetId]).forEach(sensorType => {
            const sensor = updated[assetId][sensorType]
            const variation = (Math.random() - 0.5) * 2 // -1 to +1
            
            if (sensorType === 'voltage') {
              const baseValue = assetId.includes('400') ? 401 : 221
              updated[assetId][sensorType] = {
                ...sensor,
                value: Math.max(baseValue - 10, Math.min(baseValue + 10, sensor.value + variation * 0.1)),
                timestamp: new Date().toISOString()
              }
            } else if (sensorType === 'temperature') {
              const baseValue = assetId.includes('XFMR') ? 70 : 45
              updated[assetId][sensorType] = {
                ...sensor,
                value: Math.max(baseValue - 10, Math.min(baseValue + 15, sensor.value + variation * 0.3)),
                timestamp: new Date().toISOString()
              }
            } else if (sensorType === 'current') {
              const baseValue = assetId.includes('XFMR') ? 900 : 1200
              updated[assetId][sensorType] = {
                ...sensor,
                value: Math.max(baseValue - 200, Math.min(baseValue + 300, sensor.value + variation * 10)),
                timestamp: new Date().toISOString()
              }
            } else if (sensorType === 'frequency') {
              updated[assetId][sensorType] = {
                ...sensor,
                value: 50.00 + (Math.random() - 0.5) * 0.1,
                timestamp: new Date().toISOString()
              }
            }
          })
        })
        return updated
      })
    }, 3000)

    return () => clearInterval(mockInterval)
  }

  const value = {
    socket,
    sensorData,
    anomalies,
    isConnected,
    connectionError,
    setSensorData,
    setAnomalies
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}