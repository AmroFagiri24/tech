import { useState } from 'react'
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import CRMPage from '../pages/CRMPage'

export default function AdminLogin({ onClose }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple authentication (replace with real auth)
    if (credentials.username === 'amro' && credentials.password === '1234') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  if (isAuthenticated) {
    return <CRMPage onBack={() => setIsAuthenticated(false)} />
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 min-h-screen">
      <div className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full mx-auto transform transition-all duration-500 border border-blue-500/30 shadow-2xl shadow-blue-500/20 backdrop-blur-sm relative my-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10">
          <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-3 sm:mb-4 shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Staff Login</h2>
          <p className="text-gray-300 text-xs sm:text-sm">Access the <span className="text-blue-400 font-semibold">management system</span></p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            className="w-full p-3 sm:p-4 bg-white/30 backdrop-blur-sm border-2 border-white/40 rounded-lg text-white placeholder-gray-100 font-semibold focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/40 transition-all duration-300 hover:bg-white/35 focus:outline-none text-sm sm:text-base"
            required
          />
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full p-3 sm:p-4 bg-white/30 backdrop-blur-sm border-2 border-white/40 rounded-lg text-white placeholder-gray-100 font-semibold focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/40 transition-all duration-300 hover:bg-white/35 focus:outline-none pr-12 text-sm sm:text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-100 hover:text-white transition-colors"
            >
              {showPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>

          {error && <p className="text-red-400 text-xs sm:text-sm text-center bg-red-500/20 rounded-lg p-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}