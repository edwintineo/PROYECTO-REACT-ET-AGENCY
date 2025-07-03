import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import Button from './Button';

/**
 * Modal component with animations and accessibility
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  preventScroll = true,
  ...props
}) => {
  // Size styles
  const sizeStyles = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full mx-4'
  };
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white',
    dark: 'bg-gray-800 text-white',
    transparent: 'bg-white/95 backdrop-blur-sm'
  };
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);
  
  // Prevent body scroll
  useEffect(() => {
    if (preventScroll && isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, preventScroll]);
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };
  
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center p-4
            bg-black/50 backdrop-blur-sm
            ${overlayClassName}
          `}
          onClick={handleOverlayClick}
          {...props}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, type: 'spring', damping: 25, stiffness: 300 }}
            className={`
              relative w-full ${sizeStyles[size]} max-h-[90vh] overflow-hidden
              ${variantStyles[variant]} rounded-xl shadow-2xl
              ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={`
                flex items-center justify-between p-6 border-b border-gray-200
                ${variant === 'dark' ? 'border-gray-700' : ''}
                ${headerClassName}
              `}>
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                )}
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={`
                      p-2 rounded-lg transition-colors
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${variant === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}
                    `}
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            
            {/* Body */}
            <div className={`
              overflow-y-auto max-h-[calc(90vh-8rem)]
              ${title || showCloseButton ? 'p-6' : 'p-6'}
              ${bodyClassName}
            `}>
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className={`
                flex items-center justify-end space-x-3 p-6 border-t border-gray-200
                ${variant === 'dark' ? 'border-gray-700' : ''}
                ${footerClassName}
              `}>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Render modal in portal
  return createPortal(modalContent, document.body);
};

// Confirmation Modal
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Estás seguro de que quieres continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  loading = false,
  ...props
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };
  
  const footer = (
    <>
      <Button
        variant="ghost"
        onClick={onClose}
        disabled={loading}
      >
        {cancelText}
      </Button>
      <Button
        variant={variant}
        onClick={handleConfirm}
        loading={loading}
      >
        {confirmText}
      </Button>
    </>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      {...props}
    >
      <p className="text-gray-600 dark:text-gray-300">
        {message}
      </p>
    </Modal>
  );
};

// Alert Modal
export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Información',
  message,
  type = 'info',
  buttonText = 'Entendido',
  ...props
}) => {
  const typeStyles = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  };
  
  const footer = (
    <Button onClick={onClose}>
      {buttonText}
    </Button>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      {...props}
    >
      <p className={`${typeStyles[type]} dark:text-gray-300`}>
        {message}
      </p>
    </Modal>
  );
};

// Drawer Component (Side Modal)
export const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  children,
  title,
  showCloseButton = true,
  className = '',
  ...props
}) => {
  const positionStyles = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };
  
  const sizeStyles = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: position === 'left' || position === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: position === 'left' || position === 'right' ? 'w-full' : 'h-full'
  };
  
  const slideVariants = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' }
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' }
    }
  };
  
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={slideVariants[position].initial}
            animate={slideVariants[position].animate}
            exit={slideVariants[position].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`
              fixed bg-white shadow-2xl overflow-hidden
              ${positionStyles[position]}
              ${sizeStyles[size]}
              ${className}
            `}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="overflow-y-auto h-full p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  return createPortal(drawerContent, document.body);
};

export default Modal;