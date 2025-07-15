import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  Quote
} from 'lucide-react';

// Import sections
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioHighlight from '../components/sections/PortfolioHighlight';
import SEO from '../components/SEO';
import { AvatarImage } from '../components/common';
import OptimizedImage, { OptimizedAvatar } from '../components/OptimizedImage';
import { useCDN } from '../components/CDNProvider';

// Import data
import homeData from '../data/home.json';

const Home = () => {
  const { isInitialized } = useCDN();

  return (
    <>
      <SEO 
        title="ET Agency - Marketing Digital y Desarrollo Web en Chile" 
        description="Agencia líder en marketing digital, diseño web y e-commerce para empresas en Chile. Aumenta tus ventas online con soluciones profesionales y estrategias SEO optimizadas." 
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection hero={homeData.hero} />
      
      {/* Services Section */}
      <ServicesSection services={homeData.services} />
      
      {/* Portfolio Highlight */}
      <PortfolioHighlight />
      
      {/* Testimonials Section */}
      <section className="section-padding section-bg">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4"
            >
              Testimonios
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Testimonios de PyMEs Chilenas
              <span className="text-gradient block">que aumentaron sus ventas</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted max-w-3xl mx-auto leading-relaxed"
            >
              +120 PyMEs chilenas han aumentado sus ventas online con nuestros servicios de marketing digital y desarrollo web. 
              Conoce sus casos de éxito.
            </motion.p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {homeData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex mb-4 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <OptimizedAvatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    size={48}
                    fallbackInitials={testimonial.name.charAt(0)}
                    className="ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-muted text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {homeData.stats.projectsCompleted}+
              </div>
              <div className="text-muted">Proyectos completados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                {homeData.stats.happyClients}+
              </div>
              <div className="text-muted">Clientes felices</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {homeData.stats.yearsExperience}+
              </div>
              <div className="text-muted">Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
                {homeData.stats.teamMembers}
              </div>
              <div className="text-muted">Miembros del equipo</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para aumentar tus ventas online?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Únete a +120 PyMEs chilenas que aumentaron sus ventas con nuestras soluciones digitales. 
              ¡Cotización gratuita en 24 horas!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 group"
              >
                Cotizar gratis ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Ver nuestros servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home