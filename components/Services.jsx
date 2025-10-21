import { WrenchScrewdriverIcon, PhoneIcon } from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Computer Repair',
    description: 'Windows & hardware issues, upgrades, and optimization',
    price: 'From $49',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'MacBook Repair',
    description: 'Battery, SSD, motherboard, and screen replacements',
    price: 'From $79',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Virus Removal',
    description: 'Complete malware cleaning and security setup',
    price: 'From $39',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Data Recovery',
    description: 'Recover files from damaged HDDs, SSDs, and USBs',
    price: 'From $99',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'CCTV Installation',
    description: 'Home and business security camera systems',
    price: 'From $199',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Network Setup',
    description: 'Wi-Fi, routers, printers, and network troubleshooting',
    price: 'From $59',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <WrenchScrewdriverIcon className="h-10 w-10 text-blue-400 inline mr-3" />
            Our Services
          </h2>
          <p className="text-lg text-gray-300">
            Professional tech support with <span className="text-blue-400">same-day service</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              <div className="overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <span className="text-xl font-bold text-blue-400">{service.price}</span>
                </div>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.buttonActions) {
                      window.buttonActions.bookService()
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => window.open('tel:+1 (514) 557-1996', '_self')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 inline-flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" />
            Call +1 (514) 557-1996
          </button>
        </div>
      </div>
    </section>
  )
}