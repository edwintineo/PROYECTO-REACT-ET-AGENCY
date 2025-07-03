import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Button component with multiple variants and states
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, outline, ghost, danger)
 * @param {string} props.size - Button size (sm, md, lg, xl)
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 * @param {boolean} props.fullWidth - Full width button
 * @param {Object} props.motionProps - Framer Motion props
 * @returns {React.Component} Button component
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = false,
  motionProps = {},
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 shadow-sm hover:shadow-md'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  // Icon sizes
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };
  
  // Combine classes
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Default motion props
  const defaultMotionProps = {
    whileHover: { scale: disabled || loading ? 1 : 1.02 },
    whileTap: { scale: disabled || loading ? 1 : 0.98 },
    transition: { duration: 0.1 },
    ...motionProps
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...defaultMotionProps}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className={`${iconSizes[size]} mr-2 flex-shrink-0`}>
          {leftIcon}
        </span>
      )}
      
      {/* Loading Spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} mr-2 animate-spin flex-shrink-0`} />
      )}
      
      {/* Button Content */}
      <span className="flex-1">
        {children}
      </span>
      
      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className={`${iconSizes[size]} ml-2 flex-shrink-0`}>
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};

// Button Group Component
export const ButtonGroup = ({ children, className = '', orientation = 'horizontal' }) => {
  const groupClasses = [
    'inline-flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    orientation === 'horizontal' ? '[&>*:not(:first-child)]:ml-0 [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none' : '[&>*:not(:first-child)]:mt-0 [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses}>
      {children}
    </div>
  );
};

// Icon Button Component
export const IconButton = ({
  icon,
  'aria-label': ariaLabel,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };
  
  const iconOnlySizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };
  
  return (
    <Button
      variant={variant}
      className={`${iconSizes[size]} p-0 ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <span className={iconOnlySizes[size]}>
        {icon}
      </span>
    </Button>
  );
};

// Floating Action Button
export const FloatingActionButton = ({
  icon,
  onClick,
  className = '',
  position = 'bottom-right',
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };
  
  return (
    <motion.button
      className={`
        ${positionClasses[position]}
        w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center transition-all duration-200
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        z-50 ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      {...props}
    >
      <span className="w-6 h-6">
        {icon}
      </span>
    </motion.button>
  );
};

export default Button;