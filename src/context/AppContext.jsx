import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  theme: 'light',
  language: 'es',
  loading: false,
  error: null,
  notifications: [],
  seo: {
    title: 'ET Agency - Agencia Digital',
    description: 'Transformamos ideas en experiencias digitales exitosas',
    keywords: 'agencia digital, desarrollo web, SEO, marketing digital'
  },
  analytics: {
    pageViews: 0,
    sessionDuration: 0,
    bounceRate: 0
  }
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  UPDATE_SEO: 'UPDATE_SEO',
  UPDATE_ANALYTICS: 'UPDATE_ANALYTICS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    case actionTypes.UPDATE_SEO:
      return {
        ...state,
        seo: {
          ...state.seo,
          ...action.payload
        }
      };
    
    case actionTypes.UPDATE_ANALYTICS:
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload
        }
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('et-agency-theme');
    const savedLanguage = localStorage.getItem('et-agency-language');
    
    if (savedTheme) {
      dispatch({ type: actionTypes.SET_THEME, payload: savedTheme });
    }
    
    if (savedLanguage) {
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: savedLanguage });
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('et-agency-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('et-agency-language', state.language);
  }, [state.language]);

  // Action creators
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },
    
    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },
    
    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },
    
    setUser: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user });
    },
    
    setTheme: (theme) => {
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
    },
    
    setLanguage: (language) => {
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
    },
    
    addNotification: (notification) => {
      dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification });
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        actions.removeNotification(notification.id || Date.now());
      }, 5000);
    },
    
    removeNotification: (id) => {
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
    },
    
    updateSEO: (seoData) => {
      dispatch({ type: actionTypes.UPDATE_SEO, payload: seoData });
      
      // Update document meta tags
      if (seoData.title) {
        document.title = seoData.title;
      }
      
      if (seoData.description) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', seoData.description);
        }
      }
      
      if (seoData.keywords) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', seoData.keywords);
        }
      }
    },
    
    updateAnalytics: (analyticsData) => {
      dispatch({ type: actionTypes.UPDATE_ANALYTICS, payload: analyticsData });
    },
    
    // Utility functions
    trackPageView: (page) => {
      const currentViews = state.analytics.pageViews;
      actions.updateAnalytics({ pageViews: currentViews + 1 });
      
      // Here you would integrate with Google Analytics or other tracking services
      if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: page,
          page_location: window.location.href
        });
      }
    },
    
    showSuccess: (message) => {
      actions.addNotification({
        type: 'success',
        message,
        duration: 5000
      });
    },
    
    showError: (message) => {
      actions.addNotification({
        type: 'error',
        message,
        duration: 7000
      });
    },
    
    showInfo: (message) => {
      actions.addNotification({
        type: 'info',
        message,
        duration: 4000
      });
    }
  };

  const value = {
    state,
    actions,
    // Computed values
    isLoading: state.loading,
    hasError: !!state.error,
    isAuthenticated: !!state.user,
    isDarkMode: state.theme === 'dark'
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

// HOC for components that need app context
export const withAppContext = (Component) => {
  return function WrappedComponent(props) {
    const appContext = useApp();
    return <Component {...props} appContext={appContext} />;
  };
};

export default AppContext;