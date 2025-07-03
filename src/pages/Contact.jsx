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
  MessageCircle
} from 'lucide-react'

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
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: ''
        })
      }, 3000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+56 9 4068 1210',
      description: 'Lunes a Viernes 9:00 - 18:00'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'contacto@etagency.cl',
      description: 'Respuesta en menos de 24 horas'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      info: 'Santiago, Chile',
      description: 'Atención presencial con cita previa'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lun - Vie: 9:00 - 18:00',
      description: 'Sábados: 10:00 - 14:00'
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
      answer: 'El tiempo varía según la complejidad. Una landing page toma 1-2 semanas, mientras que un sitio web completo puede tomar 3-6 semanas.'
    },
    {
      question: '¿Incluyen el hosting y dominio?',
      answer: 'Sí, todos nuestros planes incluyen hosting por el primer año y dominio .CL gratuito.'
    },
    {
      question: '¿Ofrecen mantenimiento después del lanzamiento?',
      answer: 'Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups y soporte técnico.'
    },
    {
      question: '¿Pueden integrar pasarelas de pago chilenas?',
      answer: 'Por supuesto, trabajamos con Webpay Plus, Flow, Mercado Pago y otras pasarelas locales.'
    }
  ]

  return (
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
              <a href="https://wa.me/56940681210" className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center">
                Enviar Whatsapp
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
                  className="text-center p-6 bg-gray-50 rounded-xl card-hover"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-1">
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
                    href="mailto:contacto@etagency.cl" 
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <Mail size={16} className="mr-2" />
                    contacto@etagency.cl
                  </a>
                  <a 
                    href="https://wa.me/56912345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding section-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestra Ubicación
            </h2>
            <p className="text-muted">
              Nos encontramos en Santiago, Chile. Atención presencial con cita previa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="text-primary-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Santiago, Chile
              </h3>
              <p className="text-muted">
                Mapa interactivo próximamente
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact