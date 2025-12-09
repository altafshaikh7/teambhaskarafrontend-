import React from 'react'

const HeatmapChart = ({ data, xLabels, yLabels, height = 400 }) => {
  const getColor = (value) => {
    if (value >= 80) return 'bg-red-500'
    if (value >= 60) return 'bg-yellow-500'
    if (value >= 40) return 'bg-green-500'
    return 'bg-blue-500'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex">
        {/* Y-axis labels */}
        <div className="w-20">
          {yLabels.map((label, index) => (
            <div key={index} className="h-8 flex items-center justify-end pr-2 text-sm text-gray-600">
              {label}
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className="flex-1">
          {/* X-axis labels */}
          <div className="flex">
            {xLabels.map((label, index) => (
              <div key={index} className="flex-1 text-center text-sm text-gray-600 h-8 flex items-center justify-center">
                {label}
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex-1 h-8 border border-white ${getColor(value)} flex items-center justify-center text-white text-xs font-medium`}
                  title={`Value: ${value}`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Low (0-39)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Medium (40-59)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>High (60-79)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Critical (80-100)</span>
        </div>
      </div>
    </div>
  )
}

export default HeatmapChart