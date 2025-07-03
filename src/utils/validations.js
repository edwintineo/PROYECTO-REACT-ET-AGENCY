/**
 * Form validation utilities
 */

import { isValidEmail, isValidPhone, isValidRUT } from './index';

/**
 * Validation rules
 */
export const validationRules = {
  required: (value) => {
    if (value === null || value === undefined) return 'Este campo es requerido';
    if (typeof value === 'string' && value.trim() === '') return 'Este campo es requerido';
    if (Array.isArray(value) && value.length === 0) return 'Este campo es requerido';
    return null;
  },

  email: (value) => {
    if (!value) return null;
    return isValidEmail(value) ? null : 'Ingresa un email válido';
  },

  phone: (value) => {
    if (!value) return null;
    return isValidPhone(value) ? null : 'Ingresa un teléfono válido';
  },

  rut: (value) => {
    if (!value) return null;
    return isValidRUT(value) ? null : 'Ingresa un RUT válido';
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    return value.length >= min ? null : `Mínimo ${min} caracteres`;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    return value.length <= max ? null : `Máximo ${max} caracteres`;
  },

  min: (min) => (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return num >= min ? null : `El valor mínimo es ${min}`;
  },

  max: (max) => (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return num <= max ? null : `El valor máximo es ${max}`;
  },

  pattern: (regex, message = 'Formato inválido') => (value) => {
    if (!value) return null;
    return regex.test(value) ? null : message;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Ingresa una URL válida';
    }
  },

  number: (value) => {
    if (!value) return null;
    return !isNaN(Number(value)) ? null : 'Ingresa un número válido';
  },

  integer: (value) => {
    if (!value) return null;
    return Number.isInteger(Number(value)) ? null : 'Ingresa un número entero';
  },

  positive: (value) => {
    if (!value) return null;
    return Number(value) > 0 ? null : 'El valor debe ser positivo';
  },

  date: (value) => {
    if (!value) return null;
    const date = new Date(value);
    return !isNaN(date.getTime()) ? null : 'Ingresa una fecha válida';
  },

  futureDate: (value) => {
    if (!value) return null;
    const date = new Date(value);
    const now = new Date();
    return date > now ? null : 'La fecha debe ser futura';
  },

  pastDate: (value) => {
    if (!value) return null;
    const date = new Date(value);
    const now = new Date();
    return date < now ? null : 'La fecha debe ser pasada';
  },

  match: (fieldName) => (value, allValues) => {
    if (!value) return null;
    return value === allValues[fieldName] ? null : 'Los campos no coinciden';
  },

  fileSize: (maxSizeInMB) => (file) => {
    if (!file) return null;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes ? null : `El archivo debe ser menor a ${maxSizeInMB}MB`;
  },

  fileType: (allowedTypes) => (file) => {
    if (!file) return null;
    return allowedTypes.includes(file.type) ? null : `Tipo de archivo no permitido. Permitidos: ${allowedTypes.join(', ')}`;
  }
};

/**
 * Validation schemas for common forms
 */
export const validationSchemas = {
  contact: {
    name: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(50)],
    email: [validationRules.required, validationRules.email],
    phone: [validationRules.phone],
    subject: [validationRules.required, validationRules.minLength(5), validationRules.maxLength(100)],
    message: [validationRules.required, validationRules.minLength(10), validationRules.maxLength(1000)]
  },

  quote: {
    name: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(50)],
    email: [validationRules.required, validationRules.email],
    phone: [validationRules.required, validationRules.phone],
    company: [validationRules.maxLength(100)],
    service: [validationRules.required],
    budget: [validationRules.required],
    timeline: [validationRules.required],
    description: [validationRules.required, validationRules.minLength(20), validationRules.maxLength(2000)]
  },

  newsletter: {
    email: [validationRules.required, validationRules.email],
    name: [validationRules.minLength(2), validationRules.maxLength(50)]
  },

  login: {
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.minLength(6)]
  },

  register: {
    name: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(50)],
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.minLength(8)],
    confirmPassword: [validationRules.required, validationRules.match('password')],
    phone: [validationRules.phone],
    company: [validationRules.maxLength(100)]
  },

  profile: {
    name: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(50)],
    email: [validationRules.required, validationRules.email],
    phone: [validationRules.phone],
    company: [validationRules.maxLength(100)],
    website: [validationRules.url],
    bio: [validationRules.maxLength(500)]
  },

  comment: {
    name: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(50)],
    email: [validationRules.required, validationRules.email],
    comment: [validationRules.required, validationRules.minLength(10), validationRules.maxLength(1000)]
  },

  search: {
    query: [validationRules.required, validationRules.minLength(2), validationRules.maxLength(100)]
  }
};

/**
 * Validate a single field
 * @param {*} value - Field value
 * @param {Array} rules - Validation rules
 * @param {Object} allValues - All form values (for cross-field validation)
 * @returns {string|null} - Error message or null
 */
export const validateField = (value, rules = [], allValues = {}) => {
  for (const rule of rules) {
    const error = rule(value, allValues);
    if (error) return error;
  }
  return null;
};

/**
 * Validate entire form
 * @param {Object} values - Form values
 * @param {Object} schema - Validation schema
 * @returns {Object} - Validation errors
 */
export const validateForm = (values, schema) => {
  const errors = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(values[field], rules, values);
    if (error) {
      errors[field] = error;
    }
  }
  
  return errors;
};

/**
 * Create validation function for specific schema
 * @param {Object} schema - Validation schema
 * @returns {Function} - Validation function
 */
export const createValidator = (schema) => {
  return (values) => validateForm(values, schema);
};

/**
 * Common validation functions
 */
export const validators = {
  contact: createValidator(validationSchemas.contact),
  quote: createValidator(validationSchemas.quote),
  newsletter: createValidator(validationSchemas.newsletter),
  login: createValidator(validationSchemas.login),
  register: createValidator(validationSchemas.register),
  profile: createValidator(validationSchemas.profile),
  comment: createValidator(validationSchemas.comment),
  search: createValidator(validationSchemas.search)
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Clean and normalize text input
 * @param {string} input - Input to clean
 * @returns {string} - Cleaned input
 */
export const cleanInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, '\n'); // Normalize line breaks
};

/**
 * Validate and clean form data
 * @param {Object} data - Form data
 * @param {Object} schema - Validation schema
 * @returns {Object} - { isValid, errors, cleanData }
 */
export const validateAndClean = (data, schema) => {
  // Clean data first
  const cleanData = {};
  for (const [key, value] of Object.entries(data)) {
    cleanData[key] = typeof value === 'string' ? cleanInput(value) : value;
  }
  
  // Validate cleaned data
  const errors = validateForm(cleanData, schema);
  const isValid = Object.keys(errors).length === 0;
  
  return {
    isValid,
    errors,
    cleanData
  };
};

export default {
  validationRules,
  validationSchemas,
  validateField,
  validateForm,
  createValidator,
  validators,
  sanitizeInput,
  cleanInput,
  validateAndClean
};