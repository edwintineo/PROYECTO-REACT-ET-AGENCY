import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, OptimizedImage, HeroImage, ImageGallery } from './common';
import { useImageOptimization, useCriticalImages } from '../hooks';
import { Monitor, Smartphone, Tablet, Zap, Eye, Download } from 'lucide-react';

/**
 * Componente de demostración para mostrar las capacidades de optimización de imágenes
 */
const ImageOptimizationDemo = () => {
  const [selectedDemo, setSelectedDemo] = useState('lazy-loading');
  const { webpSupported, preloadImage, generateSrcSet } = useImageOptimization();
  
  // Imágenes de ejemplo para la demostración
  const demoImages = [
    {
      src: '/images/portfolio/clinica-sonrisa.jpg',
      alt: 'Clínica Sonrisa - Sitio Web Médico',
      title: 'Sitio Web Médico'
    },
    {
      src: '/images/portfolio/restaurante-sabores.jpg',
      alt: 'Restaurante Sabores - E-commerce',
      title: 'E-commerce Gastronómico'
    },
    {
      src: '/images/portfolio/inmobiliaria-hogar.jpg',
      alt: 'Inmobiliaria Hogar - Portal Inmobiliario',
      title: 'Portal Inmobiliario'
    }
  ];

  const criticalImages = demoImages.map(img => img.src);
  const { isLoading, loadedCount, totalCount, progress } = useCriticalImages(criticalImages);

  const demos = [
    {
      id: 'lazy-loading',
      title: 'Lazy Loading',
      description: 'Las imágenes se cargan solo cuando están visibles',
      icon: Eye
    },
    {
      id: 'webp-support',
      title: 'Soporte WebP',
      description: 'Formato WebP para mejor compresión',
      icon: Zap
    },
    {
      id: 'responsive',
      title: 'Imágenes Responsivas',
      description: 'Diferentes tamaños según el dispositivo',
      icon: Monitor
    },
    {
      id: 'critical-loading',
      title: 'Carga Crítica',
      description: 'Precarga de imágenes importantes',
      icon: Download
    }
  ];

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'lazy-loading':
        return (
          <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Lazy Loading en Acción</h4>
              <p className="text-muted mb-4">
                Estas imágenes se cargan solo cuando entran en el viewport, mejorando el rendimiento inicial.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {demoImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    lazy={true}
                    className="rounded-lg shadow-lg"
                    placeholder="skeleton"
                  />
                  <h5 className="font-medium text-center">{image.title}</h5>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'webp-support':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Soporte WebP Detectado</h4>
              <p className="text-muted mb-4">
                Tu navegador {webpSupported ? 'soporta' : 'no soporta'} el formato WebP.
                {webpSupported && ' Las imágenes se sirven en formato WebP para mejor compresión.'}
              </p>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  webpSupported ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium">
                  WebP: {webpSupported ? 'Soportado' : 'No soportado'}
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-3">Imagen Original (JPG)</h5>
                <Image
                  src={demoImages[0].src}
                  alt={demoImages[0].alt}
                  width={300}
                  height={200}
                  webp={false}
                  className="rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted mt-2">Formato: JPG</p>
              </div>
              
              <div>
                <h5 className="font-semibold mb-3">Imagen Optimizada (WebP)</h5>
                <OptimizedImage
                  src={demoImages[0].src}
                  alt={demoImages[0].alt}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted mt-2">
                  Formato: {webpSupported ? 'WebP' : 'JPG (fallback)'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'responsive':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Imágenes Responsivas</h4>
              <p className="text-muted mb-4">
                Las imágenes se adaptan automáticamente al tamaño de pantalla, 
                cargando la resolución óptima para cada dispositivo.
              </p>
            </div>
            
            <div className="grid gap-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Smartphone className="h-8 w-8 text-blue-500" />
                <div>
                  <h5 className="font-semibold">Móvil (480px)</h5>
                  <p className="text-sm text-muted">Imagen optimizada para pantallas pequeñas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Tablet className="h-8 w-8 text-green-500" />
                <div>
                  <h5 className="font-semibold">Tablet (768px)</h5>
                  <p className="text-sm text-muted">Resolución media para tablets</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Monitor className="h-8 w-8 text-purple-500" />
                <div>
                  <h5 className="font-semibold">Desktop (1024px+)</h5>
                  <p className="text-sm text-muted">Alta resolución para pantallas grandes</p>
                </div>
              </div>
            </div>
            
            <OptimizedImage
              src={demoImages[1].src}
              alt={demoImages[1].alt}
              width={800}
              height={400}
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
              breakpoints={[480, 768, 1024, 1280]}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        );

      case 'critical-loading':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Carga de Imágenes Críticas</h4>
              <p className="text-muted mb-4">
                Las imágenes importantes se precargan automáticamente para mejorar la experiencia del usuario.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progreso de precarga:</span>
                  <span className="text-sm text-muted">{loadedCount}/{totalCount}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
                
                <p className="text-xs text-muted">
                  {isLoading ? 'Precargando imágenes...' : 'Todas las imágenes críticas han sido precargadas'}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {demoImages.map((image, index) => (
                <HeroImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  width={250}
                  height={200}
                  className="rounded-lg shadow-lg"
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Optimización de Imágenes
        </h2>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Demostración de las técnicas avanzadas de optimización de imágenes implementadas 
          para mejorar el rendimiento y la experiencia del usuario.
        </p>
      </div>

      {/* Navegación de demos */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {demos.map((demo) => {
          const IconComponent = demo.icon;
          return (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedDemo === demo.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <IconComponent className={`h-6 w-6 mb-2 ${
                selectedDemo === demo.id ? 'text-blue-500' : 'text-gray-500'
              }`} />
              <h3 className="font-semibold text-sm mb-1">{demo.title}</h3>
              <p className="text-xs text-muted">{demo.description}</p>
            </button>
          );
        })}
      </div>

      {/* Contenido de la demo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {renderDemo()}
      </div>

      {/* Información técnica */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Información Técnica</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Formatos Soportados:</h4>
            <ul className="space-y-1 text-muted">
              <li>• WebP (compresión superior)</li>
              <li>• JPEG (fallback universal)</li>
              <li>• PNG (transparencias)</li>
              <li>• SVG (vectoriales)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Técnicas Implementadas:</h4>
            <ul className="space-y-1 text-muted">
              <li>• Lazy loading con Intersection Observer</li>
              <li>• Responsive images con srcSet</li>
              <li>• Precarga de imágenes críticas</li>
              <li>• Fallbacks automáticos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizationDemo;