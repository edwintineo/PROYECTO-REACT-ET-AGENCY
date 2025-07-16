import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  ShoppingCart, 
  Wrench, 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Code,
  Smartphone,
  Search,
  CreditCard,
  BarChart3,
  Headphones,
  Phone,
  MessageCircle
} from 'lucide-react'
import SEO from '../components/SEO';

const Services = () => {
  const mainServices = [
    {
      icon: Globe,
      title: 'Diseño Web Profesional',
      description: 'Creamos sitios web modernos, responsivos y optimizados que reflejan la identidad de tu marca y convierten visitantes en clientes.',
      features: [
        'Diseño responsive para todos los dispositivos',
        'Optimización SEO desde el desarrollo',
        'Carga rápida y rendimiento optimizado',
        'Panel de administración intuitivo',
        'Integración con redes sociales',
        'Certificado SSL incluido'
      ],
      technologies: ['WordPress', 'React', 'HTML5', 'CSS3', 'JavaScript'],
      startingPrice: 'Desde $299.990'
    },
    {
      icon: ShoppingCart,
      title: 'Tiendas Online (E-commerce)',
      description: 'Desarrollamos tiendas online completas con carrito de compras, gestión de inventario y pasarelas de pago chilenas.',
      features: [
        'Carrito de compras avanzado',
        'Integración con Webpay Plus',
        'Integración con Flow y Mercado Pago',
        'Gestión de inventario automática',
        'Sistema de cupones y descuentos',
        'Reportes de ventas detallados'
      ],
      technologies: ['WooCommerce', 'Shopify', 'Magento', 'BigCommerce'],
      startingPrice: 'Desde $599.990'
    },
    {
      icon: Wrench,
      title: 'Mantenimiento Web',
      description: 'Mantenemos tu sitio web actualizado, seguro y funcionando perfectamente con nuestro servicio de mantenimiento integral.',
      features: [
        'Actualizaciones de seguridad',
        'Backups automáticos diarios',
        'Monitoreo 24/7',
        'Optimización de velocidad',
        'Soporte técnico prioritario',
        'Reportes mensuales'
      ],
      technologies: ['WordPress', 'Hosting', 'SSL', 'CDN'],
      startingPrice: 'Desde $49.990/mes'
    },
    {
      icon: TrendingUp,
      title: 'Posicionamiento SEO',
      description: 'Aumentamos la visibilidad de tu sitio web en Google con estrategias SEO probadas que generan más tráfico y ventas.',
      features: [
        'Análisis SEO completo',
        'Optimización on-page',
        'Creación de contenido optimizado',
        'Link building de calidad',
        'Reportes de posicionamiento',
        'Seguimiento de conversiones'
      ],
      technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Ahrefs'],
      startingPrice: 'Desde $199.990'
    }
  ]

  const additionalServices = [
    {
      icon: Code,
      title: 'Desarrollo a Medida',
      description: 'Aplicaciones web personalizadas según tus necesidades específicas.'
    },
    {
      icon: Smartphone,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas e híbridas para iOS y Android.'
    },
    {
      icon: Search,
      title: 'Marketing Digital',
      description: 'Estrategias completas de marketing online y publicidad digital.'
    },
    {
      icon: CreditCard,
      title: 'Pasarelas de Pago',
      description: 'Integración con todas las pasarelas de pago chilenas.'
    },
    {
      icon: BarChart3,
      title: 'Analytics y Reportes',
      description: 'Análisis detallado del rendimiento de tu sitio web.'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención técnica especializada cuando la necesites.'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Consulta Inicial',
      description: 'Analizamos tus necesidades y objetivos para crear la estrategia perfecta.'
    },
    {
      step: '02',
      title: 'Propuesta y Cotización',
      description: 'Te enviamos una propuesta detallada con tiempos y costos transparentes.'
    },
    {
      step: '03',
      title: 'Diseño y Desarrollo',
      description: 'Creamos tu proyecto siguiendo las mejores prácticas y estándares.'
    },
    {
      step: '04',
      title: 'Pruebas y Lanzamiento',
      description: 'Realizamos pruebas exhaustivas antes del lanzamiento oficial.'
    },
    {
      step: '05',
      title: 'Soporte Continuo',
      description: 'Te acompañamos después del lanzamiento con soporte y mantenimiento.'
    }
  ]



  return (
    <>
      <SEO 
        title="Servicios - ET Agency | Diseño Web y Marketing Digital" 
        description="Conoce nuestros servicios de diseño web, e-commerce, SEO y marketing digital. Soluciones profesionales para hacer crecer tu negocio online." 
      />
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
                Nuestros <span className="text-yellow-400">Servicios</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Soluciones digitales completas para impulsar tu negocio al siguiente nivel. 
                Desde diseño web hasta marketing digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/contacto" 
                  className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Solicitar Cotización
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <a 
                  href="https://wa.me/56940681210" 
                  className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Enviar Whatsapp
                  <MessageCircle className="ml-2" size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className="section-padding bg-white dark:bg-gray-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Servicios Principales
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Especializados en crear experiencias digitales que generan resultados
              </p>
            </motion.div>

            <div className="space-y-16">
              {mainServices.map((service, index) => {
                const Icon = service.icon
                const isEven = index % 2 === 0
                
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      !isEven ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    <div className={!isEven ? 'lg:col-start-2' : ''}>
                      <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="text-primary-600" size={32} />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg text-muted mb-6">
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Características incluidas:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tecnologías:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Desde</span>
                          <div className="text-2xl font-bold text-primary-600">
                            {service.startingPrice}
                          </div>
                        </div>
                        <Link to="/contacto" className="btn-primary">
                          Cotizar
                          <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </div>
                    </div>

                    <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-96 flex items-center justify-center">
                        <div className="text-center">
                          <Icon className="text-primary-600 mx-auto mb-4" size={80} />
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {service.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="section-padding section-bg">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Servicios Adicionales
              </h2>
              <p className="text-xl text-muted">
                Complementa tu proyecto con nuestros servicios especializados
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="card-bg p-6 rounded-xl shadow-lg card-hover text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-primary-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted">
                      {service.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-white dark:bg-gray-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Nuestro Proceso de Trabajo
              </h2>
              <p className="text-xl text-muted">
                Un proceso probado que garantiza resultados excepcionales
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm">
                    {step.description}
                  </p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2"></div>
                  )}
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
                ¿Listo para comenzar tu proyecto?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Contáctanos hoy y recibe una cotización personalizada sin compromiso
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contacto" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Solicitar Cotización
                  <ArrowRight className="ml-2" size={20} />
                </Link>
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

export default Services