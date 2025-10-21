import { useState } from 'react'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookings, setBookings] = useState([])

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true)
      loadBookings()
    } else {
      alert('Invalid credentials')
    }
  }

  const loadBookings = () => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(savedBookings)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <LockClosedIcon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-slate-400">Access customer bookings</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-slate-500 text-center mt-4">
            Demo: admin / admin123
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Customer Bookings</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <UserIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No bookings yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">{booking.name}</h3>
                    <p className="text-slate-400 text-sm">{booking.email}</p>
                    <p className="text-slate-400 text-sm">{booking.phone}</p>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold">{booking.service}</p>
                    <p className="text-slate-400 text-sm mt-1">{booking.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-sm">{booking.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}