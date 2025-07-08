document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Animate hamburger icon
    this.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on overlay
  overlay.addEventListener('click', function() {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    mobileMenuToggle.classList.remove('active');
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('active');
          overlay.classList.remove('active');
          document.body.classList.remove('no-scroll');
          mobileMenuToggle.classList.remove('active');
        }
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Tab functionality for events section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Animate stats counter
  const stats = document.querySelectorAll('.stat__number');
  const speed = 200;
  
  function animateStats() {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      const count = +stat.innerText;
      const increment = target / speed;
      
      if (count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(animateStats, 1);
      } else {
        stat.innerText = target;
      }
    });
  }
  
  // Start animation when stats are in view
  const statsSection = document.querySelector('.about__stats');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
      observer.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  
  if (statsSection) {
    observer.observe(statsSection);
  }
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
  
  // Set current year in footer
  const yearElement = document.querySelector('.copyright');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
  }
});
