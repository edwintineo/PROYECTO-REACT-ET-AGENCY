import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Calendar, User, TrendingUp } from 'lucide-react';
import { getRecentProjects } from '../../utils/portfolioUtils';
import { getImageFromPath } from '../../config/portfolioImages';

const PortfolioHighlight = () => {
  const recentProjects = getRecentProjects(3);

  return (
    <section className="section-padding bg-white">
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
            className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4"
          >
            Nuestro Portafolio
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Proyectos que
            <span className="text-gradient block">transforman negocios</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Descubre cómo hemos ayudado a empresas chilenas a crecer y destacar en el mundo digital 
            con soluciones innovadoras y resultados medibles.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageFromPath(project.image) || project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #3B82F6, #8B5CF6)';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.innerHTML = `<span style="color: white; font-weight: bold;">${project.title}</span>`;
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
                
                {/* External Link */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Project Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Results */}
                {project.results && (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">Resultados destacados</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(project.results).slice(0, 2).map(([key, value], resultIndex) => (
                        <div key={resultIndex} className="text-center">
                          <div className="font-bold text-blue-600">{value}</div>
                          <div className="text-gray-500 text-xs">
                            {key === 'salesIncrease' && 'Aumento ventas'}
                            {key === 'trafficIncrease' && 'Aumento tráfico'}
                            {key === 'orderIncrease' && 'Aumento pedidos'}
                            {key === 'appointmentIncrease' && 'Aumento citas'}
                            {key === 'deliveryOrders' && 'Pedidos delivery'}
                            {key === 'propertyViews' && 'Vistas propiedades'}
                            {key === 'conversionRate' && 'Conversión'}
                            {key === 'pageSpeed' && 'Velocidad'}
                            {key === 'customerSatisfaction' && 'Satisfacción'}
                            {key === 'leadGeneration' && 'Generación leads'}
                            {key === 'patientSatisfaction' && 'Satisfacción pacientes'}
                            {key === 'customerRetention' && 'Retención'}
                            {key === 'appRating' && 'Rating app'}
                            {key === 'leadQuality' && 'Calidad leads'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a más de 120 empresas que han transformado su presencia digital con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
              >
                Ver todos los proyectos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Iniciar mi proyecto
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHighlight;