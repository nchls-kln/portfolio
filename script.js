// Theme toggle functionality
const themeToggles = document.querySelectorAll('[data-theme-toggle]');
const navMenuToggle = document.getElementById('nav-menu-toggle');
const navLinksContainer = document.getElementById('nav-links');
const certificateModal = document.getElementById('certificate-modal');
const certificateModalContent = certificateModal?.querySelector('.certificate-modal-content');
const certificateModalImage = document.getElementById('certificate-modal-image');
const certificateModalDescription = document.getElementById('certificate-modal-description');
const certificateModalCloseButton = certificateModal?.querySelector('.certificate-modal-close');
const certificateModalTriggers = document.querySelectorAll('.achievement-link[data-cert-src]');
const body = document.body;
let lastFocusedElement = null;

function closeMobileMenu() {
  if (!navLinksContainer || !navMenuToggle) {
    return;
  }

  navLinksContainer.classList.remove('open');
  navMenuToggle.classList.remove('active');
  navMenuToggle.setAttribute('aria-expanded', 'false');
}

function closeCertificateModal() {
  if (!certificateModal) {
    return;
  }

  certificateModal.classList.remove('open');
  certificateModal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function openCertificateModal(imageSrc, imageAlt, certificateDescription) {
  if (!certificateModal || !certificateModalImage) {
    return;
  }

  lastFocusedElement = document.activeElement;
  certificateModalImage.src = imageSrc;
  certificateModalImage.alt = imageAlt || 'Certificate preview';

  if (certificateModalDescription) {
    certificateModalDescription.textContent = certificateDescription || 'This certification verifies key technical skills and practical knowledge in the corresponding domain.';
  }

  certificateModal.classList.add('open');
  certificateModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');

  if (certificateModalCloseButton) {
    certificateModalCloseButton.focus();
  } else if (certificateModalContent) {
    certificateModalContent.focus();
  }
}

function trapModalFocus(event) {
  if (!certificateModal || !certificateModal.classList.contains('open') || event.key !== 'Tab') {
    return;
  }

  const focusableElements = certificateModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

// Check for saved theme preference or default to light mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  updateThemeIcon();
}

// Toggle theme on button click
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();

    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  });
});

// Update theme icon based on current theme
function updateThemeIcon() {
  themeToggles.forEach(toggle => {
    const icon = toggle.querySelector('.theme-icon');
    if (!icon) {
      return;
    }

    if (body.classList.contains('dark')) {
      icon.textContent = '🌙';
      toggle.classList.add('active');
    } else {
      icon.textContent = '☀️';
      toggle.classList.remove('active');
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
      closeMobileMenu();
    }
  });
});

if (navMenuToggle && navLinksContainer) {
  navMenuToggle.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    navMenuToggle.classList.toggle('active', isOpen);
    navMenuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth > 768) {
      return;
    }

    const clickedInsideMenu = navLinksContainer.contains(event.target);
    const clickedToggle = navMenuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

if (certificateModal && certificateModalImage && certificateModalTriggers.length > 0) {
  certificateModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const imageSrc = trigger.getAttribute('data-cert-src');
      const imageAlt = trigger.getAttribute('data-cert-alt');
      const certificateDescription = trigger.getAttribute('data-cert-description');

      if (imageSrc) {
        openCertificateModal(imageSrc, imageAlt, certificateDescription);
      }
    });
  });

  certificateModal.querySelectorAll('[data-close-modal]').forEach(closeTarget => {
    closeTarget.addEventListener('click', closeCertificateModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certificateModal.classList.contains('open')) {
      closeCertificateModal();
    }

    trapModalFocus(event);
  });
}

// Update active navigation link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navHeight = document.querySelector('.nav').offsetHeight;

  let current = sections[0]?.getAttribute('id') || '';
  const scrollPosition = window.pageYOffset + navHeight + 120;
  const viewportBottom = window.pageYOffset + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  // Ensure the last section is active when the user reaches the page bottom.
  if (viewportBottom >= docHeight - 5 && sections.length > 0) {
    current = sections[sections.length - 1].getAttribute('id');
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      updateActiveNavLink();
      scrollTimeout = null;
    }, 10);
  }
});

// Initialize active nav link on page load
updateActiveNavLink();

// Add subtle animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Observe project cards for staggered animation
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe achievement card
document.querySelectorAll('.achievement-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
