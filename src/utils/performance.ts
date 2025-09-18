// Performance utilities for smooth scrolling and animations
export const optimizeForPerformance = () => {
  // Enable hardware acceleration for smoother animations
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      * {
        transform-style: preserve-3d;
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      .animate-fade-in,
      .animate-slide-up,
      .animate-bounce-in,
      .animate-scale-in {
        will-change: transform, opacity;
      }
      
      .animate-fade-in.opacity-0,
      .animate-slide-up.opacity-0,
      .animate-bounce-in.opacity-0,
      .animate-scale-in.opacity-0 {
        animation-fill-mode: forwards;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      /* Smooth scrolling optimization */
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Prevent layout shifts */
      .hero-section,
      .features-section,
      .testimonials-section {
        contain: layout style paint;
      }
    `;
    document.head.appendChild(style);
  }
};

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for high-frequency events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Initialize performance optimizations
if (typeof window !== 'undefined') {
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeForPerformance);
  } else {
    optimizeForPerformance();
  }
}