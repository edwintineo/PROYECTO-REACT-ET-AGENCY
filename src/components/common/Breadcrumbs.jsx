import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useBreadcrumbs } from '../../hooks';

/**
 * Componente de breadcrumbs para mejorar navegación y SEO
 * Genera automáticamente la ruta de navegación basada en la URL actual
 */
const Breadcrumbs = ({ 
  className = '',
  showHome = true,
  separator = ChevronRight,
  customBreadcrumbs = null 
}) => {
  const { breadcrumbs } = useBreadcrumbs();
  const Separator = separator;
  
  // Usar breadcrumbs personalizados si se proporcionan
  const items = customBreadcrumbs || breadcrumbs;
  
  // No mostrar breadcrumbs si solo hay un elemento (página de inicio)
  if (items.length <= 1) {
    return null;
  }

  // Generar datos estructurados para breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://etagency.cl${item.path}`
    }))
  };

  return (
    <>
      {/* Datos estructurados para SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Breadcrumbs visibles */}
      <nav 
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isHome = item.path === '/';
            
            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <Separator 
                    className="w-4 h-4 text-gray-400 mx-2" 
                    aria-hidden="true"
                  />
                )}
                
                {isLast ? (
                  <span 
                    className="text-gray-600 dark:text-gray-400 font-medium"
                    aria-current="page"
                  >
                    {isHome && showHome ? (
                      <Home className="w-4 h-4" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 flex items-center"
                  >
                    {isHome && showHome ? (
                      <Home className="w-4 h-4" />
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

/**
 * Componente de breadcrumbs compacto para móviles
 */
export const BreadcrumbsCompact = ({ className = '' }) => {
  const { breadcrumbs } = useBreadcrumbs();
  
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  const current = breadcrumbs[breadcrumbs.length - 1];
  const parent = breadcrumbs[breadcrumbs.length - 2];
  
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {parent && (
        <>
          <Link
            to={parent.path}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            {parent.name}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </>
      )}
      <span className="text-gray-600 dark:text-gray-400 font-medium">
        {current.name}
      </span>
    </nav>
  );
};

export default Breadcrumbs;