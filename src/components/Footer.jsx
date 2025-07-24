import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Palette } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Diseño Web', href: '/servicios#diseno-web' },
    { name: 'Tiendas Online', href: '/servicios#tiendas-online' },
    { name: 'Mantenciones', href: '/servicios#mantenciones' },
    { name: 'SEO', href: '/seo-servicios' },
    { name: 'Integraciones', href: '/servicios#integraciones' }
  ]

  const company = [
    { name: 'Sobre Nosotros', href: '/quienes-somos' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Términos y Condiciones', href: '/terminos' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/etagency.cl' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/etagency.cl' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F71729739%2F' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/etagency_chile' },
    { name: 'Behance', icon: Palette, href: 'https://www.behance.net/etagency' }
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8">
            <Link to="/" className="flex items-center justify-center mb-4">
              <img 
                src="/logo-et-agency.svg"
                alt="ET Agency - Agencia de Marketing Digital" 
                className="h-28 w-auto mx-auto"
                loading="eager"
              />
            </Link>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              Creamos sitios web profesionales y tiendas online para PyMEs chilenas. 
              Transformamos tu negocio en una presencia digital exitosa.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-400" />
                <a href="mailto:info@etagency.cl" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  info@etagency.cl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-400" />
                <a href="tel:+56940681210" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  +56 9 4068 1210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary-400" />
                <span className="text-gray-300 dark:text-gray-400">Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Empresa</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Suscríbete para recibir tips y novedades sobre desarrollo web.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-2 bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} ET Agency. Todos los derechos reservados.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer