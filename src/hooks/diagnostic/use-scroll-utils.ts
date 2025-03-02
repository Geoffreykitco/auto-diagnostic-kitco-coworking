
import { useCallback, useRef } from 'react';

export const useScrollUtils = () => {
  const sectionChangeTimeoutRef = useRef<number>();

  const scrollToTop = useCallback(() => {
    // Augmentation du délai avant de scroller pour s'assurer que le DOM est bien mis à jour
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        left: 0
      });
    }, 50); // Un petit délai pour s'assurer que le navigateur est prêt à traiter le scroll
  }, []);

  const cleanupScrollTimeouts = useCallback(() => {
    if (sectionChangeTimeoutRef.current) {
      clearTimeout(sectionChangeTimeoutRef.current);
    }
  }, []);

  return {
    scrollToTop,
    sectionChangeTimeoutRef,
    cleanupScrollTimeouts
  };
};
