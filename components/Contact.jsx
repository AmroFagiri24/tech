import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { buttonActions } from '../utils/buttonActions'

export default function Contact() {
  const handleCallClick = () => {
    buttonActions.makeCall()
    buttonActions.showNotification('Calling Emporos Nexus...')
  }

  const handleEmailClick = () => {
    buttonActions.sendEmail()
  }

  const handleBookClick = () => {
    buttonActions.bookService()
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to solve your tech problems? Contact us today for fast, professional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <PhoneIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <button 
                    onClick={handleCallClick}
                    className="text-blue-400 hover:text-cyan-400 transition-colors"
                  >
                    +1 (514) 557-1996
                  </button>
                  <p className="text-sm text-gray-400">Call for immediate support</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <EnvelopeIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <button 
                    onClick={handleEmailClick}
                    className="text-blue-400 hover:text-cyan-400 transition-colors"
                  >
                    Emporos2025@gmail.com
                  </button>
                  <p className="text-sm text-gray-400">Send us your questions</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <MapPinIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-300">Toronto, ON, Canada</p>
                  <p className="text-sm text-gray-400">Serving Greater Toronto Area</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                  <ClockIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Hours</h4>
                  <p className="text-gray-300">Monday - Sunday</p>
                  <p className="text-gray-300">8:00 AM - 8:00 PM</p>
                  <p className="text-sm text-gray-400">Emergency service available</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl">
              <h4 className="font-semibold text-white mb-2">Need Immediate Help?</h4>
              <p className="text-gray-300 mb-4">
                Don't wait - get your tech problems solved today with our same-day service guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleCallClick} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex-1 flex items-center justify-center">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Call Now
                </button>
                <button onClick={handleBookClick} className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex-1">
                  Book Service
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Contact Form</h3>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: 'General Inquiry',
                location: 'Contact Form',
                status: 'Pending',
                message: formData.get('message')
              }
              try {
                const { addServiceRequest } = await import('../utils/db.js')
                await addServiceRequest(contactData)
                buttonActions.showNotification('Message sent! We\'ll contact you soon.')
                e.target.reset()
              } catch (error) {
                console.error('Failed to send message:', error)
                buttonActions.showNotification('Failed to send message. Please try again.', 'error')
              }
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  name="name"
                  type="text" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  name="email"
                  type="email" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input 
                  name="phone"
                  type="tel" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 h-32"
                  placeholder="Describe your tech issue..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}