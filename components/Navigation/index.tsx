'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/lib/constants'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-eve-dark/90 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <span 
            className="text-2xl text-eve-green transition-all duration-300 group-hover:text-glow-green"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            e
          </span>
          <span className="text-sm tracking-[0.3em] font-light hidden sm:block">
            EVE VERIFIED
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
          {navItems.map((item) => (
            'children' in item && item.children ? (
              // Dropdown item
              <div key={item.name} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  className="text-xs text-gray-500 hover:text-white transition-colors duration-200 tracking-wide flex items-center gap-1"
                >
                  {item.name}
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 py-2 min-w-[180px] bg-eve-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Regular item
              <a
                key={item.name}
                href={item.href}
                className="text-xs text-gray-500 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {item.name}
              </a>
            )
          ))}
          <a
            href="mailto:info@eveverified.com"
            className="text-xs px-4 py-2 rounded-full border border-eve-green/30 text-eve-green 
                       hover:bg-eve-green/10 transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-eve-dark/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                'children' in item && item.children ? (
                  // Mobile dropdown
                  <div key={item.name}>
                    <div className="text-sm text-gray-500 py-2 font-medium">
                      {item.name}
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
