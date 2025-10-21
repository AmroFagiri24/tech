import { useState } from 'react'
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How quickly can you fix my computer?",
    answer: "Most repairs are completed within 24 hours. For simple issues like virus removal or software problems, we often finish the same day. Complex hardware repairs may take 1-2 business days."
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer: "Yes! We provide a 30-day warranty on all repairs. If the same issue occurs within 30 days, we'll fix it free of charge. We also offer our 'No Fix, No Pay' guarantee."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the Greater Montreal Area including downtown Montreal, Laval, Longueuil, and surrounding suburbs. We offer both in-store service and on-site visits for your convenience."
  },
  {
    question: "How much do repairs typically cost?",
    answer: "Repair costs vary by service type. Basic diagnostics start at $39, computer repairs from $49, MacBook repairs from $79, and data recovery from $99. We provide free estimates before any work begins."
  },
  {
    question: "Do you work on all computer brands?",
    answer: "Yes, we service all major brands including Dell, HP, Lenovo, ASUS, Acer, Apple MacBooks, and custom-built PCs. Our technicians are certified to work on both Windows and Mac systems."
  },
  {
    question: "Can you recover data from a crashed hard drive?",
    answer: "In most cases, yes! We have specialized tools and techniques for data recovery from damaged HDDs, SSDs, and USB drives. Success rates vary depending on the type and extent of damage."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <QuestionMarkCircleIcon className="h-10 w-10 text-blue-400 inline mr-3" />
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300">
            Get answers to common questions about our tech support services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <button 
            onClick={() => window.open('tel:+1 (514) 557-1996', '_self')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Call Us: +1 (514) 557-1996
          </button>
        </div>
      </div>
    </section>
  )
}