import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Tag,
  Clock,
  Eye,
  TrendingUp,
  Globe,
  Smartphone,
  ShoppingCart,
  BarChart3
} from 'lucide-react'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos', count: 10 },
    { id: 'diseno-web', name: 'Diseño Web', count: 4 },
    { id: 'seo', name: 'SEO', count: 2 },
    { id: 'ecommerce', name: 'E-commerce', count: 2 },
    { id: 'marketing', name: 'Marketing Digital', count: 1 },
    { id: 'tecnologia', name: 'Tecnología', count: 1 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: '10 Tendencias de Diseño Web para 2025',
      slug: '10-tendencias-diseno-web-2025-guia-completa-empresas-chilenas',
      excerpt: 'Descubre las últimas tendencias en diseño web que dominarán este año y cómo implementarlas en tu sitio.',
      content: 'El diseño web evoluciona constantemente, y 2025 no es la excepción. Desde el minimalismo hasta las animaciones micro-interactivas...',
      category: 'diseno-web',
      author: 'ET AGENCY',
      date: '2025-07-15',
      readTime: '5 min',
      views: 1250,
      image: '/images/blog/tendencias-diseno-web-2025.svg',
      tags: ['Diseño', 'Tendencias', 'UX/UI'],
      featured: true
    },
    {
      id: 2,
      title: 'Cómo Optimizar tu Sitio Web para SEO Local en Chile',
      slug: 'como-optimizar-sitio-web-seo-local-chile',
      excerpt: 'Guía completa para posicionar tu negocio local en los resultados de búsqueda de Google Chile.',
      content: 'El SEO local es fundamental para negocios que atienden a clientes en ubicaciones específicas...',
      category: 'seo',
      author: 'ET AGENCY',
      date: '2025-06-20',
      readTime: '8 min',
      views: 980,
      image: '/images/blog/seo-local-chile.svg',
      tags: ['SEO', 'Local', 'Google'],
      featured: false
    },
    {
      id: 3,
      title: 'E-commerce en Chile: Integración con Webpay Plus',
      slug: 'ecommerce-chile-integracion-webpay-plus',
      excerpt: 'Todo lo que necesitas saber para integrar Webpay Plus en tu tienda online y aumentar las conversiones.',
      content: 'Webpay Plus es la pasarela de pago más utilizada en Chile. Su correcta integración puede marcar la diferencia...',
      category: 'ecommerce',
      author: 'ET AGENCY',
      date: '2025-05-25',
      readTime: '6 min',
      views: 1100,
      image: '/images/blog/ecommerce-webpay-plus.svg',
      tags: ['E-commerce', 'Webpay', 'Pagos'],
      featured: true
    },
    {
      id: 4,
      title: 'Marketing Digital para Pymes: Estrategias que Funcionan',
      slug: 'marketing-digital-pymes-estrategias-funcionan',
      excerpt: 'Estrategias de marketing digital probadas para pequeñas y medianas empresas con presupuestos limitados.',
      content: 'Las Pymes enfrentan desafíos únicos en el marketing digital. Con recursos limitados, es crucial...',
      category: 'marketing',
      author: 'ET AGENCY',
      date: '2025-04-30',
      readTime: '7 min',
      views: 850,
      image: '/images/blog/marketing-digital-pymes.svg',
      tags: ['Marketing', 'Pymes', 'Estrategia'],
      featured: false
    },
    {
      id: 5,
      title: 'Velocidad de Carga: Por qué es Crucial para tu Sitio Web',
      slug: 'velocidad-carga-crucial-sitio-web',
      excerpt: 'Aprende por qué la velocidad de carga afecta tu SEO, conversiones y experiencia de usuario.',
      content: 'La velocidad de carga de un sitio web es uno de los factores más importantes para el éxito online...',
      category: 'diseno-web',
      author: 'ET AGENCY',
      date: '2025-04-10',
      readTime: '4 min',
      views: 720,
      image: '/images/blog/velocidad-carga-web.svg',
      tags: ['Performance', 'UX', 'SEO'],
      featured: false
    },
    {
      id: 6,
      title: 'Diseño Responsive: Más Allá de Mobile-First',
      slug: 'diseno-responsive-mas-alla-mobile-first',
      excerpt: 'Explora las mejores prácticas para crear sitios web que funcionen perfectamente en todos los dispositivos.',
      content: 'El diseño responsive ha evolucionado más allá del concepto mobile-first. Hoy debemos pensar...',
      category: 'diseno-web',
      author: 'ET AGENCY',
      date: '2025-03-15',
      readTime: '6 min',
      views: 950,
      image: '/images/blog/diseno-responsive.svg',
      tags: ['Responsive', 'Mobile', 'UX'],
      featured: false
    },
    {
      id: 7,
      title: 'SEO Técnico: Fundamentos para Desarrolladores',
      slug: 'seo-tecnico-fundamentos-desarrolladores',
      excerpt: 'Guía técnica sobre los aspectos fundamentales del SEO que todo desarrollador debe conocer.',
      content: 'El SEO técnico es la base sobre la cual se construye una estrategia de posicionamiento exitosa...',
      category: 'seo',
      author: 'ET AGENCY',
      date: '2025-02-28',
      readTime: '9 min',
      views: 1300,
      image: '/images/blog/seo-tecnico.svg',
      tags: ['SEO Técnico', 'Desarrollo', 'Google'],
      featured: true
    },
    {
      id: 8,
      title: 'Conversiones en E-commerce: Optimización del Checkout',
      slug: 'conversiones-ecommerce-optimizacion-checkout',
      excerpt: 'Técnicas probadas para reducir el abandono del carrito y aumentar las conversiones en tu tienda online.',
      content: 'El proceso de checkout es el momento más crítico en cualquier tienda online. Un checkout optimizado...',
      category: 'ecommerce',
      author: 'ET AGENCY',
      date: '2025-02-10',
      readTime: '5 min',
      views: 680,
      image: '/images/blog/conversiones-ecommerce.svg',
      tags: ['Conversiones', 'Checkout', 'UX'],
      featured: false
    },
    {
      id: 9,
      title: 'Diseño Web Responsive: Mejores Prácticas para una Experiencia Móvil Perfecta',
      slug: 'diseno-web-responsive-mejores-practicas-experiencia-movil',
      excerpt: 'Aprende las mejores prácticas de diseño responsive para crear sitios web que funcionen perfectamente en todos los dispositivos.',
      content: 'El diseño responsive es fundamental en la era móvil actual. Con más del 60% del tráfico web proveniente de dispositivos móviles...',
      category: 'diseno-web',
      author: 'ET AGENCY',
      date: '2025-01-20',
      readTime: '16 min',
      views: 920,
      image: '/images/blog/diseno-responsive.svg',
      tags: ['Diseño Web', 'Responsive', 'UX/UI', 'Mobile First'],
      featured: false
    },
    {
      id: 10,
      title: 'Automatización de Procesos Empresariales: Cómo la Tecnología Puede Transformar tu Negocio',
      slug: 'automatizacion-procesos-empresariales-tecnologia-transformar-negocio',
      excerpt: 'Descubre cómo la automatización puede optimizar tus procesos empresariales, reducir costos y aumentar la eficiencia.',
      content: 'La automatización de procesos empresariales está revolucionando la forma en que las empresas operan...',
      category: 'tecnologia',
      author: 'ET AGENCY',
      date: '2025-01-05',
      readTime: '20 min',
      views: 1250,
      image: '/images/blog/automatizacion-procesos.svg',
      tags: ['Automatización', 'Procesos', 'Eficiencia', 'Tecnología'],
      featured: true
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory
    return matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.slice(0, 5)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'diseno-web': return Globe
      case 'seo': return TrendingUp
      case 'ecommerce': return ShoppingCart
      case 'marketing': return BarChart3
      case 'tecnologia': return Smartphone
      default: return Globe
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
              Blog de <span className="text-yellow-400">ET Agency</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Consejos, tutoriales y las últimas tendencias en diseño web, 
              SEO y marketing digital para hacer crecer tu negocio.
            </p>
            

          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-padding section-bg">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Artículos Destacados
              </h2>
              <p className="text-xl text-muted">
                Los artículos más populares y relevantes de nuestro blog
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => {
                const CategoryIcon = getCategoryIcon(post.category)
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="card-bg rounded-xl shadow-lg overflow-hidden card-hover group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                          Destacado
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-4">{formatDate(post.date)}</span>
                        <Clock size={14} className="mr-1" />
                        <span className="mr-4">{post.readTime}</span>
                        <Eye size={14} className="mr-1" />
                        <span>{post.views}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted mb-4 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={14} className="mr-1" />
                          {post.author}
                        </div>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center group"
                        >
                          Leer más
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="section-padding section-bg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'card-bg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Tag className="inline mr-1" size={14} />
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => {
                  const CategoryIcon = getCategoryIcon(post.category)
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="card-bg rounded-xl shadow-lg overflow-hidden card-hover group"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-4">{formatDate(post.date)}</span>
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted mb-4 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <User size={14} className="mr-1" />
                            {post.author}
                          </div>
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center group"
                          >
                            Leer más
                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <Search className="text-gray-400 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No se encontraron artículos
                  </h3>
                  <p className="text-muted">
                    Intenta con otros términos de búsqueda o categorías
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="card-bg p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Artículos Recientes
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.date)}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-primary-600 p-6 rounded-xl text-white"
              >
                <h3 className="text-xl font-bold mb-4">
                  Suscríbete al Newsletter
                </h3>
                <p className="text-primary-100 mb-4 text-sm">
                  Recibe los últimos artículos y consejos directamente en tu email.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                  />
                  <button className="w-full bg-white text-primary-600 py-2 rounded font-semibold hover:bg-gray-100 transition-colors text-sm">
                    Suscribirse
                  </button>
                </form>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card-bg p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['SEO', 'WordPress', 'E-commerce', 'UX/UI', 'Marketing', 'Responsive', 'Performance', 'Conversiones'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
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
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte a implementar estas estrategias en tu negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Solicitar Consultoría
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/servicios" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog