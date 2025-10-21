import { PhoneIcon, CpuChipIcon, BoltIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-950 via-cyan-950 to-indigo-950">
      <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-8 lg:mx-16 border bg-gradient-to-br from-blue-900/90 via-cyan-900/20 to-blue-900/90 border-blue-500/30 backdrop-blur-sm">
        {/* Animated Tech Elements */}
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
          
          {/* Pulsing Dots */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          
          {/* Circuit Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
            <path d="M0,100 L100,100 L100,50 L300,50 L300,150 L400,150" stroke="#3b82f6" strokeWidth="1" fill="none" className="animate-pulse" />
            <circle cx="100" cy="100" r="3" fill="#06b6d4" className="animate-pulse" />
            <circle cx="300" cy="50" r="2" fill="#8b5cf6" className="animate-pulse" style={{animationDelay: '0.5s'}} />
          </svg>
        </div>
        
        <div className="relative p-8 sm:p-12 text-center">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
              <span className="flex items-center justify-center gap-3 mb-2">
                <div className="relative">
                  <PhoneIcon className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                </div>
                Need Tech Support
              </span>
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                Right Now?
              </span>
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-blue-200">
              Don't let tech problems slow you down. Get professional help today with our 
              <span className="text-cyan-400 font-semibold">same-day service guarantee</span>.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            {/* Book Online Button */}
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.buttonActions) {
                  window.buttonActions.bookService()
                }
              }}
              className="relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group border-2 bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500/50 text-white hover:from-blue-500 hover:to-cyan-500 hover:scale-105 shadow-lg">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <CpuChipIcon className="h-5 w-5 group-hover:animate-spin" />
                Book Online Service
              </span>
            </button>
          </div>
          
          {/* Live Status Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-blue-200">Available 7 days a week</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-blue-200">Same-day service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-blue-200">Emergency support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}