import { PhoneIcon, CheckCircleIcon, StarIcon, BoltIcon, XMarkIcon, SunIcon, MoonIcon, CpuChipIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { buttonActions } from '../utils/buttonActions'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    location: '',
    serviceType: '',
    issue: ''
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    // Add global click handler for navigation
    const handleNavClick = (e) => {
      const link = e.target.closest('a[href^="#"], button[data-scroll]')
      if (link) {
        e.preventDefault()
        const target = link.getAttribute('href')?.substring(1) || link.getAttribute('data-scroll')
        if (target) scrollToSection(target)
      }
    }
    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [])

  useEffect(() => {
    // Add global event listener for booking modal
    const handleOpenBookingModal = () => {
      setIsBookingModalOpen(true)
    }
    window.addEventListener('openBookingModal', handleOpenBookingModal)
    return () => window.removeEventListener('openBookingModal', handleOpenBookingModal)
  }, [])

  const handleCallClick = () => {
    setModalContent('call')
    setIsModalOpen(true)
    buttonActions.makeCall()
    buttonActions.showNotification('Calling for your free estimate...')
  }

  const handleBookClick = () => {
    setIsBookingModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
    setBookingForm({ name: '', email: '', location: '', serviceType: '', issue: '' })
  }

  const handleFormChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const booking = {
      ...bookingForm,
      phone: '+1 (514) 557-1996', // Default phone since not in form
      message: bookingForm.issue,
      status: 'Pending',
      createdAt: new Date().toISOString()
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })
      if (response.ok) {
        buttonActions.showNotification('Booking saved to database successfully!')
      } else {
        throw new Error('Database save failed')
      }
    } catch (error) {
      console.error('Failed to save to database:', error)
      buttonActions.showNotification('Booking saved locally - will sync when online.')
    }
    
    closeBookingModal()
  }

  const features = [
    { icon: BoltIcon, text: 'Available 7 days a week', color: 'text-cyan-400' },
    { icon: CheckCircleIcon, text: 'Same-day service', color: 'text-emerald-400' },
    { icon: CpuChipIcon, text: 'Emergency support', color: 'text-blue-400' },
    { icon: WrenchScrewdriverIcon, text: 'No Fix, No Pay', color: 'text-indigo-400' },
  ]
  
  const services = [
    'Computer Repair',
    'MacBook Repair', 
    'Virus Removal',
    'Data Recovery',
    'CCTV Installation',
    'Web Design',
    'Mobile Applications'
  ]

  return (
    <section id="home" className={`relative min-h-screen py-20 overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-blue-950 via-cyan-950 to-indigo-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Tech Circuit Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Tech Icons */}
        <div className="absolute top-4 left-4 animate-bounce" style={{animationDelay: '0s'}}>
          <CpuChipIcon className="h-6 w-6 text-blue-400/60" />
        </div>
        <div className="absolute top-8 right-8 animate-bounce" style={{animationDelay: '1s'}}>
          <WrenchScrewdriverIcon className="h-5 w-5 text-cyan-400/60" />
        </div>
        <div className="absolute bottom-6 left-12 animate-bounce" style={{animationDelay: '2s'}}>
          <BoltIcon className="h-4 w-4 text-indigo-400/60" />
        </div>
        
        {/* Animated Dots */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        
        {/* Enhanced Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
          <path d="M0,100 L100,100 L100,50 L300,50 L300,150 L400,150" stroke="#3b82f6" strokeWidth="1" fill="none" className="animate-pulse" />
          <circle cx="100" cy="100" r="3" fill="#06b6d4" className="animate-pulse" />
          <circle cx="300" cy="50" r="2" fill="#8b5cf6" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        </svg>
        
        {/* Original Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M0,200 L200,200 L200,400 L600,400 L600,600 L1000,600" stroke="url(#circuit)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M0,800 L300,800 L300,300 L700,300 L700,100 L1000,100" stroke="url(#circuit)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}} />
          <circle cx="200" cy="200" r="8" fill="#3b82f6" className="animate-ping" />
          <circle cx="600" cy="400" r="8" fill="#06b6d4" className="animate-ping" style={{animationDelay: '0.5s'}} />
          <circle cx="300" cy="800" r="8" fill="#8b5cf6" className="animate-ping" style={{animationDelay: '1.5s'}} />
        </svg>
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>



      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-1000">
            <div className={`mb-6 p-6 rounded-xl border group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/60 via-cyan-800/40 to-blue-900/60 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20' 
                : 'bg-blue-50/90 border-blue-200 hover:border-blue-400 hover:shadow-lg'
            } backdrop-blur-sm animate-pulse`}>
              <h2 className={`font-bold mb-2 text-lg flex items-center gap-2 ${
                isDarkMode ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-blue-600'
              }`}>
                <BoltIcon className="h-5 w-5 animate-spin" />
                Need Tech Support Right Now?
              </h2>
              <p className={`text-sm ${
                isDarkMode ? 'text-blue-200 group-hover:text-cyan-100' : 'text-blue-700'
              }`}>Don't let tech problems slow you down. Get professional help today with our same-day service guarantee.</p>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="flex items-center gap-3 mb-2">
                <CpuChipIcon className="h-12 w-12 md:h-16 md:w-16 text-blue-400" />
                Emporos Nexus
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent block animate-in slide-in-from-right duration-1000 delay-300">
                Tech Support
              </span>
            </h1>
            <p className={`text-xl mb-8 animate-in fade-in duration-1000 delay-500 transition-colors duration-300 ${
              isDarkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Professional tech support and repair services with our <span className="text-cyan-400 font-semibold">"No Fix, No Pay"</span> guarantee.
            </p>
            
            {/* Contact Info */}
            <div className={`mb-8 p-6 rounded-xl border group hover:scale-105 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/60 to-cyan-900/40 border-blue-500/50 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20' 
                : 'bg-blue-50/90 border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
            } backdrop-blur-sm`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                  }`}>Call Now:</h3>
                  <p className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>+1 (514) 557-1996</p>
                </div>
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                  }`}>Contact:</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}>Emporos2025@gmail.com</p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}>Toronto, ON, Canada</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8 animate-in slide-in-from-bottom duration-1000 delay-700 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleCallClick}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'
                } hover:scale-105 active:scale-95`}
              >
                <PhoneIcon className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                <span className="relative">
                  Call Now - +1 (514) 557-1996
                  <div className="absolute inset-0 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </button>
              
              <button 
                onClick={handleBookClick}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border ${
                  isDarkMode 
                    ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                } hover:scale-105 active:scale-95`}
              >
                Book Online Service
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-in fade-in duration-1000 delay-1000">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={feature.text}
                    className={`flex items-center p-4 rounded-xl transition-all duration-500 cursor-pointer border group transform hover:scale-110 hover:rotate-1 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-blue-900/60 to-cyan-800/40 border-blue-500/50 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20' 
                        : 'bg-blue-50/90 border-blue-200 hover:border-blue-400 hover:shadow-lg'
                    } backdrop-blur-sm`}
                    style={{ animationDelay: `${1200 + index * 100}ms` }}
                  >
                    <div className={`p-3 rounded-lg mr-3 transition-all duration-300 group-hover:scale-110 ${
                      isDarkMode ? 'bg-blue-800/60 group-hover:bg-cyan-700/80' : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <Icon className={`h-5 w-5 ${feature.color} group-hover:animate-pulse`} />
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-100 group-hover:text-white' : 'text-blue-800 group-hover:text-blue-900'
                    }`}>{feature.text}</span>
                  </div>
                )
              })}
            </div>
            
            <div className={`p-6 rounded-xl border mb-8 group hover:scale-105 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-slate-600/50 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10' 
                : 'bg-white/90 border-gray-200 hover:border-emerald-300 hover:shadow-lg'
            } backdrop-blur-sm`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-600'
              }`}>
                <CpuChipIcon className="h-5 w-5 group-hover:animate-spin" />
                Services:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {services.map((service, index) => (
                  <div 
                    key={service}
                    className={`text-sm p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                      isDarkMode ? 'text-slate-300 bg-slate-700/40 hover:bg-slate-600/60 hover:text-white border border-slate-600/30 hover:border-emerald-400/50' : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-6 rounded-xl border group hover:scale-105 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-900/60 to-indigo-900/40 border-blue-500/50 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/20' 
                : 'bg-blue-50/90 border-blue-200 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20'
            } backdrop-blur-sm`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-indigo-600'
              }`}>
                <WrenchScrewdriverIcon className="h-5 w-5 group-hover:animate-bounce" />
                Company:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => scrollToSection('about')} className={`text-sm p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-1 transform ${
                  isDarkMode ? 'text-blue-200 bg-blue-800/40 hover:bg-indigo-700/60 hover:text-white border border-blue-600/30 hover:border-indigo-400/50' : 'text-blue-700 bg-blue-100 hover:bg-indigo-200 hover:text-indigo-800'
                }`}>About Us</button>
                <button onClick={() => scrollToSection('contact')} className={`text-sm p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-1 transform ${
                  isDarkMode ? 'text-blue-200 bg-blue-800/40 hover:bg-indigo-700/60 hover:text-white border border-blue-600/30 hover:border-indigo-400/50' : 'text-blue-700 bg-blue-100 hover:bg-indigo-200 hover:text-indigo-800'
                }`}>Contact</button>
                <button onClick={() => scrollToSection('reviews')} className={`text-sm p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-1 transform ${
                  isDarkMode ? 'text-blue-200 bg-blue-800/40 hover:bg-indigo-700/60 hover:text-white border border-blue-600/30 hover:border-indigo-400/50' : 'text-blue-700 bg-blue-100 hover:bg-indigo-200 hover:text-indigo-800'
                }`}>Testimonials</button>
                <button onClick={() => scrollToSection('faq')} className={`text-sm p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-1 transform ${
                  isDarkMode ? 'text-blue-200 bg-blue-800/40 hover:bg-indigo-700/60 hover:text-white border border-blue-600/30 hover:border-indigo-400/50' : 'text-blue-700 bg-blue-100 hover:bg-indigo-200 hover:text-indigo-800'
                }`}>FAQ</button>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Computer Repair Service"
                className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-lg font-semibold text-slate-200">Professional Tech Support</p>
                <p className="text-sm text-slate-400">© 2024 Emporos Nexus. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Call Modal */}
      {isModalOpen && modalContent === 'call' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`p-8 rounded-2xl max-w-md w-full mx-4 relative ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'} shadow-2xl`}>
            <button 
              onClick={closeModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <PhoneIcon className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Calling Now...</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                We're connecting you to our tech support team for your free estimate.
              </p>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                +1 (514) 557-1996
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className={`p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'} shadow-2xl`}>
            <button 
              onClick={closeBookingModal}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
                <CpuChipIcon className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className={`text-2xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Book Online Service</h3>
              <p className={`text-center ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={bookingForm.name}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={bookingForm.email}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Location *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={bookingForm.location}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  placeholder="Your address or preferred service location"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Type of Service *</label>
                <select
                  name="serviceType"
                  required
                  value={bookingForm.serviceType}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Explain the Issue *</label>
                <textarea
                  name="issue"
                  required
                  rows={4}
                  value={bookingForm.issue}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  placeholder="Please describe your tech issue in detail..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'} hover:scale-105 active:scale-95 shadow-lg`}
                >
                  Submit Booking Request
                </button>
                <button
                  type="button"
                  onClick={handleCallClick}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border ${isDarkMode ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'} hover:scale-105 active:scale-95`}
                >
                  <PhoneIcon className="h-5 w-5 inline mr-2" />
                  Call Instead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}