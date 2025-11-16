/**
 * Scroll animation utility
 */

export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => observer.observe(el));

  return observer;
};

export const addScrollAnimation = (element, animationType = 'fadeInUp') => {
  if (!element) return;

  element.classList.add('animate-on-scroll');
  
  switch (animationType) {
    case 'slideLeft':
      element.classList.add('slide-in-left');
      break;
    case 'slideRight':
      element.classList.add('slide-in-right');
      break;
    case 'scale':
      element.classList.add('scale-in');
      break;
    default:
      // fadeInUp is default
      break;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(element);
};

