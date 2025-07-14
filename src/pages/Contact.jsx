import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Building,
  Globe,
  Calendar,
  DollarSign,
  MessageCircle,
  Settings,
  Star,
  Shield,
  Zap
} from 'lucide-react'
import { Helmet } from 'react-helmet'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 3000); // Reset success message after 3 seconds
      } else {
        const errorData = await response.json();
        console.error('Error al enviar el formulario:', errorData.error);
        alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error de red al enviar el formulario:', error);
      alert('Hubo un problema de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+56 9 4068 1210',
      description: 'Llamadas y WhatsApp disponibles',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@etagency.cl',
      description: 'Respuesta garantizada en 24 horas',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      info: 'Santiago, Chile',
      description: 'Reuniones presenciales y virtuales',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lun - Vie: 9:00 - 18:00',
      description: 'Sábados: 10:00 - 14:00',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const services = [
    'Diseño Web',
    'Tienda Online (E-commerce)',
    'Mantenimiento Web',
    'Posicionamiento SEO',
    'Marketing Digital',
    'Aplicación Móvil',
    'Desarrollo a Medida',
    'Consultoría Digital'
  ]

  const budgetRanges = [
    'Menos de $100.000',
    '$100.000 - $300.000',
    '$300.000 - $500.000',
    '$500.000 - $1.000.000',
    'Más de $1.000.000'
  ]

  const timelines = [
    'Lo antes posible',
    '1-2 semanas',
    '1 mes',
    '2-3 meses',
    'Más de 3 meses'
  ]

  const faqs = [
    {
      question: '¿Cuánto tiempo toma desarrollar un sitio web?',
      answer: 'El tiempo varía según la complejidad. Una landing page toma 1-2 semanas, mientras que un sitio web completo puede tomar 3-6 semanas. Para e-commerce o aplicaciones complejas, el tiempo puede extenderse a 8-12 semanas.'
    },
    {
      question: '¿Incluyen el hosting y dominio?',
      answer: 'Sí, todos nuestros planes incluyen hosting optimizado por el primer año y dominio .CL gratuito. También ofrecemos opciones de hosting premium para sitios de alto tráfico.'
    },
    {
      question: '¿Ofrecen mantenimiento después del lanzamiento?',
      answer: 'Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, backups automáticos, monitoreo 24/7 y soporte técnico prioritario.'
    },
    {
      question: '¿Pueden integrar pasarelas de pago chilenas?',
      answer: 'Por supuesto, trabajamos con Webpay Plus, Flow, Mercado Pago, Khipu y otras pasarelas locales. También integramos sistemas internacionales como PayPal y Stripe.'
    },
    {
      question: '¿Qué incluye el servicio de SEO?',
      answer: 'Nuestro servicio SEO incluye optimización técnica, investigación de palabras clave, creación de contenido, link building, y reportes mensuales de posicionamiento.'
    },
    {
      question: '¿Trabajan con empresas de todos los tamaños?',
      answer: 'Sí, trabajamos desde emprendedores y startups hasta grandes empresas. Adaptamos nuestras soluciones según las necesidades y presupuesto de cada cliente.'
    }
  ]



  return (
    <>
      <Helmet>
        <title>Contacto - ET Agency | Solicita tu Cotización</title>
        <meta name="description" content="Contáctanos para solicitar una cotización gratuita de tu proyecto web. Estamos aquí para ayudarte a hacer crecer tu negocio online." />
      </Helmet>
      <div className="pt-20">
        {/* Hero Section */}
        <section className="gradient-bg section-padding">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Hablemos de tu <span className="text-yellow-400">Proyecto</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Estamos aquí para ayudarte a hacer realidad tu visión digital.
                Contáctanos y recibe una cotización personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#formulario" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Solicitar Cotización
                  <Send className="ml-2" size={20} />
                </a>
                <a href="https://wa.me/56940681210" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center">
                  Enviar WhatsApp
                  <MessageCircle className="ml-2" size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      {/* Contact Info */}
      <section className="section-padding section-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Información de Contacto
            </h2>
            <p className="text-xl text-gray-600">
              Múltiples formas de ponerte en contacto con nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-800 font-semibold mb-2">
                    {info.info}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir <span className="text-primary-600">ET Agency</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos tu socio estratégico en transformación digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Respuesta Rápida',
                description: 'Cotizaciones en menos de 24 horas y desarrollo ágil de proyectos.',
                color: 'bg-yellow-100 text-yellow-600'
              },
              {
                icon: Shield,
                title: 'Garantía Total',
                description: 'Garantizamos la calidad de nuestro trabajo con soporte post-lanzamiento.',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: Star,
                title: 'Experiencia Comprobada',
                description: 'Más de 100 proyectos exitosos y clientes satisfechos en Chile.',
                color: 'bg-purple-100 text-purple-600'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="formulario" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Solicita tu Cotización
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y te contactaremos en menos de 24 horas con una propuesta personalizada.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-green-700">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <User className="inline mr-2" size={16} />
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <Mail className="inline mr-2" size={16} />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <Phone className="inline mr-2" size={16} />
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="+56 9 4068 1210"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <Building className="inline mr-2" size={16} />
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      <Settings className="inline mr-2" size={16} />
                      Servicio de Interés *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <DollarSign className="inline mr-2" size={16} />
                        Presupuesto Estimado
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Selecciona un rango</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                        <Calendar className="inline mr-2" size={16} />
                        Tiempo Estimado
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">¿Cuándo necesitas el proyecto?</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      <MessageSquare className="inline mr-2" size={16} />
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Cuéntanos más detalles sobre tu proyecto..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitud
                        <Send className="ml-2" size={20} />
                      </>
                    )}
                  </button>


                </form>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Preguntas Frecuentes
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card-bg p-6 rounded-xl shadow-sm"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-muted text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Contact Methods */}
              <div className="mt-8 p-6 bg-primary-50 dark:bg-gray-800 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  ¿Prefieres contactarnos directamente?
                </h4>
                <div className="space-y-3">
                  <a 
                    href="tel:+56940681210" 
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <Phone size={16} className="mr-2" />
                    +56 9 4068 1210
                  </a>
                  <a 
                    href="mailto:info@etagency.cl" 
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <Mail size={16} className="mr-2" />
                    info@etagency.cl
                  </a>
                  <a 
                    href="https://wa.me/56940681210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp: +56 9 4068 1210
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Final CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Location Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Estamos en <span className="text-yellow-400">Santiago</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Trabajamos con clientes de todo Chile y Latinoamérica. 
                Ofrecemos reuniones presenciales en Santiago y virtuales para el resto del país.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-yellow-400 mr-3" size={20} />
                  <span className="text-gray-200">Santiago, Región Metropolitana, Chile</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-yellow-400 mr-3" size={20} />
                  <span className="text-gray-200">Lun - Vie: 9:00 - 18:00 | Sáb: 10:00 - 14:00</span>
                </div>
                <div className="flex items-center">
                  <Globe className="text-yellow-400 mr-3" size={20} />
                  <span className="text-gray-200">Atención a todo Chile y Latinoamérica</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href="#formulario" 
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                >
                  Solicitar Reunión
                  <Calendar className="ml-2" size={18} />
                </a>
                <a 
                  href="https://wa.me/56940681210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all inline-flex items-center justify-center"
                >
                  WhatsApp Directo
                  <MessageCircle className="ml-2" size={18} />
                </a>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
            >
              <MapPin className="text-yellow-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-4">
                Ubicación Central en Santiago
              </h3>
              <p className="text-gray-200 mb-6">
                Nos ubicamos en una zona céntrica y de fácil acceso. 
                Coordina tu visita con anticipación.
              </p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">Próximamente:</p>
                <p className="text-gray-200 text-sm">
                  Mapa interactivo y direcciones exactas
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Contact