import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Loading component with different variants
 */
const Loading = ({
  variant = 'spinner',
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  // Size styles
  const sizeStyles = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  // Color styles
  const colorStyles = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };
  
  // Spinner Component
  const Spinner = () => (
    <Loader2 className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]}`} />
  );
  
  // Dots Component
  const Dots = () => {
    const dotSize = {
      xs: 'w-1 h-1',
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4'
    };
    
    return (
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${dotSize[size]} ${colorStyles[color]} bg-current rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  };
  
  // Pulse Component
  const Pulse = () => {
    const pulseSize = {
      xs: 'w-8 h-8',
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20',
      xl: 'w-24 h-24'
    };
    
    return (
      <div className="relative">
        <motion.div
          className={`${pulseSize[size]} ${colorStyles[color]} bg-current rounded-full opacity-20`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
        <motion.div
          className={`absolute inset-0 ${colorStyles[color]} bg-current rounded-full opacity-40`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.2
          }}
        />
      </div>
    );
  };
  
  // Bars Component
  const Bars = () => {
    const barHeight = {
      xs: 'h-4',
      sm: 'h-6',
      md: 'h-8',
      lg: 'h-12',
      xl: 'h-16'
    };
    
    return (
      <div className="flex items-end space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`w-1 ${barHeight[size]} ${colorStyles[color]} bg-current rounded-sm`}
            animate={{
              scaleY: [1, 0.3, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  };
  
  // Ring Component
  const Ring = () => {
    const ringSize = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20'
    };
    
    return (
      <div className={`${ringSize[size]} relative`}>
        <motion.div
          className={`absolute inset-0 border-2 border-transparent border-t-current ${colorStyles[color]} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    );
  };
  
  // Square Component
  const Square = () => {
    const squareSize = {
      xs: 'w-4 h-4',
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
    
    return (
      <motion.div
        className={`${squareSize[size]} ${colorStyles[color]} bg-current`}
        animate={{
          rotate: [0, 180, 360],
          borderRadius: ['0%', '50%', '0%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    );
  };
  
  // Get loading component based on variant
  const getLoadingComponent = () => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'bars':
        return <Bars />;
      case 'ring':
        return <Ring />;
      case 'square':
        return <Square />;
      default:
        return <Spinner />;
    }
  };
  
  const loadingContent = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {getLoadingComponent()}
      {text && (
        <motion.p
          className={`text-sm font-medium ${colorStyles[color]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
  
  // Full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {loadingContent}
      </div>
    );
  }
  
  // Overlay loading
  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loadingContent}
      </div>
    );
  }
  
  // Regular loading
  return loadingContent;
};

// Skeleton Component
export const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const variantStyles = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded'
  };
  
  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Could be enhanced with custom wave animation
    none: ''
  };
  
  return (
    <div
      className={`
        bg-gray-200 ${variantStyles[variant]} ${animationStyles[animation]}
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

// Skeleton Text Component
export const SkeletonText = ({
  lines = 3,
  spacing = 2,
  className = ''
}) => {
  return (
    <div className={`space-y-${spacing} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="0.75rem"
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
};

// Loading Button Component
export const LoadingButton = ({
  loading = false,
  children,
  loadingText = 'Cargando...',
  variant = 'spinner',
  size = 'sm',
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className="inline-flex items-center justify-center space-x-2"
      {...props}
    >
      {loading && (
        <Loading
          variant={variant}
          size={size}
          color="white"
        />
      )}
      <span>
        {loading ? loadingText : children}
      </span>
    </button>
  );
};

// Page Loading Component
export const PageLoading = ({
  text = 'Cargando página...',
  variant = 'spinner',
  size = 'lg'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loading
          variant={variant}
          size={size}
          color="blue"
        />
        <motion.p
          className="mt-4 text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
};

// Content Loading Component
export const ContentLoading = ({
  rows = 5,
  showAvatar = false,
  showImage = false,
  className = ''
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        {showAvatar && (
          <Skeleton variant="circular" width="3rem" height="3rem" />
        )}
        <div className="flex-1 space-y-2">
          <Skeleton height="1rem" width="40%" />
          <Skeleton height="0.75rem" width="60%" />
        </div>
      </div>
      
      {/* Image */}
      {showImage && (
        <Skeleton height="12rem" className="mb-6" />
      )}
      
      {/* Content */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            height="0.75rem"
            width={i === rows - 1 ? '75%' : '100%'}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;