'use client'

import { useState, useEffect } from 'react'

// Detect environment
function getUrl() {
  if (typeof window === 'undefined') {
    return { controlRoom: '', isLocal: true }
  }
  
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1'
  
  return {
    controlRoom: isLocal ? 'http://localhost:8002' : 'https://api.eveverified.com',
    isLocal
  }
}

type ServiceStatus = 'checking' | 'online' | 'offline'

export default function LiveControlRoom() {
  const [url, setUrl] = useState({ controlRoom: '', isLocal: true })
  const [status, setStatus] = useState<ServiceStatus>('checking')

  useEffect(() => {
    const detected = getUrl()
    setUrl(detected)
    
    // Check API status
    fetch(detected.controlRoom + '/api/health', { mode: 'no-cors' })
      .then(() => setStatus('online'))
      .catch(() => {
        fetch(detected.controlRoom + '/health', { mode: 'no-cors' })
          .then(() => setStatus('online'))
          .catch(() => setStatus('offline'))
      })
  }, [])

  const StatusDot = ({ status }: { status: ServiceStatus }) => (
    <span className="flex items-center gap-2 text-xs">
      {status === 'checking' && (
        <>
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-400">Checking...</span>
        </>
      )}
      {status === 'online' && (
        <>
          <span className="w-2 h-2 rounded-full bg-eve-green" />
          <span className="text-eve-green">Online</span>
        </>
      )}
      {status === 'offline' && (
        <>
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          <span className="text-gray-500">Offline</span>
        </>
      )}
    </span>
  )

  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-extralight tracking-wide mb-2 text-white/90">
          Live Control Room
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {url.isLocal ? 'Running locally' : 'Connected to cloud'} — 
          Access the governance interface where human approval happens.
        </p>

        {/* Control Room Card */}
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-eve-green/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙</span>
              <div>
                <h3 className="text-white font-medium">EVE Control Room</h3>
                <p className="text-gray-500 text-xs">Knowledge & Artifact Approval</p>
              </div>
            </div>
            <StatusDot status={status} />
          </div>
          
          <p className="text-gray-400 text-sm mb-4">
            Fetch regulatory sources, review content, and approve artifacts. 
            All approvals are logged with human identity and sealed in X-Vault.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <p className="text-white text-xs font-medium mb-1">📚 Knowledge</p>
              <p className="text-gray-500 text-[10px]">Fetch & approve EUR-Lex articles</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <p className="text-white text-xs font-medium mb-1">📄 Artifacts</p>
              <p className="text-gray-500 text-[10px]">Review & seal ComplieDocs templates</p>
            </div>
          </div>
          
          <a
            href={url.controlRoom}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
              ${status === 'online' 
                ? 'bg-eve-green/20 border border-eve-green/30 text-eve-green hover:bg-eve-green/30' 
                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20'}`}
          >
            Open Control Room
            <span className="text-xs opacity-60">↗</span>
          </a>
        </div>

        {/* Info note */}
        <div className="mt-4 p-3 rounded-lg bg-white/[0.01] border border-white/5">
          <p className="text-gray-600 text-xs">
            <span className="text-gray-400">ℹ</span> Switch between Knowledge and Artifacts using the mode toggle inside the Control Room.
          </p>
        </div>
      </div>
    </section>
  )
}
