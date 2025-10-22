// Button action utilities
export const buttonActions = {
  // Phone call functionality
  makeCall: (phoneNumber = '+15145571996') => {
    window.location.href = `tel:${phoneNumber}`;
  },

  // Booking functionality
  bookService: () => {
    // Always show booking modal
    showBookingModal();
  },

  // Navigation with smooth scroll
  navigateTo: (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('/')) {
      // Use Next.js router for internal navigation
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    } else {
      window.open(href, '_blank');
    }
  },

  // Contact actions
  sendEmail: (email = 'Empros2025@gmail.com') => {
    window.location.href = `mailto:${email}`;
  },

  // Social media actions
  openSocial: (platform, handle) => {
    const urls = {
      facebook: `https://facebook.com/${handle}`,
      twitter: `https://twitter.com/${handle}`,
      instagram: `https://instagram.com/${handle}`,
      linkedin: `https://linkedin.com/company/${handle}`
    };
    window.open(urls[platform], '_blank');
  },

  // Show success notification
  showNotification: (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

// Booking modal functionality
const showBookingModal = () => {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4';
  modal.innerHTML = `
    <div class="bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-auto transform transition-all duration-500 scale-95 opacity-0 border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-h-[90vh] overflow-y-auto backdrop-blur-sm relative" id="booking-modal">
      <button onclick="closeBookingModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <div class="text-center mb-4 sm:mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-3 sm:mb-4 shadow-lg shadow-blue-500/30">
          <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Book Your Service</h3>
        <p class="text-gray-300 text-sm">Professional tech support with <span class="text-blue-400 font-semibold">same-day service</span></p>
      </div>
      <form id="booking-form" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input type="text" name="name" placeholder="Full Name" class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white placeholder-gray-200 font-medium transition-all duration-300 hover:bg-white/25 text-sm sm:text-base" required>
          <input type="email" name="email" placeholder="Email Address" class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white placeholder-gray-200 font-medium transition-all duration-300 hover:bg-white/25 text-sm sm:text-base" required>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input type="tel" name="phone" placeholder="Phone Number" class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white placeholder-gray-200 font-medium transition-all duration-300 hover:bg-white/25 text-sm sm:text-base" required>
          <select name="service" class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white font-medium transition-all duration-300 hover:bg-white/25 text-sm sm:text-base" required>
            <option value="" class="bg-gray-800 text-gray-200">Select Service</option>
            <option value="Computer Repair" class="bg-gray-800 text-white">Computer Repair</option>
            <option value="MacBook Repair" class="bg-gray-800 text-white">MacBook Repair</option>
            <option value="Data Recovery" class="bg-gray-800 text-white">Data Recovery</option>
            <option value="Virus Removal" class="bg-gray-800 text-white">Virus Removal</option>
            <option value="CCTV Installation" class="bg-gray-800 text-white">CCTV Installation</option>
            <option value="Network Setup" class="bg-gray-800 text-white">Network Setup</option>
            <option value="Web Design" class="bg-gray-800 text-white">Web Design</option>
            <option value="Mobile Applications" class="bg-gray-800 text-white">Mobile Applications</option>
          </select>
        </div>
        <input type="text" name="location" placeholder="Service Location (Address)" class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white placeholder-gray-200 font-medium transition-all duration-300 hover:bg-white/25 text-sm sm:text-base" required>
        <textarea name="message" placeholder="Describe your tech issue..." class="w-full p-3 sm:p-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/30 text-white placeholder-gray-200 font-medium h-20 sm:h-24 transition-all duration-300 resize-none hover:bg-white/25 text-sm sm:text-base" required></textarea>
        <div class="flex gap-3 pt-4">
          <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-3.5 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transform text-sm sm:text-base">
            Book Now
          </button>
          <button type="button" onclick="closeBookingModal()" class="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 sm:py-3.5 px-4 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-sm sm:text-base">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    const modalContent = modal.querySelector('#booking-modal');
    modalContent.style.transform = 'scale(1)';
    modalContent.style.opacity = '1';
  }, 10);
  
  // Handle form submission
  modal.querySelector('#booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const booking = {
      name: e.target.querySelector('input[name="name"]').value,
      email: e.target.querySelector('input[name="email"]').value,
      phone: e.target.querySelector('input[name="phone"]').value,
      location: e.target.querySelector('input[name="location"]').value,
      service: e.target.querySelector('select').value,
      message: e.target.querySelector('textarea').value,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    try {
      const response = await fetch('http://localhost:3001/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (response.ok) {
        buttonActions.showNotification('Booking saved to database successfully!');
      } else {
        throw new Error('Database save failed');
      }
    } catch (error) {
      console.error('Failed to save to database:', error);
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      buttonActions.showNotification('Booking saved locally - will sync when online.');
    }
    
    closeBookingModal();
  });
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBookingModal();
  });
};

// Close booking modal
window.closeBookingModal = () => {
  const modal = document.querySelector('.fixed.inset-0.z-50');
  if (modal) {
    const modalContent = modal.querySelector('#booking-modal');
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
};

// Make buttonActions globally available
if (typeof window !== 'undefined') {
  window.buttonActions = buttonActions;
}

export default buttonActions;