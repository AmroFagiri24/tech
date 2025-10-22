import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, PhoneIcon, CpuChipIcon, UserIcon } from '@heroicons/react/24/outline'
import { buttonActions } from '../utils/buttonActions'
import AdminLogin from './AdminLogin'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.location.href = href
    }
  }

  const handleCallClick = () => {
    buttonActions.makeCall()
    buttonActions.showNotification('Calling Emporos Nexus Support...')
  }

  const handleBookClick = () => {
    if (typeof window !== 'undefined' && window.buttonActions) {
      window.buttonActions.bookService()
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b bg-slate-900/90 border-slate-700/50 backdrop-blur-xl ${scrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('/')}
              className="text-2xl font-bold flex items-center hover:scale-105 transition-all duration-300 text-white"
            >
              <div className="mr-3">
                <img src="/styles/Image/Emporos-logo1.png" alt="Emporos Nexus Logo" className="h-10 w-10 rounded-xl" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Emporos Nexus
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 border text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 border-transparent hover:border-cyan-500/30"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/30"
            >
              <UserIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">Staff</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleCallClick}
              className="flex items-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 border text-cyan-400 hover:text-white hover:bg-cyan-600/20 border-cyan-500/30 hover:border-cyan-400"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">Call Now</span>
            </button>
            <button 
              onClick={handleBookClick} 
              className="px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500"
            >
              Book Service
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t mt-2 rounded-2xl backdrop-blur-sm bg-slate-800/90 border-slate-700/50">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block px-4 py-3 rounded-xl text-base font-medium w-full text-left transition-all duration-300 hover:scale-105 active:scale-95 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 pb-3 border-t border-white/20">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 w-full text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Staff Login
                </button>
                <button 
                  onClick={handleCallClick}
                  className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 w-full mt-2 text-cyan-400 hover:bg-slate-700/50"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Call Now
                </button>
                <button 
                  onClick={handleBookClick}
                  className="w-full mt-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500"
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </header>
  )
}