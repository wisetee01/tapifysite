// Smooth scrolling for internal links
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission & modal handling
const registrationForm = document.getElementById('registrationForm');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const contactSupport = document.getElementById('contactSupport');

let userData = {};

registrationForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Capture form data - FIXED .value instead of .form.value
  userData = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim()
  };

  // Show modal
  paymentModal.classList.add('active');
});

// Close modal
closeModal.addEventListener('click', () => {
  paymentModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === paymentModal) {
    paymentModal.classList.remove('active');
  }
});

// WhatsApp redirect with pre-filled message after payment confirmation
confirmPaymentBtn.addEventListener('click', () => {
  const message = `Hello Tapify Support, I have just completed my registration and made the NGN 10,000 payment. My registration details are: 
Name: ${encodeURIComponent(userData.fullName)} 
Email: ${encodeURIComponent(userData.email)} 
Phone: ${encodeURIComponent(userData.phone)} 
Please help me confirm my payment and activate my account.`;

  const whatsappURL = `https://wa.me/2348128373375?text=${message}`;
  window.open(whatsappURL, '_blank');

  // Optional: Reset form after redirect
  setTimeout(() => {
    paymentModal.classList.remove('active');
    registrationForm.reset();
  }, 1000);
});

// Contact Support link
contactSupport.addEventListener('click', (e) => {
  e.preventDefault();
  const supportMessage = `Hello Tapify Support, I have just registered and would like some assistance.`;
  const supportURL = `https://t.me/Moneymint3?text=${encodeURIComponent(supportMessage)}`;
  window.open(supportURL, '_blank');
});