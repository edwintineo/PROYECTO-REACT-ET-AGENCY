/**
 * Utility functions for the ET Agency project
 */

/**
 * Format date to Spanish locale
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('es-ES', defaultOptions).format(new Date(date));
};

/**
 * Format currency to Chilean Peso
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(amount);
};

/**
 * Format number with thousands separator
 * @param {number} number - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-CL').format(number);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
};

/**
 * Generate slug from text
 * @param {string} text - Text to convert
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Chilean phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone
 */
export const isValidPhone = (phone) => {
  // Chilean phone formats: +56912345678, 912345678, +56 9 1234 5678
  const phoneRegex = /^(\+?56)?\s?[9]\s?\d{4}\s?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate Chilean RUT
 * @param {string} rut - RUT to validate
 * @returns {boolean} - Is valid RUT
 */
export const isValidRUT = (rut) => {
  if (!rut) return false;
  
  // Remove dots and hyphens
  const cleanRUT = rut.replace(/[.-]/g, '');
  
  // Check format
  if (!/^\d{7,8}[0-9Kk]$/.test(cleanRUT)) return false;
  
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1).toUpperCase();
  
  // Calculate verification digit
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedDV = remainder < 2 ? remainder.toString() : 'K';
  
  return dv === calculatedDV;
};

/**
 * Format RUT with dots and hyphen
 * @param {string} rut - RUT to format
 * @returns {string} - Formatted RUT
 */
export const formatRUT = (rut) => {
  if (!rut) return '';
  
  const cleanRUT = rut.replace(/[.-]/g, '');
  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);
  
  // Add dots every 3 digits from right
  const formattedBody = body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  
  return `${formattedBody}-${dv}`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Deep clone object
 * @param {*} obj - Object to clone
 * @returns {*} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - Is empty
 */
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} - Random item
 */
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} - Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

/**
 * Sort array by multiple keys
 * @param {Array} array - Array to sort
 * @param {Array} keys - Keys to sort by
 * @returns {Array} - Sorted array
 */
export const sortBy = (array, keys) => {
  return array.sort((a, b) => {
    for (const key of keys) {
      const direction = key.startsWith('-') ? -1 : 1;
      const prop = key.replace(/^-/, '');
      
      if (a[prop] < b[prop]) return -1 * direction;
      if (a[prop] > b[prop]) return 1 * direction;
    }
    return 0;
  });
};

/**
 * Calculate reading time
 * @param {string} text - Text to analyze
 * @param {number} wpm - Words per minute (default: 200)
 * @returns {number} - Reading time in minutes
 */
export const calculateReadingTime = (text, wpm = 200) => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};

/**
 * Generate random ID
 * @param {number} length - ID length
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Convert bytes to human readable format
 * @param {number} bytes - Bytes to convert
 * @param {number} decimals - Number of decimals
 * @returns {string} - Human readable size
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Check if device is mobile
 * @returns {boolean} - Is mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get device type
 * @returns {string} - Device type (mobile, tablet, desktop)
 */
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Scroll to element smoothly
 * @param {string|Element} element - Element or selector
 * @param {Object} options - Scroll options
 */
export const scrollToElement = (element, options = {}) => {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) return;
  
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    ...options
  });
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Copy promise
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

/**
 * Download file from URL
 * @param {string} url - File URL
 * @param {string} filename - Download filename
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get URL parameters
 * @param {string} url - URL to parse (default: current URL)
 * @returns {Object} - URL parameters
 */
export const getUrlParams = (url = window.location.href) => {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Set URL parameter
 * @param {string} key - Parameter key
 * @param {string} value - Parameter value
 * @param {boolean} pushState - Whether to push to history
 */
export const setUrlParam = (key, value, pushState = true) => {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  
  if (pushState) {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
};

/**
 * Remove URL parameter
 * @param {string} key - Parameter key
 * @param {boolean} pushState - Whether to push to history
 */
export const removeUrlParam = (key, pushState = true) => {
  const url = new URL(window.location);
  url.searchParams.delete(key);
  
  if (pushState) {
    window.history.pushState({}, '', url);
  } else {
    window.history.replaceState({}, '', url);
  }
};

export * from './portfolioUtils';
export * from './validations';
export * from './constants';