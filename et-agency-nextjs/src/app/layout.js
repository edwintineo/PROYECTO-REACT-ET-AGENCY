import './globals.css';

export const metadata = {
  title: 'ET Agency - Agencia de Marketing Digital #1 en Chile',
  description: 'Transformamos tu presencia digital con estrategias innovadoras y resultados medibles. Desarrollo web, SEO y marketing digital profesional.',
  keywords: 'marketing digital, desarrollo web, SEO, agencia digital, Chile',
  authors: [{ name: 'ET Agency' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.6,
        color: '#1f2937'
      }}>
        {children}
      </body>
    </html>
  )
}