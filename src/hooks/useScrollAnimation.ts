import { useEffect, useRef, useState, useCallback } from 'react';

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      // Disconnect observer after first trigger for better performance
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || observerRef.current) return;

    // Use requestIdleCallback for better performance
    const createObserver = () => {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin
      });
      
      if (currentRef) {
        observerRef.current.observe(currentRef);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(createObserver);
    } else {
      createObserver();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isVisible };
};