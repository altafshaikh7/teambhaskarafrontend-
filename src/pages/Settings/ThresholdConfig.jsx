import React, { useState } from 'react'
import { Save, AlertTriangle, Gauge, Thermometer, Zap } from 'lucide-react'

const ThresholdConfig = () => {
  const [thresholds, setThresholds] = useState({
    voltage: {
      '400kV': {
        critical: { min: 380, max: 420 },
        warning: { min: 390, max: 410 },
        normal: { min: 395, max: 405 }
      },
      '220kV': {
        critical: { min: 200, max: 240 },
        warning: { min: 210, max: 230 },
        normal: { min: 215, max: 225 }
      }
    },
    current: {
      '400kV': {
        critical: 1800,
        warning: 1500,
        normal: 1200
      },
      '220kV': {
        critical: 2500,
        warning: 2000,
        normal: 1600
      }
    },
    temperature: {
      transformers: {
        critical: 85,
        warning: 75,
        normal: 65
      },
      breakers: {
        critical: 60,
        warning: 50,
        normal: 40
      },
      busbars: {
        critical: 70,
        warning: 60,
        normal: 50
      }
    },
    frequency: {
      critical: { min: 49.0, max: 51.0 },
      warning: { min: 49.5, max: 50.5 },
      normal: { min: 49.8, max: 50.2 }
    },
    powerFactor: {
      critical: 0.85,
      warning: 0.90,
      normal: 0.95
    }
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      console.log('Threshold configuration saved:', thresholds)
    }, 2000)
  }

  const handleThresholdChange = (category, subcategory, level, field, value) => {
    setThresholds(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [level]: field ? {
            ...prev[category][subcategory][level],
            [field]: parseFloat(value)
          } : parseFloat(value)
        }
      }
    }))
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'normal': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getLevelBgColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'normal': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Threshold Configuration</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voltage Thresholds */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Voltage Thresholds (kV)</span>
          </h4>
          
          {Object.entries(thresholds.voltage).map(([voltageLevel, levels]) => (
            <div key={voltageLevel} className="mb-6 last:mb-0">
              <h5 className="font-medium text-gray-900 mb-3">{voltageLevel}</h5>
              <div className="space-y-3">
                {Object.entries(levels).map(([level, range]) => (
                  <div key={level} className={`p-3 rounded-lg border ${getLevelBgColor(level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium capitalize ${getLevelColor(level)}`}>
                        {level}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <label className="text-gray-600 text-xs">Min (kV)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={range.min}
                          onChange={(e) => handleThresholdChange('voltage', voltageLevel, level, 'min', e.target.value)}
                          className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 text-xs">Max (kV)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={range.max}
                          onChange={(e) => handleThresholdChange('voltage', voltageLevel, level, 'max', e.target.value)}
                          className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Thresholds */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Gauge className="h-5 w-5 text-blue-600" />
            <span>Current Thresholds (A)</span>
          </h4>
          
          {Object.entries(thresholds.current).map(([voltageLevel, levels]) => (
            <div key={voltageLevel} className="mb-6 last:mb-0">
              <h5 className="font-medium text-gray-900 mb-3">{voltageLevel}</h5>
              <div className="space-y-3">
                {Object.entries(levels).map(([level, value]) => (
                  <div key={level} className={`p-3 rounded-lg border ${getLevelBgColor(level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium capitalize ${getLevelColor(level)}`}>
                        {level}
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-600 text-xs">Threshold (A)</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleThresholdChange('current', voltageLevel, level, null, e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Temperature Thresholds */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-red-600" />
            <span>Temperature Thresholds (°C)</span>
          </h4>
          
          {Object.entries(thresholds.temperature).map(([equipment, levels]) => (
            <div key={equipment} className="mb-6 last:mb-0">
              <h5 className="font-medium text-gray-900 mb-3 capitalize">{equipment}</h5>
              <div className="space-y-3">
                {Object.entries(levels).map(([level, value]) => (
                  <div key={level} className={`p-3 rounded-lg border ${getLevelBgColor(level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium capitalize ${getLevelColor(level)}`}>
                        {level}
                      </span>
                    </div>
                    <div>
                      <label className="text-gray-600 text-xs">Threshold (°C)</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleThresholdChange('temperature', equipment, level, null, e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Thresholds */}
        <div className="card">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Other Parameters</span>
          </h4>
          
          {/* Frequency Thresholds */}
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 mb-3">Frequency (Hz)</h5>
            <div className="space-y-3">
              {Object.entries(thresholds.frequency).map(([level, range]) => (
                <div key={level} className={`p-3 rounded-lg border ${getLevelBgColor(level)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium capitalize ${getLevelColor(level)}`}>
                      {level}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <label className="text-gray-600 text-xs">Min (Hz)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={range.min}
                        onChange={(e) => handleThresholdChange('frequency', 'system', level, 'min', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-gray-600 text-xs">Max (Hz)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={range.max}
                        onChange={(e) => handleThresholdChange('frequency', 'system', level, 'max', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Power Factor Thresholds */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Power Factor</h5>
            <div className="space-y-3">
              {Object.entries(thresholds.powerFactor).map(([level, value]) => (
                <div key={level} className={`p-3 rounded-lg border ${getLevelBgColor(level)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium capitalize ${getLevelColor(level)}`}>
                      {level}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-600 text-xs">Threshold</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={value}
                      onChange={(e) => handleThresholdChange('powerFactor', 'system', level, null, e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Threshold Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Object.values(thresholds).flatMap(cat => 
                Object.values(cat).flatMap(subcat => 
                  Object.keys(subcat)
                )
              ).filter(level => level === 'normal').length}
            </div>
            <div className="text-green-700">Normal Thresholds</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {Object.values(thresholds).flatMap(cat => 
                Object.values(cat).flatMap(subcat => 
                  Object.keys(subcat)
                )
              ).filter(level => level === 'warning').length}
            </div>
            <div className="text-yellow-700">Warning Thresholds</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {Object.values(thresholds).flatMap(cat => 
                Object.values(cat).flatMap(subcat => 
                  Object.keys(subcat)
                )
              ).filter(level => level === 'critical').length}
            </div>
            <div className="text-red-700">Critical Thresholds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThresholdConfig