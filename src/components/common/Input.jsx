import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

/**
 * Input component with validation and different variants
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  className = '',
  inputClassName = '',
  labelClassName = '',
  id,
  name,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  step,
  min,
  max,
  rows = 4,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';
  const actualType = isPassword && showPassword ? 'text' : type;
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
    xl: 'px-6 py-4 text-lg'
  };
  
  // Variant styles
  const variantStyles = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0',
    unstyled: 'border-0 focus:ring-0 p-0'
  };
  
  // Base input styles
  const baseInputStyles = [
    'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0',
    !error && !success ? variantStyles[variant] : '',
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
    success ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : '',
    disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '',
    readOnly ? 'bg-gray-50 cursor-default' : '',
    variant !== 'unstyled' && variant !== 'flushed' ? 'rounded-lg border' : '',
    sizeStyles[size],
    leftIcon ? 'pl-10' : '',
    rightIcon || isPassword || error || success ? 'pr-10' : '',
    inputClassName
  ].filter(Boolean).join(' ');
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const InputComponent = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 w-5 h-5">
              {leftIcon}
            </span>
          </div>
        )}
        
        {/* Input/Textarea */}
        <InputComponent
          ref={ref}
          id={inputId}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          step={step}
          min={min}
          max={max}
          rows={isTextarea ? rows : undefined}
          className={baseInputStyles}
          {...props}
        />
        
        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {/* Success Icon */}
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}
          
          {/* Error Icon */}
          {error && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-red-500"
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
          
          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          
          {/* Custom Right Icon */}
          {rightIcon && !isPassword && !error && !success && (
            <span className="text-gray-400 w-5 h-5">
              {rightIcon}
            </span>
          )}
        </div>
      </div>
      
      {/* Helper Text / Error Message */}
      <AnimatePresence>
        {(error || success || helperText) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            {error && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-green-600 flex items-center">
                <Check className="w-4 h-4 mr-1 flex-shrink-0" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-gray-500">
                {helperText}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Character Count */}
      {maxLength && value && (
        <div className="mt-1 text-right">
          <span className={`text-xs ${
            value.length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Input Group Component
export const InputGroup = ({ children, className = '' }) => {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
};

// Input Addon Component
export const InputAddon = ({ children, position = 'left', className = '' }) => {
  const positionClasses = {
    left: 'rounded-l-lg border-r-0',
    right: 'rounded-r-lg border-l-0'
  };
  
  return (
    <div className={`
      px-3 py-2 bg-gray-50 border border-gray-300 text-gray-500 text-sm
      flex items-center whitespace-nowrap
      ${positionClasses[position]}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Search Input Component
export const SearchInput = ({
  onSearch,
  placeholder = 'Buscar...',
  className = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className={className}>
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        leftIcon={<Search className="w-5 h-5" />}
        {...props}
      />
    </form>
  );
};

export default Input;