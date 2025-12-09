import React from 'react'

const SubstationMap = ({ onAssetSelect }) => {
  const assets = [
    { id: 'BUS_400_1', type: 'busbar', name: '400kV Bus', x: 50, y: 20 },
    { id: 'BUS_220_1', type: 'busbar', name: '220kV Bus', x: 50, y: 80 },
    { id: 'XFMR_400_1', type: 'transformer', name: 'Transformer 1', x: 30, y: 50 },
    { id: 'XFMR_400_2', type: 'transformer', name: 'Transformer 2', x: 70, y: 50 },
    { id: 'BREAKER_400_1', type: 'breaker', name: 'Breaker 1', x: 20, y: 30 },
    { id: 'BREAKER_400_2', type: 'breaker', name: 'Breaker 2', x: 80, y: 30 },
  ]

  const getAssetColor = (type) => {
    switch (type) {
      case 'transformer': return '#3b82f6'
      case 'breaker': return '#ef4444'
      case 'busbar': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getAssetShape = (type) => {
    switch (type) {
      case 'transformer': return 'M20 10 L40 10 L40 30 L20 30 Z'
      case 'breaker': return 'M25 15 L35 15 L35 25 L25 25 Z'
      case 'busbar': return 'M10 45 L90 45'
      default: return 'M25 15 L35 15 L35 25 L25 25 Z'
    }
  }

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Background */}
      <rect width="100" height="100" fill="#f8fafc" />
      
      {/* Connections */}
      <path d="M50 20 L50 30 M30 50 L20 30 M70 50 L80 30 M30 50 L50 80 M70 50 L50 80" 
            stroke="#cbd5e1" strokeWidth="1" fill="none" />
      
      {/* Assets */}
      {assets.map((asset) => (
        <g key={asset.id} onClick={() => onAssetSelect(asset)} className="cursor-pointer">
          <path
            d={getAssetShape(asset.type)}
            fill={getAssetColor(asset.type)}
            stroke="#1e293b"
            strokeWidth="0.5"
            transform={`translate(${asset.x - 5}, ${asset.y - 5})`}
          />
          <text
            x={asset.x}
            y={asset.y + 10}
            textAnchor="middle"
            fontSize="3"
            fill="#374151"
            className="pointer-events-none"
          >
            {asset.name}
          </text>
        </g>
      ))}
      
      {/* Legend */}
      <g transform="translate(5, 95)">
        <text x="0" y="0" fontSize="3" fill="#374151">Legend:</text>
        <rect x="15" y="-3" width="3" height="3" fill="#3b82f6" />
        <text x="19" y="0" fontSize="2.5" fill="#374151">Transformer</text>
        <rect x="35" y="-3" width="3" height="3" fill="#ef4444" />
        <text x="39" y="0" fontSize="2.5" fill="#374151">Breaker</text>
        <line x1="50" y1="-1.5" x2="53" y2="-1.5" stroke="#f59e0b" strokeWidth="1" />
        <text x="55" y="0" fontSize="2.5" fill="#374151">Busbar</text>
      </g>
    </svg>
  )
}

export default SubstationMap