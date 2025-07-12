import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que automáticamente hace scroll al top de la página
 * cuando cambia la ruta en React Router
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll al top de la página cuando cambie la ruta
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll suave para mejor UX
    });
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null; // Este componente no renderiza nada
};

export default ScrollToTop;