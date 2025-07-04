import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import SEOServices from './pages/SEOServices'
import FAQ from './pages/FAQ'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main className="pt-16 lg:pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/quienes-somos" element={<About />} />
              <Route path="/posicionamiento-web-seo" element={<SEOServices />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App