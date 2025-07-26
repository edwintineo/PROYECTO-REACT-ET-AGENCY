/**
 * Application constants
 */

// Company Information
export const COMPANY_INFO = {
  name: 'ET Agency',
  fullName: 'ET Agency - Agencia de Marketing Digital',
  tagline: 'Tu socio estratégico en el mundo digital',
  description: 'Agencia especializada en posicionamiento SEO, desarrollo web y marketing digital en Chile.',
  founded: '2020',
  location: 'Santiago, Chile',
  timezone: 'America/Santiago'
};

// Contact Information
export const CONTACT_INFO = {
  email: 'info@etagency.cl',
  phone: '+56 9 4068 1210',
  whatsapp: '+56940681210',
  address: {
    street: 'Av. Providencia 1234',
    city: 'Santiago',
    region: 'Región Metropolitana',
    country: 'Chile',
    zipCode: '7500000'
  },
  businessHours: {
    weekdays: '09:00 - 18:00',
    saturday: '10:00 - 14:00',
    sunday: 'Cerrado'
  }
};

// Social Media
export const SOCIAL_MEDIA = {
  facebook: 'https://www.facebook.com/etagency.cl',
  instagram: 'https://www.instagram.com/etagency.cl',
  linkedin: 'https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F71729739%2F',
  twitter: 'https://x.com/etagency_chile',
  behance: 'https://www.behance.net/etagency',
  youtube: 'https://youtube.com/@etagency',
  tiktok: 'https://tiktok.com/@etagency'
};

// Navigation Menu
export const NAVIGATION = {
  main: [
    { name: 'Inicio', path: '/', exact: true },
    { 
      name: 'Servicios', 
      path: '/servicios',
      dropdown: [
        { name: 'Todos los Servicios', path: '/servicios' },
        { name: 'Posicionamiento SEO', path: '/seo' },
        { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
    { name: 'Marketing Digital', path: '/servicios/marketing-digital' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Quiénes Somos', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contacto', path: '/contacto' }
  ],
  footer: {
    services: [
      { name: 'Posicionamiento SEO', path: '/seo' },
      { name: 'Desarrollo Web', path: '/servicios/desarrollo-web' },
  { name: 'Marketing Digital', path: '/servicios/marketing-digital' },
  { name: 'Consultoría Digital', path: '/servicios/consultoria' }
    ],
    company: [
      { name: 'Quiénes Somos', path: '/about' },
      { name: 'Nuestro Equipo', path: '/equipo' },
      { name: 'Casos de Éxito', path: '/casos-exito' },
      { name: 'Testimonios', path: '/testimonios' }
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Guías SEO', path: '/blog/categoria/seo' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Herramientas', path: '/herramientas' }
    ],
    legal: [
      { name: 'Términos y Condiciones', path: '/terminos' },
      { name: 'Política de Privacidad', path: '/privacidad' },
      { name: 'Política de Cookies', path: '/cookies' }
    ]
  }
};

// Services
export const SERVICES = {
  seo: {
    id: 'seo',
    name: 'Posicionamiento SEO',
    slug: 'posicionamiento-web-seo',
    icon: 'Search',
    color: '#3B82F6',
    description: 'Mejora tu visibilidad en buscadores',
    features: [
      'Análisis de palabras clave',
      'Optimización on-page',
      'Link building',
      'SEO técnico',
      'Reportes mensuales'
    ],
    pricing: {
      basic: 299,
      standard: 599,
      premium: 999
    }
  },
  webDevelopment: {
    id: 'web-development',
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    icon: 'Code',
    color: '#10B981',
    description: 'Sitios web modernos y optimizados',
    features: [
      'Diseño responsive',
      'Optimización de velocidad',
      'SEO técnico incluido',
      'Panel de administración',
      'Mantenimiento'
    ],
    pricing: {
      landing: 1299,
      corporate: 2999,
      ecommerce: 4999
    }
  },
  digitalMarketing: {
    id: 'digital-marketing',
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    icon: 'TrendingUp',
    color: '#F59E0B',
    description: 'Estrategias integrales de marketing',
    features: [
      'Gestión de redes sociales',
      'Publicidad online',
      'Email marketing',
      'Content marketing',
      'Analytics y reportes'
    ],
    pricing: {
      basic: 499,
      standard: 999,
      premium: 1999
    }
  }
};

// Blog Categories
export const BLOG_CATEGORIES = {
  seo: {
    name: 'SEO',
    slug: 'seo',
    color: '#3B82F6',
    description: 'Consejos y estrategias de posicionamiento web'
  },
  webDevelopment: {
    name: 'Desarrollo Web',
    slug: 'desarrollo-web',
    color: '#10B981',
    description: 'Tendencias y técnicas de desarrollo web'
  },
  digitalMarketing: {
    name: 'Marketing Digital',
    slug: 'marketing-digital',
    color: '#F59E0B',
    description: 'Estrategias de marketing online'
  },
  analytics: {
    name: 'Analytics',
    slug: 'analytics',
    color: '#8B5CF6',
    description: 'Análisis de datos y métricas'
  },
  trends: {
    name: 'Tendencias',
    slug: 'tendencias',
    color: '#EF4444',
    description: 'Últimas tendencias digitales'
  }
};

// FAQ Categories
export const FAQ_CATEGORIES = {
  general: {
    name: 'General',
    icon: 'HelpCircle',
    description: 'Preguntas generales sobre nuestros servicios'
  },
  seo: {
    name: 'SEO',
    icon: 'Search',
    description: 'Preguntas sobre posicionamiento web'
  },
  desarrollo: {
    name: 'Desarrollo Web',
    icon: 'Code',
    description: 'Preguntas sobre desarrollo de sitios web'
  },
  precios: {
    name: 'Precios',
    icon: 'DollarSign',
    description: 'Preguntas sobre precios y planes'
  }
};

// Form Options
export const FORM_OPTIONS = {
  budgetRanges: [
    { value: '500-1000', label: '$500 - $1.000 USD' },
    { value: '1000-3000', label: '$1.000 - $3.000 USD' },
    { value: '3000-5000', label: '$3.000 - $5.000 USD' },
    { value: '5000-10000', label: '$5.000 - $10.000 USD' },
    { value: '10000+', label: 'Más de $10.000 USD' }
  ],
  timelines: [
    { value: 'asap', label: 'Lo antes posible' },
    { value: '1-month', label: 'En 1 mes' },
    { value: '2-3-months', label: 'En 2-3 meses' },
    { value: '3-6-months', label: 'En 3-6 meses' },
    { value: 'flexible', label: 'Flexible' }
  ],
  projectTypes: [
    { value: 'new-website', label: 'Sitio web nuevo' },
    { value: 'redesign', label: 'Rediseño de sitio existente' },
    { value: 'seo-optimization', label: 'Optimización SEO' },
    { value: 'digital-marketing', label: 'Marketing digital' },
    { value: 'maintenance', label: 'Mantenimiento web' },
    { value: 'other', label: 'Otro' }
  ],
  companySizes: [
    { value: 'startup', label: 'Startup (1-10 empleados)' },
    { value: 'small', label: 'Pequeña empresa (11-50 empleados)' },
    { value: 'medium', label: 'Mediana empresa (51-200 empleados)' },
    { value: 'large', label: 'Gran empresa (200+ empleados)' },
    { value: 'freelancer', label: 'Freelancer/Independiente' }
  ]
};

// SEO Defaults
import ogImage from '../assets/images/og-image.svg';

// SEO Defaults
export const SEO_DEFAULTS = {
  title: 'ET Agency - Agencia de Marketing Digital y SEO en Chile',
  description: 'Agencia especializada en posicionamiento SEO, desarrollo web y marketing digital. Aumenta tu visibilidad online y haz crecer tu negocio con nuestras estrategias digitales.',
  keywords: 'agencia seo chile, marketing digital, desarrollo web, posicionamiento web, agencia digital santiago',
  author: 'ET Agency',
  image: ogImage,
  url: 'https://www.etagency.cl',
  type: 'website',
  locale: 'es_CL',
  siteName: 'ET Agency'
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Breakpoints
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Theme Colors
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  base: import.meta.env.VITE_API_BASE_URL || 'https://api.etagency.cl',
  contact: '/contact',
  quote: '/quote',
  newsletter: '/newsletter',
  blog: '/blog',
  portfolio: '/portfolio',
  services: '/servicios',
  testimonials: '/testimonials',
  faq: '/faq'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'et-agency-theme',
  language: 'et-agency-language',
  user: 'et-agency-user',
  cart: 'et-agency-cart',
  preferences: 'et-agency-preferences',
  recentSearches: 'et-agency-recent-searches'
};

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Error de conexión. Verifica tu conexión a internet.',
  server: 'Error del servidor. Inténtalo más tarde.',
  notFound: 'Página no encontrada.',
  unauthorized: 'No tienes permisos para acceder a esta página.',
  validation: 'Por favor, corrige los errores en el formulario.',
  generic: 'Ha ocurrido un error inesperado. Inténtalo más tarde.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  contactSent: 'Mensaje enviado correctamente. Te contactaremos pronto.',
  quoteSent: 'Solicitud de cotización enviada. Te enviaremos una propuesta pronto.',
  newsletterSubscribed: 'Te has suscrito correctamente a nuestro newsletter.',
  profileUpdated: 'Perfil actualizado correctamente.',
  passwordChanged: 'Contraseña cambiada correctamente.'
};

// File Upload
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    all: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  }
};

// Pagination
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  maxVisiblePages: 5
};

export default {
  COMPANY_INFO,
  CONTACT_INFO,
  SOCIAL_MEDIA,
  NAVIGATION,
  SERVICES,
  BLOG_CATEGORIES,
  FAQ_CATEGORIES,
  FORM_OPTIONS,
  SEO_DEFAULTS,
  ANIMATION_VARIANTS,
  BREAKPOINTS,
  THEME_COLORS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FILE_UPLOAD,
  PAGINATION
};