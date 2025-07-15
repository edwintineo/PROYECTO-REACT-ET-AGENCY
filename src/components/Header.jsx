import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const location = useLocation()
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Inicio', href: '/' },
    { 
      name: 'Servicios', 
      href: '/servicios',
      dropdown: [
        { name: 'Todos los Servicios', href: '/servicios' },
        { name: 'Posicionamiento SEO', href: '/seo-servicios' },
        { name: 'Desarrollo Web', href: '/servicios#desarrollo-web' },
        { name: 'Marketing Digital', href: '/servicios#marketing-digital' }
      ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Quiénes Somos', href: '/quienes-somos' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contacto', href: '/contacto' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>
              <span className="text-blue-600">ET</span>
              <span className="text-gray-800 dark:text-white ml-1">AGENCY</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`font-medium transition-colors duration-200 flex items-center space-x-1 ${
                        location.pathname === item.href || location.pathname.includes('seo-servicios')
                          ? isScrolled
                            ? 'text-primary-600'
                            : isDarkMode ? 'text-white border-b-2 border-white' : 'text-primary-600 border-b-2 border-primary-600'
                          : isScrolled
                         ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                         : isDarkMode ? 'text-white hover:text-primary-200' : (location.pathname === '/' ? 'text-white hover:text-primary-200' : 'text-gray-900 hover:text-primary-600')
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 transition-colors"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? isScrolled
                          ? 'text-primary-600'
                          : isDarkMode ? 'text-white border-b-2 border-white' : 'text-primary-600 border-b-2 border-primary-600'
                        : isScrolled
                         ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600'
                         : isDarkMode ? 'text-white hover:text-primary-200' : (location.pathname === '/' ? 'text-white hover:text-primary-200' : 'text-gray-900 hover:text-primary-600')
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contacto"
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isScrolled 
                  ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                  : 'bg-white text-primary-600 hover:bg-gray-100'
              }`}
            >
              Cotizar Proyecto
            </Link>
          </div>

          {/* Mobile menu button */
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`font-medium py-2 transition-colors duration-200 block ${
                            location.pathname === item.href || location.pathname.includes('seo-servicios')
                              ? 'text-primary-600 border-l-4 border-primary-600 pl-4'
                              : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 pl-4'
                          }`}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-8 mt-2 space-y-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-medium py-2 transition-colors duration-200 block ${
                          location.pathname === item.href
                            ? 'text-primary-600 border-l-4 border-primary-600 pl-4'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 pl-4'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  to="/contacto"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary mt-4 text-center"
                >
                  Cotizar Proyecto
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header