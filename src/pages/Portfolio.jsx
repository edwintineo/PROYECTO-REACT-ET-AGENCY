import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import {
  ExternalLink,
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
import OptimizedPortfolioImage from '../components/OptimizedPortfolioImage'
import { Image } from '../components/common'
import portfolioData from '../data/portfolio.json'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('todos')


  // Mapear categorías a iconos y colores
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'e-commerce':
        return ShoppingCart
      case 'sitio web':
        return Globe
      case 'aplicación':
        return Briefcase
      case 'portal web':
        return Globe
      case 'one page':
        return Home
      default:
        return Globe
    }
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'e-commerce':
        return 'bg-green-500'
      case 'sitio web':
        return 'bg-blue-500'
      case 'aplicación':
        return 'bg-purple-500'
      case 'portal web':
        return 'bg-teal-500'
      case 'one page':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Procesar proyectos del JSON
  const projects = portfolioData.projects.map(project => ({
    ...project,
    icon: getCategoryIcon(project.category),
    color: getCategoryColor(project.category),
    type: project.category
  }))

  // Obtener categorías únicas de los proyectos
  const uniqueCategories = [...new Set(projects.map(p => p.category))]
  
  const categories = [
    { id: 'todos', name: 'Todos', count: projects.length },
    ...uniqueCategories.map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      count: projects.filter(p => p.category === category).length
    }))
  ]

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase().replace(/\s+/g, '-') === activeFilter)

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
                  <div className="text-2xl font-bold">{projects.length}</div>
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
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback en caso de error de imagen
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} hidden items-center justify-center`}
                        style={{ display: 'none' }}
                      >
                        <div className="text-white text-center p-4">
                          <div className="text-lg font-bold mb-1">{project.title}</div>
                          <div className="text-sm opacity-90">Imagen no disponible</div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className={`${project.color} p-2 rounded-full shadow-lg`}>
                          <Icon className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-4">
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
                        Cotiza tu Proyecto Ahora
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