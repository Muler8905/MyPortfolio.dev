// Initialize scroll animations
export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Use setTimeout to ensure DOM is ready
  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.fade-up-on-scroll');
    animatedElements.forEach(el => {
      // Check if element is already in viewport
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Immediately show elements already in viewport
        el.classList.add('is-visible');
      } else {
        // Observe elements below viewport
        observer.observe(el);
      }
    });
  }, 100);

  return observer;
};
