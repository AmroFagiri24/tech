import { useState, useEffect } from 'react'
import { getCustomers, addCustomer, updateCustomer, deleteCustomer, getServiceRequests, deleteServiceRequest } from '../utils/db.js'
import { db } from '../utils/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'
import { 
  XMarkIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function CRM({ onClose }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', location: '', service: '', status: 'Pending'
  })

  const services = ['Computer Repair', 'MacBook Repair', 'Virus Removal', 'Data Recovery', 'CCTV Installation', 'Network Setup', 'Web Design', 'Mobile Applications']
  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled']

  // Load all customer data from Firebase
  const loadCustomers = async () => {
    try {
      setLoading(true)
      console.log('Loading customers and service requests...')
      
      const [customersData, serviceRequestsData] = await Promise.all([
        getCustomers(),
        getServiceRequests()
      ])
      
      console.log('Customers data:', customersData?.length || 0)
      console.log('Service requests data:', serviceRequestsData?.length || 0)
      
      // Combine both collections with proper source identification
      const allData = [
        ...(customersData || []).map(customer => ({ ...customer, source: 'customer' })),
        ...(serviceRequestsData || []).map(req => ({ ...req, source: 'serviceRequest' }))
      ]
      
      console.log('Total combined data:', allData.length)
      setCustomers(allData)
    } catch (error) {
      console.error('Failed to load data:', error)
      alert('Failed to load customer data. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load all data initially
    loadCustomers()
    
    // Set up real-time listeners for both collections
    const unsubscribeCustomers = onSnapshot(collection(db, 'customers'), (snapshot) => {
      console.log('Customers collection changed, reloading...')
      loadCustomers()
    }, (error) => {
      console.error('Customers listener error:', error)
    })
    
    const unsubscribeRequests = onSnapshot(collection(db, 'serviceRequests'), (snapshot) => {
      console.log('Service requests collection changed, reloading...')
      loadCustomers()
    }, (error) => {
      console.error('Service requests listener error:', error)
    })

    return () => {
      unsubscribeCustomers()
      unsubscribeRequests()
    }
  }, [])

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.message?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateCustomer(editingId, formData)
        setCustomers(customers.map(c => c.id === editingId ? { ...formData, id: editingId } : c))
      } else {
        const result = await addCustomer(formData)
        alert('Customer added successfully!')
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save to Firebase:', error)
      alert('Failed to save customer. Please check your Firebase connection.')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', location: '', service: '', status: 'Pending' })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (customer) => {
    setFormData(customer)
    setEditingId(customer.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this record? This action cannot be undone.')) return
    
    try {
      const customer = customers.find(c => c.id === id)
      console.log('Deleting customer:', customer)
      
      // Delete from appropriate collection based on source
      if (customer?.source === 'serviceRequest') {
        console.log('Deleting from serviceRequests collection')
        await deleteServiceRequest(id)
      } else {
        console.log('Deleting from customers collection')
        await deleteCustomer(id)
      }
      
      // Immediately remove from local state
      setCustomers(prev => prev.filter(c => c.id !== id))
      
      // Also refresh data to ensure consistency
      setTimeout(() => loadCustomers(), 500)
      
      alert('Record permanently deleted!')
      
    } catch (error) {
      console.error('Failed to delete record:', error)
      alert('Failed to delete record. Please check your Firebase connection.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-start justify-center z-[9999] p-2 sm:p-4 pt-32 sm:pt-28 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 rounded-xl sm:rounded-2xl w-full max-w-4xl min-h-[calc(100vh-10rem)] sm:min-h-0 sm:max-h-[calc(100vh-10rem)] border border-blue-500/30 flex flex-col shadow-2xl shadow-blue-500/20 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h2 className="text-lg sm:text-xl font-bold text-white">Customer Management</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-3 sm:p-4 border-b border-slate-700 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-200 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 focus:outline-none"
            />
          </div>
          <button
            onClick={loadCustomers}
            className="w-full sm:w-auto px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            🔄 Refresh
          </button>
          <button
            onClick={async () => {
              if (!confirm('Delete ALL test data? This will remove test records permanently from both collections.')) return
              try {
                const testNames = ['John Doe', 'Jane Smith', 'Test Customer']
                const toDelete = customers.filter(c => testNames.includes(c.name))
                let deletedCount = 0
                
                for (const customer of toDelete) {
                  try {
                    if (customer.source === 'serviceRequest') {
                      await deleteServiceRequest(customer.id)
                    } else {
                      await deleteCustomer(customer.id)
                    }
                    deletedCount++
                  } catch (deleteError) {
                    console.error(`Failed to delete ${customer.name}:`, deleteError)
                  }
                }
                
                await loadCustomers()
                alert(`Deleted ${deletedCount} test records!`)
              } catch (error) {
                console.error('Failed to clear test data:', error)
                alert('Failed to clear test data')
              }
            }}
            className="w-full sm:w-auto px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            🗑️ Clear Test Data
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Add
          </button>
        </div>

        {/* Customer List */}
        <div className="flex-1 overflow-auto p-3 sm:p-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-white">Loading customers...</div>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No customers found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-1 truncate">{customer.name}</h3>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 text-slate-300">
                        <PhoneIcon className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <EnvelopeIcon className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="truncate">📍 {customer.location}</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-cyan-400 truncate">{customer.service}</span>
                      </div>
                      {customer.message && (
                        <div className="text-slate-300 text-xs">
                          <span className="truncate">💬 {customer.message}</span>
                        </div>
                      )}
                      {customer.source === 'serviceRequest' && (
                        <div className="text-xs text-orange-400">
                          📋 Service Request
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'Completed' ? 'bg-green-600/20 text-green-400' :
                        customer.status === 'In Progress' ? 'bg-yellow-600/20 text-yellow-400' :
                        customer.status === 'Cancelled' ? 'bg-red-600/20 text-red-400' :
                        'bg-blue-600/20 text-blue-400'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="absolute inset-0 bg-black/70 flex items-start justify-center p-4 pt-8 overflow-y-auto z-10">
            <div className="bg-slate-800 rounded-lg p-4 w-full max-w-sm border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-3">
                {editingId ? 'Edit' : 'Add'} Customer
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-200 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-200 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-200 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Location (Address)"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-200 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                  required
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800 text-gray-200">Select Service</option>
                  {services.map(service => (
                    <option key={service} value={service} className="bg-gray-800 text-white">{service}</option>
                  ))}
                </select>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-3 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 transition-all duration-300 hover:bg-white/25 focus:outline-none"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    {editingId ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}