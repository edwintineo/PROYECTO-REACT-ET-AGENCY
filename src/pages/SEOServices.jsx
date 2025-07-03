import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, BarChart3, Globe, Users, CheckCircle, ArrowRight, Star, Award, Zap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SEOServices = () => {
  const [activeTab, setActiveTab] = useState('onpage');

  const seoServices = [
    {
      icon: Search,
      title: 'SEO On-Page',
      description: 'Optimización completa de tu sitio web para mejorar su visibilidad en buscadores.',
      features: [
        'Análisis de palabras clave',
        'Optimización de contenido',
        'Meta tags y descripciones',
        'Estructura de URLs',
        'Optimización de imágenes',
        'Schema markup'
      ],
      price: 'Desde $299/mes'
    },
    {
      icon: Globe,
      title: 'SEO Off-Page',
      description: 'Estrategias externas para aumentar la autoridad y relevancia de tu sitio.',
      features: [
        'Link building de calidad',
        'Guest posting',
        'Menciones de marca',
        'SEO local',
        'Gestión de reputación online',
        'Análisis de competencia'
      ],
      price: 'Desde $499/mes'
    },
    {
      icon: TrendingUp,
      title: 'SEO Técnico',
      description: 'Optimización técnica avanzada para mejorar el rendimiento y rastreo.',
      features: [
        'Velocidad de carga',
        'Core Web Vitals',
        'Indexación y crawling',
        'Sitemap XML',
        'Robots.txt',
        'Estructura de datos'
      ],
      price: 'Desde $399/mes'
    },
    {
      icon: BarChart3,
      title: 'Análisis y Reportes',
      description: 'Monitoreo continuo y reportes detallados de tu posicionamiento.',
      features: [
        'Google Analytics setup',
        'Search Console',
        'Tracking de rankings',
        'Reportes mensuales',
        'Análisis de tráfico',
        'ROI measurement'
      ],
      price: 'Desde $199/mes'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Aumento de Tráfico Orgánico',
      description: 'Incrementa las visitas a tu sitio web de forma natural y sostenible.',
      stat: '+150%'
    },
    {
      icon: Target,
      title: 'Mayor Visibilidad Online',
      description: 'Aparece en los primeros resultados cuando tus clientes te buscan.',
      stat: 'Top 3'
    },
    {
      icon: Users,
      title: 'Mejor Experiencia de Usuario',
      description: 'Optimizamos tu sitio para que sea rápido, útil y fácil de navegar.',
      stat: '98% UX'
    },
    {
      icon: Award,
      title: 'ROI Comprobado',
      description: 'Resultados medibles que impactan directamente en tus ventas.',
      stat: '+300%'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Auditoría SEO',
      description: 'Análisis completo de tu sitio web actual y identificación de oportunidades.'
    },
    {
      step: '02',
      title: 'Estrategia Personalizada',
      description: 'Desarrollo de una estrategia SEO adaptada a tus objetivos y mercado.'
    },
    {
      step: '03',
      title: 'Implementación',
      description: 'Ejecución de las optimizaciones técnicas y de contenido necesarias.'
    },
    {
      step: '04',
      title: 'Monitoreo y Ajustes',
      description: 'Seguimiento continuo y optimizaciones basadas en resultados.'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      company: 'E-commerce Fashion',
      text: 'Gracias a ET Agency, nuestro tráfico orgánico aumentó un 200% en 6 meses.',
      rating: 5
    },
    {
      name: 'Carlos Ruiz',
      company: 'Clínica Dental',
      text: 'Ahora aparecemos en la primera página para todas nuestras palabras clave principales.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'Consultoría Legal',
      text: 'El ROI de nuestra inversión en SEO ha superado todas nuestras expectativas.',
      rating: 5
    }
  ];

  const tabs = [
    { id: 'onpage', label: 'SEO On-Page', icon: Search },
    { id: 'offpage', label: 'SEO Off-Page', icon: Globe },
    { id: 'technical', label: 'SEO Técnico', icon: Zap },
    { id: 'analytics', label: 'Análisis', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Posicionamiento Web <span className="text-green-400">SEO</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Lleva tu sitio web a la primera página de Google y aumenta tu visibilidad online de forma orgánica y sostenible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-colors inline-flex items-center justify-center"
              >
                Solicitar Auditoría Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-colors">
                Ver Casos de Éxito
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestro SEO?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Resultados comprobados que transforman tu presencia digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{benefit.stat}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios SEO
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales para cada aspecto de tu posicionamiento web.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seoServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-lg font-semibold text-blue-600 mb-4">{service.price}</div>
                  <Link
                    to="/contacto"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
                  >
                    Más Información
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Metodología probada para garantizar resultados exitosos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Testimonios reales de empresas que han transformado su presencia digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para dominar Google?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Solicita tu auditoría SEO gratuita y descubre el potencial de tu sitio web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Auditoría Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="https://wa.me/56940681210" className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center">
                Enviar Whatsapp
                <MessageCircle className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SEOServices;