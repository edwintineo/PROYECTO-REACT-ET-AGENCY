import React, { useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy la Inteligencia Artificial de ET Agency. ¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const quickReplies = [
    'Quiero una página web',
    'Necesito una tienda online',
    'Información sobre precios',
    'Soporte técnico'
  ]

  const botResponses = {
    'página web': '¡Perfecto! Creamos sitios web profesionales desde $195.990. Incluye hosting, dominio .CL gratis y diseño responsive. ¿Te gustaría conocer más detalles?',
    'tienda online': '¡Excelente! Nuestras tiendas online incluyen carrito de compras, integración con Webpay, Flow y Mercado Pago. ¿Qué tipo de productos planeas vender?',
    'precios': 'Tenemos planes desde $91.990 para Landing Pages hasta $195.990 para sitios web completos. Todos incluyen hosting y dominio .CL gratis por 1 año.',
    'soporte': 'Ofrecemos soporte técnico completo, mantenciones y actualizaciones. Nuestro equipo está disponible para ayudarte. ¿Necesitas ayuda con algo específico?',
    'default': 'Gracias por tu consulta. Un especialista se pondrá en contacto contigo pronto. También puedes escribirnos a info@etagency.cl o llamarnos al +56 9 4068 1210.'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase()
      let response = botResponses.default

      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          response = value
          break
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    }, 1000)

    setInputMessage('')
  }

  const handleQuickReply = (reply) => {
    setInputMessage(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">ET Agency AI</h3>
                  <p className="text-xs text-primary-100">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-primary-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot