import React from 'react';
import { Helmet } from 'react-helmet-async'; // Importar Helmet
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AvatarImage, Image } from '../components/common';
import { getTeamImageFromPath } from '../config/teamImages';

const About = () => {
  const stats = [
    { number: '15+', label: 'Años de Experiencia' },
    { number: '731+', label: 'Proyectos Completados' },
    { number: '170+', label: 'Clientes Satisfechos' },
    { number: '24/7', label: 'Soporte Técnico' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Enfoque en Resultados',
      description: 'Nos comprometemos a entregar resultados medibles que impulsen el crecimiento de tu negocio.'
    },
    {
      icon: Heart,
      title: 'Pasión por la Excelencia',
      description: 'Cada proyecto es una oportunidad para superar expectativas y crear experiencias excepcionales.'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Colaboramos estrechamente contigo para entender tus necesidades y objetivos únicos.'
    },
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: 'Utilizamos las mejores prácticas y tecnologías más avanzadas para asegurar la calidad.'
    }
  ];

  const team = [
    {
      name: 'Edwin Tineo',
      role: 'CEO & Fundador',
      image: '/images/team/edwin.png',
      description: 'Apasionado por la ciencia y la tecnología con más de 15 años de experiencia.'
    },
    {
      name: 'Aura Silva',
      role: 'Diseñadora Gráfica / UX',
      image: '/images/team/aura.png',
      description: 'Creativa al 101%, especialista en diseño gráfico y experiencia de usuario.'
    },
    {
      name: 'Isnaldo Carvajal',
      role: 'Diseñador / Programador',
      image: '/images/team/isnaldo.png',
      description: 'Amante de la literatura, la poesía, el arte, la música y la tecnología.'
    }
  ];

  const achievements = [
    'Certificados en desarrollo web moderno',
    'Tiempo de respuesta promedio: 2 horas',
    'Proyectos entregados a tiempo: 98%',
    'Garantía de satisfacción del cliente'
  ];

  return (
    <>
      <Helmet>
        <title>Quiénes Somos | Agencia de Diseño Web y Marketing Digital - ET Agency</title>
        <meta name="description" content="Conoce a ET Agency, una agencia digital especializada en diseño web, e-commerce y marketing digital. Nuestra misión, visión y valores." />
      </Helmet>
      <div className="page-container">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Quiénes <span className="text-blue-400">Somos</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Somos ET Agency, una agencia digital especializada en transformar ideas en experiencias digitales exitosas.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Mission Section */}
      <section className="section-padding section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-muted mb-6">
                Empoderar a las empresas con soluciones digitales innovadoras que impulsen su crecimiento y les permitan destacar en el mercado digital.
              </p>
              <p className="text-lg text-muted mb-8">
                Creemos que cada negocio tiene una historia única que contar, y nuestro trabajo es ayudarte a contarla de la manera más efectiva y atractiva posible.
              </p>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
                <p className="text-blue-100 mb-6">
                  Ser la agencia digital líder en Latinoamérica, reconocida por nuestra innovación, calidad y compromiso con el éxito de nuestros clientes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Los principios que guían cada decisión y proyecto que emprendemos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-muted">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Profesionales apasionados y experimentados comprometidos con tu éxito.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-bg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={getTeamImageFromPath(member.image) || member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      console.log('Error loading image:', member.image);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-muted">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors group"
            >
              Contáctanos Ahora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;