import React, { useState } from 'react'
import { Helmet } from 'react-helmet' // Importar Helmet
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
import { Image } from '../components/common'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos', count: 19 },
    { id: 'web', name: 'Sitios Web', count: 13 },
    { id: 'ecommerce', name: 'E-commerce', count: 6 }
  ]

  const projects = [
    {
      id: 1,
      title: 'Carpediem Online',
      category: 'web',
      type: 'Página Web',
      description: 'Sitio web profesional para radio online con streaming en vivo y programación interactiva.',
      image: '/images/portfolio/carpediem-online.jpg',
      technologies: ['WordPress', 'Streaming Plugin', 'Custom Theme'],
      features: ['Streaming en vivo', 'Programación', 'Reproductor integrado', 'Responsive design'],
      url: '#',
      icon: Globe,
      color: 'bg-purple-500'
    },
    {
      id: 2,
      title: 'Marbelma',
      category: 'web',
      type: 'Sitio Web Corporativo',
      description: 'Sitio web corporativo para empresa de mármoles con galería de productos y proyectos.',
      image: '/images/portfolio/marbelma.jpg',
      technologies: ['WordPress', 'Custom Theme', 'Gallery Plugin'],
      features: ['Galería de productos', 'Catálogo online', 'Formularios de contacto', 'SEO optimizado'],
      url: '#',
      icon: Home,
      color: 'bg-gray-600'
    },
    {
      id: 3,
      title: 'Cimientos Asesores',
      category: 'web',
      type: 'Sitio Web Profesional',
      description: 'Sitio web para empresa de asesorías en construcción con servicios especializados.',
      image: '/images/portfolio/cimientos-asesores.jpg',
      technologies: ['WordPress', 'Contact Form 7', 'Custom Design'],
      features: ['Servicios especializados', 'Formularios de contacto', 'Blog corporativo', 'Responsive design'],
      url: '#',
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      id: 4,
      title: 'Inmobiliaria Hogar Plus',
      category: 'web',
      type: 'Portal Inmobiliario',
      description: 'Portal inmobiliario con búsqueda avanzada de propiedades y tours virtuales.',
      image: '/images/portfolio/inmobiliaria-hogar-plus.jpg',
      technologies: ['WordPress', 'Real Estate Plugin', 'Google Maps'],
      features: ['Búsqueda de propiedades', 'Tours virtuales', 'Mapa interactivo', 'Calculadora de crédito'],
      url: '#',
      icon: Home,
      color: 'bg-teal-500'
    },
    {
      id: 5,
      title: 'Clínica Dental Sonrisa',
      category: 'web',
      type: 'Sitio Web Médico',
      description: 'Sitio web para clínica dental con sistema de citas y información de tratamientos.',
      image: '/images/portfolio/clinica-dental-sonrisa.jpg',
      technologies: ['WordPress', 'Booking System', 'Medical Theme'],
      features: ['Sistema de citas', 'Tratamientos dentales', 'Información de doctores', 'Formularios médicos'],
      url: '#',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      id: 6,
      title: 'Restaurante Sabores del Mar',
      category: 'web',
      type: 'Sitio Web Restaurante',
      description: 'Sitio web para restaurante de mariscos con menú digital y reservas online.',
      image: '/images/portfolio/restaurante-sabores-del-mar.jpg',
      technologies: ['WordPress', 'Reservation System', 'Menu Plugin'],
      features: ['Menú digital', 'Sistema de reservas', 'Galería gastronómica', 'Delivery online'],
      url: '#',
      icon: Utensils,
      color: 'bg-orange-500'
    },
    {
      id: 7,
      title: 'Boutique Luna',
      category: 'ecommerce',
      type: 'Tienda Online',
      description: 'Tienda online de moda femenina con catálogo de temporada y sistema de tallas.',
      image: '/images/portfolio/boutique-luna.jpg',
      technologies: ['WooCommerce', 'Fashion Theme', 'Size Guide'],
      features: ['Catálogo de moda', 'Guía de tallas', 'Wishlist', 'Múltiples pagos'],
      url: '#',
      icon: ShoppingCart,
      color: 'bg-pink-500'
    },
    {
      id: 8,
      title: 'Autopartes Chile',
      category: 'ecommerce',
      type: 'Tienda Online',
      description: 'Tienda online de autopartes con búsqueda por modelo de vehículo y compatibilidad.',
      image: '/images/portfolio/autopartes-chile.jpg',
      technologies: ['WooCommerce', 'Vehicle Search', 'Compatibility System'],
      features: ['Búsqueda por vehículo', 'Compatibilidad', 'Catálogo técnico', 'Asesoría especializada'],
      url: '#',
      icon: Car,
      color: 'bg-blue-600'
    },
    {
      id: 9,
      title: 'Café Central',
      category: 'web',
      type: 'Sitio Web Cafetería',
      description: 'Sitio web para cafetería con menú de especialidades y sistema de pedidos online.',
      image: '/images/portfolio/cafe-central.jpg',
      technologies: ['WordPress', 'Order System', 'Coffee Theme'],
      features: ['Menú de cafés', 'Pedidos online', 'Programa de lealtad', 'Eventos especiales'],
      url: '#',
      icon: Coffee,
      color: 'bg-amber-600'
    },
    {
      id: 10,
      title: 'Constructora CM',
      category: 'web',
      type: 'Sitio Web Constructora',
      description: 'Sitio web para constructora con portafolio de proyectos y cotizaciones online.',
      image: '/images/portfolio/constructora-cm.jpg',
      technologies: ['WordPress', 'Portfolio Plugin', 'Quote System'],
      features: ['Portafolio de obras', 'Cotizaciones online', 'Galería de proyectos', 'Contacto directo'],
      url: '#',
      icon: Briefcase,
      color: 'bg-gray-700'
    },
    {
      id: 11,
      title: 'Tecnología Avanzada',
      category: 'web',
      type: 'Sitio Web Tecnológico',
      description: 'Sitio web para empresa de tecnología con servicios de desarrollo y consultoría.',
      image: '/images/portfolio/tecnologia-avanzada.jpg',
      technologies: ['React', 'Node.js', 'Modern Design'],
      features: ['Servicios tech', 'Portfolio técnico', 'Blog tecnológico', 'Consultoría online'],
      url: '#',
      icon: Globe,
      color: 'bg-indigo-600'
    },
    {
      id: 12,
      title: 'Servicios Profesionales',
      category: 'web',
      type: 'Sitio Web Corporativo',
      description: 'Sitio web para empresa de servicios profesionales con área de clientes.',
      image: '/images/portfolio/servicios-profesionales.jpg',
      technologies: ['WordPress', 'Client Portal', 'Professional Theme'],
      features: ['Portal de clientes', 'Servicios especializados', 'Documentación', 'Soporte 24/7'],
      url: '#',
      icon: Briefcase,
      color: 'bg-slate-600'
    },
    {
      id: 13,
      title: 'Energia Sexy',
      category: 'ecommerce',
      type: 'Tienda Online',
      description: 'Tienda online de productos de belleza y cuidado personal con catálogo especializado.',
      image: '/images/portfolio/energia-sexy.svg',
      technologies: ['WooCommerce', 'Beauty Theme', 'Product Reviews'],
      features: ['Productos de belleza', 'Reviews de clientes', 'Guías de uso', 'Suscripciones'],
      url: '#',
      icon: ShoppingCart,
      color: 'bg-rose-500'
    },
    {
      id: 14,
      title: 'STEC Ingeniería',
      category: 'web',
      type: 'Sitio Web Técnico',
      description: 'Sitio web para empresa de ingeniería con portafolio de proyectos técnicos.',
      image: '/images/portfolio/stec-ingenieria.svg',
      technologies: ['WordPress', 'Technical Portfolio', 'Engineering Theme'],
      features: ['Proyectos técnicos', 'Servicios de ingeniería', 'Certificaciones', 'Contacto técnico'],
      url: '#',
      icon: Briefcase,
      color: 'bg-cyan-600'
    },
    {
      id: 15,
      title: 'Bingo Store',
      category: 'ecommerce',
      type: 'Tienda Online',
      description: 'Tienda online de productos de entretenimiento y juegos con sistema de pedidos.',
      image: '/images/portfolio/bingo-store.svg',
      technologies: ['Shopify', 'Gaming Theme', 'Inventory System'],
      features: ['Productos de juego', 'Sistema de pedidos', 'Eventos especiales', 'Programa VIP'],
      url: '#',
      icon: ShoppingCart,
      color: 'bg-yellow-500'
    },
    {
      id: 16,
      title: 'Wayku Peruano',
      category: 'web',
      type: 'Sitio Web Restaurante',
      description: 'Sitio web para restaurante peruano con menú tradicional y delivery.',
      image: '/images/portfolio/wayku-peruano.svg',
      technologies: ['WordPress', 'Delivery System', 'Cultural Theme'],
      features: ['Menú peruano', 'Delivery online', 'Cultura gastronómica', 'Eventos culturales'],
      url: '#',
      icon: Utensils,
      color: 'bg-red-600'
    },
    {
      id: 17,
      title: 'Asanar Centro Médico',
      category: 'web',
      type: 'Sitio Web Médico',
      description: 'Sitio web para centro médico integral con múltiples especialidades.',
      image: '/images/portfolio/asanar-centro-medico.svg',
      technologies: ['WordPress', 'Medical System', 'Appointment Booking'],
      features: ['Múltiples especialidades', 'Citas online', 'Historia clínica', 'Telemedicina'],
      url: '#',
      icon: Heart,
      color: 'bg-emerald-600'
    },
    {
      id: 18,
      title: 'Distribuidora Comercial',
      category: 'ecommerce',
      type: 'Tienda B2B',
      description: 'Plataforma B2B para distribuidora con catálogo mayorista y gestión de pedidos.',
      image: '/images/portfolio/distribuidora-comercial.svg',
      technologies: ['WooCommerce', 'B2B Plugin', 'Wholesale System'],
      features: ['Ventas mayoristas', 'Gestión de pedidos', 'Precios por volumen', 'Portal de clientes'],
      url: '#',
      icon: ShoppingCart,
      color: 'bg-orange-600'
    },
    {
      id: 19,
      title: 'Consultora Empresarial',
      category: 'web',
      type: 'Sitio Web Consultoría',
      description: 'Sitio web para consultora empresarial con servicios especializados y casos de éxito.',
      image: '/images/portfolio/consultora-empresarial.svg',
      technologies: ['WordPress', 'Business Theme', 'Case Studies'],
      features: ['Servicios de consultoría', 'Casos de éxito', 'Análisis empresarial', 'Contacto directo'],
      url: '#',
      icon: Briefcase,
      color: 'bg-violet-600'
    }
  ]

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <>
      <Helmet>
        <title>Portfolio | Proyectos de Diseño Web y E-commerce - ET Agency</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos exitosos de diseño web, tiendas online y soluciones digitales para empresas en Chile." />
      </Helmet>
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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <div className={`${project.color} p-2 rounded-full shadow-lg`}>
                        <Icon className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
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
    </>
  )
}

export default Portfolio