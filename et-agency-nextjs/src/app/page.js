import React from 'react';
import ServiceCard from '../components/ServiceCard';
import homeData from '../data/home.json';

export default function HomePage() {
  const { hero, services, stats } = homeData;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            ET Agency
          </h1>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="#inicio" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Inicio</a>
            <a href="#servicios" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Servicios</a>
            <a href="#stats" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Estadísticas</a>
            <a href="#contacto" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" style={{ 
        textAlign: 'center', 
        color: 'white',
        padding: '8rem 2rem 4rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          lineHeight: '1.2'
        }}>
          {hero.title}
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
          marginBottom: '2rem',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: '1.6',
          opacity: '0.95'
        }}>
          {hero.subtitle}
        </p>
        
        {/* Success Message */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.9)',
          color: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '12px',
          margin: '2rem auto',
          maxWidth: '600px',
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
            ✅ Migración Exitosa a Next.js 14
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Proyecto migrado correctamente con datos reales y componentes funcionales
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '3rem 2rem',
        margin: '2rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.projectsCompleted}+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Proyectos Completados</div>
            </div>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.happyClients}+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Clientes Satisfechos</div>
            </div>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.yearsExperience}+
              </div>
              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Años de Experiencia</div>
            </div>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {stats.teamMembers}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Miembros del Equipo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '4rem 2rem',
        margin: '2rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Nuestros Servicios
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0, opacity: '0.8' }}>
          © 2024 ET Agency - Desarrollo Web Profesional | Migrado exitosamente a Next.js 14
        </p>
      </footer>
    </div>
  )
}