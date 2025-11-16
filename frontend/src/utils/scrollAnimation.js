/**
 * Scroll animation utility
 */

export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve to allow re-animation if needed
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    observer.observe(el);
  });

  // Re-observe on dynamic content changes
  const mutationObserver = new MutationObserver(() => {
    const newElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
    newElements.forEach(el => observer.observe(el));
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

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
      // fadeInUp is default (translateY)
      break;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  observer.observe(element);
};
