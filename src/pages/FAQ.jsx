import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Importar Helmet
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'general', label: 'General', icon: HelpCircle },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'web', label: 'Desarrollo Web', icon: MessageCircle },
    { id: 'pricing', label: 'Precios', icon: Phone }
  ];

  const faqs = {
    general: [
      {
        question: '¿Qué servicios ofrece ET Agency?',
        answer: 'Ofrecemos una amplia gama de servicios digitales incluyendo desarrollo web, posicionamiento SEO, marketing digital, diseño gráfico, gestión de redes sociales y consultoría digital. Nuestro objetivo es ser tu socio integral en la transformación digital de tu negocio.'
      },
      {
        question: '¿Cuánto tiempo toma completar un proyecto?',
        answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas, mientras que proyectos más complejos como e-commerce o aplicaciones web pueden requerir 6-12 semanas. Siempre proporcionamos un cronograma detallado antes de comenzar.'
      },
      {
        question: '¿Trabajan con empresas de todos los tamaños?',
        answer: 'Sí, trabajamos con empresas de todos los tamaños, desde startups y pequeñas empresas hasta corporaciones grandes. Adaptamos nuestros servicios y estrategias según las necesidades específicas y el presupuesto de cada cliente.'
      },
      {
        question: '¿Ofrecen soporte post-lanzamiento?',
        answer: 'Absolutamente. Ofrecemos diferentes planes de mantenimiento y soporte que incluyen actualizaciones de seguridad, backups, monitoreo del sitio, y soporte técnico. También proporcionamos capacitación para que puedas gestionar tu sitio de forma independiente.'
      },
      {
        question: '¿En qué países operan?',
        answer: 'Aunque estamos basados en Chile, trabajamos con clientes en toda Latinoamérica y España. Gracias a las herramientas digitales, podemos colaborar efectivamente con equipos remotos y ofrecer nuestros servicios a nivel internacional.'
      }
    ],
    seo: [
      {
        question: '¿Cuánto tiempo toma ver resultados en SEO?',
        answer: 'Los resultados de SEO generalmente comienzan a verse entre 3-6 meses, aunque algunos cambios pueden mostrar mejoras antes. El SEO es una estrategia a largo plazo que requiere paciencia y consistencia. Proporcionamos reportes mensuales para que puedas seguir el progreso.'
      },
      {
        question: '¿Garantizan la primera posición en Google?',
        answer: 'No garantizamos posiciones específicas ya que Google cambia constantemente sus algoritmos. Sin embargo, garantizamos mejoras medibles en tu visibilidad, tráfico orgánico y rankings para palabras clave relevantes. Nos enfocamos en resultados sostenibles y éticos.'
      },
      {
        question: '¿Qué incluye una auditoría SEO?',
        answer: 'Nuestra auditoría SEO incluye análisis técnico del sitio, investigación de palabras clave, análisis de la competencia, revisión de contenido, evaluación de backlinks, análisis de velocidad de carga, y recomendaciones específicas para mejorar tu posicionamiento.'
      },
      {
        question: '¿Utilizan técnicas de SEO éticas?',
        answer: 'Sí, utilizamos exclusivamente técnicas de "White Hat SEO" que cumplen con las directrices de Google. Evitamos cualquier práctica que pueda penalizar tu sitio web. Nuestro enfoque se basa en crear valor real para los usuarios y construir autoridad de forma orgánica.'
      },
      {
        question: '¿Pueden ayudar con SEO local?',
        answer: 'Definitivamente. Tenemos amplia experiencia en SEO local, incluyendo optimización de Google My Business, gestión de reseñas, citaciones locales, y estrategias específicas para aparecer en búsquedas geográficas relevantes para tu negocio.'
      }
    ],
    web: [
      {
        question: '¿Qué tecnologías utilizan para desarrollo web?',
        answer: 'Utilizamos tecnologías modernas como React, Next.js, Node.js, WordPress, y otras según las necesidades del proyecto. Nos mantenemos actualizados con las últimas tendencias y mejores prácticas para garantizar sitios web rápidos, seguros y escalables.'
      },
      {
        question: '¿Los sitios web son responsive?',
        answer: 'Todos nuestros sitios web son completamente responsive y se adaptan perfectamente a dispositivos móviles, tablets y desktop. Utilizamos un enfoque "mobile-first" para garantizar la mejor experiencia en todos los dispositivos.'
      },
      {
        question: '¿Incluyen sistema de gestión de contenidos?',
        answer: 'Sí, podemos implementar diferentes CMS según tus necesidades: WordPress para facilidad de uso, sistemas headless para mayor flexibilidad, o soluciones personalizadas. Te capacitamos para que puedas actualizar tu contenido de forma independiente.'
      },
      {
        question: '¿Qué pasa con el hosting y dominio?',
        answer: 'Podemos ayudarte con la selección y configuración de hosting y dominio, o trabajar con tu proveedor actual. Recomendamos servicios de hosting confiables y optimizados para el tipo de sitio web que desarrollamos.'
      },
      {
        question: '¿Pueden migrar mi sitio web existente?',
        answer: 'Sí, tenemos experiencia migrando sitios web entre diferentes plataformas y servidores. Nos encargamos de que la migración sea transparente, manteniendo tu SEO y minimizando el tiempo de inactividad.'
      }
    ],
    pricing: [
      {
        question: '¿Cómo estructuran sus precios?',
        answer: 'Nuestros precios se basan en el alcance del proyecto, complejidad técnica, y tiempo estimado de desarrollo. Ofrecemos cotizaciones transparentes sin costos ocultos. También tenemos paquetes mensuales para servicios continuos como SEO y mantenimiento.'
      },
      {
        question: '¿Ofrecen planes de pago flexibles?',
        answer: 'Sí, ofrecemos diferentes opciones de pago incluyendo pago único, pagos por etapas del proyecto, y planes mensuales para servicios continuos. Trabajamos contigo para encontrar una estructura de pago que se adapte a tu presupuesto.'
      },
      {
        question: '¿Hay costos adicionales después del lanzamiento?',
        answer: 'Los únicos costos adicionales serían servicios opcionales como hosting, mantenimiento, actualizaciones de contenido, o nuevas funcionalidades. Todos estos costos se discuten y aprueban previamente. No hay sorpresas.'
      },
      {
        question: '¿Ofrecen descuentos para proyectos grandes?',
        answer: 'Sí, ofrecemos descuentos para proyectos de gran envergadura, clientes que contratan múltiples servicios, y relaciones comerciales a largo plazo. Contacta con nosotros para discutir opciones específicas para tu proyecto.'
      },
      {
        question: '¿Qué incluye el precio de un sitio web?',
        answer: 'El precio incluye diseño personalizado, desarrollo completo, optimización SEO básica, configuración de analytics, capacitación básica, y garantía de 30 días. Los extras como contenido adicional, integraciones especiales, o funcionalidades avanzadas se cotizan por separado.'
      }
    ]
  };

  const filteredFAQs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes (FAQ) | ET Agency</title>
        <meta name="description" content="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de diseño web, e-commerce, SEO y marketing digital en ET Agency." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Preguntas <span className="text-blue-400">Frecuentes</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Encuentra respuestas a las preguntas más comunes sobre nuestros servicios digitales.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar en preguntas frecuentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
                <nav className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setOpenQuestion(null);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                    <p className="text-gray-600">Intenta con otros términos de búsqueda o selecciona una categoría diferente.</p>
                  </div>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                            openQuestion === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openQuestion === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro equipo está aquí para ayudarte. Contáctanos y resolveremos todas tus dudas.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/contacto"
                className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors group"
              >
                <Mail className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Enviar Mensaje</h3>
                <p className="text-sm text-blue-100">Formulario de contacto</p>
              </Link>
              <a
                href="https://wa.me/56940681210"
                className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-colors group"
              >
                <MessageCircle className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Enviar Whatsapp</h3>
                <p className="text-sm text-green-100">WhatsApp</p>
              </a>
              <a
                href="https://wa.me/56940681210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition-colors group"
              >
                <MessageCircle className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-purple-100">Chat directo</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default FAQ;