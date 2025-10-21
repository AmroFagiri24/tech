import { StarIcon } from '@heroicons/react/24/outline'

const reviews = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Amazing service! They fixed my laptop the same day and explained everything clearly. Highly recommend!',
    service: 'Computer Repair',
    color: 'blue'
  },
  {
    name: 'Mike Chen',
    rating: 5,
    text: 'Professional CCTV installation for my business. Great quality cameras and excellent customer service.',
    service: 'CCTV Installation',
    color: 'purple'
  },
  {
    name: 'Emily Davis',
    rating: 5,
    text: 'Recovered all my important files from a crashed hard drive. Thought they were gone forever!',
    service: 'Data Recovery',
    color: 'emerald'
  },
]

const getGradientClass = (color) => {
  const gradients = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-green-500'
  }
  return gradients[color] || gradients.blue
}

const getHoverClass = (color) => {
  const hovers = {
    blue: 'hover:border-blue-500/30',
    purple: 'hover:border-purple-500/30',
    emerald: 'hover:border-emerald-500/30'
  }
  return hovers[color] || hovers.blue
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <span className="text-3xl font-bold text-white">4.9/5</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-400">(200+ reviews)</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div key={index} className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:scale-105 bg-slate-800/50 border-slate-700/50 ${getHoverClass(review.color)} backdrop-blur-sm`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(review.color)}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getGradientClass(review.color)} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-sm text-slate-400">{review.service}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border bg-slate-800/50 border-slate-700/50 text-white hover:border-blue-500/50 backdrop-blur-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span>See all reviews on Google</span>
          </button>
        </div>
      </div>
    </section>
  )
}