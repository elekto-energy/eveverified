'use client'

import React, { useState, useEffect, useMemo } from 'react'

// Marina Microgrid Visualization
export default function MarinaViz() {
  const [time, setTime] = useState(0)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [energyFlow, setEnergyFlow] = useState({ solar: 12.4, battery: 85, consumption: 8.2 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1)
      // Simulate energy fluctuations
      setEnergyFlow(prev => ({
        solar: Math.max(0, prev.solar + (Math.random() - 0.5) * 0.5),
        battery: Math.min(100, Math.max(20, prev.battery + (prev.solar > prev.consumption ? 0.1 : -0.1))),
        consumption: Math.max(0, prev.consumption + (Math.random() - 0.5) * 0.3)
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Dock data
  const docks = [
    { id: 'A', x: 180, y: 200, spots: 8, active: 6 },
    { id: 'B', x: 320, y: 200, spots: 8, active: 5 },
    { id: 'C', x: 460, y: 200, spots: 6, active: 4 },
  ]

  // Generate energy particles flowing from solar to battery/docks
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      offset: i * 0.15,
      speed: 0.02 + (i % 3) * 0.005
    }))
  }, [])

  const getParticlePosition = (particle: { offset: number, speed: number }, path: 'solar-battery' | 'battery-dock') => {
    const progress = ((time * particle.speed + particle.offset) % 1)
    
    if (path === 'solar-battery') {
      // Solar (top) to Battery (center-left)
      const startX = 250, startY = 60
      const endX = 80, endY = 280
      return {
        x: startX + (endX - startX) * progress,
        y: startY + (endY - startY) * progress,
        opacity: Math.sin(progress * Math.PI)
      }
    } else {
      // Battery to Docks
      const startX = 120, startY = 280
      const endX = 320, endY = 200
      return {
        x: startX + (endX - startX) * progress,
        y: startY + (endY - startY) * progress,
        opacity: Math.sin(progress * Math.PI)
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto aspect-[16/9] bg-[#050508] rounded-2xl border border-white/5 overflow-hidden relative">
      {/* Water background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 70% 80%, #00d4ff10 0%, transparent 50%),
            linear-gradient(180deg, #050508 0%, #0a1520 100%)
          `
        }}
      />

      {/* Grid pattern (water ripples) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="water-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#00d4ff" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#water-grid)" />
      </svg>

      <svg viewBox="0 0 600 450" className="w-full h-full relative z-10">
        {/* Solar Panel Array (top) */}
        <g className="cursor-pointer" onClick={() => setSelectedNode('solar')}>
          <rect x="180" y="30" width="140" height="60" rx="4" 
                fill="#00ff8815" stroke="#00ff88" strokeWidth="1" 
                className={selectedNode === 'solar' ? 'stroke-2' : ''} />
          <text x="250" y="55" textAnchor="middle" fill="#00ff88" fontSize="10" fontFamily="monospace">
            SOLAR ARRAY
          </text>
          <text x="250" y="72" textAnchor="middle" fill="#00ff88" fontSize="14" fontWeight="bold">
            {energyFlow.solar.toFixed(1)} kW
          </text>
          {/* Solar panel grid */}
          {[...Array(6)].map((_, i) => (
            <rect key={i} x={190 + (i % 3) * 40} y={35 + Math.floor(i / 3) * 12} 
                  width="35" height="10" fill="#00ff8830" rx="1" />
          ))}
        </g>

        {/* Battery Storage (left) */}
        <g className="cursor-pointer" onClick={() => setSelectedNode('battery')}>
          <rect x="40" y="250" width="80" height="100" rx="4"
                fill="#ff6b0015" stroke="#ff6b00" strokeWidth="1"
                className={selectedNode === 'battery' ? 'stroke-2' : ''} />
          <text x="80" y="275" textAnchor="middle" fill="#ff6b00" fontSize="10" fontFamily="monospace">
            BATTERY
          </text>
          <text x="80" y="295" textAnchor="middle" fill="#ff6b00" fontSize="16" fontWeight="bold">
            {energyFlow.battery.toFixed(0)}%
          </text>
          {/* Battery level indicator */}
          <rect x="55" y="305" width="50" height="30" fill="#111" rx="2" />
          <rect x="57" y={307 + 26 * (1 - energyFlow.battery / 100)} 
                width="46" height={26 * (energyFlow.battery / 100)} 
                fill="#ff6b00" rx="1" />
          <text x="80" y="325" textAnchor="middle" fill="white" fontSize="8">
            100 kWh
          </text>
        </g>

        {/* Docks */}
        {docks.map((dock, di) => (
          <g key={dock.id} className="cursor-pointer" onClick={() => setSelectedNode(`dock-${dock.id}`)}>
            {/* Dock platform */}
            <rect x={dock.x - 50} y={dock.y} width="100" height="120" rx="2"
                  fill="#00d4ff08" stroke="#00d4ff" strokeWidth="1"
                  strokeDasharray={selectedNode === `dock-${dock.id}` ? '0' : '4 2'} />
            
            {/* Dock label */}
            <text x={dock.x} y={dock.y + 15} textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace">
              DOCK {dock.id}
            </text>
            
            {/* Boat spots */}
            {[...Array(dock.spots)].map((_, i) => {
              const isActive = i < dock.active
              const spotY = dock.y + 25 + (i % 4) * 22
              const spotX = dock.x - 35 + Math.floor(i / 4) * 50
              return (
                <g key={i}>
                  <rect x={spotX} y={spotY} width="40" height="18" rx="2"
                        fill={isActive ? '#00d4ff20' : '#ffffff05'}
                        stroke={isActive ? '#00d4ff' : '#ffffff20'} strokeWidth="0.5" />
                  {isActive && (
                    <>
                      {/* Boat icon */}
                      <ellipse cx={spotX + 20} cy={spotY + 9} rx="12" ry="5" fill="#00d4ff30" />
                      {/* Power indicator */}
                      <circle cx={spotX + 36} cy={spotY + 4} r="2" 
                              fill="#00ff88" 
                              style={{ animation: `pulse 2s infinite ${i * 0.2}s` }} />
                    </>
                  )}
                </g>
              )
            })}
            
            {/* Dock stats */}
            <text x={dock.x} y={dock.y + 110} textAnchor="middle" fill="#666" fontSize="8">
              {dock.active}/{dock.spots} active
            </text>
          </g>
        ))}

        {/* Energy flow lines */}
        {/* Solar to Battery */}
        <path d="M 250 90 Q 150 150 80 250" 
              fill="none" stroke="#00ff8830" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Battery to Docks */}
        <path d="M 120 300 Q 200 280 180 260" fill="none" stroke="#ff6b0030" strokeWidth="2" />
        <path d="M 120 300 Q 250 280 320 260" fill="none" stroke="#ff6b0030" strokeWidth="2" />
        <path d="M 120 300 Q 300 280 460 260" fill="none" stroke="#ff6b0030" strokeWidth="2" />

        {/* Energy particles - Solar to Battery */}
        {particles.slice(0, 10).map(p => {
          const pos = getParticlePosition(p, 'solar-battery')
          return (
            <circle key={`s-${p.id}`} cx={pos.x} cy={pos.y} r="3"
                    fill="#00ff88" opacity={pos.opacity * 0.8}
                    style={{ filter: 'blur(1px)' }} />
          )
        })}

        {/* Energy particles - Battery to Docks */}
        {particles.slice(10, 20).map(p => {
          const pos = getParticlePosition(p, 'battery-dock')
          return (
            <circle key={`b-${p.id}`} cx={pos.x} cy={pos.y} r="2"
                    fill="#ff6b00" opacity={pos.opacity * 0.6}
                    style={{ filter: 'blur(1px)' }} />
          )
        })}

        {/* Legend */}
        <g transform="translate(480, 350)">
          <text x="0" y="0" fill="#666" fontSize="8" fontFamily="monospace">ENERGY FLOW</text>
          <line x1="0" y1="15" x2="30" y2="15" stroke="#00ff88" strokeWidth="2" />
          <text x="35" y="18" fill="#888" fontSize="7">Production</text>
          <line x1="0" y1="30" x2="30" y2="30" stroke="#ff6b00" strokeWidth="2" />
          <text x="35" y="33" fill="#888" fontSize="7">Distribution</text>
        </g>

        {/* Main stats */}
        <g transform="translate(480, 40)">
          <rect x="0" y="0" width="100" height="80" rx="4" fill="#ffffff05" stroke="#ffffff10" />
          <text x="50" y="20" textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">MICROGRID</text>
          <text x="50" y="40" textAnchor="middle" fill="#00ff88" fontSize="12" fontWeight="bold">
            {(energyFlow.solar - energyFlow.consumption).toFixed(1)} kW
          </text>
          <text x="50" y="55" textAnchor="middle" fill="#888" fontSize="8">
            {energyFlow.solar > energyFlow.consumption ? 'SURPLUS' : 'DEFICIT'}
          </text>
          <text x="50" y="72" textAnchor="middle" fill="#666" fontSize="7">
            {docks.reduce((sum, d) => sum + d.active, 0)} boats connected
          </text>
        </g>

        {/* Title */}
        <text x="300" y="430" textAnchor="middle" fill="#333" fontSize="10" fontFamily="monospace">
          ELEKTO MARINA MICROGRID
        </text>
      </svg>

      {/* Selected node info panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-medium">
                {selectedNode === 'solar' && 'Solar Array'}
                {selectedNode === 'battery' && 'Battery Storage'}
                {selectedNode?.startsWith('dock-') && `Dock ${selectedNode.split('-')[1]}`}
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                {selectedNode === 'solar' && `Producing ${energyFlow.solar.toFixed(1)} kW from 30 panels (13.5 kWp installed)`}
                {selectedNode === 'battery' && `Tesla Powerwall 100 kWh at ${energyFlow.battery.toFixed(0)}% capacity`}
                {selectedNode?.startsWith('dock-') && 'Click a boat spot to see power consumption'}
              </p>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}


    </div>
  )
}
