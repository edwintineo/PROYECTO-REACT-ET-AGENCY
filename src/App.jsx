import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ThemeProvider from '@/context/themecontext.jsx'
import { CDNProvider, CDNLoadingIndicator } from './components/CDNProvider'
import PWAInstallPrompt from './components/PWAInstallPrompt'

import Header from './components/Header'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import About from './pages/About'
import SEOServices from './pages/SEOServices'
import FAQ from './pages/FAQ'
import Terminos from './pages/Terminos'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ImageOptimizationDemo from './components/ImageOptimizationDemo'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/servicios" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/contacto" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/quienes-somos" element={<PageTransition><About /></PageTransition>} />
        <Route path="/seo-servicios" element={<PageTransition><SEOServices /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/terminos" element={<PageTransition><Terminos /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/image-optimization-demo" element={<PageTransition><ImageOptimizationDemo /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <CDNProvider config={{
      enablePreload: true,
      enableServiceWorker: true,
      criticalImages: [
        'logo-et-agency.svg',
        'hero-background.jpg',
        'et-agency-original.svg'
      ]
    }}>
      <ThemeProvider>
        <Router>
          <CDNLoadingIndicator />
          <ScrollToTop />
          <div className="min-h-screen bg-white transition-colors duration-300">
            <Header />
            <main className="pt-16 lg:pt-20">
              <AnimatedRoutes />
            </main>
            <Footer />
            <ChatBot />
            <PWAInstallPrompt />
          </div>
          

        </Router>
      </ThemeProvider>
    </CDNProvider>
  )
}

export default App