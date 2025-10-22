import { PhoneIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-br from-slate-900 via-gray-900 to-black border-blue-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/styles/Image/Emporos-logo1.png" alt="Emporos Nexus Logo" className="h-8 w-8 rounded-lg" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Emporos Nexus</h3>
            </div>
            <p className="mb-6 max-w-md text-slate-300">
              Professional tech support and repair services. Same-day service with our <span className="text-cyan-400 font-semibold">"No Fix, No Pay"</span> guarantee.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">+1 (514) 557-1996</span>
              </div>
              <p className="text-slate-300">Empros2025@gmail.com</p>
              <p className="text-slate-300">Toronto, ON, Canada</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Services</h4>
            <ul className="space-y-2">
              {['Computer Repair', 'MacBook Repair', 'Virus Removal', 'Data Recovery', 'CCTV Installation', 'Web Design', 'Mobile Applications'].map((service) => (
                <li key={service}>
                  <button className="text-sm hover:text-emerald-300 hover:scale-105 transition-all duration-300 text-slate-300">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-indigo-400">Company</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', id: 'about' },
                { name: 'Contact', id: 'contact' },
                { name: 'Testimonials', id: 'reviews' },
                { name: 'FAQ', id: 'faq' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-sm hover:text-indigo-300 hover:scale-105 transition-all duration-300 text-slate-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center border-blue-500/30 text-slate-400">
          <p>© 2024 Emporos Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}