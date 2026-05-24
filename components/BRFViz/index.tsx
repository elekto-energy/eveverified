'use client'

import React, { useState, useEffect, useMemo } from 'react'

// BRF Radhus Energy Sharing Visualization
export default function BRFViz() {
  const [time, setTime] = useState(0)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [energyFlow, setEnergyFlow] = useState({ 
    solar: 8.2, 
    battery: 72, 
    gridExport: 1.4 
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
      setEnergyFlow(prev => ({
        solar: Math.max(0, prev.solar + (Math.random() - 0.5) * 0.3),
        battery: Math.min(100, Math.max(20, prev.battery + (Math.random() - 0.5) * 0.5)),
        gridExport: Math.max(0, prev.gridExport + (Math.random() - 0.5) * 0.2)
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Houses data
  const houses = [
    { id: '1', x: 80, consumption: 1.2, hasEV: true, sharing: true },
    { id: '2', x: 180, consumption: 0.8, hasEV: false, sharing: true },
    { id: '3', x: 280, consumption: 2.1, hasEV: true, sharing: false },
    { id: '4', x: 380, consumption: 0.5, hasEV: false, sharing: true },
    { id: '5', x: 480, consumption: 1.5, hasEV: true, sharing: true },
  ]

  const totalConsumption = houses.reduce((sum, h) => sum + h.consumption, 0)
  const surplus = energyFlow.solar - totalConsumption

  // Energy particles
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      offset: i * 0.12,
      speed: 0.015 + (i % 3) * 0.003
    }))
  }, [])

  const getParticleY = (particle: { offset: number, speed: number }) => {
    const progress = ((time * particle.speed + particle.offset) % 1)
    return 80 + progress * 100
  }

  return (
    <div className="w-full max-w-4xl mx-auto aspect-[16/10] bg-[#050508] rounded-2xl border border-white/5 overflow-hidden relative">
      {/* Sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, #0a1525 0%, #050508 40%, #050508 100%)
          `
        }}
      />

      <svg viewBox="0 0 600 400" className="w-full h-full relative z-10">
        {/* Sun */}
        <circle cx="520" cy="50" r="25" fill="#ff6b00" opacity="0.3" />
        <circle cx="520" cy="50" r="18" fill="#ff6b00" opacity="0.5" />
        <circle cx="520" cy="50" r="12" fill="#ff6b00" opacity="0.8" />
        
        {/* Ground */}
        <rect x="0" y="280" width="600" height="120" fill="#0a0a0a" />
        <line x1="0" y1="280" x2="600" y2="280" stroke="#ffffff10" strokeWidth="1" />

        {/* Shared Solar Array (top center) */}
        <g className="cursor-pointer" onClick={() => setSelectedNode('solar')}>
          <rect x="220" y="30" width="160" height="50" rx="3" 
                fill="#00ff8810" stroke="#00ff88" strokeWidth="1"
                className={selectedNode === 'solar' ? 'stroke-2' : ''} />
          
          {/* Solar panels */}
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={230 + (i % 4) * 38} y={38 + Math.floor(i / 4) * 18} 
                  width="32" height="14" fill="#00ff8825" stroke="#00ff8840" strokeWidth="0.5" rx="1" />
          ))}
          
          <text x="300" y="25" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">
            SHARED SOLAR
          </text>
          <text x="300" y="92" textAnchor="middle" fill="#00ff88" fontSize="12" fontWeight="bold">
            {energyFlow.solar.toFixed(1)} kW
          </text>
        </g>

        {/* Distribution line from solar */}
        <line x1="300" y1="80" x2="300" y2="130" stroke="#00ff8840" strokeWidth="2" />
        <line x1="80" y1="130" x2="520" y2="130" stroke="#00ff8830" strokeWidth="2" />

        {/* Energy particles flowing down */}
        {particles.map(p => {
          const y = getParticleY(p)
          if (y < 130) {
            return (
              <circle key={p.id} cx={300} cy={y} r="2"
                      fill="#00ff88" opacity={0.6}
                      style={{ filter: 'blur(1px)' }} />
            )
          }
          return null
        })}

        {/* Houses */}
        {houses.map((house, i) => {
          const isSelected = selectedNode === `house-${house.id}`
          const isSharing = house.sharing
          
          return (
            <g key={house.id} className="cursor-pointer" onClick={() => setSelectedNode(`house-${house.id}`)}>
              {/* Vertical line from distribution */}
              <line x1={house.x + 30} y1="130" x2={house.x + 30} y2="180" 
                    stroke={isSharing ? '#00ff8840' : '#ffffff20'} strokeWidth="1" />
              
              {/* House body */}
              <rect x={house.x} y="200" width="60" height="80" 
                    fill="#0d0d0d" stroke={isSelected ? '#00ff88' : '#ffffff20'} 
                    strokeWidth={isSelected ? 2 : 1} rx="2" />
              
              {/* Roof */}
              <polygon 
                points={`${house.x - 5},200 ${house.x + 30},165 ${house.x + 65},200`}
                fill="#111" stroke={isSelected ? '#00ff88' : '#ffffff15'} strokeWidth="1" />
              
              {/* Window */}
              <rect x={house.x + 20} y="215" width="20" height="20" 
                    fill={house.consumption > 1.5 ? '#ff6b0030' : '#00d4ff20'} 
                    stroke="#ffffff20" strokeWidth="0.5" />
              
              {/* Door */}
              <rect x={house.x + 22} y="250" width="16" height="30" 
                    fill="#0a0a0a" stroke="#ffffff10" strokeWidth="0.5" />
              
              {/* House number */}
              <text x={house.x + 30} y="195" textAnchor="middle" fill="#666" fontSize="10">
                #{house.id}
              </text>
              
              {/* Consumption indicator */}
              <text x={house.x + 30} y="300" textAnchor="middle" fill="#888" fontSize="9">
                {house.consumption.toFixed(1)} kW
              </text>
              
              {/* EV indicator */}
              {house.hasEV && (
                <g>
                  <rect x={house.x + 45} y="260" width="18" height="10" fill="#00d4ff20" stroke="#00d4ff40" strokeWidth="0.5" rx="2" />
                  <text x={house.x + 54} y="268" textAnchor="middle" fill="#00d4ff" fontSize="6">EV</text>
                </g>
              )}
              
              {/* Sharing status */}
              <circle cx={house.x + 55} cy="205" r="4" 
                      fill={isSharing ? '#00ff88' : '#ff4444'} 
                      opacity={isSharing ? 0.8 : 0.5} />
            </g>
          )
        })}

        {/* Shared Battery (bottom left) */}
        <g className="cursor-pointer" onClick={() => setSelectedNode('battery')}>
          <rect x="30" y="310" width="70" height="60" rx="3"
                fill="#ff6b0010" stroke="#ff6b00" strokeWidth="1"
                className={selectedNode === 'battery' ? 'stroke-2' : ''} />
          
          <text x="65" y="328" textAnchor="middle" fill="#ff6b00" fontSize="8" fontFamily="monospace">
            BATTERY
          </text>
          
          {/* Battery level */}
          <rect x="42" y="335" width="46" height="20" fill="#111" rx="2" />
          <rect x="44" y="337" width={42 * (energyFlow.battery / 100)} height="16" 
                fill="#ff6b00" rx="1" />
          
          <text x="65" y="365" textAnchor="middle" fill="#ff6b00" fontSize="10" fontWeight="bold">
            {energyFlow.battery.toFixed(0)}%
          </text>
        </g>

        {/* Grid connection (bottom right) */}
        <g className="cursor-pointer" onClick={() => setSelectedNode('grid')}>
          <rect x="500" y="310" width="70" height="60" rx="3"
                fill="#00d4ff10" stroke="#00d4ff" strokeWidth="1"
                className={selectedNode === 'grid' ? 'stroke-2' : ''} />
          
          <text x="535" y="328" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace">
            GRID
          </text>
          
          <text x="535" y="350" textAnchor="middle" fill={surplus > 0 ? '#00ff88' : '#ff6b00'} fontSize="11" fontWeight="bold">
            {surplus > 0 ? '↑' : '↓'} {Math.abs(surplus).toFixed(1)} kW
          </text>
          
          <text x="535" y="365" textAnchor="middle" fill="#666" fontSize="8">
            {surplus > 0 ? 'EXPORT' : 'IMPORT'}
          </text>
        </g>

        {/* Status panel */}
        <g transform="translate(420, 30)">
          <rect x="0" y="0" width="110" height="85" rx="4" fill="#ffffff05" stroke="#ffffff10" />
          
          <text x="55" y="18" textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">
            COMMUNITY
          </text>
          
          <text x="55" y="38" textAnchor="middle" fill="#00ff88" fontSize="14" fontWeight="bold">
            {surplus > 0 ? '+' : ''}{surplus.toFixed(1)} kW
          </text>
          
          <text x="55" y="52" textAnchor="middle" fill="#888" fontSize="8">
            {surplus > 0 ? 'SURPLUS' : 'DEFICIT'}
          </text>
          
          <line x1="15" y1="60" x2="95" y2="60" stroke="#ffffff10" />
          
          <text x="55" y="75" textAnchor="middle" fill="#666" fontSize="7">
            {houses.filter(h => h.sharing).length}/{houses.length} homes sharing
          </text>
        </g>

        {/* EVE VERIFIED badge */}
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="80" height="24" rx="12" fill="#00ff8815" stroke="#00ff8840" />
          <circle cx="14" cy="12" r="4" fill="#00ff88" />
          <text x="45" y="16" textAnchor="middle" fill="#00ff88" fontSize="8" fontWeight="bold">
            VERIFIED
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(30, 380)">
          <circle cx="5" cy="0" r="3" fill="#00ff88" />
          <text x="12" y="3" fill="#666" fontSize="7">Sharing</text>
          
          <circle cx="70" cy="0" r="3" fill="#ff4444" opacity="0.5" />
          <text x="77" y="3" fill="#666" fontSize="7">Not sharing</text>
          
          <rect x="135" y="-4" width="12" height="8" fill="#00d4ff20" stroke="#00d4ff40" strokeWidth="0.5" rx="1" />
          <text x="150" y="3" fill="#666" fontSize="7">EV</text>
        </g>

      </svg>

      {/* Info panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-medium">
                {selectedNode === 'solar' && 'Shared Solar Array'}
                {selectedNode === 'battery' && 'Community Battery'}
                {selectedNode === 'grid' && 'Grid Connection'}
                {selectedNode?.startsWith('house-') && `Home #${selectedNode.split('-')[1]}`}
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                {selectedNode === 'solar' && `Producing ${energyFlow.solar.toFixed(1)} kW from rooftop panels. Shared between all community members.`}
                {selectedNode === 'battery' && `Community 50 kWh battery at ${energyFlow.battery.toFixed(0)}%. Stores surplus for evening use.`}
                {selectedNode === 'grid' && (surplus > 0 
                  ? `Exporting ${surplus.toFixed(1)} kW surplus to the grid.`
                  : `Importing ${Math.abs(surplus).toFixed(1)} kW from the grid.`)}
                {selectedNode?.startsWith('house-') && (() => {
                  const house = houses.find(h => `house-${h.id}` === selectedNode)
                  if (!house) return ''
                  return `Consuming ${house.consumption.toFixed(1)} kW. ${house.sharing ? 'Participating in energy sharing.' : 'Not participating in sharing.'} ${house.hasEV ? 'Has EV charger.' : ''}`
                })()}
              </p>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
