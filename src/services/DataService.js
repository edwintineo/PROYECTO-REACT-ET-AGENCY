/**
 * DataService - Centralized data management service
 * Handles API calls, data caching, and data transformation
 */

class DataService {
  constructor() {
    this.cache = new Map();
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.etagency.cl';
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Generic fetch method with caching
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {boolean} useCache - Whether to use cache
   * @returns {Promise} - API response
   */
  async fetch(endpoint, options = {}, useCache = true) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;

    // Check cache first
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache successful responses
      if (useCache && response.status === 200) {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }

      return data;
    } catch (error) {
      console.error('DataService fetch error:', error);
      throw error;
    }
  }

  /**
   * Get portfolio data
   * @returns {Promise} - Portfolio data
   */
  async getPortfolio() {
    try {
      // For now, return local data
      const response = await import('../data/portfolio.json');
      return response.default;
    } catch (error) {
      console.error('Error loading portfolio:', error);
      return { projects: [] };
    }
  }

  /**
   * Get home page data
   * @returns {Promise} - Home page data
   */
  async getHomeData() {
    try {
      const response = await import('../data/home.json');
      return response.default;
    } catch (error) {
      console.error('Error loading home data:', error);
      return {};
    }
  }

  /**
   * Get blog posts
   * @param {Object} params - Query parameters
   * @returns {Promise} - Blog posts
   */
  async getBlogPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/blog${queryString ? `?${queryString}` : ''}`;
    
    try {
      return await this.fetch(endpoint);
    } catch (error) {
      // Return mock data for development
      return {
        posts: [
          {
            id: 1,
            title: 'Tendencias de SEO 2024',
            excerpt: 'Descubre las últimas tendencias en SEO que dominarán este año.',
            content: 'Contenido completo del artículo...',
            author: 'ET Agency',
            date: '2024-01-15',
            category: 'SEO',
            image: '/images/blog/seo-trends-2024.jpg',
            tags: ['SEO', 'Marketing Digital', 'Tendencias']
          },
          {
            id: 2,
            title: 'Desarrollo Web con React',
            excerpt: 'Guía completa para crear aplicaciones web modernas con React.',
            content: 'Contenido completo del artículo...',
            author: 'ET Agency',
            date: '2024-01-10',
            category: 'Desarrollo Web',
            image: '/images/blog/react-development.jpg',
            tags: ['React', 'JavaScript', 'Desarrollo Web']
          }
        ],
        pagination: {
          current: 1,
          total: 1,
          perPage: 10,
          totalPosts: 2
        }
      };
    }
  }

  /**
   * Get services data
   * @returns {Promise} - Services data
   */
  async getServices() {
    try {
      return {
        services: [
          {
            id: 'seo',
            name: 'Posicionamiento SEO',
            description: 'Mejora tu visibilidad en buscadores con nuestras estrategias SEO avanzadas.',
            icon: 'Search',
            features: [
              'Análisis de palabras clave',
              'Optimización on-page',
              'Link building',
              'Reportes mensuales'
            ],
            price: 'Desde $199.990',
            popular: true
          },
          {
            id: 'web-development',
            name: 'Desarrollo Web',
            description: 'Sitios web modernos, rápidos y optimizados para conversiones.',
            icon: 'Code',
            features: [
              'Diseño responsive',
              'Optimización de velocidad',
              'SEO técnico',
              'Mantenimiento incluido'
            ],
            price: 'Desde $299.990'
          },
          {
            id: 'digital-marketing',
            name: 'Marketing Digital',
            description: 'Estrategias integrales para hacer crecer tu negocio online.',
            icon: 'TrendingUp',
            features: [
              'Gestión de redes sociales',
              'Publicidad online',
              'Email marketing',
              'Análisis de resultados'
            ],
            price: 'Desde $199.990'
          }
        ]
      };
    } catch (error) {
      console.error('Error loading services:', error);
      return { services: [] };
    }
  }

  /**
   * Submit contact form
   * @param {Object} formData - Form data
   * @returns {Promise} - Submission result
   */
  async submitContactForm(formData) {
    try {
      return await this.fetch('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      }, false);
    } catch (error) {
      // Mock successful submission for development
      console.log('Contact form submitted:', formData);
      return {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.'
      };
    }
  }

  /**
   * Submit quote request
   * @param {Object} quoteData - Quote data
   * @returns {Promise} - Submission result
   */
  async submitQuoteRequest(quoteData) {
    try {
      return await this.fetch('/quote', {
        method: 'POST',
        body: JSON.stringify(quoteData)
      }, false);
    } catch (error) {
      // Mock successful submission for development
      console.log('Quote request submitted:', quoteData);
      return {
        success: true,
        message: 'Solicitud de cotización enviada. Te enviaremos una propuesta pronto.',
        quoteId: `QT-${Date.now()}`
      };
    }
  }

  /**
   * Get testimonials
   * @returns {Promise} - Testimonials data
   */
  async getTestimonials() {
    try {
      return {
        testimonials: [
          {
            id: 1,
            name: 'María González',
            company: 'Boutique Luna',
            role: 'Propietaria',
            content: 'ET Agency transformó completamente nuestra presencia online. Las ventas aumentaron un 150% en 6 meses.',
            rating: 5,
            image: '/images/testimonials/maria-gonzalez.jpg',
            service: 'SEO + Desarrollo Web'
          },
          {
            id: 2,
            name: 'Carlos Mendoza',
            company: 'TechStart',
            role: 'CEO',
            content: 'Profesionales excepcionales. Su estrategia SEO nos posicionó en el top 3 de Google para nuestras palabras clave principales.',
            rating: 5,
            image: '/images/testimonials/carlos-mendoza.jpg',
            service: 'Posicionamiento SEO'
          },
          {
            id: 3,
            name: 'Ana Ruiz',
            company: 'Clínica Dental Sonrisa',
            role: 'Directora',
            content: 'El nuevo sitio web es increíble. Nuestros pacientes constantemente elogian la facilidad de uso y el diseño.',
            rating: 5,
            image: '/images/testimonials/ana-ruiz.jpg',
            service: 'Desarrollo Web'
          }
        ]
      };
    } catch (error) {
      console.error('Error loading testimonials:', error);
      return { testimonials: [] };
    }
  }

  /**
   * Get FAQ data
   * @param {string} category - FAQ category
   * @returns {Promise} - FAQ data
   */
  async getFAQ(category = null) {
    try {
      const allFAQs = {
        general: [
          {
            id: 1,
            question: '¿Cuánto tiempo toma ver resultados?',
            answer: 'Los resultados varían según el servicio. Para SEO, generalmente vemos mejoras en 3-6 meses. Para desarrollo web y marketing digital, los resultados pueden ser inmediatos.'
          },
          {
            id: 2,
            question: '¿Ofrecen garantías en sus servicios?',
            answer: 'Sí, ofrecemos garantías específicas para cada servicio. Para SEO garantizamos mejoras en posicionamiento, para desarrollo web garantizamos funcionalidad y rendimiento.'
          }
        ],
        seo: [
          {
            id: 3,
            question: '¿Qué incluye el servicio de SEO?',
            answer: 'Nuestro servicio de SEO incluye análisis de palabras clave, optimización on-page, creación de contenido, link building, optimización técnica y reportes mensuales detallados.'
          },
          {
            id: 4,
            question: '¿Cuánto cuesta el posicionamiento SEO?',
            answer: 'Nuestros planes de SEO comienzan desde $299/mes. El precio final depende de la competitividad de tu sector y los objetivos específicos.'
          }
        ],
        desarrollo: [
          {
            id: 5,
            question: '¿Qué tecnologías utilizan para desarrollo web?',
            answer: 'Utilizamos tecnologías modernas como React, Next.js, Node.js, y WordPress. Elegimos la mejor tecnología según las necesidades específicas de cada proyecto.'
          },
          {
            id: 6,
            question: '¿El sitio web será responsive?',
            answer: 'Absolutamente. Todos nuestros sitios web son completamente responsive y optimizados para dispositivos móviles, tablets y desktop.'
          }
        ],
        precios: [
          {
            id: 7,
            question: '¿Ofrecen planes de pago flexibles?',
            answer: 'Sí, ofrecemos diferentes opciones de pago incluyendo pago único, mensual y planes anuales con descuentos especiales.'
          },
          {
            id: 8,
            question: '¿Hay costos ocultos?',
            answer: 'No, somos completamente transparentes con nuestros precios. Todos los costos se detallan claramente en la propuesta inicial.'
          }
        ]
      };

      return category ? { faqs: allFAQs[category] || [] } : { faqs: allFAQs };
    } catch (error) {
      console.error('Error loading FAQ:', error);
      return { faqs: [] };
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache size
   * @returns {number} - Number of cached items
   */
  getCacheSize() {
    return this.cache.size;
  }
}

// Export singleton instance
export default new DataService();