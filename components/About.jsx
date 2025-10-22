import { CheckCircleIcon, UserGroupIcon, ClockIcon, ShieldCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function About() {
  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Expert Technicians',
      description: 'Certified professionals with 10+ years of experience in tech repair and support.'
    },
    {
      icon: ClockIcon,
      title: 'Same-Day Service',
      description: 'Fast turnaround with most repairs completed within 24 hours or less.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'No Fix, No Pay',
      description: 'We guarantee our work - if we can\'t fix it, you don\'t pay a cent.'
    },
    {
      icon: UserGroupIcon,
      title: '1000+ Satisfied Clients',
      description: 'Trusted by over 1000 customers across the GTA for reliable tech solutions.'
    }
  ]

  return (
    <section id="about" className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 animate-pulse">
          <CpuChipIcon className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <CpuChipIcon className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse delay-500">
          <CpuChipIcon className="h-7 w-7 text-blue-500" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <CpuChipIcon className="h-10 w-10 text-blue-400 inline mr-3 animate-pulse" />
            About Us
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Your trusted tech support partner in the <span className="text-blue-400 font-semibold">Greater Toronto Area (GTA)</span>. 
            We provide professional, reliable, and affordable tech solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Professional Tech Support You Can Trust
            </h3>
            <p className="text-gray-300 mb-6">
              At <span className="text-blue-400 font-semibold">Emporos Nexus</span>, we understand how frustrating tech problems can be. 
              That's why we've built our business around providing fast, reliable, and affordable tech support services.
            </p>
            <p className="text-gray-300 mb-6">
              Our certified technicians have over <span className="text-cyan-400 font-semibold">10 years of experience</span> working with all major brands 
              and can handle everything from simple software issues to complex hardware repairs.
            </p>
            <div className="flex items-center text-blue-400 font-semibold bg-blue-500/10 rounded-lg p-3">
              <CheckCircleIcon className="h-5 w-5 mr-2 animate-pulse" />
              <span>Licensed & Insured • 30-Day Warranty • Same-Day Service</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-1">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Tech Support Team"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="text-center bg-gray-800 rounded-lg p-6 hover:bg-gray-750 hover:scale-105 transition-all duration-300"
            >
              <div className="bg-blue-500/20 p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:bg-blue-500/30 transition-colors">
                <feature.icon className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}