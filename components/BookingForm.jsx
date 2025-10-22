import { useState } from 'react'
import { addServiceRequest } from '../utils/db.js'

export default function BookingForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', location: '', service: ''
  })
  const [loading, setLoading] = useState(false)

  const services = ['Computer Repair', 'MacBook Repair', 'Virus Removal', 'Data Recovery', 'CCTV Installation', 'Network Setup', 'Web Design', 'Mobile Applications']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addServiceRequest({
        ...formData,
        status: 'Pending'
      })
      
      alert('Booking submitted successfully! We will contact you soon.')
      onSuccess?.()
      onClose?.()
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-blue-500/30">
        <h2 className="text-xl font-bold text-white mb-4">Book a Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200"
            required
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200"
            required
          />
          
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200"
            required
          />
          
          <input
            type="text"
            placeholder="Location/Address"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-200"
            required
          />
          
          <select
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white"
            required
          >
            <option value="">Select Service</option>
            {services.map(service => (
              <option key={service} value={service} className="bg-gray-800">{service}</option>
            ))}
          </select>
          
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Book Service'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}