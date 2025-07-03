import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ExternalLink, 
  Eye, 
  Filter,
  Globe,
  ShoppingCart,
  Briefcase,
  Heart,
  Coffee,
  Car,
  Home,
  Utensils,
  MessageCircle
} from 'lucide-react'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos', count: 12 },
    { id: 'web', name: 'Sitios Web', count: 6 },
    { id: 'ecommerce', name: 'E-commerce', count: 4 },
    { id: 'landing', name: 'Landing Pages', count: 2 }
  ]

  const projects = [
    {
      id: 1,
      title: 'Boutique Luna',
      category: 'ecommerce',
      type: 'Tienda Online',
      description: 'Tienda online de ropa femenina con integración de Webpay Plus y gestión de inventario.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'WooCommerce', 'Webpay Plus'],
      features: ['Carrito de compras', 'Pagos seguros', 'Gestión de inventario', 'SEO optimizado'],
      url: '#',
      icon: ShoppingCart,
      color: 'bg-pink-500'
    },
    {
      id: 2,
      title: 'Constructora CM',
      category: 'web',
      type: 'Sitio Web Corporativo',
      description: 'Sitio web profesional para empresa constructora con galería de proyectos y formularios de contacto.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Custom Theme', 'Contact Form 7'],
      features: ['Galería de proyectos', 'Formularios de contacto', 'Responsive design', 'Optimización SEO'],
      url: '#',
      icon: Home,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Café Central',
      category: 'web',
      type: 'Sitio Web Restaurante',
      description: 'Sitio web para cafetería con menú digital, reservas online y integración con redes sociales.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Elementor', 'OpenTable'],
      features: ['Menú digital', 'Sistema de reservas', 'Galería de fotos', 'Integración social'],
      url: '#',
      icon: Coffee,
      color: 'bg-amber-500'
    },
    {
      id: 4,
      title: 'AutoParts Chile',
      category: 'ecommerce',
      type: 'E-commerce Automotriz',
      description: 'Tienda online de repuestos automotrices con catálogo avanzado y búsqueda por modelo.',
      image: '/api/placeholder/600/400',
      technologies: ['WooCommerce', 'Custom Plugin', 'Flow'],
      features: ['Catálogo avanzado', 'Búsqueda por modelo', 'Múltiples pagos', 'Sistema de garantías'],
      url: '#',
      icon: Car,
      color: 'bg-gray-600'
    },
    {
      id: 5,
      title: 'Clínica Dental Sonrisa',
      category: 'web',
      type: 'Sitio Web Médico',
      description: 'Sitio web para clínica dental con sistema de citas online y información de servicios.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Booking Calendar', 'WPML'],
      features: ['Sistema de citas', 'Información de servicios', 'Galería antes/después', 'Multiidioma'],
      url: '#',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      id: 6,
      title: 'Estudio Jurídico Paz',
      category: 'web',
      type: 'Sitio Web Profesional',
      description: 'Sitio web corporativo para estudio jurídico con blog de artículos legales.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Custom Theme', 'Yoast SEO'],
      features: ['Blog de artículos', 'Área de especialidades', 'Formulario de consulta', 'Optimización SEO'],
      url: '#',
      icon: Briefcase,
      color: 'bg-indigo-500'
    },
    {
      id: 7,
      title: 'Farmacia Natural',
      category: 'ecommerce',
      type: 'E-commerce Farmacia',
      description: 'Tienda online de productos naturales con sistema de recetas y delivery.',
      image: '/api/placeholder/600/400',
      technologies: ['Shopify', 'Custom App', 'Mercado Pago'],
      features: ['Sistema de recetas', 'Delivery tracking', 'Productos naturales', 'Consulta online'],
      url: '#',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      id: 8,
      title: 'Restaurante Tradición',
      category: 'web',
      type: 'Sitio Web Gastronómico',
      description: 'Sitio web para restaurante tradicional con menú interactivo y sistema de delivery.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'WooCommerce', 'Delivery Plugin'],
      features: ['Menú interactivo', 'Sistema de delivery', 'Reservas online', 'Galería gastronómica'],
      url: '#',
      icon: Utensils,
      color: 'bg-orange-500'
    },
    {
      id: 9,
      title: 'Tech Solutions',
      category: 'landing',
      type: 'Landing Page',
      description: 'Landing page para empresa de soluciones tecnológicas con formulario de contacto optimizado.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Tailwind CSS', 'Netlify Forms'],
      features: ['Diseño moderno', 'Formulario optimizado', 'Animaciones', 'Carga rápida'],
      url: '#',
      icon: Globe,
      color: 'bg-purple-500'
    },
    {
      id: 10,
      title: 'Inmobiliaria Premium',
      category: 'web',
      type: 'Portal Inmobiliario',
      description: 'Portal inmobiliario con búsqueda avanzada de propiedades y tours virtuales.',
      image: '/api/placeholder/600/400',
      technologies: ['WordPress', 'Real Estate Plugin', 'Google Maps'],
      features: ['Búsqueda avanzada', 'Tours virtuales', 'Mapa interactivo', 'Calculadora de crédito'],
      url: '#',
      icon: Home,
      color: 'bg-teal-500'
    },
    {
      id: 11,
      title: 'Fitness Pro',
      category: 'ecommerce',
      type: 'E-commerce Deportivo',
      description: 'Tienda online de equipamiento deportivo con sistema de membresías y clases online.',
      image: '/api/placeholder/600/400',
      technologies: ['WooCommerce', 'Membership Plugin', 'Zoom Integration'],
      features: ['Tienda de equipos', 'Sistema de membresías', 'Clases online', 'Rutinas personalizadas'],
      url: '#',
      icon: Heart,
      color: 'bg-red-600'
    },
    {
      id: 12,
      title: 'Consultoría Digital',
      category: 'landing',
      type: 'Landing Page',
      description: 'Landing page para consultoría digital con calculadora de ROI y testimonios.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      features: ['Calculadora ROI', 'Testimonios', 'Formulario multi-paso', 'Analytics avanzado'],
      url: '#',
      icon: Briefcase,
      color: 'bg-cyan-500'
    }
  ]

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="gradient-bg section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Nuestro <span className="text-yellow-400">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Descubre los proyectos que hemos desarrollado para nuestros clientes. 
              Cada uno diseñado para generar resultados excepcionales.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">960</div>
                <div className="text-sm">Proyectos Completados</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Clientes Satisfechos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm">Años de Experiencia</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trabajos Destacados
            </h2>
            <p className="text-xl text-muted mb-8">
              Filtra por categoría para ver proyectos específicos
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Filter className="inline mr-2" size={16} />
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-bg rounded-xl shadow-lg overflow-hidden card-hover group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <div className={`absolute inset-0 ${project.color} opacity-90 flex items-center justify-center`}>
                      <Icon className="text-white" size={48} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-4">
                        <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Eye size={20} />
                        </button>
                        <a 
                          href={project.url}
                          className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-600 font-semibold">
                        {project.type}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${project.color}`}></span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Características:</h4>
                      <ul className="text-xs text-muted space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-primary-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <a 
                      href={project.url}
                      className="w-full bg-gray-50 hover:bg-primary-600 hover:text-white text-gray-700 py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                    >
                      Ver Proyecto
                      <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding section-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Resultados que Hablan por Sí Solos
            </h2>
            <p className="text-xl text-muted">
              Nuestros proyectos generan resultados medibles para nuestros clientes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '300%', label: 'Aumento promedio en ventas online' },
              { number: '95%', label: 'Mejora en velocidad de carga' },
              { number: '250%', label: 'Incremento en tráfico web' },
              { number: '98%', label: 'Satisfacción del cliente' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Tu proyecto será el próximo?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Únete a nuestros clientes satisfechos y lleva tu negocio al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacto" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Iniciar Mi Proyecto
                <ExternalLink className="ml-2" size={20} />
              </a>
              <a href="https://wa.me/56940681210" className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center">
                Enviar Whatsapp
                <MessageCircle className="ml-2" size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio