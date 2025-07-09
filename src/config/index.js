/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

// Environment variables with fallbacks
const config = {
  // App Information
  app: {
    name: 'ET Agency',
    version: '1.0.0',
    description: 'Agencia de Marketing Digital y Desarrollo Web',
    url: process.env.REACT_APP_URL || 'https://etagency.cl',
    environment: process.env.NODE_ENV || 'development',
  },

  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.etagency.cl',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
    retries: parseInt(process.env.REACT_APP_API_RETRIES) || 3,
    version: process.env.REACT_APP_API_VERSION || 'v1',
  },

  // Authentication
  auth: {
    tokenKey: 'et_agency_token',
    refreshTokenKey: 'et_agency_refresh_token',
    userKey: 'et_agency_user',
    sessionTimeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT) || 3600000, // 1 hour
  },

  // Storage
  storage: {
    prefix: 'et_agency_',
    version: '1.0',
    keys: {
      theme: 'theme',
      language: 'language',
      preferences: 'preferences',
      cart: 'cart',
      favorites: 'favorites',
    },
  },

  // Theme Configuration
  theme: {
    default: 'light',
    available: ['light', 'dark'],
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      danger: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6',
    },
  },

  // Internationalization
  i18n: {
    defaultLanguage: 'es',
    availableLanguages: ['es', 'en'],
    fallbackLanguage: 'es',
    namespace: 'translation',
  },

  // SEO Configuration
  seo: {
    defaultTitle: 'ET Agency - Agencia de Marketing Digital',
    titleTemplate: '%s | ET Agency',
    defaultDescription: 'Agencia especializada en marketing digital, desarrollo web y posicionamiento SEO en Chile.',
    defaultKeywords: 'marketing digital, desarrollo web, SEO, agencia digital, Chile',
    defaultImage: '/images/og-image.jpg',
    twitterHandle: '@etagency',
    facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID,
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.REACT_APP_GA_ID,
    googleTagManagerId: process.env.REACT_APP_GTM_ID,
    facebookPixelId: process.env.REACT_APP_FB_PIXEL_ID,
    hotjarId: process.env.REACT_APP_HOTJAR_ID,
    enabled: process.env.NODE_ENV === 'production',
  },

  // Social Media
  social: {
    facebook: 'https://www.facebook.com/etagency.cl',
    instagram: 'https://www.instagram.com/etagency.cl',
    twitter: 'https://x.com/etagency_chile',
    linkedin: 'https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F71729739%2F',
    behance: 'https://www.behance.net/etagency',
    youtube: 'https://youtube.com/etagency',
    whatsapp: '+56940681210',
  },

  // Contact Information
  contact: {
    email: 'info@etagency.cl',
    phone: '+56 9 4068 1210',
    address: 'Santiago, Chile',
    businessHours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: 'Cerrado',
      sunday: 'Cerrado',
    },
  },

  // Features Flags
  features: {
    chatBot: process.env.REACT_APP_CHATBOT_ENABLED === 'true',
    blog: process.env.REACT_APP_BLOG_ENABLED !== 'false',
    portfolio: process.env.REACT_APP_PORTFOLIO_ENABLED !== 'false',
    testimonials: process.env.REACT_APP_TESTIMONIALS_ENABLED !== 'false',
    newsletter: process.env.REACT_APP_NEWSLETTER_ENABLED !== 'false',
    darkMode: process.env.REACT_APP_DARK_MODE_ENABLED !== 'false',
    animations: process.env.REACT_APP_ANIMATIONS_ENABLED !== 'false',
  },

  // Performance
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    caching: {
      enabled: true,
      duration: 300000, // 5 minutes
    },
    debounceDelay: 300,
    throttleDelay: 100,
  },

  // File Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: {
      images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      videos: ['video/mp4', 'video/webm', 'video/ogg'],
    },
    uploadUrl: process.env.REACT_APP_UPLOAD_URL || '/api/upload',
  },

  // Pagination
  pagination: {
    defaultPageSize: 12,
    pageSizeOptions: [6, 12, 24, 48],
    maxPages: 10,
  },

  // Maps
  maps: {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    defaultCenter: {
      lat: -33.4489,
      lng: -70.6693, // Santiago, Chile
    },
    defaultZoom: 12,
  },

  // Email
  email: {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  },

  // reCAPTCHA
  recaptcha: {
    siteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
    enabled: process.env.REACT_APP_RECAPTCHA_ENABLED === 'true',
  },

  // Development
  development: {
    enableLogger: process.env.NODE_ENV === 'development',
    enableDevTools: process.env.NODE_ENV === 'development',
    mockApi: process.env.REACT_APP_MOCK_API === 'true',
    showPerformanceMetrics: process.env.REACT_APP_SHOW_PERFORMANCE === 'true',
  },

  // Error Handling
  errors: {
    enableReporting: process.env.NODE_ENV === 'production',
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    logLevel: process.env.REACT_APP_LOG_LEVEL || 'error',
  },

  // Cache
  cache: {
    enabled: true,
    prefix: 'et_cache_',
    defaultTTL: 300000, // 5 minutes
    maxSize: 100, // Maximum number of cached items
  },

  // Security
  security: {
    enableCSP: true,
    enableHTTPS: process.env.NODE_ENV === 'production',
    cookieSecure: process.env.NODE_ENV === 'production',
    cookieSameSite: 'strict',
  },

  // PWA
  pwa: {
    enabled: process.env.REACT_APP_PWA_ENABLED === 'true',
    updateCheckInterval: 60000, // 1 minute
    cacheStrategy: 'cacheFirst',
  },

  // Monitoring
  monitoring: {
    enabled: process.env.NODE_ENV === 'production',
    performanceThreshold: 3000, // 3 seconds
    errorThreshold: 5, // 5 errors per minute
  },
};

// Helper functions
export const isDevelopment = () => config.app.environment === 'development';
export const isProduction = () => config.app.environment === 'production';
export const isFeatureEnabled = (feature) => config.features[feature] || false;
export const getApiUrl = (endpoint = '') => `${config.api.baseUrl}/${config.api.version}${endpoint}`;
export const getStorageKey = (key) => `${config.storage.prefix}${key}`;
export const getThemeColor = (color) => config.theme.colors[color];

// Validation
const validateConfig = () => {
  const requiredEnvVars = [];
  
  if (isProduction()) {
    requiredEnvVars.push(
      'REACT_APP_API_URL',
      'REACT_APP_GA_ID'
    );
  }
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing required environment variables:', missingVars);
  }
};

// Initialize validation
validateConfig();

export default config;