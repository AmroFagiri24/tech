import { useState, useEffect } from 'react'
import { getCustomers, getServiceRequests, deleteCustomer, deleteServiceRequest, addCustomer } from '../utils/db.js'
import { db } from '../utils/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default function CRMPage({ onBack }) {
  const [customers, setCustomers] = useState([])
  
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', status: 'Pending'
  })

  const services = ['Computer Repair', 'MacBook Repair', 'Virus Removal', 'Data Recovery', 'CCTV Installation', 'Network Setup']
  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled']

  // Load data from Firebase
  const loadCustomers = async () => {
    try {
      const [customersData, serviceRequestsData] = await Promise.all([
        getCustomers(),
        getServiceRequests()
      ])
      
      const allData = [
        ...(customersData || []).map(c => ({...c, source: 'customer'})),
        ...(serviceRequestsData || []).map(s => ({...s, source: 'serviceRequest'}))
      ]
      
      setCustomers(allData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Update existing customer (implement if needed)
        setCustomers(customers.map(c => c.id === editingId ? { ...formData, id: editingId } : c))
      } else {
        // Add new customer to Firebase
        await addCustomer(formData)
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save customer:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', service: '', status: 'Pending' })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (customer) => {
    setFormData(customer)
    setEditingId(customer.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      const customer = customers.find(c => c.id === id)
      
      // Delete from correct Firebase collection
      if (customer?.source === 'serviceRequest') {
        await deleteServiceRequest(id)
      } else {
        await deleteCustomer(id)
      }
      
      // Remove from local state
      setCustomers(customers.filter(c => c.id !== id))
      
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto p-4 pt-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Customer Management</h1>
        </div>

        {/* Controls */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{customer.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <PhoneIcon className="h-4 w-4" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <EnvelopeIcon className="h-4 w-4" />
                      {customer.email}
                    </div>
                    <div className="text-slate-300">
                      Service: <span className="text-cyan-400">{customer.service}</span>
                    </div>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingId ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                  required
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  required
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Customer
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
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